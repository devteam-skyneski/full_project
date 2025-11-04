"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";

// Recent Tasks Data (identical to Student Dashboard)
const recentTasks = [
  {
    id: 1,
    title: "Complete English Essay Assignment",
    subject: "English",
    dueDate: "Dec 15, 2024",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "Solve Mathematics Problem Set 5",
    subject: "Mathematics",
    dueDate: "Dec 18, 2024",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Dec 20, 2024",
    status: "pending",
    priority: "low",
  },
  {
    id: 4,
    title: "Chemistry Quiz Preparation",
    subject: "Chemistry",
    dueDate: "Dec 16, 2024",
    status: "completed",
    priority: "high",
  },
];

// Recent Practice Data (identical to Student Dashboard)
const recentPractice = [
  {
    subject: "Mathematics",
    covered: 20,
    total: 90,
    icon: "🔢",
  },
  {
    subject: "Physics",
    covered: 35,
    total: 120,
    icon: "⚛️",
  },
  {
    subject: "Chemistry",
    covered: 18,
    total: 85,
    icon: "🧪",
  },
  {
    subject: "Biology",
    covered: 42,
    total: 100,
    icon: "🧬",
  },
];

export default function TaskSection() {
  return (
    <div className="section-inner">
      {/* Recent Tasks and Recent Practice Section (copied exactly) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full">
        {/* Recently Completed Tasks - Left Side */}
        <motion.div 
          className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-col min-h-0 overflow-y-auto h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Recently Completed Tasks
          </h3>

          <div className="space-y-2">
            {recentTasks.filter(t => t.status === "completed").map((task, idx) => (
              <motion.div
                key={task.id}
                className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="mt-0.5 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="font-semibold text-gray-800 text-xs">{task.title}</h4>
                    <span className={`text-[10px] px-1 py-0.5 rounded-full ${
                      task.priority === "high" ? "bg-red-100 text-red-700" :
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 mb-0.5">{task.subject}</p>
                  <p className="text-[10px] text-gray-500">Due: {task.dueDate}</p>
                  {/* no CTA for completed */}
                </div>
                
                <div className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">Done</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pending Tasks - Right Side */}
        <motion.div 
          className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-col min-h-0 overflow-y-auto h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Pending Tasks
          </h3>

          <div className="space-y-2 flex-1">
            {recentTasks.filter(t => t.status === "pending").map((task, idx) => (
              <motion.div
                key={task.id}
                className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="mt-0.5 text-gray-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="font-semibold text-gray-800 text-xs">{task.title}</h4>
                    <span className={`text-[10px] px-1 py-0.5 rounded-full ${
                      task.priority === "high" ? "bg-red-100 text-red-700" :
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 mb-0.5">{task.subject}</p>
                  <p className="text-[10px] text-gray-500">Due: {task.dueDate}</p>
                </div>
                <div className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">Pending</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
