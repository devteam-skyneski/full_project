'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Calendar, Clock, Users, FileText, CheckCircle, AlertCircle, TrendingUp, BookOpen, Bell, ArrowRight, User, MessageSquare, Award } from 'lucide-react';
import Link from 'next/link';
import Navbar from './navbar';
import teacherDashboardAnimation from '../../login(animations)/TeacherDashboard.json';

export default function TeacherDashboard() {
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Wednesday'>('Today');
  const [isLoaded, setIsLoaded] = useState(true);

  const teacherData = {
    name: 'Grace',
    pendingTasks: 3,
    scheduleByDay: {
      'Today': [
        {
          id: 1,
          subject: 'Chemistry',
          time: '8:40 - 9:15',
          students: 21,
          type: 'Notes'
        },
        {
          id: 2,
          subject: 'Physics',
          time: '11:00 - 11:35',
          students: 23,
          type: 'Assignment'
        }
      ],
      'Tomorrow': [
        {
          id: 3,
          subject: 'Biology',
          time: '9:00 - 9:30',
          students: 23,
          type: 'Notes'
        },
        {
          id: 4,
          subject: 'Mathematics',
          time: '13:45 - 14:30',
          students: 21,
          type: 'Notes'
        }
      ],
      'Wednesday': [
        {
          id: 5,
          subject: 'EVS',
          time: '10:00 - 10:30',
          students: 25,
          type: 'Assignment'
        },
        {
          id: 6,
          subject: 'Data Structures Lab',
          time: '14:00 - 15:30',
          students: 20,
          type: 'practical'
        }
      ]
    },
    allClasses: [
      {
        id: 1,
        subject: 'Algorithms & Data Structures',
        time: '8:40 - 10:30',
        students: 21,
        day: 'Monday, Wednesday, Friday'
      },
      {
        id: 2,
        subject: 'Database Management',
        time: '11:00 - 11:45',
        students: 23,
        day: 'Tuesday, Thursday'
      },
      {
        id: 3,
        subject: 'Web Development',
        time: '12:00 - 12:45',
        students: 23,
        day: 'Monday, Wednesday'
      },
      {
        id: 4,
        subject: 'Machine Learning Basics',
        time: '13:45 - 14:30',
        students: 21,
        day: 'Tuesday, Friday'
      },
      {
        id: 5,
        subject: 'Object-Oriented Programming',
        time: '10:00 - 11:30',
        students: 25,
        day: 'Wednesday, Thursday'
      },
      {
        id: 6,
        subject: 'Genral Knowledge',
        time: '14:00 - 14:30',
        students: 20,
        day: 'Friday'
      }
    ],
    classPerformance: [
      { subject: 'Physics', score: 85.3 },
      { subject: 'Chemistry', score: 64.7 },
      { subject: 'Biology', score: 84.2 },
      { subject: 'English', score: 45.6 },
      { subject: 'EVS', score: 43.5 },
      { subject: 'Mathematics', score: 74.4 }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'Assignment submission',
        title: 'Student submitted assignment',
        description: 'IN001 Kumar submitted "Quadratic Equations"',
        time: '2 hours ago',
        icon: 'FileText',
        color: 'bg-blue-100'
      },
      {
        id: 2,
        type: 'Notes',
        title: 'Mathematics Notes ',
        description: 'Mathematics notes uploaded',
        time: '4 hours ago',
        icon: 'MessageSquare',
        color: 'bg-purple-100'
      },
      {
        id: 3,
        type: 'Assignment submission ',
        title: ' IN002 Assignment submitted',
        description: '90% of students passed recent test',
        time: 'recently',
        icon: 'Award',
        color: 'bg-green-100'
      },
      {
        id: 4,
        type: 'Student',
        title: 'New student enrolled',
        description: 'RAMU joined Mathematics Class',
        time: '1 days ago',
        icon: 'User',
        color: 'bg-orange-100'
      }
    ],
    pendingApprovals: {
      notes: 5,
      assignments: 8,
      PendingRequests: 2
    },
    announcements: [
      {
        id: 1,
        title: 'Assesment Schedule Released',
        date: '14 December 2025',
        time: '12:00 pm',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Submmission date of assignment',
        date: '18 December 2025',
        time: '09:00 am',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Grading of the assements',
        date: '21 December 2025',
        time: '11:00 am',
        priority: 'high'
      }
    ],
    courses: [
      {
        id: 'math',
        name: 'Mathematics',
        class: 'Class 10th',
        students: 28,
        assignments: 12,
        progress: 68,
        color: 'blue'
      },
      {
        id: 'physics',
        name: 'Physics',
        class: 'Class 7th',
        students: 25,
        assignments: 12,
        progress: 68,
        color: 'purple'
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        class: 'Class 11th',
        students: 30,
        assignments: 12,
        progress: 68,
        color: 'green'
      }
    ]
  };

  type DayKey = 'Today' | 'Tomorrow' | 'Wednesday';
  const currentClasses = teacherData.scheduleByDay[selectedDay as DayKey] || [];

  // Helper function to get icon component
  const getActivityIcon = (iconName: string) => {
    switch(iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'User':
        return <User className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content with top padding to account for fixed navbar */}
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="p-6">
          <div className="max-w-9x1 mx-auto">
            {/* Welcome Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-1">
              {/* Welcome Card with GIF */}
              <motion.div 
                className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-jetblack-900 mb-2 mt-9">
                      Hello {teacherData.name}!
                    </h1>
                    <p className="text-jetblack-600 mb-4">
                      You have <span className="font-semibold">{teacherData.pendingTasks} new tasks</span>. It is a lot of work for today! So let's start!
                    </p>
                  </div>
                  
                  {/* Lottie Animation */}
                  <div className="hidden md:block">
                    <div className="w-48 h-48 relative rounded-lg overflow-hidden flex items-center justify-center">
                      <motion.div
                        className="relative w-full h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Lottie
                          animationData={teacherDashboardAnimation}
                          loop={true}
                          autoplay={true}
                          className="w-full h-full"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Today's Schedule Card with Day Selector - WITH SLIDE FROM RIGHT ANIMATION */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Classes</h2>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value as 'Today' | 'Tomorrow' | 'Wednesday')}
                    className="text-sm text-blue-600 bg-transparent border-none cursor-pointer font-medium focus:outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Wednesday">Wednesday</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {currentClasses.length > 0 ? (
                    currentClasses.map((cls, index) => (
                      <motion.div
                        key={cls.id}
                        className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <h3 className="font-semibold mb-2">{cls.subject}</h3>
                        <div className="flex items-center text-sm text-blue-100">
                          <Clock className="w-4 h-4 mr-1" />
                          {cls.time}, {cls.students} students
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No classes scheduled
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Performance & Progress */}
              <div className="lg:col-span-2 space-y-6">
                {/* Class Performance with Bar Graph */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 cursor-pointer relative overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 pointer-events-none z-0"
                    whileHover={{
                      background: "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Class Performance</h2>
                      <p className="text-sm text-jetblack-500">Best performing class:</p>
                      <div className="flex items-baseline mt-1">
                        <span className="text-4xl font-bold text-gray-900">
                          {Math.max(...teacherData.classPerformance.map(c => c.score)).toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">in Algorithms</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                      All classes
                    </button>
                  </div>

                  {/* Bar Graph */}
                  <div className="relative mt-8 z-10">
                    <div className="flex items-end justify-between h-64 gap-4 px-2">
                      {teacherData.classPerformance.map((cls, index) => (
                        <motion.div
                          key={index}
                          className="flex-1 flex flex-col items-center group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          {/* Bar container with explicit height */}
                          <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-end relative overflow-hidden">
                            <motion.div
                              className="w-full bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-lg cursor-pointer relative shadow-lg hover:shadow-xl group/bar"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: `${cls.score}%`,
                                opacity: 1
                              }}
                              transition={{
                                duration: 0.8,
                                delay: index * 0.1 + 0.2,
                                ease: [0.34, 1.56, 0.64, 1]
                              }}
                              whileHover={{
                                scaleY: 1.05,
                                transition: { duration: 0.2 }
                              }}
                              style={{ 
                                minHeight: '20px',
                                transformOrigin: 'bottom'
                              }}
                            >
                              {/* Animated score display */}
                              <motion.div
                                className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 whitespace-nowrap z-10"
                                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.1 + 0.6,
                                  ease: "easeOut"
                                }}
                              >
                                {cls.score}
                              </motion.div>
                              
                              {/* Shine effect on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                              
                              {/* Top glow effect */}
                              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg" />
                            </motion.div>
                          </div>
                          
                          {/* Animated subject name */}
                          <motion.p
                            className="text-xs text-gray-600 mt-3 text-center leading-tight h-10 flex items-center px-1 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + 0.8
                            }}
                            whileHover={{ 
                              color: '#3b82f6',
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {cls.subject}
                          </motion.p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Animated Y-axis reference line */}
                    <motion.div
                      className="absolute left-0 right-0 bottom-12 border-t border-gray-300"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </motion.div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Approvals</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="w-6 h-6 text-orange-600" />
                        <span className="text-2xl font-bold text-orange-600">
                          {teacherData.pendingApprovals.notes}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">Notes to Review</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">
                          {teacherData.pendingApprovals.assignments}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">Assignments</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <AlertCircle className="w-6 h-6 text-purple-600" />
                        <span className="text-2xl font-bold text-purple-600">
                          {teacherData.pendingApprovals.PendingRequests}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">Leave Requests</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {teacherData.recentActivities.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-lg border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group"
                      >
                        {/* Icon Circle */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color} group-hover:scale-110 transition-transform`}>
                          <div className="text-gray-700">
                            {getActivityIcon(activity.icon)}
                          </div>
                        </div>

                        {/* Activity Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {activity.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {activity.time}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0">
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Schedule & Announcements */}
              <div className="space-y-6">
                {/* Full Schedule with View More - WITH SLIDE FROM RIGHT ANIMATION */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Full Schedule</h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {teacherData.allClasses.slice(0, 4).map((cls, index) => (
                      <motion.div
                        key={cls.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.2 + (index * 0.1),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">{cls.subject}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="w-4 h-4 mr-2" />
                          {cls.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {cls.students} students • {cls.day}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* View More Button */}
                  <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    View More Classes
                  </button>
                </motion.div>

                {/* Announcements */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      See all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {teacherData.announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${
                          announcement.priority === 'high' 
                            ? 'bg-red-100' 
                            : 'bg-blue-100'
                        }`}>
                          <Bell className={`w-6 h-6 ${
                            announcement.priority === 'high' 
                              ? 'text-red-600' 
                              : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 leading-tight">
                            {announcement.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {announcement.date} {announcement.time}
                          </div>
                          {announcement.priority === 'high' && (
                            <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                              Important
                            </span>
                          )}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <span className="text-xl">⋮</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Total Classes</span>
                      <span className="font-bold text-gray-900">6</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-700">Avg. Attendance</span>
                      <span className="font-bold text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-700">Assignment Rate</span>
                      <span className="font-bold text-gray-900">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Your Courses Section - keeping original code */}
            {/* ... rest of courses section remains the same ... */}
          </div>
        </div>
      </div>
    </>
  );
}
