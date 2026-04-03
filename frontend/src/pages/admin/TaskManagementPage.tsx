import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';
import { Plus, Search } from 'lucide-react';

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [createForm, setCreateForm] = useState({ title: '', description: '', assignedTo: '', priority: 'medium', dueDate: '', department: '' });
  const [createError, setCreateError] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const res = await api.get('/tasks', { params });
      setTasks(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page, statusFilter, priorityFilter]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const openCreateModal = async () => {
    try {
      const res = await api.get('/users?limit=50');
      setEmployees(res.data.data || []);
    } catch (err) { console.error(err); }
    setShowCreate(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);
    try {
      await api.post('/tasks/create', createForm);
      setShowCreate(false);
      setCreateForm({ title: '', description: '', assignedTo: '', priority: 'medium', dueDate: '', department: '' });
      fetchTasks();
    } catch (err: any) {
      setCreateError(err.response?.data?.error?.message || 'Failed to create task');
    } finally { setCreating(false); }
  };

  const handleStatusUpdate = async (taskId: string, status: string) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (taskId: string, title: string) => {
    if (!confirm(`Delete task "${title}"?`)) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err: any) { alert(err.response?.data?.error?.message || 'Failed to delete'); }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Task Management</h1>
          <p className="text-sm text-gray-500">{total} total tasks</p>
        </div>
        <button onClick={openCreateModal} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all">
          <Plus className="w-4 h-4" /> Create Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors appearance-none min-w-[150px]">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors appearance-none min-w-[150px]">
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/6 bg-white/2">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-4">Assigned To</th>
                <th className="py-4 px-4">Priority</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Due Date</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center"><div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto" /></td></tr>
              ) : tasks.length ? (
                tasks.map((t) => (
                  <tr key={t.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-white">{t.title}</p>
                      {t.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{t.description}</p>}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-400">{t.assignedTo?.name || '—'}</td>
                    <td className="py-4 px-4"><StatusBadge status={t.priority} /></td>
                    <td className="py-4 px-4">
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusUpdate(t.id, e.target.value)}
                        className="bg-transparent text-xs font-medium border border-white/8 rounded-lg px-2 py-1 text-white focus:outline-none cursor-pointer appearance-none"
                      >
                        <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                        <option value="in-progress" className="bg-[#1a1a1a]">In Progress</option>
                        <option value="completed" className="bg-[#1a1a1a]">Completed</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">{new Date(t.dueDate).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <button onClick={() => handleDelete(t.id, t.title)}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-500">No tasks found</td></tr>
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

      {/* Create Task Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Task">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          {createError && <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{createError}</div>}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Title</label>
            <input type="text" required value={createForm.title} onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Description</label>
            <textarea value={createForm.description} onChange={(e) => setCreateForm({...createForm, description: e.target.value})} rows={3}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Assign To</label>
            <select required value={createForm.assignedTo} onChange={(e) => setCreateForm({...createForm, assignedTo: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors appearance-none">
              <option value="">Select employee...</option>
              {employees.map((emp) => <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Priority</label>
              <select value={createForm.priority} onChange={(e) => setCreateForm({...createForm, priority: e.target.value})}
                className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors appearance-none">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Due Date</label>
              <input type="date" required value={createForm.dueDate} onChange={(e) => setCreateForm({...createForm, dueDate: e.target.value})}
                className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors" />
            </div>
          </div>
          <button type="submit" disabled={creating}
            className="w-full py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-2 shadow-lg shadow-violet-500/25 disabled:opacity-60 transition-all">
            {creating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Task'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
