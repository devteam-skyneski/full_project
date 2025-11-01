"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  GraduationCap,
  Megaphone,
  UserCircle,
  LogOut,
} from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { title: "Dashboard", icon: <Home className="w-5 h-5" />, href: "#" },
    { title: "Teachers", icon: <UserCircle className="w-5 h-5" />, href: "#teachers" },
    { title: "Students", icon: <GraduationCap className="w-5 h-5" />, href: "#students" },
    { title: "Announcements", icon: <Megaphone className="w-5 h-5" />, href: "#announcements" },
    { title: "Parents", icon: <Users className="w-5 h-5" />, href: "#parents" },
    { title: "Logout", icon: <LogOut className="w-5 h-5" />, href: "#" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar when scrolling up or at the top
          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsVisible(true);
          } 
          // Hide navbar when scrolling down past 150px
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

  return (
    <nav
      className={`w-full py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 
        backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm
        transition-all duration-500 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-lg shadow-md">
          A
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Admin Portal</h1>
      </div>

      {/* Right Section - Floating Dock */}
      <div className="flex items-center gap-6">
        <FloatingDock
          items={navItems}
          desktopClassName="flex gap-4"
          mobileClassName="grid grid-cols-4 gap-4"
        />
      </div>
    </nav>
  );
}
