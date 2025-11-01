'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
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
} from 'lucide-react';
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
import './dashboard.css';

export default function ParentDashboard() {
  const [monthOpen, setMonthOpen] = useState(false);
  const [todayOpen, setTodayOpen] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Navbar items for FloatingDock
  const navItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "#home" },
    { title: "Subjects", icon: <BookOpen className="w-5 h-5" />, href: "#home" },
    { title: "Assignment", icon: <FileText className="w-5 h-5" />, href: "#home" },
    { title: "Exam", icon: <ClipboardList className="w-5 h-5" />, href: "#home" },
    { title: "Report", icon: <BarChart3 className="w-5 h-5" />, href: "#performance" },
    { title: "Attendance", icon: <CheckSquare className="w-5 h-5" />, href: "#attendance" },
    { title: "Profile", icon: <User className="w-5 h-5" />, href: "#home" },
    { title: "Logout", icon: <LogOut className="w-5 h-5" />, href: "#home" },
  ];

  // Handle navbar clicks with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const section = sectionsRef.current[sectionId];
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setMonthOpen(false);
        setTodayOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // Calendar events - matching exact times from image
  const calendarEvents = [
    { time: '10:00', displayTime: '9.45-10.30', endTime: '10:30', title: 'Electronics lesson', lesson: '21 lesson', active: true },
    { time: '11:00', displayTime: '11.00-11.40', endTime: '11:40', title: 'Electronics lesson', lesson: '23 lesson', active: false },
    { time: '12:00', displayTime: '12.00-12.45', endTime: '12:45', title: 'Robotics lesson', lesson: '23 lesson', active: false },
    { time: '13:30', displayTime: '13.45-14.30', endTime: '14:30', title: 'C++ lesson', lesson: '21 lesson', active: false },
  ];

  return (
    <div className="parent-dashboard">
      {/* Fixed Navbar with FloatingDock */}
      <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-lg rounded-lg">
            P
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Parent Portal</h1>
        </div>

        {/* Right Section - Floating Dock */}
        <div className="flex items-center gap-6">
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
        </div>
      </nav>

      {/* Scrollable Sections Container */}
      <main className="scroll-container">
        
        {/* SECTION 1: HOME – Current Dashboard (100% unchanged) */}
        <section 
          id="home" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['home'] = el; }}
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="grid grid-cols-3 gap-4 dashboard-grid">
              {/* Left Column */}
              <div className="col-span-2 flex flex-col gap-4">
                {/* Greeting Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm dashboard-card" style={{ height: '180px' }}>
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1 pr-6">
                      <h1 className="text-[36px] font-bold text-[#1A1A1A] mb-2 leading-tight">Hello Grace!</h1>
                      <p className="text-base text-[#1A1A1A] mb-3 leading-relaxed">
                        You have 3 new tasks. It is a lot of work for today! So let&apos;s start!
                      </p>
                      <a 
                        href="#" 
                        className="text-[#5D5FEF] underline hover:text-[#4C4ED8] transition-colors text-base font-medium"
                      >
                        review it
                      </a>
                    </div>
                    {/* 3D Character Illustration */}
                    <div className="w-56 h-56 flex-shrink-0 greeting-illustration">
                      <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#5D5FEF" />
                            <stop offset="100%" stopColor="#4C4ED8" />
                          </linearGradient>
                          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FEE3CC" />
                            <stop offset="100%" stopColor="#FBD5B8" />
                          </linearGradient>
                          <filter id="shadow">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offsetblur" />
                            <feComponentTransfer>
                              <feFuncA type="linear" slope="0.3" />
                            </feComponentTransfer>
                            <feMerge>
                              <feMergeNode />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <rect x="50" y="280" width="300" height="20" fill="url(#deskGrad)" rx="4" filter="url(#shadow)" />
                        <rect x="80" y="250" width="60" height="80" fill="#5D5FEF" rx="8" filter="url(#shadow)" />
                        <rect x="75" y="320" width="70" height="8" fill="#4C4ED8" rx="4" />
                        <rect x="80" y="240" width="60" height="15" fill="#5D5FEF" rx="4" />
                        <circle cx="200" cy="140" r="35" fill="url(#skinGrad)" filter="url(#shadow)" />
                        <rect x="175" y="175" width="50" height="80" fill="#FFFFFF" rx="4" filter="url(#shadow)" />
                        <rect x="165" y="250" width="70" height="60" fill="#5D5FEF" rx="6" filter="url(#shadow)" />
                        <ellipse cx="200" cy="110" rx="40" ry="25" fill="#8B4513" filter="url(#shadow)" />
                        <rect x="170" y="120" width="60" height="15" fill="#654321" rx="2" />
                        <ellipse cx="200" cy="125" rx="35" ry="8" fill="#A0522D" />
                        <rect x="160" y="240" width="80" height="8" fill="#D1D5DB" rx="2" filter="url(#shadow)" />
                        <rect x="162" y="220" width="76" height="22" fill="#E5E7EB" rx="2" filter="url(#shadow)" />
                        <rect x="165" y="223" width="70" height="16" fill="#1A1A1A" rx="1" />
                        <rect x="168" y="226" width="64" height="10" fill="#3B82F6" opacity="0.3" />
                        <ellipse cx="195" cy="248" rx="8" ry="10" fill="url(#skinGrad)" />
                        <ellipse cx="240" cy="200" rx="8" ry="18" fill="url(#skinGrad)" />
                        <line x1="245" y1="185" x2="245" y2="205" stroke="#FBD5B8" strokeWidth="3" strokeLinecap="round" />
                        <line x1="250" y1="190" x2="250" y2="200" stroke="#FBD5B8" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="245" cy="183" r="2" fill="#FBD5B8" />
                        <circle cx="250" cy="188" r="2" fill="#FBD5B8" />
                        <rect x="313" y="275" width="14" height="20" fill="#8B4513" rx="2" />
                        <ellipse cx="320" cy="260" rx="18" ry="25" fill="#22C55E" filter="url(#shadow)" />
                        <ellipse cx="315" cy="265" rx="12" ry="18" fill="#16A34A" />
                        <ellipse cx="325" cy="265" rx="12" ry="18" fill="#16A34A" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Performance Section - Simplified as per image */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card">
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Performance</h2>
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setMonthOpen(!monthOpen)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#5D5FEF] transition-colors"
                      >
                        December
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {monthOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[120px] z-50 dropdown-menu">
                          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                            <button key={month} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setMonthOpen(false)}>
                              {month}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* The best lessons - Simplified layout */}
                  <div>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-5xl font-bold text-[#1A1A1A] mb-1 leading-none">95.4</div>
                        <div className="text-base text-[#1A1A1A]">Introduction to programming</div>
                      </div>
                      {/* Two progress indicators to the right */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="relative w-16 h-16 mb-1">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#E5E7EB"
                                strokeWidth="6"
                                fill="none"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#5D5FEF"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - 96 / 100)}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-semibold text-[#1A1A1A]">96%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="relative w-16 h-16 mb-1">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#E5E7EB"
                                strokeWidth="6"
                                fill="none"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#A5A6F6"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - 89 / 100)}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-semibold text-[#1A1A1A]">89%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        All lessons
                      </button>
                    </div>
                  </div>
                </div>

                {/* Linked Teachers Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-shrink-0" style={{ height: '160px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Linked Teachers</h2>
                    <a href="#" className="text-[#5D5FEF] text-sm font-medium hover:underline">
                      See all
                    </a>
                  </div>

                  <div className="space-y-3 h-full flex flex-col justify-between">
                    {/* Teacher Card 1 */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors teacher-card interactive-element">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1">Mary Johnson (mentor)</div>
                        <div className="text-sm text-[#6B7280]">Science</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-gray-600 hover:text-[#5D5FEF] transition-colors">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-[#5D5FEF] transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Calendar & Events */}
              <div className="flex flex-col gap-4">
                {/* Calendar Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card">
                  <div className="flex items-center justify-between mb-2 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Calendar</h2>
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
                            <div key={time} className="relative">
                              {/* Time marker */}
                              <div className="absolute -left-4 top-4">
                                <div className={`w-8 h-8 rounded-full ${event.active ? 'bg-white border-2 border-[#5D5FEF]' : 'bg-white border-2 border-gray-300'} flex items-center justify-center`}>
                                  <div className={`w-2 h-2 rounded-full ${event.active ? 'bg-[#5D5FEF]' : 'bg-gray-400'}`}></div>
                                </div>
                              </div>
                              {/* Event card */}
                              <div className={`${event.active ? 'bg-[#5D5FEF] text-white active' : 'bg-gray-50 text-[#1A1A1A] calendar-event'} rounded-xl p-4 shadow-sm ml-4 relative interactive-element`}>
                                <div className="flex items-start gap-3">
                                  <div className={`${event.active ? 'bg-white/20' : 'bg-gray-200'} rounded-full p-2 flex-shrink-0`}>
                                    <Home className={`w-4 h-4 ${event.active ? 'text-white' : 'text-gray-600'}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className={`font-semibold mb-1 text-sm ${event.active ? 'text-white' : 'text-[#1A1A1A]'}`}>
                                      {event.title}
                                    </div>
                                    <div className={`text-xs ${event.active ? 'text-white/80' : 'text-[#6B7280]'}`}>
                                      {event.displayTime}, {event.lesson}
                                    </div>
                                  </div>
                                </div>
                                {/* Vertical line extending from card (for active event) */}
                                {event.active && (
                                  <div className="absolute left-0 bottom-0 w-0.5 bg-[#5D5FEF] translate-y-full" style={{ height: '64px' }}></div>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={time} className="relative">
                            <div className="absolute -left-4 top-1">
                              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                            <div className="text-xs text-gray-400 ml-6 mb-4">{time}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Upcoming Events Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-shrink-0" style={{ height: '200px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Upcoming events</h2>
                    <a href="#" className="text-[#5D5FEF] text-sm font-medium hover:underline">
                      See all
                    </a>
                  </div>

                  <div className="space-y-3 h-full flex flex-col justify-between">
                    {/* Event Card 1 */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1 text-sm leading-snug">
                          The main event in your life &quot;Robot Fest&quot; will coming soon in...
                        </div>
                        <div className="text-xs text-[#6B7280]">14 December 2023 12.00 pm</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Event Card 2 */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1 text-sm">
                          Webinar of new tools in Minecraft
                        </div>
                        <div className="text-xs text-[#6B7280]">21 December 2023 11.00 pm</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PERFORMANCE */}
        <section 
          id="performance" 
          className="dashboard-section performance-section"
          ref={(el) => { sectionsRef.current['performance'] = el; }}
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4 h-full flex items-center">
            <div className="bg-white rounded-2xl p-6 shadow-sm dashboard-card w-full h-[calc(100vh-120px)] flex flex-col justify-center">
              {/* Subject-wise Performance */}
              <div className="w-full">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  📊 Subject Performance
                </h2>
                
                {/* Bar Chart */}
                <div className="h-[220px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Math', score: 92, color: '#6C5CE7' },
                        { name: 'Science', score: 88, color: '#0984E3' },
                        { name: 'English', score: 85, color: '#00B894' },
                        { name: 'History', score: 72, color: '#FDCB6E' },
                        { name: 'Computer', score: 95, color: '#E17055' },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#636E72', fontSize: 11, fontWeight: 500 }}
                        axisLine={{ stroke: '#DFE6E9' }}
                        tickLine={{ stroke: '#DFE6E9' }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        hide
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #DFE6E9', 
                          borderRadius: '8px',
                          fontSize: '14px',
                          padding: '8px 12px'
                        }}
                        formatter={(value: number) => `${value}%`}
                      />
                      <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                        {[
                          { name: 'Math', score: 92, color: '#6C5CE7' },
                          { name: 'Science', score: 88, color: '#0984E3' },
                          { name: 'English', score: 85, color: '#00B894' },
                          { name: 'History', score: 72, color: '#FDCB6E' },
                          { name: 'Computer', score: 95, color: '#E17055' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList 
                          dataKey="score" 
                          position="top" 
                          style={{ fill: '#2D3436', fontSize: '12px', fontWeight: '600' }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Remarks Section */}
                <div className="grid grid-cols-5 gap-3 mt-4">
                  <div className="flex flex-col items-center p-3 bg-[#6C5CE7]/5 rounded-lg border border-[#6C5CE7]/20">
                    <span className="text-sm font-semibold text-[#2D3436] mb-1">Math</span>
                    <span className="text-xs text-[#00B894] font-medium">Excellent</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#0984E3]/5 rounded-lg border border-[#0984E3]/20">
                    <span className="text-sm font-semibold text-[#2D3436] mb-1">Science</span>
                    <span className="text-xs text-[#00B894] font-medium">Good</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#00B894]/5 rounded-lg border border-[#00B894]/20">
                    <span className="text-sm font-semibold text-[#2D3436] mb-1">English</span>
                    <span className="text-xs text-[#00B894] font-medium">Good</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#FDCB6E]/5 rounded-lg border border-[#FDCB6E]/20">
                    <span className="text-sm font-semibold text-[#2D3436] mb-1">History</span>
                    <span className="text-xs text-[#E17055] font-medium">Needs Improvement</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#E17055]/5 rounded-lg border border-[#E17055]/20">
                    <span className="text-sm font-semibold text-[#2D3436] mb-1">Computer</span>
                    <span className="text-xs text-[#00B894] font-medium">Excellent</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: ATTENDANCE */}
        <section 
          id="attendance" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['attendance'] = el; }}
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm dashboard-card">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Student Attendance</h2>
              <p className="text-base text-[#6B7280]">Attendance timeline coming soon...</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: FEEDBACK */}
        <section 
          id="feedback" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['feedback'] = el; }}
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm dashboard-card">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Feedback</h2>
              <p className="text-base text-[#6B7280]">Feedback form coming soon...</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
