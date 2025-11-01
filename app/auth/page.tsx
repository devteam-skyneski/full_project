'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap, Users, UserCog, Shield, BookOpen, School, Baby, UserCheck } from 'lucide-react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import studentAnimation from '../../login(animations)/Student.json';

type Role = 'student' | 'parent' | 'teacher' | 'admin';
type AuthMode = 'login' | 'signup';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { authMode, role: selectedRole, formData });
    // Handle authentication logic here
  };

  const roleConfig = {
    student: {
      title: 'Welcome to Student Portal',
      subtitle: 'Login to access your account',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      accent: 'bg-blue-500',
    },
    parent: {
      title: 'Welcome to Parent Portal',
      subtitle: 'Monitor your child\'s progress',
      icon: Users,
      color: 'from-blue-400 to-blue-500',
      accent: 'bg-blue-400',
    },
    teacher: {
      title: 'Welcome to Teacher Portal',
      subtitle: 'Manage your classes and students',
      icon: UserCog,
      color: 'from-blue-600 to-blue-700',
      accent: 'bg-blue-600',
    },
    admin: {
      title: 'Welcome to Admin Portal',
      subtitle: 'Manage the entire platform',
      icon: Shield,
      color: 'from-blue-700 to-blue-800',
      accent: 'bg-blue-700',
    },
  };

  const currentRole = roleConfig[selectedRole];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Panel - Login/Signup Form */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </h1>
                <p className="text-blue-200 text-sm">
                  Enter your account details
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-blue-200 text-sm font-medium">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['student', 'parent', 'teacher', 'admin'] as Role[]).map((role) => {
                    const config = roleConfig[role];
                    const Icon = config.icon;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all ${
                          selectedRole === role
                            ? `${config.accent} text-white shadow-lg scale-105`
                            : 'bg-slate-800 text-blue-200 hover:bg-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium capitalize">{role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={authMode === 'signup'}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-slate-800 border-b-2 border-blue-500 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="username" className="block text-blue-200 text-sm font-medium mb-2">
                    {authMode === 'login' ? 'Username or Email' : 'Username'}
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 bg-slate-800 border-b-2 border-blue-500 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-blue-200 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-slate-800 border-b-2 border-blue-500 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-blue-200 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={authMode === 'signup'}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 bg-slate-800 border-b-2 border-blue-500 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                )}

                {authMode === 'login' && (
                  <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                      Forgot Password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${currentRole.accent} hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
                >
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </button>
              </form>

              {/* Toggle between Login and Sign Up */}
              <div className="text-center pt-4">
                <p className="text-blue-200 text-sm">
                  {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                    }}
                    className="text-white font-semibold hover:underline underline-offset-2"
                  >
                    {authMode === 'login' ? 'Sign up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Dynamic Illustration */}
          <div className={`bg-gradient-to-br ${currentRole.color} p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden`}>
            {/* Wave pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                <path
                  d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
                  fill="white"
                />
                <path
                  d="M0,250 Q100,200 200,250 T400,250 L400,400 L0,400 Z"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {currentRole.title}
                </h2>
                <p className="text-blue-100 text-lg">
                  {currentRole.subtitle}
                </p>
              </div>

              {/* Dynamic Illustration based on role */}
              <div className="mt-8 transition-all duration-500 ease-in-out">
                {selectedRole === 'student' && <StudentIllustration />}
                {selectedRole === 'parent' && <ParentIllustration />}
                {selectedRole === 'teacher' && <TeacherIllustration />}
                {selectedRole === 'admin' && <AdminIllustration />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Illustration Component
const StudentIllustration = () => {
  return (
    <div className="flex items-center justify-center">
      <Lottie
        animationData={studentAnimation}
        loop={true}
        className="w-full h-full max-w-md"
      />
    </div>
  );
};

// Parent Illustration Component
const ParentIllustration = () => {
  return (
    <div className="flex items-end justify-center space-x-6">
      {/* Parent figure */}
      <svg width="180" height="280" viewBox="0 0 180 280">
        <circle cx="90" cy="50" r="22" fill="white" stroke="#1E40AF" strokeWidth="2" />
        <rect x="68" y="72" width="44" height="75" fill="white" stroke="#1E40AF" strokeWidth="2" rx="5" />
        <rect x="58" y="72" width="22" height="55" fill="white" stroke="#1E40AF" strokeWidth="2" rx="3" />
        <rect x="100" y="72" width="22" height="55" fill="white" stroke="#1E40AF" strokeWidth="2" rx="3" />
        <rect x="78" y="147" width="32" height="55" fill="white" stroke="#1E40AF" strokeWidth="2" rx="5" />
        <rect x="78" y="202" width="32" height="70" fill="#1E40AF" stroke="#1E40AF" strokeWidth="2" rx="3" />
      </svg>
      {/* Child figure (smaller) */}
      <svg width="120" height="200" viewBox="0 0 120 200">
        <circle cx="60" cy="40" r="18" fill="white" stroke="#1E40AF" strokeWidth="2" />
        <rect x="45" y="58" width="30" height="50" fill="white" stroke="#1E40AF" strokeWidth="2" rx="4" />
        <rect x="38" y="58" width="15" height="40" fill="white" stroke="#1E40AF" strokeWidth="2" rx="2" />
        <rect x="67" y="58" width="15" height="40" fill="white" stroke="#1E40AF" strokeWidth="2" rx="2" />
        <rect x="50" y="108" width="20" height="40" fill="white" stroke="#1E40AF" strokeWidth="2" rx="4" />
        <rect x="50" y="148" width="20" height="50" fill="#1E40AF" stroke="#1E40AF" strokeWidth="2" rx="2" />
      </svg>
      {/* Heart symbol */}
      <div className="flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60" className="animate-pulse">
          <path
            d="M30,45 C30,45 15,30 15,20 C15,15 20,10 25,10 C27,10 30,12 30,15 C30,12 33,10 35,10 C40,10 45,15 45,20 C45,30 30,45 30,45 Z"
            fill="white"
            stroke="#1E40AF"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// Teacher Illustration Component
const TeacherIllustration = () => {
  return (
    <div className="flex items-center justify-center space-x-8">
      {/* Teacher figure */}
      <div className="flex flex-col items-center">
        <svg width="200" height="300" viewBox="0 0 200 300">
          <circle cx="100" cy="60" r="25" fill="white" stroke="#1E40AF" strokeWidth="2" />
          <rect x="75" y="85" width="50" height="80" fill="white" stroke="#1E40AF" strokeWidth="2" rx="5" />
          <rect x="65" y="85" width="25" height="60" fill="white" stroke="#1E40AF" strokeWidth="2" rx="3" />
          <rect x="110" y="85" width="25" height="60" fill="white" stroke="#1E40AF" strokeWidth="2" rx="3" />
          <rect x="85" y="165" width="30" height="60" fill="white" stroke="#1E40AF" strokeWidth="2" rx="5" />
          <rect x="85" y="225" width="30" height="60" fill="#1E40AF" stroke="#1E40AF" strokeWidth="2" rx="3" />
          {/* Pointer/stick */}
          <line x1="125" y1="100" x2="170" y2="80" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <circle cx="170" cy="80" r="5" fill="white" stroke="#1E40AF" strokeWidth="2" />
        </svg>
      </div>
      {/* Whiteboard */}
      <div className="flex flex-col items-center">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <rect x="20" y="20" width="140" height="100" fill="white" stroke="#1E40AF" strokeWidth="3" rx="3" />
          {/* Board writing lines */}
          <line x1="30" y1="40" x2="150" y2="40" stroke="#1E40AF" strokeWidth="2" />
          <line x1="30" y1="55" x2="150" y2="55" stroke="#1E40AF" strokeWidth="2" />
          <line x1="30" y1="70" x2="120" y2="70" stroke="#1E40AF" strokeWidth="2" />
          <line x1="30" y1="85" x2="140" y2="85" stroke="#1E40AF" strokeWidth="2" />
          {/* Board stand */}
          <rect x="75" y="120" width="30" height="40" fill="#1E40AF" stroke="#1E40AF" strokeWidth="2" rx="2" />
        </svg>
      </div>
    </div>
  );
};

// Admin Illustration Component
const AdminIllustration = () => {
  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Admin figure */}
      <div className="flex flex-col items-center">
        <svg width="180" height="280" viewBox="0 0 180 280">
          <circle cx="90" cy="50" r="22" fill="white" stroke="#1E40AF" strokeWidth="2" />
          <rect x="68" y="72" width="44" height="75" fill="white" stroke="#1E40AF" strokeWidth="2" rx="5" />
          <rect x="58" y="72" width="22" height="55" fill="white" stroke="#1E40AF" strokeWidth="2" rx="3" />
          <rect x="100" y="72" width="22" height="55" fill="white" stroke="#1E40AF" strokeWidth="2" rx="3" />
          <rect x="78" y="147" width="32" height="55" fill="white" stroke="#1E40AF" strokeWidth="2" rx="5" />
          <rect x="78" y="202" width="32" height="70" fill="#1E40AF" stroke="#1E40AF" strokeWidth="2" rx="3" />
          {/* Tie */}
          <polygon points="90,85 85,110 90,105 95,110" fill="#1E40AF" stroke="#1E40AF" strokeWidth="1" />
        </svg>
      </div>
      {/* Dashboard/laptop */}
      <div className="flex flex-col items-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Laptop base */}
          <rect x="40" y="80" width="120" height="80" fill="white" stroke="#1E40AF" strokeWidth="3" rx="2" />
          {/* Screen */}
          <rect x="50" y="20" width="100" height="70" fill="white" stroke="#1E40AF" strokeWidth="3" rx="2" />
          {/* Screen content (dashboard charts) */}
          <rect x="60" y="30" width="20" height="30" fill="#1E40AF" opacity="0.6" rx="1" />
          <rect x="85" y="35" width="20" height="25" fill="#1E40AF" opacity="0.6" rx="1" />
          <rect x="110" y="40" width="20" height="20" fill="#1E40AF" opacity="0.6" rx="1" />
          <line x1="60" y1="50" x2="130" y2="50" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Keyboard */}
          <rect x="60" y="90" width="80" height="20" fill="#1E40AF" opacity="0.3" rx="1" />
          <line x1="70" y1="95" x2="130" y2="95" stroke="#1E40AF" strokeWidth="1" />
          <line x1="70" y1="100" x2="130" y2="100" stroke="#1E40AF" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

export default AuthPage;

