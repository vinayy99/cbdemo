import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Project, SkillSwap } from '../types';
import { MOCK_USERS, MOCK_PROJECTS, MOCK_SKILL_SWAPS } from '../constants';
import * as api from '../services/api';

interface AppContextType {
  users: User[];
  projects: Project[];
  skillSwaps: SkillSwap[];
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (newUser: Omit<User, 'id' | 'avatar' | 'available'>) => Promise<boolean>;
  findUserById: (id: number) => User | undefined;
  findProjectById: (id: number) => Project | undefined;
  joinProject: (projectId: number) => void;
  createProject: (title: string, description: string, requiredSkills: string[]) => Promise<boolean>;
  toggleAvailability: () => void;
  updateSkillSwapStatus: (swapId: number, status: 'accepted' | 'declined') => void;
  proposeSkillSwap: (swapData: Omit<SkillSwap, 'id' | 'status' | 'fromUserId'>) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [skillSwaps, setSkillSwaps] = useState<SkillSwap[]>(MOCK_SKILL_SWAPS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API or fallback to mock data
  const fetchData = async () => {
    try {
      const [usersData, projectsData] = await Promise.all([
        api.getUsers().catch(() => MOCK_USERS),
        api.getProjects().catch(() => MOCK_PROJECTS),
      ]);
      setUsers(usersData as User[]);
      setProjects(projectsData as Project[]);
    } catch (err) {
      console.log('Using mock data as backend is not available:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (token && currentUser) {
      fetchSkillSwaps();
    }
  }, [token, currentUser]);

  const fetchSkillSwaps = async () => {
    if (!token) return;
    try {
      const data = await api.getSkillSwaps(token);
      setSkillSwaps(data);
    } catch (err) {
      setSkillSwaps(MOCK_SKILL_SWAPS);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Try API first
      try {
        const result = await api.login(email, password);
        setCurrentUser(result.user);
        setToken(result.token);
        localStorage.setItem('token', result.token);
        setUsers(prev => {
          if (!prev.find(u => u.id === result.user.id)) {
            return [...prev, result.user];
          }
          return prev;
        });
        await fetchSkillSwaps();
        return true;
      } catch (apiErr) {
        // If API fails, try mock data (no password check needed for demo)
        console.log('API login failed, trying mock data:', apiErr);
        const user = users.find(u => u.email === email);
        if (user) {
          setCurrentUser(user);
          return true;
        }
        setError('Invalid email or password.');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const signup = async (newUser: Omit<User, 'id' | 'avatar' | 'available'>) => {
    try {
      setLoading(true);
      const result = await api.register(
        newUser.name,
        newUser.email,
        newUser.password || '',
        newUser.skills,
        newUser.bio
      );
      setCurrentUser(result.user);
      setToken(result.token);
      localStorage.setItem('token', result.token);
      setUsers(prev => [...prev, result.user]);
      await fetchSkillSwaps();
      return true;
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const findUserById = (id: number) => users.find(u => u.id === id);
  const findProjectById = (id: number) => projects.find(p => p.id === id);

  const joinProject = async (projectId: number) => {
    if (!currentUser || !token) return;
    try {
      await api.joinProject(projectId, token);
      setProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === projectId && !p.members.includes(currentUser.id)
            ? { ...p, members: [...p.members, currentUser.id] }
            : p
        )
      );
    } catch (err) {
      // Fallback to local update if API fails
      setProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === projectId && !p.members.includes(currentUser.id)
            ? { ...p, members: [...p.members, currentUser.id] }
            : p
        )
      );
    }
  };

  const createProject = async (title: string, description: string, requiredSkills: string[]) => {
    if (!currentUser || !token) return false;
    try {
      const newProject = await api.createProject(title, description, requiredSkills, token);
      setProjects(prevProjects => [...prevProjects, {
        ...newProject,
        creatorId: newProject.creator_id || newProject.creatorId,
        requiredSkills: newProject.requiredSkills || [],
      }]);
      return true;
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Failed to create project');
      return false;
    }
  };

  const toggleAvailability = async () => {
    if (!currentUser) return;
    try {
      if (token) {
        await api.toggleUserAvailability(currentUser.id);
      }
      const updatedUser = { ...currentUser, available: !currentUser.available };
      setCurrentUser(updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(u => (u.id === currentUser.id ? updatedUser : u))
      );
    } catch (err) {
      const updatedUser = { ...currentUser, available: !currentUser.available };
      setCurrentUser(updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(u => (u.id === currentUser.id ? updatedUser : u))
      );
    }
  };

  const updateSkillSwapStatus = async (swapId: number, status: 'accepted' | 'declined') => {
    if (!token) return;
    try {
      await api.updateSkillSwapStatus(swapId, status, token);
      setSkillSwaps(prev => prev.map(s => s.id === swapId ? {...s, status} : s));
    } catch (err) {
      setSkillSwaps(prev => prev.map(s => s.id === swapId ? {...s, status} : s));
    }
  };

  const proposeSkillSwap = async (swapData: Omit<SkillSwap, 'id' | 'status' | 'fromUserId'>) => {
    if (!currentUser || !token) return;
    try {
      const newSwap = await api.proposeSkillSwap(
        swapData.toUserId,
        swapData.offeredSkill,
        swapData.requestedSkill,
        swapData.message,
        token
      );
      setSkillSwaps(prev => [...prev, newSwap]);
    } catch (err) {
      // Fallback
      const newSwap: SkillSwap = {
        ...swapData,
        id: Math.max(0, ...skillSwaps.map(s => s.id)) + 1,
        status: 'pending',
        fromUserId: currentUser.id,
      };
      setSkillSwaps(prev => [...prev, newSwap]);
    }
  };

  const refreshData = () => {
    fetchData();
    if (token) fetchSkillSwaps();
  };


  const value = {
    users,
    projects,
    skillSwaps,
    currentUser,
    token,
    loading,
    error,
    login,
    logout,
    signup,
    findUserById,
    findProjectById,
    joinProject,
    createProject,
    toggleAvailability,
    updateSkillSwapStatus,
    proposeSkillSwap,
    refreshData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};