'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, GraduationCap, Users, UserCog, Shield, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import studentAnimation from '../../login(animations)/Student.json';

type Role = 'student' | 'parent' | 'teacher' | 'admin';
type AuthMode = 'login' | 'signup';

const AuthPage = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialMount, setIsInitialMount] = useState(true);
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = authMode === 'login' ? 'Username or email is required' : 'Username is required';
    }

    if (authMode === 'signup') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (authMode === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (authMode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call (replace with actual authentication logic)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in sessionStorage (in production, use proper auth state management)
      const userData = {
        role: selectedRole,
        username: formData.username,
        email: formData.email,
        isAuthenticated: true,
      };
      sessionStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to respective dashboard based on role
      const dashboardRoutes = {
        student: '/student-dashboard',
        parent: '/parent-dashboard',
        teacher: '/teacher-dashboard',
        admin: '/admin-dashboard',
      };
      
      router.push(dashboardRoutes[selectedRole]);
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
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

  // Track initial mount for student animation
  useEffect(() => {
    // Keep isInitialMount true initially so animation plays on page load
    // Set to false after animation completes (0.8s animation + buffer)
    const timer = setTimeout(() => {
      setIsInitialMount(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Calculate parallax transforms
  const parallaxTransform = {
    background: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
    illustration: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
    wave1: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
    wave2: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
    floating1: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
    floating2: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 relative overflow-hidden"
    >
      {/* Floating parallax background elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: parallaxTransform.floating1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Additional floating elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: parallaxTransform.floating2 }}
      >
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-300 rounded-full opacity-10 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-300 rounded-full opacity-10 animate-float"></div>
      </div>
      <div 
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 transition-transform duration-75 ease-out"
        style={{ 
          transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${mousePosition.y * -0.3}deg) scale(${1 + (mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y) * 0.005})`
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Panel - Login/Signup Form */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 transition-all duration-300">
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </h1>
                <p className="text-blue-200 text-sm">
                  Enter your account details to {authMode === 'login' ? 'access' : 'create'} your account
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                  <span>I am a...</span>
                  <span className="text-xs text-blue-300">(Select your role)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['student', 'parent', 'teacher', 'admin'] as Role[]).map((role) => {
                    const config = roleConfig[role];
                    const Icon = config.icon;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role);
                          setErrors({}); // Clear errors when changing role
                        }}
                        className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg transition-all duration-300 transform ${
                          selectedRole === role
                            ? `${config.accent} text-white shadow-xl scale-105 ring-2 ring-blue-300 ring-opacity-50`
                            : 'bg-slate-800 text-blue-200 hover:bg-slate-700 hover:scale-[1.02] border border-slate-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 transition-transform duration-300 ${
                          selectedRole === role ? 'scale-110' : ''
                        }`} />
                        <span className="text-xs font-semibold capitalize tracking-wide">{role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-300 text-sm animate-fade-in transition-all duration-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.submit}</span>
                  </div>
                )}

                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required={authMode === 'signup'}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                          errors.email ? 'border-red-500' : 'border-blue-500'
                        } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors`}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="username" className="block text-blue-200 text-sm font-medium mb-2">
                    {authMode === 'login' ? 'Username or Email' : 'Username'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your username"
                      className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                        errors.username ? 'border-red-500' : 'border-blue-500'
                      } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors`}
                    />
                    {errors.username && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <XCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.username && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                      <AlertCircle className="w-3 h-3" />
                      {errors.username}
                    </p>
                  )}
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
                      className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                        errors.password ? 'border-red-500' : 'border-blue-500'
                      } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors pr-10`}
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
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-blue-200 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={authMode === 'signup'}
                        placeholder="Confirm your password"
                        className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-blue-500'
                        } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors`}
                      />
                      {errors.confirmPassword ? (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                      ) : formData.confirmPassword && formData.password === formData.confirmPassword ? (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                      ) : null}
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
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
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${currentRole.accent} hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{authMode === 'login' ? 'Login' : 'Sign Up'}</span>
                  )}
                </button>
              </form>

              {/* Toggle between Login and Sign Up */}
              <div className="text-center pt-4 border-t border-slate-700">
                <p className="text-blue-200 text-sm">
                  {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                      setErrors({});
                    }}
                    className="text-white font-semibold hover:underline underline-offset-2 transition-colors hover:text-blue-300"
                  >
                    {authMode === 'login' ? 'Sign up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Dynamic Illustration */}
          <div className={`bg-gradient-to-br ${currentRole.color} p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden`}>
            {/* Wave pattern overlay with parallax */}
            <div 
              className="absolute inset-0 opacity-20 transition-transform duration-75 ease-out"
              style={{ transform: parallaxTransform.wave1 }}
            >
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
            {/* Second wave layer with different parallax speed */}
            <div 
              className="absolute inset-0 opacity-10 transition-transform duration-75 ease-out"
              style={{ transform: parallaxTransform.wave2 }}
            >
              <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                <path
                  d="M0,180 Q150,130 250,180 T400,180 L400,400 L0,400 Z"
                  fill="white"
                />
                <path
                  d="M0,230 Q150,180 250,230 T400,230 L400,400 L0,400 Z"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <div key={selectedRole} className="transition-all duration-500 animate-fade-in">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {currentRole.title}
                </h2>
                <p className="text-blue-100 text-lg">
                  {currentRole.subtitle}
                </p>
              </div>

              {/* Dynamic Illustration based on role with parallax */}
              <div className="mt-8 transition-all duration-500 ease-in-out relative min-h-[300px]">
                <div
                  key={selectedRole}
                  className="animate-fade-in transition-transform duration-75 ease-out"
                  style={{ 
                    transform: selectedRole === 'student' 
                      ? 'none' 
                      : parallaxTransform.illustration 
                  }}
                >
                  {selectedRole === 'student' && <StudentIllustration isInitialMount={isInitialMount} />}
                  {selectedRole === 'parent' && <ParentIllustration />}
                  {selectedRole === 'teacher' && <TeacherIllustration />}
                  {selectedRole === 'admin' && <AdminIllustration />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Illustration Component
const StudentIllustration = ({ isInitialMount }: { isInitialMount: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${isInitialMount ? 'animate-pop-up-bottom-left' : ''}`}>
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

