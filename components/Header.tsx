
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeLinkStyle = {
    color: '#3B82F6',
    borderBottom: '2px solid #3B82F6'
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              CollabMate
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {currentUser && (
                <>
                  <NavLink to="/discover" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition">
                    Discover
                  </NavLink>
                  <NavLink to="/skill-swaps" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition">
                    Skill Swaps
                  </NavLink>
                  <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                 <img className="h-8 w-8 rounded-full" src={currentUser.avatar} alt="User Avatar" />
                 <span className="text-sm font-medium text-gray-700 hidden sm:block">Welcome, {currentUser.name.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
