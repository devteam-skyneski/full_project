"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  User,
  Users,
  GraduationCap,
  Mail,
  Phone,
  Eye,
  X,
  ClipboardList,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";

// --- Data setup ---
const students = [
  {
    name: "Alexandra Smith",
    id: "STU001",
    class: "Class 1",
    grade: "Grade 12",
    department: "Computer Science",
    email: "alex.smith@student.edu",
    phone: "+1 (555) 123-4567",
    parentName: "John & Mary Smith",
    parentEmail: "smith.family@email.com",
    parentPhone: "+1 (555) 123-4567",
  },
  {
    name: "Michael Chen",
    id: "STU002",
    class: "Class 1",
    grade: "Grade 11",
    department: "Mathematics",
    email: "michael.chen@student.edu",
    phone: "+1 (555) 234-5678",
    parentName: "David & Lisa Chen",
    parentEmail: "chen.family@email.com",
    parentPhone: "+1 (555) 234-5678",
  },
  {
    name: "Emily Rodriguez",
    id: "STU003",
    class: "Class 2",
    grade: "Grade 12",
    department: "Biology",
    email: "emily.r@student.edu",
    phone: "+1 (555) 345-6789",
    parentName: "Carlos & Maria Rodriguez",
    parentEmail: "rodriguez.family@email.com",
    parentPhone: "+1 (555) 345-6789",
  },
  {
    name: "James Wilson",
    id: "STU004",
    class: "Class 2",
    grade: "Grade 10",
    department: "Physics",
    email: "james.w@student.edu",
    phone: "+1 (555) 456-7890",
    parentName: "Robert & Jennifer Wilson",
    parentEmail: "wilson.family@email.com",
    parentPhone: "+1 (555) 456-7890",
  },
  {
    name: "Sophia Martinez",
    id: "STU005",
    class: "Class 1",
    grade: "Grade 11",
    department: "Chemistry",
    email: "sophia.m@student.edu",
    phone: "+1 (555) 567-8901",
    parentName: "Miguel & Ana Martinez",
    parentEmail: "martinez.family@email.com",
    parentPhone: "+1 (555) 567-8901",
  },
  {
    name: "Daniel Kim",
    id: "STU006",
    class: "Class 3",
    grade: "Grade 12",
    department: "Computer Science",
    email: "daniel.kim@student.edu",
    phone: "+1 (555) 678-9012",
    parentName: "Kevin & Susan Kim",
    parentEmail: "kim.family@email.com",
    parentPhone: "+1 (555) 678-9012",
  },
  {
    name: "Isabella Thompson",
    id: "STU007",
    class: "Class 2",
    grade: "Grade 10",
    department: "Arts & Design",
    email: "isabella.t@student.edu",
    phone: "+1 (555) 789-0123",
    parentName: "William & Karen Thompson",
    parentEmail: "thompson.family@email.com",
    parentPhone: "+1 (555) 789-0123",
  },
  {
    name: "Ethan Brown",
    id: "STU008",
    class: "Class 3",
    grade: "Grade 11",
    department: "History",
    email: "ethan.b@student.edu",
    phone: "+1 (555) 890-1234",
    parentName: "Matthew & Patricia Brown",
    parentEmail: "brown.family@email.com",
    parentPhone: "+1 (555) 890-1234",
  },
  {
    name: "Olivia Johnson",
    id: "STU009",
    class: "Class 1",
    grade: "Grade 12",
    department: "Literature",
    email: "olivia.j@student.edu",
    phone: "+1 (555) 901-2345",
    parentName: "Richard & Linda Johnson",
    parentEmail: "johnson.family@email.com",
    parentPhone: "+1 (555) 901-2345",
  },
  {
    name: "Noah Davis",
    id: "STU010",
    class: "Class 2",
    grade: "Grade 11",
    department: "Physics",
    email: "noah.d@student.edu",
    phone: "+1 (555) 111-2222",
    parentName: "Chris & Sarah Davis",
    parentEmail: "davis.family@email.com",
    parentPhone: "+1 (555) 111-2222",
  },
  {
    name: "Emma Wilson",
    id: "STU011",
    class: "Class 3",
    grade: "Grade 10",
    department: "Chemistry",
    email: "emma.w@student.edu",
    phone: "+1 (555) 222-3333",
    parentName: "Thomas & Anna Wilson",
    parentEmail: "wilson2.family@email.com",
    parentPhone: "+1 (555) 222-3333",
  },
  {
    name: "Liam Anderson",
    id: "STU012",
    class: "Class 1",
    grade: "Grade 11",
    department: "Computer Science",
    email: "liam.a@student.edu",
    phone: "+1 (555) 333-4444",
    parentName: "Robert & Jessica Anderson",
    parentEmail: "anderson.family@email.com",
    parentPhone: "+1 (555) 333-4444",
  },
];

