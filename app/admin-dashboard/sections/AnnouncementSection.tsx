"use client";
import {
  Megaphone,
  Send,
  Users,
  User,
  UserCheck,
  Loader2,
  CheckCircle,
  Info,
  Plus,
  X,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Audience = "All" | "Students" | "Teachers" | "Parents";

const tabDetails = {
  All: { icon: Users, color: "text-blue-300", border: "border-blue-300" },
  Students: {
    icon: User,
    color: "text-green-300",
    border: "border-green-300",
  },
  Teachers: {
    icon: UserCheck,
    color: "text-purple-300",
    border: "border-purple-300",
  },
  Parents: {
    icon: Users,
    color: "text-orange-300",
    border: "border-orange-300",
  },
};

interface Announcement {
  id: string;
  title: string;
  message: string;
  targetAudience: Audience;
  date: string;
}

export default function AnnouncementSection() {
  const [activeTab, setActiveTab] = useState<Audience>("All");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "End of Semester Exams",
      message: "Semester exams will begin on January 15th. Please check the timetable.",
      targetAudience: "All",
      date: "Dec 15, 2023",
    },
    {
      id: "2",
      title: "Library Hours Extended",
      message: "Library extended hours during exam week. 7 AM - 10 PM.",
      targetAudience: "Students",
      date: "Dec 14, 2023",
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      message: "Monthly parent-teacher meeting scheduled for December 20th.",
      targetAudience: "Parents",
      date: "Dec 13, 2023",
    },
    {
      id: "4",
      title: "Staff Development Workshop",
      message: "All teachers required to attend workshop on December 18th.",
      targetAudience: "Teachers",
      date: "Dec 12, 2023",
    },
  ]);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please fill in both title and message.");
      return;
    }

    setStatus("sending");

    const newAnnouncement: Announcement = {
      id: crypto.randomUUID(),
      title,
      message,
      targetAudience: activeTab,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    // In real app, send to database via API
    setTimeout(() => {
      setAnnouncements([newAnnouncement, ...announcements]);
      setStatus("sent");
      setTitle("");
      setMessage("");
      setShowFormModal(false);

      setTimeout(() => setStatus("idle"), 2000);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const tabs: Audience[] = ["All", "Students", "Teachers", "Parents"];

  const filteredAnnouncements = activeTab === "All"
    ? announcements
    : announcements.filter((a) => a.targetAudience === activeTab);

  return (
    <>
      
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full"
              onClick={() => setShowFormModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden z-[100] relative"
            >
              <div className="p-6 text-white border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">New Announcement</h3>
                  <button
                    onClick={() => setShowFormModal(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                
                <div className="mb-6">
                  <div className="flex border-b border-white/20">
                    {tabs.map((tab) => {
                      const { icon: Icon, color, border } = tabDetails[tab];
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`flex items-center gap-2 py-2 px-4 font-semibold text-sm transition-all duration-300 -mb-px ${
                            isActive
                              ? `${color} border-b-2 ${border}`
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? color : "text-gray-400"
                            }`}
                          />
                          <span>{tab}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Announcement Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., End of Semester Exams"
                      className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Write your announcement for ${activeTab}...`}
                      className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-300">
                    Sending to:{" "}
                    <span
                      className={`font-bold ${tabDetails[activeTab].color}`}
                    >
                      {activeTab}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <AnimatePresence mode="wait">
                      {status === "sent" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-green-400"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Sent!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold transition-all ${
                        status === "sending"
                          ? "bg-gray-400 cursor-not-allowed"
                          : `bg-blue-600 hover:bg-blue-700`
                      }`}
                    >
                      {status === "sending" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      <span>
                        {status === "sending"
                          ? "Sending..."
                          : `Send to ${activeTab}`}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      
      <section id="announcements" className="py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Announcements
                </h2>
              </div>
              <button
                onClick={() => setShowFormModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-semibold hidden sm:inline">
                  New Announcement
                </span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-300">
              Manage and broadcast important messages to the community
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const { icon: Icon, color, border } = tabDetails[tab];
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 py-2 px-4 font-semibold text-xs sm:text-sm transition-all duration-300 rounded-lg ${
                    isActive
                      ? `bg-blue-500/30 ${color} border-2 ${border}`
                      : "text-gray-200 bg-white/20 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredAnnouncements.map((announcement) => {
              const { icon: Icon, color } = tabDetails[announcement.targetAudience];
              return (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-4 sm:p-6 relative group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color.replace('text-', 'bg-').replace('-300', '-500').replace('-600', '-500')}/30`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm sm:text-base">
                          {announcement.title}
                        </h3>
                        <span className={`text-xs ${color} font-semibold`}>
                          {announcement.targetAudience}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {announcement.message}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{announcement.date}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">
                No announcements for {activeTab} yet.
              </p>
              <button
                onClick={() => setShowFormModal(true)}
                className="mt-4 text-blue-400 hover:text-white hover:underline"
              >
                Create one now
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}