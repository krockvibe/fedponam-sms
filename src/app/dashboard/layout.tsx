'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Students', href: '/dashboard/students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Teachers', href: '/dashboard/teachers', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Grades', href: '/dashboard/grades', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Attendance', href: '/dashboard/attendance', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { name: 'Fees', href: '/dashboard/fees', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zM9 14h6m-6 4h6' },
];

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#faf8f5]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1a1a1a] text-white flex flex-col fixed h-full shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#8d4d4a] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FEDPONAM</h1>
              <p className="text-[#8d4d4a] text-xs font-medium">Management System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-5 space-y-1">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-4">Main Menu</p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#8d4d4a] text-white shadow-lg'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3.5 text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="bg-white border-b border-[#f5f0eb] px-10 py-6 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-bold text-[#1a1a1a]">
            {navigation.find(n => pathname.startsWith(n.href))?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1a1a1a]">{session?.user?.name || 'User'}</p>
              <p className="text-xs text-[#64748b] capitalize">{session?.user?.role || 'User'}</p>
            </div>
            <div className="w-12 h-12 bg-[#8d4d4a] rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}