type Student = (typeof students)[number];

// --- Main Component ---
export default function StudentSection() {
  const [allStudents, setAllStudents] = useState(students);
  const [selectedClass, setSelectedClass] = useState<string>("All Classes");
  const [active, setActive] = useState<Student | null>(null);
  const [showParentModal, setShowParentModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const parentModalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Filter students based on selected class
  const filteredStudents = selectedClass === "All Classes"
    ? allStudents
    : allStudents.filter((s) => s.class === selectedClass);

  // Get unique classes - add all classes 1-10
  const uniqueClasses = [
    "All Classes",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        setShowParentModal(false);
      }
    }
    if (active || showParentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, showParentModal]);

  useOutsideClick(ref, () => setActive(null));
  useOutsideClick(parentModalRef, () => setShowParentModal(false));

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this student?")) {
      setAllStudents(allStudents.filter((s) => s.id !== id));
    }
  };

  const handleViewParent = (student: Student, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedParent({
      name: student.parentName,
      email: student.parentEmail,
      phone: student.parentPhone,
    });
    setShowParentModal(true);
  };

  const totalStudents = allStudents.length;

  return (
    <>
      {/* Student Detail Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 h-full w-full"
              onClick={() => setActive(null)}
            />

            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-[101]"
              onClick={() => setActive(null)}
            >
              <X className="w-5 h-5 text-black" />
            </motion.button>

            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-lg h-auto max-h-[90vh] flex flex-col bg-white rounded-2xl overflow-y-auto z-[100]"
            >
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white"
              >
                <span className="font-bold text-6xl">
                  {active.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </motion.div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-2xl text-gray-800"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`department-${active.name}-${id}`}
                      className="text-lg text-gray-600"
                    >
                      {active.department}
                    </motion.p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {active.class}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Student Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoItem icon={ClipboardList} label="Student ID" value={active.id} />
                    <InfoItem icon={Mail} label="Email" value={active.email} />
                    <InfoItem icon={Phone} label="Phone" value={active.phone} />
                    <InfoItem icon={School} label="Department" value={active.department} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Quick Actions
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleViewParent(active, e)}
                      className="flex-1 text-center py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
                    >
                      View Parent Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Parent Modal */}
      <AnimatePresence>
        {showParentModal && selectedParent && (
          <div className="fixed inset-0 grid place-items-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 h-full w-full"
              onClick={() => setShowParentModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              ref={parentModalRef}
              className="w-full max-w-md bg-white rounded-2xl overflow-hidden z-[101] relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Parent Information</h3>
                  <button
                    onClick={() => setShowParentModal(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <InfoItem icon={User} label="Name" value={selectedParent.name} />
                <InfoItem icon={Mail} label="Email" value={selectedParent.email} />
                <InfoItem icon={Phone} label="Phone" value={selectedParent.phone} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <section id="students" className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Student Management
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                View all students and access parent information
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="bg-gray-50 rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm border border-gray-100 flex-1 sm:flex-none">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-600 hidden sm:block">Total Students</p>
                    <p className="text-sm sm:text-xl font-bold text-gray-800">
                      {totalStudents}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Class Filter Dropdown */}
          <div className="mb-6">
            <div className="relative inline-block">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {uniqueClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Student Table with Fixed Height and Scroll */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="p-3 sm:p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="p-3 sm:p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="p-3 sm:p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="p-3 sm:p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="p-3 sm:p-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="p-3 sm:p-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <motion.tr
                      layoutId={`card-${student.name}-${id}`}
                      key={student.id}
                      onClick={() => setActive(student)}
                      className="cursor-pointer hover:bg-gray-100 hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <motion.div
                            layoutId={`image-${student.name}-${id}`}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
                          >
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </motion.div>
                          <div>
                            <motion.h3
                              layoutId={`title-${student.name}-${id}`}
                              className="font-bold text-gray-800 text-xs sm:text-sm"
                            >
                              {student.name}
                            </motion.h3>
                            <p className="text-xs text-gray-600">
                              ID: {student.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 sm:p-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                        <motion.span layoutId={`department-${student.name}-${id}`}>
                          {student.department}
                        </motion.span>
                      </td>

                      <td className="p-3 sm:p-4 whitespace-nowrap">
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 sm:px-3 rounded-full text-xs font-semibold inline-block">
                          {student.class}
                        </div>
                      </td>

                      <td className="p-3 sm:p-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>
                      </td>

                      <td className="p-3 sm:p-4 whitespace-nowrap text-center">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                      </td>

                      <td className="p-3 sm:p-4 whitespace-nowrap text-center">
                        <button
                          onClick={(e) => handleDelete(student.id, e)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Helper component
const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="flex items-start gap-2">
    <Icon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </div>
);
