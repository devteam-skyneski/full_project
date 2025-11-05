'use client';

import React, { useState, useCallback, useEffect, memo } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Navbar from './navbar';
import ScrollAnimator from './components/ScrollAnimator';
import TeacherSection from './sections/TeacherSection';
import StudentSection from './sections/StudentSection';
import AnnouncementSection from './sections/AnnouncementSection';
import ParentSection from './sections/ParentSection';
import Lottie from 'lottie-react';
import adminAnimationData from './admin-animation.json';
import {
  Phone, Mail, Home, ChevronDown, MoreVertical, Users, Book, Bell, LogOut,
  BookOpen, FileText, ClipboardList, BarChart3, User,
  GraduationCap, Megaphone, ScrollText, CheckSquare, X
} from 'lucide-react';
import { Montserrat } from 'next/font/google';
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, LabelList,
} from 'recharts';

const montserrat = Montserrat({ subsets: ['latin'] });

const Dropdown = memo(({ options, onSelect }: { options: string[], onSelect: (option: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownVariants: Variants = {
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.div className="relative" animate>
      <motion.div
        className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1 cursor-pointer hover:bg-white/30 transition"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white text-sm">{selected}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-300" />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute top-full right-0 mt-1 w-32 bg-gray-900/70 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-10 overflow-hidden"
        variants={dropdownVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {options.map((option) => (
          <div
            key={option}
            className="px-3 py-2 text-sm text-gray-200 hover:bg-blue-600/50 cursor-pointer"
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
});


const DonutChart = memo(({ data, percentage }: { data: any; percentage: number }) => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <ResponsiveContainer width="100%" height={96}>
        <PieChart>
          <Pie
            data={[data, { name: 'remaining', value: 100 - data.value, fill: '#E5E7EB' }]}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={40}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            <Cell key={`cell-0`} fill={data.fill} />
            <Cell key={`cell-1`} fill="#9CA3AF" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg font-bold text-white"
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
});

const initialUpcomingTasks = [
  { id: 1, icon: '📅', title: "Approve 'Robot Fest' event budget.", date: 'Due: 15 December 2023', desc: "Approve and allocate funds for the Robot Fest event planned for next month." },
  { id: 2, icon: '📚', title: 'Review new curriculum proposals.', date: 'Due: 18 December 2023', desc: "Review the proposed curriculum changes and give feedback to the academic committee." },
  { id: 3, icon: '🎓', title: 'Plan graduation ceremony logistics.', date: 'Due: 20 December 2023', desc: "Coordinate vendors, seating, and invites for the upcoming graduation ceremony." },
  { id: 4, icon: '🧾', title: 'Verify staff reimbursement claims.', date: 'Due: 22 December 2023', desc: "Audit staff expense claims and prepare approvals for finance." },
  { id: 5, icon: '🏫', title: 'Inspect classroom renovations.', date: 'Due: 25 December 2023', desc: "Inspect renovated classrooms to ensure safety and completion before re-opening." },
];

const allClassesData = [
  { name: 'Comp. Sci', score: 82.1 }, { name: 'Humanities', score: 88.5 }, { name: 'Math', score: 79.0 },
  { name: 'Science', score: 85.3 }, { name: 'Arts', score: 90.2 }, { name: 'Business', score: 81.7 },
];
const class1Data = [
  { name: 'English', score: 88.0 }, { name: 'Math', score: 92.0 }, { name: 'Science', score: 85.0 },
  { name: 'History', score: 90.0 }, { name: 'Art', score: 95.0 },
];
const class2Data = [
  { name: 'English', score: 82.0 }, { name: 'Math', score: 88.0 }, { name: 'Science', score: 91.0 },
  { name: 'History', score: 85.0 }, { name: 'P.E.', score: 94.0 },
];
const class3Data = [
  { name: 'English', score: 90.0 }, { name: 'Math', score: 85.0 }, { name: 'Science', score: 88.0 },
  { name: 'Geography', score: 92.0 }, { name: 'Music', score: 91.0 },
];

const performanceDataMap: { [key: string]: typeof allClassesData } = {
  'All Classes': allClassesData, 'Class 1': class1Data, 'Class 2': class2Data, 'Class 3': class3Data,
  'Class 4': class3Data, 'Class 5': class1Data, 'Class 6': class2Data, 'Class 7': class3Data,
  'Class 8': class1Data, 'Class 9': class2Data, 'Class 10': class3Data,
};

const attendanceDataToday = [
  { name: 'Class 1', value: 95, fill: '#3B82F6' }, { name: 'Class 2', value: 92, fill: '#10B981' },
  { name: 'Class 3', value: 93, fill: '#F59E0B' }, { name: 'Class 4', value: 89, fill: '#EF4444' },
  { name: 'Class 5', value: 98, fill: '#6366F1' }, { name: 'Class 6', value: 99, fill: '#8B5CF6' },
  { name: 'Class 7', value: 91, fill: '#EC4899' }, { name: 'Class 8', value: 94, fill: '#06B6D4' },
  { name: 'Class 9', value: 88, fill: '#F97316' }, { name: 'Class 10', value: 96, fill: '#22C55E' },
];
const attendanceDataYesterday = [
  { name: 'Class 1', value: 92, fill: '#3B82F6' }, { name: 'Class 2', value: 94, fill: '#10B981' },
  { name: 'Class 3', value: 90, fill: '#F59E0B' }, { name: 'Class 4', value: 91, fill: '#EF4444' },
  { name: 'Class 5', value: 97, fill: '#6366F1' }, { name: 'Class 6', value: 98, fill: '#8B5CF6' },
  { name: 'Class 7', value: 93, fill: '#EC4899' }, { name: 'Class 8', value: 92, fill: '#06B6D4' },
  { name: 'Class 9', value: 89, fill: '#F97316' }, { name: 'Class 10', value: 95, fill: '#22C55E' },
];
const attendanceDataPastWeek = [
  { name: 'Class 1', value: 88, fill: '#3B82F6' }, { name: 'Class 2', value: 85, fill: '#10B981' },
  { name: 'Class 3', value: 90, fill: '#F59E0B' }, { name: 'Class 4', value: 82, fill: '#EF4444' },
  { name: 'Class 5', value: 91, fill: '#6366F1' }, { name: 'Class 6', value: 93, fill: '#8B5CF6' },
  { name: 'Class 7', value: 89, fill: '#EC4899' }, { name: 'Class 8', value: 90, fill: '#06B6D4' },
  { name: 'Class 9', value: 85, fill: '#F97316' }, { name: 'Class 10', value: 92, fill: '#22C55E' },
];
const attendanceDataMap = {
  'Today': attendanceDataToday,
  'Yesterday': attendanceDataYesterday,
  'Past Week': attendanceDataPastWeek,
};

const calendarEventsToday = [
  { title: 'All-Faculty Meeting', location: 'Auditorium', color: 'bg-blue-500' },
  { title: 'Board of Directors Call', location: 'Admin Office', color: 'bg-white/20' },
  { title: 'Budget Review: Q4', location: 'Conf. Room 3', color: 'bg-white/20' },
];
const calendarEventsYesterday = [
  { title: 'IT Dept. Sync', location: 'Room 102', color: 'bg-green-500' },
  { title: 'Parent-Teacher Mtg.', location: 'Gymnasium', color: 'bg-white/20' },
];
const calendarEventsPastWeek = [
  { title: 'All-Faculty Meeting', location: 'Auditorium', color: 'bg-blue-500' },
  { title: 'Board of Directors Call', location: 'Admin Office', color: 'bg-white/20' },
  { title: 'Budget Review: Q4', location: 'Conf. Room 3', color: 'bg-white/20' },
  { title: 'IT Dept. Sync', location: 'Room 102', color: 'bg-green-500' },
  { title: 'Parent-Teacher Mtg.', location: 'Gymnasium', color: 'bg-white/20' },
  { title: 'Science Fair Planning', location: 'Lab 3', color: 'bg-purple-500' },
];
const calendarDataMap = {
  'Today': calendarEventsToday,
  'Yesterday': calendarEventsYesterday,
  'Past Week': calendarEventsPastWeek,
};
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};
const columnLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const columnRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const columnMiddleVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
};
const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
};
const taskItemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
};

function TasksModal({
  tasks,
  onClose,
  onMarkDone,
}: {
  tasks: typeof initialUpcomingTasks,
  onClose: () => void,
  onMarkDone: (id: number) => void,
}) {
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => !selectedTask && onClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative w-full max-w-2xl bg-white/50 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/30">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">All Pending Tasks</h3>
              <p className="text-sm text-gray-700 mt-0.5">{tasks.length} tasks</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => onClose()}
              >
                Close
              </button>
              <X className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => onClose()} />
            </div>
          </div>

          <div className="h-80 overflow-y-auto px-4 py-4 space-y-3">
            <motion.div
              className="space-y-2"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {tasks.map((t, idx) => (
                <motion.div
                  key={t.id}
                  className="bg-white/30 rounded-lg p-3 flex items-start justify-between gap-3 shadow-sm"
                  variants={taskItemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="flex items-start gap-3 flex-1 cursor-pointer"
                    onClick={() => setSelectedTask(t)}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-xl flex-shrink-0">
                      {t.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm truncate">{t.title}</h4>
                      <p className="text-xs text-gray-700">{t.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onMarkDone(t.id)}
                      className="cursor-pointer"
                      title="Mark as done"
                    >
                      <CheckSquare className="w-6 h-6 text-green-600 hover:text-green-700 transition" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              {tasks.length === 0 && (
                <motion.div className="text-center text-sm text-gray-700 py-8">
                  No pending tasks. Nice work!
                </motion.div>
              )}
            </motion.div>
          </div>

          
          <AnimatePresence>
            {selectedTask && (
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-md p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{selectedTask.title}</h4>
                  <p className="text-sm text-gray-700 mb-4">{selectedTask.desc}</p>
                  <p className="text-xs text-gray-600">{selectedTask.date}</p>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
                    onClick={() => setSelectedTask(null)}
                  >
                    Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
                    onClick={() => {
                      onMarkDone(selectedTask.id);
                      setSelectedTask(null);
                    }}
                  >
                    Mark Done
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


export default function AdminDashboard() {

  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [performanceData, setPerformanceData] = useState(performanceDataMap['All Classes']);

  const handleClassChange = useCallback((option: string) => {
    setSelectedClass(option);
    setPerformanceData(performanceDataMap[option] || allClassesData);
  }, []);


  const [calendarPeriod, setCalendarPeriod] = useState('Today');
  const [currentCalendarEvents, setCurrentCalendarEvents] = useState(calendarDataMap['Today']);
  
  const handleCalendarChange = useCallback((option: string) => {
    setCalendarPeriod(option);
    setCurrentCalendarEvents(calendarDataMap[option as keyof typeof calendarDataMap] || calendarEventsToday);
  }, []);


  const [attendancePeriod, setAttendancePeriod] = useState('Today');
  const [currentAttendanceData, setCurrentAttendanceData] = useState(attendanceDataMap['Today']);

  const handleAttendanceChange = useCallback((option: string) => {
    setAttendancePeriod(option);
    setCurrentAttendanceData(attendanceDataMap[option as keyof typeof attendanceDataMap] || attendanceDataToday);
  }, []);


  const [tasks, setTasks] = useState(initialUpcomingTasks);
  const [showTasksModal, setShowTasksModal] = useState(false);

  const markTaskDone = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };


  const classOptions = ['All Classes', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const timeOptions = ['Today', 'Yesterday', 'Past Week'];

  return (
    <div className={`bg-gray-50 relative z-0 ${montserrat.className}`}>
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-900"></div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <Navbar />
      </motion.div>

      <div className="pt-20">
        <div className="p-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
          >
          
            <motion.div
              className="space-y-4 flex flex-col"
              variants={columnLeftVariants}
              style={{ perspective: 1000 }}
            >
              
              <motion.div
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20"
                whileHover={{ scale: 1.03, rotateY: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">Hey Admin!!</h2>
                    <p className="text-gray-200 mb-2 text-sm">
                      Key metrics for the institution.</p>
                      <p className="text-gray-200 mb-2 text-sm">
                      You have {tasks.length} pending tasks.
                    </p>
                    <motion.a
                      href="#teachers"
                      className="text-blue-300 hover:text-white font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Review Tasks
                    </motion.a>
                  </div>
                  
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    className="w-28 h-28 bg-white/20 rounded-lg flex items-center justify-center ml-2 overflow-hidden" // Added overflow-hidden
                  >
                    
                    <Lottie 
                      animationData={adminAnimationData} 
                      loop={true} 
                      className="w-full h-full scale-150" 
                    />
                  </motion.div>
                  

                </div>
              </motion.div>

              <motion.div
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateY: 10 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Student Performance</h3>
                  <div className="flex items-center gap-3">
                    <Dropdown options={classOptions} onSelect={handleClassChange} />
                  </div>
                </div>

                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%" key={selectedClass}>
                    <BarChart
                      data={performanceData}
                      layout="vertical"
                      barSize={16}
                      margin={{ left: 10, right: 30, top: 0, bottom: 0 }}
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={80}
                        fontSize={14}
                        tick={{ fill: '#E5E7EB' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#3B82F6"
                        radius={[0, 4, 4, 0]}
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        <LabelList
                          dataKey="score"
                          position="right"
                          style={{ fill: '#FFFFFF', fontSize: '11px', fontWeight: 'bold' }}
                        />
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#3B82F6" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-4 flex flex-col"
              variants={columnMiddleVariants}
              style={{ perspective: 1000 }}
            >

              <motion.div
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateX: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">School Attendance</h3>
                  <Dropdown options={timeOptions} onSelect={handleAttendanceChange} />
                </div>
                
                <div
                  key={attendancePeriod}
                  className="flex-1 grid grid-cols-2 grid-rows-5 gap-x-4"
                >
                  {currentAttendanceData.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 1.0, type: "spring", stiffness: 100 }}
                    >
                      <div className="w-24">
                        <DonutChart data={item} percentage={item.value} />
                      </div>
                      <motion.p
                        className="text-sm font-medium text-gray-200 leading-tight"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                      >
                        {item.name}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-4 flex flex-col"
              variants={columnRightVariants}
              style={{ perspective: 1000 }}
            >

              <motion.div
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateY: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">School Calendar</h3>
                    <p className="text-sm text-gray-200 mt-1">{currentCalendarEvents.length} major events</p>
                  </div>
                  <Dropdown options={timeOptions} onSelect={handleCalendarChange} />
                </div>
                <div className="relative mt-4 pl-6 flex-1">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/30"></div>
                  <motion.div
                    key={calendarPeriod}
                    className="space-y-3"
                    variants={listContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {currentCalendarEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 relative"
                        variants={listItemVariants}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div
                          className={`${event.color} ${event.title === 'All-Faculty Meeting' ? 'text-white' : 'text-white'} rounded-lg p-3 flex-1 shadow-sm`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {event.title === 'All-Faculty Meeting' ? (
                              <Users className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                            )}
                            <h4 className={`font-semibold text-sm ${event.title === 'All-Faculty Meeting' ? 'text-white' : 'text-white'}`}>
                              {event.title}
                            </h4>
                          </div>
                          <p className={`text-xs ${event.title === 'All-Faculty Meeting' ? 'text-white/90' : 'text-gray-200'}`}>
                            {event.location}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateY: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Pending Tasks</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-blue-300 hover:text-white font-medium"
                    onClick={() => setShowTasksModal(true)}
                  >
                    See All
                  </motion.button>
                </div>
                <motion.div
                  className="space-y-3 flex-1"
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {tasks.slice(0, 2).map((event, index) => (
                    <motion.div
                      key={event.id}
                      className="bg-white/20 rounded-lg p-3 flex items-start gap-3"
                      variants={taskItemVariants}
                      whileHover={{ scale: 1.03 }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-xl flex-shrink-0"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                      >
                        {event.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-200">{event.date}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        className="flex-shrink-0"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white transition" />
                      </motion.div>
                    </motion.div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="text-sm text-gray-300">No pending tasks. 🎉</div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
       {/* === START OF SCROLLING SECTIONS WITH PARALLAX ANIMATION === */}
       {/* === START OF SCROLLING SECTIONS === */}
{/* === START OF SCROLLING SECTIONS === */}
      {/* === START OF SCROLLING SECTIONS === */}
      
      {/* We apply z-10 to stay on top of particles.
        We apply min-h-screen to make sure the page has scroll-depth.
      */}

      <div className="relative z-10 min-h-screen w-full">
        <TeacherSection />
      </div>
      
      <div className="relative z-10 min-h-screen w-full">
        <StudentSection />
      </div>

      <div className="relative z-10 min-h-screen w-full">
        <AnnouncementSection />
      </div>

      <div className="relative z-10 min-h-screen w-full">
        <ParentSection />
      </div>
        
    {/* === END OF SCROLLING SECTIONS === */}
      </div>
        
        
        {/* === END OF SCROLLING SECTIONS === */}

      </div>

  );{/* Tasks Modal */}
      <AnimatePresence>
        {showTasksModal && (
          <TasksModal
            tasks={tasks}
            onClose={() => setShowTasksModal(false)}
            onMarkDone={(id) => {
              markTaskDone(id);
            }}
          />
        )}
      </AnimatePresence>
    
  
}