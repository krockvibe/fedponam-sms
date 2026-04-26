'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Grade {
  _id: string;
  studentId: { firstName: string; lastName: string; admissionNumber: string; class: string };
  subject: string;
  academicTerm: string;
  academicYear: string;
  score: number;
  grade: string;
  createdAt: string;
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ subject: '', term: '', year: '' });

  useEffect(() => {
    async function fetchGrades() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filter.subject) params.append('subject', filter.subject);
        if (filter.term) params.append('term', filter.term);
        if (filter.year) params.append('year', filter.year);
        const res = await fetch(`/api/grades?${params}`);
        const data = await res.json();
        setGrades(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGrades();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this grade?')) return;
    try {
      await fetch(`/api/grades/${id}`, { method: 'DELETE' });
      setGrades(grades.filter(g => g._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Grades</h1>
        <Link
          href="/dashboard/grades/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          Add Grade
        </Link>
      </div>

      <div className="flex gap-4 flex-wrap">
        <select
          value={filter.subject}
          onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>
        <select
          value={filter.term}
          onChange={(e) => setFilter({ ...filter, term: e.target.value })}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Terms</option>
          <option value="First Term">First Term</option>
          <option value="Second Term">Second Term</option>
          <option value="Third Term">Third Term</option>
        </select>
        <select
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : grades.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No grades found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Term</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Grade</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {grades.map((g) => (
                <tr key={g._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {g.studentId?.firstName} {g.studentId?.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{g.studentId?.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{g.subject}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{g.academicTerm}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{g.score}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{g.grade}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(g._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}