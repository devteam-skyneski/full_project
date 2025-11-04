"use client";
import {
  Users,
  User,
  Mail,
  Phone,
  GraduationCap,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface ParentData {
  name: string;
  email: string;
  phone: string;
  students: Array<{
    id: string;
    name: string;
    email: string;
  }>;
}

const ParentCard = ({
  parent,
}: {
  parent: ParentData;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {parent.name[0]}
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{parent.name}</h3>
            <p className="text-xs text-gray-300">Parent</p>
          </div>
        </div>
        <div className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded-full text-xs font-semibold ml-2">
          {parent.students.length} Student{parent.students.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-blue-300" />
          </div>
          <span className="text-gray-200 truncate">{parent.email}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="w-7 h-7 rounded-lg bg-green-500/30 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-green-300" />
          </div>
          <span className="text-gray-200">{parent.phone}</span>
        </div>
      </div>

      {/* Students Section */}
      <div className="border-t border-white/20 pt-3">
        <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Enrolled Children
        </h4>
        <div className="space-y-2">
          {parent.students.map((student, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-lg p-2 flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {student.name[0]}
              </div>
              <div>
                <span className="text-xs font-medium text-white">
                  {student.name}
                </span>
                <p className="text-xs text-gray-300">{student.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ParentSection() {
  const [parents, setParents] = useState<ParentData[]>([
    {
      name: "John & Mary Smith",
      email: "smith.family@email.com",
      phone: "+1 (555) 123-4567",
      students: [
        { id: "STU001", name: "Alexandra Smith", email: "alex.smith@student.edu" },
      ],
    },
    {
      name: "David & Lisa Chen",
      email: "chen.family@email.com",
      phone: "+1 (555) 234-5678",
      students: [
        { id: "STU002", name: "Michael Chen", email: "michael.chen@student.edu" },
      ],
    },
    {
      name: "Carlos & Maria Rodriguez",
      email: "rodriguez.family@email.com",
      phone: "+1 (555) 345-6789",
      students: [
        { id: "STU003", name: "Emily Rodriguez", email: "emily.r@student.edu" },
      ],
    },
    {
      name: "Robert & Jennifer Wilson",
      email: "wilson.family@email.com",
      phone: "+1 (555) 456-7890",
      students: [
        { id: "STU004", name: "James Wilson", email: "james.w@student.edu" },
      ],
    },
    {
      name: "Miguel & Ana Martinez",
      email: "martinez.family@email.com",
      phone: "+1 (555) 567-8901",
      students: [
        { id: "STU005", name: "Sophia Martinez", email: "sophia.m@student.edu" },
      ],
    },
    {
      name: "Kevin & Susan Kim",
      email: "kim.family@email.com",
      phone: "+1 (555) 678-9012",
      students: [
        { id: "STU006", name: "Daniel Kim", email: "daniel.kim@student.edu" },
      ],
    },
    {
      name: "William & Karen Thompson",
      email: "thompson.family@email.com",
      phone: "+1 (555) 789-0123",
      students: [
        { id: "STU007", name: "Isabella Thompson", email: "isabella.t@student.edu" },
      ],
    },
    {
      name: "Matthew & Patricia Brown",
      email: "brown.family@email.com",
      phone: "+1 (555) 890-1234",
      students: [
        { id: "STU008", name: "Ethan Brown", email: "ethan.b@student.edu" },
      ],
    },
    {
      name: "Richard & Linda Johnson",
      email: "johnson.family@email.com",
      phone: "+1 (555) 901-2345",
      students: [
        { id: "STU009", name: "Olivia Johnson", email: "olivia.j@student.edu" },
      ],
    },
    {
      name: "Chris & Sarah Davis",
      email: "davis.family@email.com",
      phone: "+1 (555) 111-2222",
      students: [
        { id: "STU010", name: "Noah Davis", email: "noah.d@student.edu" },
      ],
    },
    {
      name: "Thomas & Anna Wilson",
      email: "wilson2.family@email.com",
      phone: "+1 (555) 222-3333",
      students: [
        { id: "STU011", name: "Emma Wilson", email: "emma.w@student.edu" },
      ],
    },
    {
      name: "Robert & Jessica Anderson",
      email: "anderson.family@email.com",
      phone: "+1 (555) 333-4444",
      students: [
        { id: "STU012", name: "Liam Anderson", email: "liam.a@student.edu" },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParents, setFilteredParents] = useState(parents);
  const [selectedParent, setSelectedParent] = useState<ParentData | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const found = parents.filter(
        (parent) =>
          parent.email.toLowerCase().includes(query) ||
          parent.students.some(
            (student) =>
              student.id.toLowerCase().includes(query) ||
              student.email.toLowerCase().includes(query) ||
              student.name.toLowerCase().includes(query)
          )
      );
      setFilteredParents(found);

      if (found.length === 1) {
        setSelectedParent(found[0]);
      }
    } else {
      setFilteredParents(parents);
      setSelectedParent(null);
    }
  }, [searchQuery, parents]);

  const totalStudents = parents.reduce((sum, p) => sum + p.students.length, 0);

  return (
    <>

      {selectedParent && (
        <div className="fixed inset-0 grid place-items-center z-[100] p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full"
            onClick={() => setSelectedParent(null)}
          />
          <div className="w-full max-w-lg bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden z-[100] relative">
            <div className="p-6 text-white border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Parent Information</h3>
                <button
                  onClick={() => setSelectedParent(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <User className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <ParentCard parent={selectedParent} />
            </div>
          </div>
        </div>
      )}

      
      <section id="parents" className="py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Parent Directory
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mt-1 sm:mt-2">
                View contact information and details of all enrolled parents
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                  <div>
                    <p className="text-xs text-gray-300 hidden sm:block">Total Parents</p>
                    <p className="text-sm sm:text-xl font-bold text-white">
                      {parents.length}
                    </p>
                  </div>
                </div>
              </div>  
              <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 px-3 py-2 sm:px-4 sm:py-2 flex-1 sm:flex-none">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                  <div>
                    <p className="text-xs text-gray-300 hidden sm:block">Total Students</p>
                    <p className="text-sm sm:text-xl font-bold text-white">
                      {totalStudents}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Search by student ID, email, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-h-[800px] overflow-y-auto pr-2">
            {filteredParents.map((parent, index) => (
              <ParentCard key={index} parent={parent} />
            ))}
          </div>

          {filteredParents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-300 text-base sm:text-lg">
                No parents found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}