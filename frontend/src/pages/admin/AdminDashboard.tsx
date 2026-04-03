import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import StatsCard from '../../components/ui/StatsCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { Users, ClipboardList, CalendarDays, CheckCircle2, Building2, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalEmployees: number;
  activeTasks: number;
  pendingLeaves: number;
  completedTasks: number;
  departmentStats: { dept: string; employees: number; activeTasks: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/tasks?limit=5'),
        ]);
        setStats(statsRes.data);
        setRecentTasks(tasksRes.data.data || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Global system overview and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Employees"
          value={stats?.totalEmployees || 0}
          icon={<Users className="w-6 h-6 text-violet-400" />}
          dark
        />
        <StatsCard
          title="Active Tasks"
          value={stats?.activeTasks || 0}
          icon={<ClipboardList className="w-6 h-6 text-blue-400" />}
        />
        <StatsCard
          title="Pending Leaves"
          value={stats?.pendingLeaves || 0}
          icon={<CalendarDays className="w-6 h-6 text-amber-500" />}
        />
        <StatsCard
          title="Completed Tasks"
          value={stats?.completedTasks || 0}
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Stats */}
        <div className="lg:col-span-1 bg-white/3 border border-white/6 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Departments</h2>
          </div>
          <div className="space-y-4">
            {stats?.departmentStats?.length ? (
              stats.departmentStats.map((dept) => (
                <div key={dept.dept} className="flex items-center justify-between p-3 bg-white/2 rounded-xl border border-white/4">
                  <div>
                    <p className="text-sm font-medium text-white">{dept.dept}</p>
                    <p className="text-xs text-gray-500">{dept.employees} members</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-violet-400">{dept.activeTasks}</p>
                    <p className="text-xs text-gray-500">active tasks</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No department data yet</p>
            )}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white/3 border border-white/6 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/6">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 pr-4">Assigned To</th>
                  <th className="pb-3 pr-4">Priority</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.length ? (
                  recentTasks.map((task: any) => (
                    <tr key={task.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                      <td className="py-3.5 pr-4 text-sm font-medium text-white">{task.title}</td>
                      <td className="py-3.5 pr-4 text-sm text-gray-400">{task.assignedTo?.name || '—'}</td>
                      <td className="py-3.5 pr-4"><StatusBadge status={task.priority} /></td>
                      <td className="py-3.5 pr-4"><StatusBadge status={task.status} /></td>
                      <td className="py-3.5 text-sm text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="py-8 text-center text-sm text-gray-500">No tasks yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
