import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import StatusBadge from '../../components/ui/StatusBadge';
import { Check, X } from 'lucide-react';

export default function LeaveManagementPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [remarksModal, setRemarksModal] = useState<{ leaveId: string; action: string } | null>(null);
  const [remarks, setRemarks] = useState('');

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

  const handleApproval = async (leaveId: string, status: string, remarkText?: string) => {
    try {
      await api.patch(`/leaves/${leaveId}/approve`, { status, remarks: remarkText || '' });
      setRemarksModal(null);
      setRemarks('');
      fetchLeaves();
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to update leave');
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Leave Management</h1>
        <p className="text-sm text-gray-500">{total} leave requests</p>
      </div>

      <div className="flex gap-3">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors appearance-none min-w-[150px]">
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
                <th className="py-4 px-4">Start Date</th>
                <th className="py-4 px-4">End Date</th>
                <th className="py-4 px-4">Reason</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-12 text-center"><div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto" /></td></tr>
              ) : leaves.length ? (
                leaves.map((l) => (
                  <tr key={l.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-white">{l.employeeId?.name || '—'}</p>
                      <p className="text-xs text-gray-500">{l.employeeId?.department}</p>
                    </td>
                    <td className="py-4 px-4"><StatusBadge status={l.leaveType} size="md" /></td>
                    <td className="py-4 px-4 text-sm text-gray-400">{new Date(l.startDate).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{new Date(l.endDate).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-400 max-w-[200px] truncate">{l.reason}</td>
                    <td className="py-4 px-4"><StatusBadge status={l.status} /></td>
                    <td className="py-4 px-4">
                      {l.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleApproval(l.id, 'approved')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                            <Check className="w-3 h-3" /> Approve
                          </button>
                          <button onClick={() => setRemarksModal({ leaveId: l.id, action: 'rejected' })}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors">
                            <X className="w-3 h-3" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-500">No leave requests found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/6">
            <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors">Prev</button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Rejection Remarks Modal */}
      {remarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setRemarksModal(null)} />
          <div className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-white mb-4">Rejection Remarks</h3>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} placeholder="Reason for rejection..."
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setRemarksModal(null)} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={() => handleApproval(remarksModal.leaveId, 'rejected', remarks)}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-500 transition-colors">Reject Leave</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
