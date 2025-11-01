'use client';

import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Phone, 
  MoreVertical,
  Mail,
  Home,
} from 'lucide-react';
import Lottie from 'lottie-react';
import parentAnimation from '../../login(animations)/Parenting.json';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from 'recharts';
import './dashboard.css';
import ParentNavbar from './navbar';
import Assignments from './sections/Assignments';
import Attendance from './sections/Attendance';
import Exams from './sections/Exams';
import Results from './sections/Results';

export default function ParentDashboard() {
  const [monthOpen, setMonthOpen] = useState(false);
  const [todayOpen, setTodayOpen] = useState(false);

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
  const calendarEvents = [
    { time: '10:00', displayTime: '9.45-10.30', endTime: '10:30', title: 'Electronics lesson', lesson: '21 lesson', active: true },
    { time: '11:00', displayTime: '11.00-11.40', endTime: '11:40', title: 'Electronics lesson', lesson: '23 lesson', active: false },
    { time: '12:00', displayTime: '12.00-12.45', endTime: '12:45', title: 'Robotics lesson', lesson: '23 lesson', active: false },
    { time: '13:30', displayTime: '13.45-14.30', endTime: '14:30', title: 'C++ lesson', lesson: '21 lesson', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] parent-dashboard">
      {/* Navbar */}
      <ParentNavbar />

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-6 py-4 mt-20">
        <div className="grid grid-cols-3 gap-4 dashboard-grid">
          {/* Left Column */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Greeting Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm dashboard-card" style={{ height: '180px' }}>
              <div className="flex items-start justify-between h-full">
                <div className="flex-1 pr-6">
                  <h1 className="text-[36px] font-bold text-[#1A1A1A] mb-2 leading-tight">Hello Parent!</h1>
                  <p className="text-base text-[#1A1A1A] mb-3 leading-relaxed">
                    Your have 3 new updates. Stay informed about your child progress and activities!
                  </p>
                  <a 
                    href="#" 
                    className="text-[#5D5FEF] underline hover:text-[#4C4ED8] transition-colors text-base font-medium"
                  >
              
                  </a>
                </div>
                {/* Lottie Parent Animation */}
                <div className="w-56 h-56 flex-shrink-0 greeting-illustration flex items-center justify-center">
                  <Lottie
                    animationData={parentAnimation}
                    loop={true}
                    className="w-full h-full"
                  />
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

              {/* Performance Score */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="text-5xl font-bold text-[#1A1A1A] mb-1 leading-none">95.4</div>
                  <div className="text-base text-[#1A1A1A]">Introduction to programming.</div>
                </div>
                <button className="px-4 py-2 bg-[#5D5FEF] text-white rounded-lg text-sm font-medium hover:bg-[#4C4ED8] transition-colors">
                  All lessons
                </button>
              </div>

              {/* Horizontal Bar Chart */}
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={performanceData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#1A1A1A' }}
                      axisLine={false}
                      tickLine={false}
                      width={140}
                    />
                    <Bar
                      dataKey="score"
                      radius={[0, 8, 8, 0]}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#5D5FEF" />
                      ))}
                      <LabelList
                        dataKey="score"
                        position="right"
                        style={{ fill: '#1A1A1A', fontSize: '12px', fontWeight: '500' }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
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
      </main>

      {/* Sections */}
      <Assignments />
      <Attendance />
      <Exams />
      <Results />
    </div>
  );
}
