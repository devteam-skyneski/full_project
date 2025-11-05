"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Users,
  GraduationCap,
  Megaphone,
  UserCircle,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isProfileView, setIsProfileView] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const adminData = {
    name: "Admin User",
    email: "admin@university.edu"
    
  };

  const navItems = [
    { title: "Dashboard", icon: <Home className="w-5 h-5" />, href: "#" },
    { title: "Teachers", icon: <UserCircle className="w-5 h-5" />, href: "#teachers" },
    { title: "Students", icon: <GraduationCap className="w-5 h-5" />, href: "#students" },
    { title: "Announcements", icon: <Megaphone className="w-5 h-5" />, href: "#announcements" },
    { title: "Parents", icon: <Users className="w-5 h-5" />, href: "#parents" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsVisible(true);
          }

          else if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
        setIsProfileView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {

    window.location.href = "/auth";
  };

  return (
    <nav
      className={`w-full py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 
        backdrop-blur-md bg-white/20 border-b border-white/20 shadow-lg
        transition-all duration-500 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-lg shadow-md">
          A
        </div>
        <h1 className="text-xl font-semibold text-white hidden sm:block">Admin Portal</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden md:flex">
          <FloatingDock
            items={navItems}
            desktopClassName="flex gap-4"
            mobileClassName="hidden"
          />
        </div>


        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {

              const closing = showProfileDropdown;
              if (closing) {
                setIsProfileView(false);
              }
              setShowProfileDropdown(!showProfileDropdown);
            }}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              A
            </div>
            <ChevronDown className="w-4 h-4 text-gray-300 hidden sm:block" />
          </button>


          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-900/70 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50 py-2">

              {!isProfileView ? (
                <>
                  <button
                    onClick={() => setIsProfileView(true)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/50 flex items-center gap-2 border-b border-white/20"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsProfileView(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-blue-600/50 flex items-center gap-2 border-b border-white/20"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    Back
                  </button>
                  <div className="px-4 py-3 space-y-2">
                    <p className="text-xs text-gray-400">Full Name</p>
                    <p className="text-sm font-semibold text-white">{adminData.name}</p>
                    
                    <p className="text-xs text-gray-400">Email Address</p>
                    <p className="text-sm font-semibold text-white">{adminData.email}</p>
                  
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}