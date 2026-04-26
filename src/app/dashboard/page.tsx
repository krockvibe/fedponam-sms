'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalGrades: number;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalGrades: 0,
    totalFees: 0,
    paidFees: 0,
    pendingFees: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/dashboard/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Students', value: stats.totalStudents || 0, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-[#8d4d4a]' },
    { name: 'Total Teachers', value: stats.totalTeachers || 0, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'bg-[#d4a574]' },
    { name: 'Total Grades', value: stats.totalGrades || 0, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-[#6d3a37]' },
    { name: 'Total Revenue', value: `$${(stats.paidFees || 0).toLocaleString()}`, icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zM9 14h6m-6 4h6', color: 'bg-[#1a1a1a]' },
  ];

  const quickActions = [
    { name: 'Add Student', href: '/dashboard/students/add', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Add Teacher', href: '/dashboard/teachers/add', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Record Grades', href: '/dashboard/grades/add', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Mark Attendance', href: '/dashboard/attendance/mark', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#f5f0eb] border-t-[#8d4d4a]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#8d4d4a] to-[#6d3a37] rounded-3xl p-10 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}!</h1>
            <p className="text-white/80 text-lg">Here&apos;s what&apos;s happening at FEDPONAM today.</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold">{session?.user?.name?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-7 shadow-sm border border-[#f5f0eb] hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748b] mb-2">{stat.name}</p>
                <p className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-xl shadow-md`}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-[#f5f0eb] hover:shadow-lg hover:border-[#8d4d4a]/30 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-[#f5f0eb] group-hover:bg-[#8d4d4a] rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-[#8d4d4a] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <span className="font-semibold text-[#1a1a1a] group-hover:text-[#8d4d4a] transition-colors">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f5f0eb] overflow-hidden">
        <div className="px-8 py-6 border-b border-[#f5f0eb]">
          <h2 className="text-xl font-bold text-[#1a1a1a]">Recent Activity</h2>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-[#f5f0eb] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#8d4d4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-[#64748b] text-lg">No recent activity to display.</p>
            <p className="text-[#94a3b8] text-sm mt-1">Records will appear here as you add data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}