'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Fee {
  _id: string;
  studentId: { firstName: string; lastName: string; admissionNumber: string; class: string };
  academicYear: string;
  academicTerm: string;
  feeType: string;
  amount: number;
  paidAmount: number;
  paymentStatus: string;
  createdAt: string;
}

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    async function fetchFees() {
      setLoading(true);
      try {
        const params = filterStatus ? `?status=${filterStatus}` : '';
        const res = await fetch(`/api/fees${params}`);
        const data = await res.json();
        setFees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFees();
  }, [filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Fees</h1>
        <Link
          href="/dashboard/fees/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          Add Fee
        </Link>
      </div>

      <div className="flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : fees.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No fee records found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Term</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Paid</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {fees.map((fee) => (
                <tr key={fee._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                    {fee.studentId?.firstName} {fee.studentId?.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{fee.studentId?.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{fee.feeType}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{fee.academicTerm}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">${fee.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">${fee.paidAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(fee.paymentStatus)}`}>
                      {fee.paymentStatus}
                    </span>
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