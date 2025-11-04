"use client";

import Navbar from './navbar';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen teacher-dashboard">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}