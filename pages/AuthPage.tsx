
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: '',
    bio: ''
  });
  const { login, signup } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if(isLogin) {
        const success = await login(formData.email, formData.password);
        if(!success) {
            setError('Invalid email or password.');
        } else {
            navigate('/dashboard');
        }
    } else {
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        const success = await signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            skills: skillsArray,
            bio: formData.bio
        });

        if(!success) {
            setError('Email already in use.');
        } else {
            navigate('/dashboard');
        }
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-dark mb-2">
          {isLogin ? 'Welcome Back!' : 'Create Your Account'}
        </h2>
        <p className="text-center text-gray-500 mb-6">
            {isLogin ? 'Log in to continue your journey.' : 'Join the community of creators.'}
        </p>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          )}
          <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
          {!isLogin && (
            <>
              <input type="text" name="skills" placeholder="Your Skills (comma-separated)" required value={formData.skills} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
              <textarea name="bio" placeholder="Short Bio" rows={3} required value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </>
          )}
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => {setIsLogin(!isLogin); setError('');}} className="font-semibold text-primary hover:underline ml-1">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
