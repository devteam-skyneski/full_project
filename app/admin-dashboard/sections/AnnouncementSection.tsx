"use client";
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const AnnouncementCard = ({
  announcement,
  onEdit,
  onDelete,
}: {
  announcement: {
    id: string;
    title: string;
    message: string;
    date: string;
    priority: "low" | "medium" | "high";
    category: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const priorityColors = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };

  const priorityIcons = {
    low: Info,
    medium: AlertCircle,
    high: CheckCircle,
  };

  const Icon = priorityIcons[announcement.priority];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${priorityColors[announcement.priority]}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{announcement.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[announcement.priority]}`}
              >
                {announcement.priority.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {announcement.category}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{announcement.message}</p>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>{announcement.date}</span>
      </div>
    </div>
  );
};

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "End of Semester Exams Schedule",
      message:
        "Dear students, please note that the end of semester exams will begin on January 15th, 2024. Make sure to check the timetable on the portal and prepare accordingly.",
      date: "Dec 15, 2023",
      priority: "high" as const,
      category: "Academics",
    },
    {
      id: "2",
      title: "Library Hours Extended",
      message:
        "The library will have extended hours during exam week. New hours: Monday-Friday 7 AM - 10 PM, Saturday-Sunday 9 AM - 8 PM.",
      date: "Dec 14, 2023",
      priority: "medium" as const,
      category: "Facilities",
    },
    {
      id: "3",
      title: "Student Portal Maintenance",
      message:
        "Scheduled maintenance will be performed on the student portal this Sunday from 2 AM to 6 AM EST. Some services may be temporarily unavailable.",
      date: "Dec 13, 2023",
      priority: "low" as const,
      category: "System",
    },
    {
      id: "4",
      title: "Holiday Break Notice",
      message:
        "The campus will be closed from December 23rd to January 2nd for the holiday season. Classes will resume on January 3rd, 2024.",
      date: "Dec 12, 2023",
      priority: "medium" as const,
      category: "Campus",
    },
    {
      id: "5",
      title: "Scholarship Applications Open",
      message:
        "The new scholarship application cycle is now open. Students with GPA above 3.5 are encouraged to apply before January 31st, 2024.",
      date: "Dec 11, 2023",
      priority: "high" as const,
      category: "Financial Aid",
    },
    {
      id: "6",
      title: "Sports Day Registration",
      message:
        "Registration for the annual Sports Day is now open. Students can register for multiple events at the Student Activities Office.",
      date: "Dec 10, 2023",
      priority: "low" as const,
      category: "Events",
    },
  ]);

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  const handleEdit = (id: string) => {
    // In a real app, this would open an edit modal
    console.log("Edit announcement:", id);
  };

  const handleAdd = () => {
    // In a real app, this would open an add modal
    console.log("Add new announcement");
  };

  return (
    <section id="announcements" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Announcements
            </h2>
            <p className="text-gray-600 mt-2">
              Manage and broadcast important messages to the community
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">New Announcement</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={() => handleEdit(announcement.id)}
              onDelete={() => handleDelete(announcement.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}