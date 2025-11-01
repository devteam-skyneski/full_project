"use client";
import {
  User,
  Users,
  GraduationCap,
  Mail,
  Phone,
  ArrowRight,
  School,
} from "lucide-react";
import Link from "next/link";

const StudentCard = ({
  name,
  id,
  grade,
  department,
  email,
  phone,
  parentName,
}: {
  name: string;
  id: string;
  grade: string;
  department: string;
  email: string;
  phone: string;
  parentName: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">ID: {id}</p>
          </div>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
          {grade}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <School className="w-4 h-4" />
          <span>{department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{parentName}</span>
        </div>
      </div>

      <Link
        href={`#parents?student=${encodeURIComponent(name)}&parent=${encodeURIComponent(parentName)}`}
        className="flex items-center justify-center gap-2 w-full py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors group-hover:bg-blue-100"
      >
        <span className="text-sm font-semibold">View Parent Details</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default function StudentSection() {
  const students = [
    {
      name: "Alexandra Smith",
      id: "STU001",
      grade: "Grade 12",
      department: "Computer Science",
      email: "alex.smith@student.edu",
      phone: "+1 (555) 123-4567",
      parentName: "John & Mary Smith",
    },
    {
      name: "Michael Chen",
      id: "STU002",
      grade: "Grade 11",
      department: "Mathematics",
      email: "michael.chen@student.edu",
      phone: "+1 (555) 234-5678",
      parentName: "David & Lisa Chen",
    },
    {
      name: "Emily Rodriguez",
      id: "STU003",
      grade: "Grade 12",
      department: "Biology",
      email: "emily.r@student.edu",
      phone: "+1 (555) 345-6789",
      parentName: "Carlos & Maria Rodriguez",
    },
    {
      name: "James Wilson",
      id: "STU004",
      grade: "Grade 10",
      department: "Physics",
      email: "james.w@student.edu",
      phone: "+1 (555) 456-7890",
      parentName: "Robert & Jennifer Wilson",
    },
    {
      name: "Sophia Martinez",
      id: "STU005",
      grade: "Grade 11",
      department: "Chemistry",
      email: "sophia.m@student.edu",
      phone: "+1 (555) 567-8901",
      parentName: "Miguel & Ana Martinez",
    },
    {
      name: "Daniel Kim",
      id: "STU006",
      grade: "Grade 12",
      department: "Computer Science",
      email: "daniel.kim@student.edu",
      phone: "+1 (555) 678-9012",
      parentName: "Kevin & Susan Kim",
    },
    {
      name: "Isabella Thompson",
      id: "STU007",
      grade: "Grade 10",
      department: "Arts & Design",
      email: "isabella.t@student.edu",
      phone: "+1 (555) 789-0123",
      parentName: "William & Karen Thompson",
    },
    {
      name: "Ethan Brown",
      id: "STU008",
      grade: "Grade 11",
      department: "History",
      email: "ethan.b@student.edu",
      phone: "+1 (555) 890-1234",
      parentName: "Matthew & Patricia Brown",
    },
    {
      name: "Olivia Johnson",
      id: "STU009",
      grade: "Grade 12",
      department: "Literature",
      email: "olivia.j@student.edu",
      phone: "+1 (555) 901-2345",
      parentName: "Richard & Linda Johnson",
    },
  ];

  const totalStudents = students.length;
  const byDepartment = students.reduce((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section id="students" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Student Management
            </h2>
            <p className="text-gray-600 mt-2">
              View all students and access parent information
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-600">Total Students</p>
                  <p className="text-xl font-bold text-gray-800">
                    {totalStudents}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-600">Departments</p>
                  <p className="text-xl font-bold text-gray-800">
                    {Object.keys(byDepartment).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <StudentCard key={index} {...student} />
          ))}
        </div>
      </div>
    </section>
  );
}