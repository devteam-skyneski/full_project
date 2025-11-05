'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimator } from './components/ScrollAnimator';
import { Attendance } from './sections/Attendance';
import TaskSection from './sections/task';
import Feedback from './sections/feedback';
import { 
  ChevronDown, 
  ChevronUp,
  Phone, 
  MoreVertical,
  Mail,
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  BarChart3,
  CheckSquare,
  User,
  LogOut,
  Bell,
  Download,
} from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  Tooltip,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';
import Lottie from 'lottie-react';
import './dashboard.css';

// Import report card animation
let reportCardAnimation: any = null;
try {
  // @ts-ignore - Dynamic import for optional file
  reportCardAnimation = require('../../login(animations)/note.json');
} catch (e) {
  // File will be loaded when available
}

// Import parent greeting animation (large and visible)
let parentAnimation: any = null;
try {
  // @ts-ignore - Dynamic import for optional file
  parentAnimation = require('../../login(animations)/parent.json');
} catch (e) {
  // File will be loaded when available
}

export default function ParentDashboard() {
  const NavIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
      <div className="text-black">
        {children}
      </div>
    </div>
  );
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [monthOpen, setMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [todayOpen, setTodayOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // Navbar items for FloatingDock
  const navItems = [
    { title: "Home", icon: <NavIcon><Home className="w-5 h-5 text-black" /></NavIcon>, href: "#home" },
    { title: "Task", icon: <NavIcon><FileText className="w-5 h-5 text-black" /></NavIcon>, href: "#tasks" },
    { title: "Report", icon: <NavIcon><BarChart3 className="w-5 h-5 text-black" /></NavIcon>, href: "#performance" },
    { title: "Attendance", icon: <NavIcon><CheckSquare className="w-5 h-5 text-black" /></NavIcon>, href: "#attendance" },
    { title: "Feedback", icon: <NavIcon><MessageSquare className="w-5 h-5 text-black" /></NavIcon>, href: "#feedback" },
  ];

  // Animation variants for cards
  const variants = {
    fadeUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    slideLeft: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    slideRight: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    zoomIn: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
  } as const;

  // Handle navbar clicks with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const section = sectionsRef.current[sectionId];
    if (section) {
      const scrollContainer = scrollContainerRef.current || document.querySelector('.scroll-container') as HTMLElement;
      if (scrollContainer && section) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const offsetTop = sectionRect.top - containerRect.top + scrollContainer.scrollTop - 70;
        scrollContainer.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      }
    }
  };

  // Prevent automatic scrolling on page load
  useEffect(() => {
    // Prevent hash-based auto-scroll immediately
    if (window.location.hash) {
      // Clear hash without scrolling
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Small delay to ensure DOM is ready, then scroll to top
    const timer = setTimeout(() => {
      const scrollContainer = scrollContainerRef.current || document.querySelector('.scroll-container') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.profile-dropdown') && !target.closest('.notifications-dropdown')) {
        setMonthOpen(false);
        setTodayOpen(false);
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navbar hide/show on scroll (hide on scroll DOWN, show on scroll UP)
  useEffect(() => {
    const container = scrollContainerRef.current || document.querySelector('.scroll-container');
    if (!container) return;

    let last = 0;
    const onScroll = () => {
      // Keep navbar visible while any dropdown is open
      if (profileOpen || monthOpen || todayOpen || notificationsOpen) {
        setNavHidden(false);
        return;
      }

      const st = (container as HTMLElement).scrollTop || 0;
      // small threshold to avoid flicker
      if (st > last + 10) {
        // scrolling down -> hide
        setNavHidden(true);
      } else if (st < last - 10) {
        // scrolling up -> show
        setNavHidden(false);
      }
      last = st <= 0 ? 0 : st;
      setLastScrollTop(last);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [profileOpen, monthOpen, todayOpen, notificationsOpen]);

  // Logout handler: clear relevant local storage and redirect to /auth
  const handleLogout = () => {
    try {
      // Clear remembered user and any auth tokens stored in localStorage
      localStorage.removeItem('rememberedUser');
      localStorage.removeItem('authToken');
    } catch (e) {
      // ignore
    }
    // Use location.assign to fully navigate to login
    window.location.assign('/auth');
  };

  // Performance bar chart data - matching second image
  const performanceData = [
    { name: 'Algorithms structures', score: 85.3 },
    { name: 'Object program.', score: 64.7 },
    { name: 'Database program.', score: 84.2 },
    { name: 'Web develop.', score: 45.6 },
    { name: 'Mobile application', score: 43.5 },
    { name: 'Machine learning', score: 74.4 },
  ];

  // Calendar events - matching exact times from image
  const initialCalendarEvents = [
    { time: '10:00', displayTime: '9.45-10.30', endTime: '10:30', title: 'Electronics lesson', lesson: '21 lesson', active: true },
    { time: '11:00', displayTime: '11.00-11.40', endTime: '11:40', title: 'Electronics lesson', lesson: '23 lesson', active: false },
    { time: '12:00', displayTime: '12.00-12.45', endTime: '12:45', title: 'Robotics lesson', lesson: '23 lesson', active: false },
    { time: '13:30', displayTime: '13.45-14.30', endTime: '14:30', title: 'C++ lesson', lesson: '21 lesson', active: false },
  ];

  const [calendarEvents, setCalendarEvents] = useState(initialCalendarEvents);
  const setActiveEventByTime = (time: string) => {
    setCalendarEvents(prev => prev.map(e => ({ ...e, active: e.time === time })));
  };

  return (
    <div className="parent-dashboard">
      {/* Fixed Navbar with FloatingDock */}
  <nav className={`w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100 fixed-navbar ${navHidden ? 'hidden' : ''}`}>
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-lg rounded-lg">
            P
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Parent Portal</h1>
        </div>

        {/* Right Section - Navigation and Profile */}
        <div className="flex items-center gap-6">
          {/* Notifications Button + Dropdown */}
          <div className="relative notifications-dropdown">
            <button
              onClick={() => setNotificationsOpen(o => !o)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-haspopup="true"
              aria-expanded={notificationsOpen}
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5 text-black" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-4 px-1.5 py-0.5 rounded-full">3</span>
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <ul className="max-h-80 overflow-auto divide-y divide-gray-100">
                  {[
                    { title: 'Report cards available for download', date: 'Dec 14, 2025', priority: 'high' },
                    { title: 'Parent-teacher meet schedule released', date: 'Dec 18, 2025', priority: 'medium' },
                    { title: 'Winter break begins next week', date: 'Dec 22, 2025', priority: 'low' },
                  ].map((a, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.priority === 'high' ? 'bg-red-100 text-red-600' : a.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white font-medium truncate">{a.title}</p>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">{a.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button onClick={() => setNotificationsOpen(false)} className="text-xs text-[#5D5FEF] font-medium hover:underline">Close</button>
                </div>
              </div>
            )}
          </div>
          <FloatingDock
            items={navItems.map(item => ({
              ...item,
              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleNavClick(e, item.href);
              }
            }))}
            desktopClassName="flex gap-4"
            mobileClassName="grid grid-cols-4 gap-4"
          />
          
          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
              {profileOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                {/* User Info Section */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-semibold">
                    P
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Parent</div>
                    <div className="text-xs text-[#6B7280]">Parent</div>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="py-1">
                  <button onClick={() => window.location.assign('/parent/profile')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-gray-50 transition-colors" aria-label="Open parent profile">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-gray-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Scrollable Sections Container */}
      <main className="scroll-container" ref={(el) => { scrollContainerRef.current = el; }}>
        
        {/* SECTION 1: HOME – Current Dashboard (100% unchanged) */}
        <section 
          id="home" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['home'] = el; }}
        >
          <div className="section-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full dashboard-grid">
              {/* Left Column */}
              <div className="lg:col-span-2 flex flex-col gap-3 overflow-y-auto">
                {/* Greeting Section */}
                <motion.div 
                  className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-shrink-0"
                  initial={variants.slideRight.initial}
                  animate={variants.slideRight.animate}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <motion.h1 
                        className="text-[36px] font-bold text-white mb-2 leading-tight"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                      >
                        Hello Parent!
                      </motion.h1>
                      <motion.p 
                        className="text-base text-white mb-3 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        Your child has 3 new tasks today. Let&apos;s help them get started!
                      </motion.p>
                    </div>
                    {/* Parent Lottie Animation (big and visible) */}
                    <div className="flex-shrink-0 greeting-illustration">
                      {parentAnimation ? (
                        <div className="w-40 h-40 md:w-56 md:h-56">
                          <Lottie animationData={parentAnimation} loop={true} className="w-full h-full" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>

                {/* Performance Section (from Student Dashboard) */}
                <motion.div 
                  className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-1"
                  initial={variants.fadeUp.initial}
                  animate={variants.fadeUp.animate}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Performance</h3>
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setMonthOpen(!monthOpen)}
                        className="flex items-center gap-2 rounded-lg px-3 py-1 cursor-pointer transition border border-gray-200 hover:bg-gray-50"
                        aria-haspopup="listbox"
                        aria-expanded={monthOpen}
                        aria-label="Select month"
                      >
                        <span className="text-gray-700 text-sm">{selectedMonth}</span>
                        <ChevronDown className="w-4 h-4 text-gray-700" />
                      </button>
                      {monthOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[140px] z-50 dropdown-menu">
                          {['January','February','march','april','may','june','july','august','September','October','November','December'].map((m) => (
                            <button
                              key={m}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${m===selectedMonth ? 'font-semibold text-gray-800' : 'text-gray-700'}`}
                              onClick={() => { setSelectedMonth(m); setMonthOpen(false); }}
                              role="option"
                              aria-selected={m===selectedMonth}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                  <div>
                        <span className="text-3xl font-bold text-white">95.4</span>
                        <p className="text-[#6B7280] text-xs mt-1">Introduction to programming</p>
                      </div>
                      <button className="bg-[#3B82F6] text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition text-xs font-medium">
                        All lessons
                      </button>
                            </div>
                          </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData.map(item => ({
                          ...item,
                          remaining: 100 - item.score
                        }))}
                        barSize={70}
                        margin={{ top: 30, right: 30, left: 20, bottom: 65 }}
                      >
                        <XAxis
                          dataKey="name"
                          height={0.5}
                          fontSize={10}
                          tick={{ fill: '#ffffff' }}
                          tickLine={false}
                          interval={0}
                        />
                        <YAxis
                          domain={[0, 100]}
                          fontSize={11}
                          tick={{ fill: '#ffffff' }}
                          tickLine={false}
                        />
                        <Bar dataKey="score" stackId="a" radius={[0, 0, 0, 0]} isAnimationActive animationDuration={1600} animationEasing="ease-out">
                          {[
                            { color: '#7BD5F5' },
                            { color: '#787FF6' },
                            { color: '#4ADEDE' },
                            { color: '#1CA7EC' },
                            { color: '#1F2F98' },
                            { color: '#7BD5F5' },
                          ].map((entry, index) => (
                            <Cell key={`color-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                        <Bar dataKey="remaining" stackId="a" fill="#E5E7EB" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                          <LabelList
                            dataKey="score"
                            position="top"
                            style={{ fill: '#ffffff', fontSize: '12px', fontWeight: 'bold' }}
                            formatter={(label: any) => `${label}%`}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Linked Teachers removed as requested */}
              </div>

              {/* Right Column - Calendar & Events */}
              <div className="flex flex-col gap-3 h-full min-h-0">
                {/* Calendar Section */}
                <motion.div 
                  className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-1 min-h-0 overflow-y-auto"
                  initial={variants.slideLeft.initial}
                  animate={variants.slideLeft.animate}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-white">Calendar</h2>
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setTodayOpen(!todayOpen)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#5D5FEF] transition-colors"
                      >
                        Today
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {todayOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[100px] z-50 dropdown-menu">
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setTodayOpen(false)}>Today</button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setTodayOpen(false)}>Tomorrow</button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setTodayOpen(false)}>This Week</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3 flex-shrink-0">6 events today</p>

                  {/* Timeline */}
                  <div className="relative pl-4">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    {/* Time markers and events */}
                    <div className="space-y-3">
                      {['10:00', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'].map((time, idx) => {
                        const event = calendarEvents.find(e => e.time === time);
                        if (event) {
                          return (
                            <div key={time} className="relative" onClick={() => setActiveEventByTime(event.time)}>
                              {/* Time marker */}
                              <div className="absolute -left-4 top-4">
                                <div className={`w-8 h-8 rounded-full ${event.active ? 'bg-white border-2 border-[#5D5FEF]' : 'bg-white border-2 border-gray-300'} flex items-center justify-center`}>
                                  <div className={`w-2 h-2 rounded-full ${event.active ? 'bg-[#5D5FEF]' : 'bg-gray-400'}`}></div>
                                </div>
                              </div>
                              {/* Event card */}
                              <div className={`${event.active ? 'bg-[#5D5FEF] text-white active' : 'bg-white/10 text-white calendar-event'} rounded-xl p-4 shadow-sm ml-4 relative interactive-element`}>
                                <div className="flex items-start gap-3">
                                  <div className={`${event.active ? 'bg-white/20' : 'bg-gray-200'} rounded-full p-2 flex-shrink-0`}>
                                    <Home className={`w-4 h-4 ${event.active ? 'text-white' : 'text-gray-600'}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className={`font-semibold mb-1 text-sm ${event.active ? 'text-white' : 'text-white'}`}>
                                      {event.title}
                                    </div>
                                    <div className={`text-xs ${event.active ? 'text-white/80' : 'text-[#6B7280]'}`}>
                                      {event.lesson}
                                    </div>
                                  </div>
                                </div>
                                {/* Vertical line extending from card (for active event) */}
                                {event.active && (
                                  <div className="absolute left-0 bottom-0 w-0.5 bg-[#5D5FEF] translate-y-full" style={{ height: '48px' }}></div>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </motion.div>
                {/* Announcements Section */}
                <motion.div 
                  className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-shrink-0"
                  initial={variants.zoomIn.initial}
                  animate={variants.zoomIn.animate}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="flex items-center justify-between mb-4" id="announcements" ref={(el) => { sectionsRef.current['announcements'] = el as unknown as HTMLElement; }}>
                    <h2 className="text-lg font-semibold text-white">Announcements</h2>
                    <a href="#" className="text-[#5D5FEF] text-sm font-medium hover:underline">
                      See all
                    </a>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { title: 'Report cards available for download', date: 'Dec 14, 2025', priority: 'high' },
                      { title: 'Parent-teacher meet schedule released', date: 'Dec 18, 2025', priority: 'medium' },
                      { title: 'Winter break begins next week', date: 'Dec 22, 2025', priority: 'low' },
                    ].map((a, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${a.priority === 'high' ? 'bg-red-100 text-red-600' : a.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                          <Bell className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white text-sm leading-snug">{a.title}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.priority === 'high' ? 'bg-red-100 text-red-700' : a.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{a.priority}</span>
                          </div>
                          <p className="text-xs text-[#6B7280] mt-0.5">{a.date}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0" aria-label="More options">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: RECENT TASKS & PRACTICE (copied from Student Dashboard) */}
        <section 
          id="tasks" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['tasks'] = el; }}
        >
          <div className="w-full px-6 py-1 h-full flex items-center">
            {/* TaskSection already contains its own white cards and max-width container */}
            <TaskSection />
          </div>
        </section>

        {/* SECTION 2: PERFORMANCE */}
        <section 
          id="performance" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['performance'] = el; }}
        >
          <div className="w-full px-6 py-2 h-full">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Left Half - Subject Performance (unchanged) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm dashboard-card flex flex-col min-h-0"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-xl font-bold text-white mb-2 flex items-center gap-2"
                >
                  📊 Subject Performance
                </motion.h2>
                
                {/* Bar Chart - Horizontal */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1 min-h-0"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Python', score: 92, color: '#6C5CE7' },
                        { name: 'Java', score: 88, color: '#0984E3' },
                        { name: 'JavaScript', score: 85, color: '#00B894' },
                        { name: 'React', score: 88, color: '#FDCB6E' },
                        { name: 'HTML/CSS', score: 95, color: '#E17055' },
                        { name: 'C++', score: 82, color: '#A0AEC0' },
                      ]}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    >
                      <XAxis 
                        type="number"
                        domain={[0, 100]}
                        tick={{ fill: '#ffffff', fontSize: 10, fontWeight: 500 }}
                        axisLine={{ stroke: '#DFE6E9' }}
                        tickLine={{ stroke: '#DFE6E9' }}
                      />
                      <YAxis 
                        type="category"
                        dataKey="name"
                        tick={{ fill: '#ffffff', fontSize: 11, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                        width={90}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #DFE6E9', 
                          borderRadius: '8px',
                          fontSize: '12px',
                          padding: '6px 10px'
                        }}
                        formatter={(value: number) => `${value}%`}
                      />
                      <Bar dataKey="score" radius={[0, 8, 8, 0]} isAnimationActive animationBegin={200} animationDuration={1200} animationEasing="ease-out">
                        {[
                          { color: '#7BD5F5' },
                          { color: '#787FF6' },
                          { color: '#4ADEDE' },
                          { color: '#1CA7EC' },
                          { color: '#1F2F98' },
                          { color: '#7BD5F5' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList 
                          dataKey="score" 
                          position="right" 
                          style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '600' }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </motion.div>

              {/* Right Half - Report Card */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="bg-white rounded-2xl p-4 shadow-sm dashboard-card overflow-y-auto"
              >
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-center justify-between mb-3"
                >
                  <h2 className="text-xl font-bold text-white">Report Card</h2>
                  <button 
                    onClick={() => {
                      // PDF download functionality would go here
                      window.print();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5D5FEF] text-white rounded-lg hover:bg-[#4C4ED8] transition-colors text-xs font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </motion.div>

                {/* Congratulatory Message */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-center mb-3"
                >
                  <p className="text-xs text-white leading-tight">
                    Congratulations, Sarah! Your hard work and dedication have paid off. Here&apos;s a detailed overview of your academic performance this semester.
                  </p>
                </motion.div>

                {/* Academic Performance Section */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="bg-gray-50 rounded-xl p-3 mb-3"
                >
                  <h3 className="text-sm font-bold text-white mb-1">Academic Performance</h3>
                  <p className="text-xs text-gray-600 mb-2">Semester 1, 2024</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-2xl font-bold text-[#5D5FEF]">Overall Grade: A</div>
                    {/* Lottie Animation */}
                    {reportCardAnimation && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-20 h-20">
                          <Lottie
                            animationData={reportCardAnimation}
                            loop={true}
                            className="w-full h-full"
                          />
                </div>
                      </motion.div>
                    )}
              </div>
                </motion.div>

                {/* Subject-wise Performance Table */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="mb-3"
                >
                  <h3 className="text-sm font-bold text-white mb-2">Subject-wise Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left py-1.5 px-2 font-bold text-white text-xs">SUBJECT</th>
                          <th className="text-left py-1.5 px-2 font-bold text-white text-xs">GRADE</th>
                          <th className="text-left py-1.5 px-2 font-bold text-white text-xs">MARKS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-white font-medium text-xs">Python</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A</td>
                          <td className="py-1.5 px-2 text-white text-xs">92/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-white font-medium text-xs">Java</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A-</td>
                          <td className="py-1.5 px-2 text-white text-xs">88/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-white font-medium text-xs">JavaScript</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">B+</td>
                          <td className="py-1.5 px-2 text-white text-xs">85/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-white font-medium text-xs">React</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A-</td>
                          <td className="py-1.5 px-2 text-white text-xs">88/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-white font-medium text-xs">HTML/CSS</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A</td>
                          <td className="py-1.5 px-2 text-white text-xs">95/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-white font-medium text-xs">C++</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">B</td>
                          <td className="py-1.5 px-2 text-white text-xs">82/100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ATTENDANCE */}
        <section 
          id="attendance" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['attendance'] = el; }}
        >
          <div className="w-full px-6 py-1 h-full flex items-center">
            <div className="bg-white rounded-2xl p-2 shadow-sm dashboard-card w-full h-full flex flex-col">
              {/* Import and use Attendance component */}
              <Attendance />
            </div>
          </div>
        </section>

        {/* SECTION 4: FEEDBACK */}
        <section 
          id="feedback" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['feedback'] = el; }}
        >
          <div className="w-full px-6 py-1 h-full flex items-center">
            <div className="bg-white rounded-2xl shadow-sm dashboard-card h-full w-full">
              {/* Import and use the Feedback component */}
              <Feedback />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
