import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import StatusBadge from '../../components/ui/StatusBadge';
import { Plus } from 'lucide-react';

export default function EmployeeLeavesPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);
  const [applyForm, setApplyForm] = useState({ leaveType: 'casual', startDate: '', endDate: '', reason: '' });
  const [applyError, setApplyError] = useState('');
  const [applying, setApplying] = useState(false);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/leaves', { params: { page, limit: 10 } });
      setLeaves(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyError('');
    setApplying(true);
    try {
      await api.post('/leaves/apply', applyForm);
      setShowApply(false);
      setApplyForm({ leaveType: 'casual', startDate: '', endDate: '', reason: '' });
      fetchLeaves();
    } catch (err: any) { setApplyError(err.response?.data?.error?.message || 'Failed to apply'); }
    finally { setApplying(false); }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">My Leaves</h1>
          <p className="text-sm text-gray-500">{total} leave requests</p>
        </div>
        <button onClick={() => setShowApply(true)} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all">
          <Plus className="w-4 h-4" /> Apply for Leave
        </button>
      </div>

      {/* Leave History */}
      <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/6 bg-white/2">
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-4">Start Date</th>
                <th className="py-4 px-4">End Date</th>
                <th className="py-4 px-4">Reason</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center"><div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto" /></td></tr>
              ) : leaves.length ? leaves.map((l) => (
                <tr key={l.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-4 px-6"><StatusBadge status={l.leaveType} size="md" /></td>
                  <td className="py-4 px-4 text-sm text-gray-400">{new Date(l.startDate).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-400">{new Date(l.endDate).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-400 max-w-[200px] truncate">{l.reason}</td>
                  <td className="py-4 px-4"><StatusBadge status={l.status} /></td>
                  <td className="py-4 px-4 text-sm text-gray-500">{l.remarks || '—'}</td>
                </tr>
              )) : <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-500">No leave history</td></tr>}
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

      {/* Apply Leave Modal */}
      {showApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowApply(false)} />
          <div className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Apply for Leave</h2>
              <button onClick={() => setShowApply(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleApply} className="px-8 py-6 flex flex-col gap-4">
              {applyError && <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{applyError}</div>}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Leave Type</label>
                <select value={applyForm.leaveType} onChange={(e) => setApplyForm({...applyForm, leaveType: e.target.value})}
                  className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 appearance-none">
                  <option value="sick">Sick</option>
                  <option value="casual">Casual</option>
                  <option value="annual">Annual</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Start Date</label>
                  <input type="date" required value={applyForm.startDate} onChange={(e) => setApplyForm({...applyForm, startDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">End Date</label>
                  <input type="date" required value={applyForm.endDate} onChange={(e) => setApplyForm({...applyForm, endDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Reason (min 10 characters)</label>
                <textarea required minLength={10} value={applyForm.reason} onChange={(e) => setApplyForm({...applyForm, reason: e.target.value})} rows={3}
                  className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 resize-none" />
              </div>
              <button type="submit" disabled={applying}
                className="w-full py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-2 shadow-lg shadow-violet-500/25 disabled:opacity-60">
                {applying ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Submit Leave Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
