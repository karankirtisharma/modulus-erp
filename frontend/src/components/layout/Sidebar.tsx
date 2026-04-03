import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CalendarDays,
  BarChart3,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navByRole: Record<string, NavItem[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Employees', path: '/admin/employees', icon: <Users className="w-5 h-5" /> },
    { label: 'Tasks', path: '/admin/tasks', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Leaves', path: '/admin/leaves', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
  manager: [
    { label: 'Dashboard', path: '/manager', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Tasks', path: '/manager/tasks', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Leaves', path: '/manager/leaves', icon: <CalendarDays className="w-5 h-5" /> },
  ],
  employee: [
    { label: 'Dashboard', path: '/employee', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'My Tasks', path: '/employee/tasks', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'My Leaves', path: '/employee/leaves', icon: <CalendarDays className="w-5 h-5" /> },
  ],
};

export default function Sidebar() {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const navItems = navByRole[role || 'employee'] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 flex flex-col justify-between h-full py-4 shrink-0">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30">
            M
          </div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            MODULUS
          </span>
        </div>

        {/* Role badge */}
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-400 capitalize">{role}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/admin` || item.path === `/manager` || item.path === `/employee`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-lg shadow-white/10 font-semibold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User profile + logout */}
      <div className="px-4 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
