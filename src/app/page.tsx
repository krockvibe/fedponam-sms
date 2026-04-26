import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <header className="flex justify-between items-center px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-white">FEDPONAM</h1>
          <p className="text-blue-400 text-sm">School Management System</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-2 text-white hover:text-blue-300 font-medium transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Manage Your School
          <span className="block text-blue-400">Efficiently</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mb-12">
          A comprehensive school management system for managing student records, grades, 
          attendance, fees, and teacher information - all in one place.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all text-lg"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border border-slate-500 text-white hover:bg-slate-800 font-semibold rounded-lg transition-all text-lg"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl">
          {[
            { title: 'Student Records', desc: 'Manage student information, profiles, and academic history' },
            { title: 'Grade Management', desc: 'Track and manage student grades across all subjects' },
            { title: 'Attendance', desc: 'Mark and monitor student attendance daily' },
            { title: 'Fees Management', desc: 'Handle school fees and payment tracking' },
            { title: 'Teachers', desc: 'Manage teacher profiles and subject assignments' },
            { title: 'Dashboard', desc: 'Full overview with analytics and insights' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700/50"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-8 text-slate-500">
        <p>© 2026 FEDPONAM School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}