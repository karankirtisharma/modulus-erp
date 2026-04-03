import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import StatusBadge from '../../components/ui/StatusBadge';

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/tasks', { params });
      setTasks(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page, statusFilter]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleStatusUpdate = async (taskId: string, status: string) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (err: any) { alert(err.response?.data?.error?.message || 'Failed to update'); }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">My Tasks</h1>
        <p className="text-sm text-gray-500">{total} tasks assigned to you</p>
      </div>

      <div className="flex gap-3">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors appearance-none min-w-[150px]">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/6 bg-white/2">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Priority</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center"><div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto" /></td></tr>
              ) : tasks.length ? tasks.map((t) => (
                <tr key={t.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-white">{t.title}</td>
                  <td className="py-4 px-4 text-sm text-gray-400 max-w-[200px] truncate">{t.description || '—'}</td>
                  <td className="py-4 px-4"><StatusBadge status={t.priority} /></td>
                  <td className="py-4 px-4">
                    <select value={t.status} onChange={(e) => handleStatusUpdate(t.id, e.target.value)}
                      className="bg-transparent text-xs font-medium border border-white/8 rounded-lg px-2 py-1 text-white focus:outline-none cursor-pointer appearance-none">
                      <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                      <option value="in-progress" className="bg-[#1a1a1a]">In Progress</option>
                      <option value="completed" className="bg-[#1a1a1a]">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{new Date(t.dueDate).toLocaleDateString()}</td>
                </tr>
              )) : <tr><td colSpan={5} className="py-12 text-center text-sm text-gray-500">No tasks assigned to you</td></tr>}
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
