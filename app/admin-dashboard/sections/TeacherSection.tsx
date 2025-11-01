"use client";
import { cn } from "@/lib/utils";
import {
  IconUserCheck,
  IconUserPlus,
  IconFileText,
  IconClock,
  IconCheck,
  IconX,
  IconBell,
} from "@tabler/icons-react";
import { useState } from "react";

const TeacherCard = ({
  name,
  subject,
  email,
  requests,
  onClick,
}: {
  name: string;
  subject: string;
  email: string;
  requests: number;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-blue-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{subject}</p>
          </div>
        </div>
        {requests > 0 && (
          <div className="relative">
            <IconBell className="w-6 h-6 text-orange-500" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
              {requests}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <IconUserCheck className="w-4 h-4" />
        <span>{email}</span>
      </div>
    </div>
  );
};

const RequestCard = ({
  request,
  onApprove,
  onReject,
}: {
  request: {
    id: string;
    teacher: string;
    subject: string;
    title: string;
    date: string;
    status: "pending" | "approved" | "rejected";
  };
  onApprove: () => void;
  onReject: () => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <IconFileText className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-800">{request.title}</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">{request.teacher}</p>
          <p className="text-xs text-gray-500">{request.subject}</p>
          <div className="flex items-center gap-2 mt-2">
            <IconClock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{request.date}</span>
          </div>
        </div>
        {request.status === "pending" && (
          <div className="flex items-center gap-2">
            <button
              onClick={onApprove}
              className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            >
              <IconCheck className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onReject}
              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <IconX className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
        {request.status === "approved" && (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <IconCheck className="w-4 h-4" />
            Approved
          </span>
        )}
        {request.status === "rejected" && (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <IconX className="w-4 h-4" />
            Rejected
          </span>
        )}
      </div>
    </div>
  );
};

export default function TeacherSection() {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [requests, setRequests] = useState([
    {
      id: "1",
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      title: "Upload: Calculus Chapter 3 Notes",
      date: "Dec 15, 2023",
      status: "pending" as const,
    },
    {
      id: "2",
      teacher: "Prof. Michael Brown",
      subject: "Computer Science",
      title: "Upload: Data Structures Lab Materials",
      date: "Dec 14, 2023",
      status: "pending" as const,
    },
    {
      id: "3",
      teacher: "Dr. Emily Davis",
      subject: "Physics",
      title: "Upload: Quantum Mechanics Lecture Notes",
      date: "Dec 13, 2023",
      status: "approved" as const,
    },
    {
      id: "4",
      teacher: "Mr. James Wilson",
      subject: "Chemistry",
      title: "Upload: Organic Chemistry Slides",
      date: "Dec 12, 2023",
      status: "rejected" as const,
    },
  ]);

  const teachers = [
    {
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      email: "sarah.j@university.edu",
      requests: 1,
    },
    {
      name: "Prof. Michael Brown",
      subject: "Computer Science",
      email: "michael.b@university.edu",
      requests: 1,
    },
    {
      name: "Dr. Emily Davis",
      subject: "Physics",
      email: "emily.d@university.edu",
      requests: 0,
    },
    {
      name: "Mr. James Wilson",
      subject: "Chemistry",
      email: "james.w@university.edu",
      requests: 0,
    },
    {
      name: "Dr. Lisa Anderson",
      subject: "Biology",
      email: "lisa.a@university.edu",
      requests: 0,
    },
    {
      name: "Prof. David Martinez",
      subject: "History",
      email: "david.m@university.edu",
      requests: 0,
    },
  ];

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const totalRequests = requests.length;

  return (
    <section id="teachers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Teacher Management
            </h2>
            <p className="text-gray-600 mt-2">
              Manage teachers and review note upload requests
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <IconBell className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-600">Pending Requests</p>
                  <p className="text-xl font-bold text-gray-800">
                    {pendingRequests.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <IconUserCheck className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-600">Total Teachers</p>
                  <p className="text-xl font-bold text-gray-800">
                    {teachers.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <IconClock className="w-6 h-6 text-orange-500" />
              Pending Permission Requests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={() => handleApprove(request.id)}
                  onReject={() => handleReject(request.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Requests Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            All Upload Requests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onApprove={() => handleApprove(request.id)}
                onReject={() => handleReject(request.id)}
              />
            ))}
          </div>
        </div>

        {/* Teachers List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <IconUserPlus className="w-6 h-6 text-blue-500" />
            All Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher, index) => (
              <TeacherCard
                key={index}
                name={teacher.name}
                subject={teacher.subject}
                email={teacher.email}
                requests={teacher.requests}
                onClick={() => setSelectedTeacher(teacher.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

