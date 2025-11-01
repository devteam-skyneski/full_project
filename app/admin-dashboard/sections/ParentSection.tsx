"use client";
import {
  Users,
  User,
  Mail,
  Phone,
  Home,
  Briefcase,
  MapPin,
  Baby,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";

const ParentCard = ({
  parent,
}: {
  parent: {
    name: string;
    email: string;
    phone: string;
    address: string;
    occupation: string;
    emergency: string;
    students: string[];
  };
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
            {parent.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{parent.name}</h3>
            <p className="text-sm text-gray-600">Parent</p>
          </div>
        </div>
        <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Baby className="w-4 h-4" />
          {parent.students.length} Student{parent.students.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-gray-700 truncate">{parent.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Phone className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-gray-700">{parent.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-orange-600" />
          </div>
          <span className="text-gray-700">{parent.occupation}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-gray-700 truncate">{parent.address}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Phone className="w-4 h-4 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Emergency</p>
            <span className="text-gray-700 font-medium">{parent.emergency}</span>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Enrolled Children
        </h4>
        <div className="space-y-2">
          {parent.students.map((student, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {student[0]}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {student}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ParentSection() {
  const [parents, setParents] = useState([
    {
      name: "John & Mary Smith",
      email: "smith.family@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Springfield, IL 62701",
      occupation: "Engineer & Teacher",
      emergency: "+1 (555) 123-4567",
      students: ["Alexandra Smith", "Matthew Smith"],
    },
    {
      name: "David & Lisa Chen",
      email: "chen.family@email.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Avenue, Boston, MA 02101",
      occupation: "Physician & Lawyer",
      emergency: "+1 (555) 234-5678",
      students: ["Michael Chen"],
    },
    {
      name: "Carlos & Maria Rodriguez",
      email: "rodriguez.family@email.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Street, Miami, FL 33101",
      occupation: "Business Owner & Designer",
      emergency: "+1 (555) 345-6789",
      students: ["Emily Rodriguez", "Sophia Rodriguez"],
    },
    {
      name: "Robert & Jennifer Wilson",
      email: "wilson.family@email.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm Drive, Austin, TX 78701",
      occupation: "Professor & Nurse",
      emergency: "+1 (555) 456-7890",
      students: ["James Wilson"],
    },
    {
      name: "Miguel & Ana Martinez",
      email: "martinez.family@email.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Lane, Los Angeles, CA 90001",
      occupation: "Manager & Consultant",
      emergency: "+1 (555) 567-8901",
      students: ["Sophia Martinez"],
    },
    {
      name: "Kevin & Susan Kim",
      email: "kim.family@email.com",
      phone: "+1 (555) 678-9012",
      address: "987 Cedar Court, Seattle, WA 98101",
      occupation: "Software Developer & Writer",
      emergency: "+1 (555) 678-9012",
      students: ["Daniel Kim"],
    },
    {
      name: "William & Karen Thompson",
      email: "thompson.family@email.com",
      phone: "+1 (555) 789-0123",
      address: "147 Birch Boulevard, Denver, CO 80201",
      occupation: "Architect & Journalist",
      emergency: "+1 (555) 789-0123",
      students: ["Isabella Thompson"],
    },
    {
      name: "Matthew & Patricia Brown",
      email: "brown.family@email.com",
      phone: "+1 (555) 890-1234",
      address: "258 Spruce Avenue, Phoenix, AZ 85001",
      occupation: "Sales Director & Artist",
      emergency: "+1 (555) 890-1234",
      students: ["Ethan Brown"],
    },
    {
      name: "Richard & Linda Johnson",
      email: "johnson.family@email.com",
      phone: "+1 (555) 901-2345",
      address: "369 Willow Way, Philadelphia, PA 19101",
      occupation: "Financial Advisor & Therapist",
      emergency: "+1 (555) 901-2345",
      students: ["Olivia Johnson"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParents, setFilteredParents] = useState(parents);

  useEffect(() => {
    if (searchQuery) {
      setFilteredParents(
        parents.filter(
          (parent) =>
            parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            parent.students.some((s) =>
              s.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      );
    } else {
      setFilteredParents(parents);
    }
  }, [searchQuery, parents]);

  const totalStudents = parents.reduce((sum, p) => sum + p.students.length, 0);

  return (
    <section id="parents" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Parent Directory
            </h2>
            <p className="text-gray-600 mt-2">
              View contact information and details of all enrolled parents
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-600">Total Parents</p>
                  <p className="text-xl font-bold text-gray-800">
                    {parents.length}
                  </p>
                </div>
              </div>
            </div>
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
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by parent name, email, or student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Parents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParents.map((parent, index) => (
            <ParentCard key={index} parent={parent} />
          ))}
        </div>

        {filteredParents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No parents found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}