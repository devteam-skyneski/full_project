import ParentParticlesBackground from './components/ParentParticlesBackground';

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900" />
      <ParentParticlesBackground />
      {children}
    </div>
  );
}


