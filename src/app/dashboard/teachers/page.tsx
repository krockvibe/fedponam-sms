'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Teacher {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  subject: string;
  qualification: string;
  gender: string;
  phone: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchTeachers() {
      setLoading(true);
      try {
        const params = search ? `?search=${search}` : '';
        const res = await fetch(`/api/teachers${params}`);
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    try {
      await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
      setTeachers(teachers.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
        <Link
          href="/dashboard/teachers/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          Add Teacher
        </Link>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search teachers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No teachers found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Emp No.</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Qualification</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-600">{teacher.employeeId}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {teacher.firstName} {teacher.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{teacher.subject}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{teacher.qualification || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 capitalize">{teacher.gender}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/teachers/${teacher._id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
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