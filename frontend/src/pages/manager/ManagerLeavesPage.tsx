import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import StatusBadge from '../../components/ui/StatusBadge';
import { Check, X } from 'lucide-react';

export default function ManagerLeavesPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/leaves', { params });
      setLeaves(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page, statusFilter]);

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

  const handleAction = async (leaveId: string, status: string) => {
    try {
      await api.patch(`/leaves/${leaveId}/approve`, { status });
      fetchLeaves();
    } catch (err: any) { alert(err.response?.data?.error?.message || 'Failed'); }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Team Leave Requests</h1>
        <p className="text-sm text-gray-500">{total} requests from your team</p>
      </div>

      <div className="flex gap-3">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none min-w-[150px]">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/6 bg-white/2">
                <th className="py-4 px-6">Employee</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Dates</th>
                <th className="py-4 px-4">Reason</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center"><div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto" /></td></tr>
              ) : leaves.length ? leaves.map((l) => (
                <tr key={l.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-white">{l.employeeId?.name || '—'}</td>
                  <td className="py-4 px-4"><StatusBadge status={l.leaveType} size="md" /></td>
                  <td className="py-4 px-4 text-sm text-gray-400">{new Date(l.startDate).toLocaleDateString()} — {new Date(l.endDate).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-400 max-w-[180px] truncate">{l.reason}</td>
                  <td className="py-4 px-4"><StatusBadge status={l.status} /></td>
                  <td className="py-4 px-4">
                    {l.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleAction(l.id, 'approved')} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleAction(l.id, 'rejected')} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : <span className="text-xs text-gray-600">—</span>}
                  </td>
                </tr>
              )) : <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-500">No leave requests</td></tr>}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/6">
            <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-400 disabled:opacity-30">Prev</button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-400 disabled:opacity-30">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
