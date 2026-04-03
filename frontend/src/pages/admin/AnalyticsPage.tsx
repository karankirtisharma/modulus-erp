import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { BarChart3, TrendingUp, Users, CalendarDays } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" /></div>;
  }

  const maxTasks = Math.max(...(stats?.departmentStats?.map((d: any) => d.activeTasks + d.employees) || [1]));
  const completionRate = stats ? Math.round((stats.completedTasks / Math.max(1, stats.completedTasks + stats.activeTasks)) * 100) : 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-sm text-gray-500">System-wide performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><Users className="w-5 h-5 text-violet-400" /></div>
            <span className="text-sm text-gray-400">Total Employees</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.totalEmployees || 0}</p>
        </div>
        <div className="bg-white/3 rounded-2xl p-6 border border-white/6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-blue-400" /></div>
            <span className="text-sm text-gray-400">Active Tasks</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.activeTasks || 0}</p>
        </div>
        <div className="bg-white/3 rounded-2xl p-6 border border-white/6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-400" /></div>
            <span className="text-sm text-gray-400">Completion Rate</span>
          </div>
          <p className="text-3xl font-bold text-white">{completionRate}%</p>
        </div>
        <div className="bg-white/3 rounded-2xl p-6 border border-white/6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><CalendarDays className="w-5 h-5 text-amber-400" /></div>
            <span className="text-sm text-gray-400">Pending Leaves</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.pendingLeaves || 0}</p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department bar chart */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Department Productivity</h2>
          <div className="space-y-4">
            {stats?.departmentStats?.length ? (
              stats.departmentStats.map((dept: any) => (
                <div key={dept.dept}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{dept.dept}</span>
                    <span className="text-white font-medium">{dept.employees} members · {dept.activeTasks} tasks</span>
                  </div>
                  <div className="h-2 bg-white/4 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, ((dept.activeTasks + dept.employees) / maxTasks) * 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No department data</p>
            )}
          </div>
        </div>

        {/* Completion donut */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-white mb-6 self-start">Task Completion</h2>
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="url(#gradient)" strokeWidth="3"
                strokeDasharray={`${completionRate * 0.88} 100`} strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{completionRate}%</span>
              <span className="text-xs text-gray-500">completed</span>
            </div>
          </div>
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats?.completedTasks || 0}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats?.activeTasks || 0}</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
