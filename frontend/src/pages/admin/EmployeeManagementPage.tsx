import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';
import { Plus, Search, Trash2, X } from 'lucide-react';

export default function EmployeeManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', role: 'employee', department: '' });
  const [createError, setCreateError] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { page, limit: 10 };
      if (search) params.search = search;
      if (deptFilter) params.department = deptFilter;
      const res = await api.get('/users', { params });
      setUsers(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, deptFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);
    try {
      await api.post('/users/create', createForm);
      setShowCreate(false);
      setCreateForm({ name: '', email: '', password: '', role: 'employee', department: '' });
      fetchUsers();
    } catch (err: any) {
      setCreateError(err.response?.data?.error?.message || 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This action cannot be undone.`)) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed to delete user');
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Employee Management</h1>
          <p className="text-sm text-gray-500">{total} total users</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" /> Create User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
        <input
          type="text"
          placeholder="Filter by department..."
          value={deptFilter}
          onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors min-w-[180px]"
        />
      </div>

      {/* Table */}
      <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/6 bg-white/2">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center"><div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin mx-auto" /></td></tr>
              ) : users.length ? (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-400">{u.email}</td>
                    <td className="py-4 px-4"><StatusBadge status={u.role} /></td>
                    <td className="py-4 px-4 text-sm text-gray-400">{u.department}</td>
                    <td className="py-4 px-4"><StatusBadge status={u.status} /></td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-500">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/6">
            <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                Prev
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs bg-white/4 border border-white/8 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New User">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          {createError && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{createError}</div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input type="text" required value={createForm.name} onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
            <input type="email" required value={createForm.email} onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
            <input type="password" required minLength={8} value={createForm.password} onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Role</label>
            <select required value={createForm.role} onChange={(e) => setCreateForm({...createForm, role: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors appearance-none">
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Department</label>
            <input type="text" required value={createForm.department} onChange={(e) => setCreateForm({...createForm, department: e.target.value})}
              className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors" />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="w-full py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-2 shadow-lg shadow-violet-500/25 disabled:opacity-60 transition-all"
          >
            {creating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create User'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
