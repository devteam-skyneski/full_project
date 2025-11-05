 

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-900" />
      {children}
    </div>
  );
}


