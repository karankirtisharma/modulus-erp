import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatsCard from '../../components/ui/StatsCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { Users, ClipboardList, CalendarDays, CheckCircle2, Check, X } from 'lucide-react';

export default function ManagerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [pendingLeaves, setPendingLeaves] = useState<any[]>([]);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, leavesRes, tasksRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/leaves?status=pending&limit=5'),
          api.get('/tasks?limit=5'),
        ]);
        setStats(statsRes.data);
        setPendingLeaves(leavesRes.data.data || []);
        setRecentTasks(tasksRes.data.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleLeaveAction = async (leaveId: string, status: string) => {
    try {
      await api.patch(`/leaves/${leaveId}/approve`, { status });
      setPendingLeaves((prev) => prev.filter((l) => l.id !== leaveId));
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Failed');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Manager Dashboard</h1>
        <p className="text-sm text-gray-500">Team overview and pending actions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="Team Size" value={stats?.teamSize || 0} icon={<Users className="w-6 h-6 text-violet-400" />} dark />
        <StatsCard title="Active Tasks" value={stats?.teamActiveTasks || 0} icon={<ClipboardList className="w-6 h-6 text-blue-400" />} />
        <StatsCard title="Pending Approvals" value={stats?.pendingLeaveApprovals || 0} icon={<CalendarDays className="w-6 h-6 text-amber-500" />} />
        <StatsCard title="Completed Tasks" value={stats?.teamCompletedTasks || 0} icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Approvals */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pending Leave Approvals</h2>
          <div className="space-y-3">
            {pendingLeaves.length ? pendingLeaves.map((l) => (
              <div key={l.id} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/4">
                <div>
                  <p className="text-sm font-medium text-white">{l.employeeId?.name}</p>
                  <p className="text-xs text-gray-500">{l.leaveType} · {new Date(l.startDate).toLocaleDateString()} — {new Date(l.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleLeaveAction(l.id, 'approved')} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"><Check className="w-4 h-4" /></button>
                  <button onClick={() => handleLeaveAction(l.id, 'rejected')} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><X className="w-4 h-4" /></button>
                </div>
              </div>
            )) : <p className="text-sm text-gray-500 text-center py-6">No pending approvals</p>}
          </div>
        </div>

        {/* Team Tasks */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Team Tasks</h2>
          <div className="space-y-3">
            {recentTasks.length ? recentTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/4">
                <div>
                  <p className="text-sm font-medium text-white">{t.title}</p>
                  <p className="text-xs text-gray-500">{t.assignedTo?.name} · Due {new Date(t.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <StatusBadge status={t.priority} />
                  <StatusBadge status={t.status} />
                </div>
              </div>
            )) : <p className="text-sm text-gray-500 text-center py-6">No tasks yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
