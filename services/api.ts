// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface User {
  id: number;
  name: string;
  email: string;
  skills: string[];
  bio: string;
  avatar: string;
  available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  requiredSkills: string[];
  creatorId: number;
  members: number[];
  creator_id?: number;
  created_at?: string;
  updated_at?: string;
  creator?: User;
}

export interface SkillSwap {
  id: number;
  fromUserId: number;
  toUserId: number;
  offeredSkill: string;
  requestedSkill: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string;
  fromUser?: User;
  toUser?: User;
  created_at?: string;
  updated_at?: string;
}

// Auth
export async function register(name: string, email: string, password: string, skills: string[], bio: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, skills, bio }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Registration failed' }));
    throw new Error(errorData.error || `Registration failed: ${response.status}`);
  }
  return await response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return await response.json();
}

// Users
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return await response.json();
}

export async function toggleUserAvailability(id: number): Promise<{ available: boolean }> {
  const response = await fetch(`${API_BASE_URL}/users/${id}/availability`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to toggle availability');
  return await response.json();
}

// Projects
export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  const projects = await response.json();
  // Transform backend format to frontend format
  return projects.map((p: any) => ({
    ...p,
    creatorId: p.creator_id || p.creator_id,
    requiredSkills: p.requiredSkills || [],
  }));
}

export async function getProjectById(id: number): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) throw new Error('Failed to fetch project');
  const project = await response.json();
  return {
    ...project,
    creatorId: project.creator_id || project.creatorId,
    requiredSkills: project.requiredSkills || [],
  };
}

export async function createProject(title: string, description: string, requiredSkills: string[], token: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, requiredSkills }),
  });
  if (!response.ok) throw new Error('Failed to create project');
  const project = await response.json();
  return {
    ...project,
    creatorId: project.creator_id || project.creatorId,
    requiredSkills: project.requiredSkills || [],
  };
}

export async function joinProject(projectId: number, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/join`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to join project');
}

// Skill Swaps
export async function getSkillSwaps(token: string): Promise<SkillSwap[]> {
  const response = await fetch(`${API_BASE_URL}/skill-swaps`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch skill swaps');
  const swaps = await response.json();
  // Transform to frontend format
  return swaps.map((s: any) => ({
    ...s,
    fromUserId: s.from_user_id || s.fromUserId,
    toUserId: s.to_user_id || s.toUserId,
    offeredSkill: s.offered_skill || s.offeredSkill,
    requestedSkill: s.requested_skill || s.requestedSkill,
  }));
}

export async function proposeSkillSwap(toUserId: number, offeredSkill: string, requestedSkill: string, message: string, token: string): Promise<SkillSwap> {
  const response = await fetch(`${API_BASE_URL}/skill-swaps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ toUserId, offeredSkill, requestedSkill, message }),
  });
  if (!response.ok) throw new Error('Failed to propose skill swap');
  const swap = await response.json();
  return {
    ...swap,
    fromUserId: swap.from_user_id || swap.fromUserId,
    toUserId: swap.to_user_id || swap.toUserId,
    offeredSkill: swap.offered_skill || swap.offeredSkill,
    requestedSkill: swap.requested_skill || swap.requestedSkill,
  };
}

export async function updateSkillSwapStatus(swapId: number, status: 'accepted' | 'declined', token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/skill-swaps/${swapId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update skill swap status');
}

