import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8d4d4a] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1a1a1a] tracking-tight">FEDPONAM</h1>
            <p className="text-[#8d4d4a] text-xs font-medium">School Management</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 text-[#1a1a1a] hover:text-[#8d4d4a] font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 bg-[#8d4d4a] hover:bg-[#a65d58] text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <section className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32 gap-12">
          <div className="flex-1 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-[#f5f0eb] px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-[#8d4d4a] rounded-full"></span>
              <span className="text-sm font-medium text-[#6d3a37]">Comprehensive School Management</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
              Streamline Your
              <span className="block text-[#8d4d4a]">School Operations</span>
            </h2>
            <p className="text-xl text-[#64748b] max-w-xl leading-relaxed">
              A comprehensive system for managing student records, grades, 
              attendance, fees, and teacher information — all in one elegant platform.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/register"
                className="px-8 py-4 bg-[#8d4d4a] hover:bg-[#a65d58] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 border-2 border-[#8d4d4a] text-[#8d4d4a] hover:bg-[#8d4d4a] hover:text-white font-semibold rounded-xl transition-all text-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="flex-1 relative animate-fade-in">
            <div className="bg-gradient-to-br from-[#8d4d4a] to-[#a65d58] rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-4">
                {[
                  { label: 'Students', value: '1,200+', color: '#d4a574' },
                  { label: 'Teachers', value: '85', color: '#f5f0eb' },
                  { label: 'Classes', value: '42', color: '#d4a574' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-white/80">{stat.label}</span>
                    <span className="text-white font-bold text-xl">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4a574] rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#8d4d4a] rounded-full opacity-20 blur-2xl"></div>
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4">Powerful Features</h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">Everything you need to manage your school efficiently and effectively.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Student Records', 
                desc: 'Comprehensive student profiles with academic history and personal information',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
              },
              { 
                title: 'Grade Management', 
                desc: 'Track and manage student grades across all subjects and terms',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              },
              { 
                title: 'Attendance Tracking', 
                desc: 'Mark and monitor student attendance with real-time updates',
                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              },
              { 
                title: 'Fees Management', 
                desc: 'Handle school fees, payments, and financial tracking',
                icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zM9 14h6m-6 4h6'
              },
              { 
                title: 'Teacher Profiles', 
                desc: 'Manage teacher information and subject assignments',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
              },
              { 
                title: 'Analytics Dashboard', 
                desc: 'Full overview with insights and performance metrics',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#f5f0eb] hover:border-[#8d4d4a]/20"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-[#f5f0eb] group-hover:bg-[#8d4d4a] rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <svg className="w-7 h-7 text-[#8d4d4a] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{feature.title}</h3>
                <p className="text-[#64748b] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="bg-gradient-to-br from-[#8d4d4a] to-[#6d3a37] rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your School?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of schools already using FEDPONAM to streamline their operations and improve student outcomes.
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-white text-[#8d4d4a] font-semibold rounded-xl hover:bg-[#f5f0eb] transition-colors text-lg"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f5f0eb] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#8d4d4a] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-[#1a1a1a]">FEDPONAM</span>
          </div>
          <p className="text-[#64748b] text-sm">© 2026 FEDPONAM School Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}