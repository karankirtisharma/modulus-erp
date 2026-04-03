import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatsCard from '../../components/ui/StatsCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { ClipboardList, CheckCircle2, CalendarDays, Clock } from 'lucide-react';

export default function EmployeeDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [pendingLeaves, setPendingLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, tasksRes, leavesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/tasks?limit=5'),
          api.get('/leaves?status=pending&limit=3'),
        ]);
        setStats(statsRes.data);
        setRecentTasks(tasksRes.data.data || []);
        setPendingLeaves(leavesRes.data.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">My Dashboard</h1>
        <p className="text-sm text-gray-500">Your personal overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="Active Tasks" value={stats?.myActiveTasks || 0} icon={<ClipboardList className="w-6 h-6 text-blue-400" />} dark />
        <StatsCard title="Completed Tasks" value={stats?.myCompletedTasks || 0} icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />} />
        <StatsCard title="Leave Balance" value={stats?.leaveBalance ?? 0} icon={<CalendarDays className="w-6 h-6 text-violet-400" />} />
        <StatsCard title="Pending Leaves" value={stats?.pendingLeaveRequest || 0} icon={<Clock className="w-6 h-6 text-amber-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {recentTasks.length ? recentTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/4">
                <div>
                  <p className="text-sm font-medium text-white">{t.title}</p>
                  <p className="text-xs text-gray-500">Due {new Date(t.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={t.priority} />
                  <StatusBadge status={t.status} />
                </div>
              </div>
            )) : <p className="text-sm text-gray-500 text-center py-6">No tasks assigned</p>}
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pending Leave Requests</h2>
          <div className="space-y-3">
            {pendingLeaves.length ? pendingLeaves.map((l) => (
              <div key={l.id} className="p-4 bg-amber-500/4 rounded-xl border border-amber-500/10">
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status={l.leaveType} size="md" />
                  <StatusBadge status={l.status} />
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(l.startDate).toLocaleDateString()} — {new Date(l.endDate).toLocaleDateString()}
                </p>
              </div>
            )) : (
              <div className="text-center py-6">
                <p className="text-sm text-gray-500">No pending requests</p>
                <p className="text-xs text-gray-600 mt-1">Apply for leave from the Leaves page</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
