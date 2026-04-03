import React from 'react';
import { Home, Calendar, BarChart2, MoreHorizontal, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activePage?: string;
  onPageChange?: (page: string) => void;
}

export default function Sidebar({ activePage = 'Dashboard', onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 flex flex-col justify-between h-full py-4">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 mb-12">
          <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white font-bold text-xl rounded-tl-none">
            C
          </div>
          <span className="text-xl font-semibold tracking-tight">Coders</span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 px-4">
          <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={activePage === 'Dashboard'} onClick={() => onPageChange?.('Dashboard')} />
          <NavItem icon={<Home className="w-5 h-5" />} label="Management" active={activePage === 'Management'} onClick={() => onPageChange?.('Management')} />
          <NavItem icon={<Calendar className="w-5 h-5" />} label="Schedule" />
          <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" active={activePage === 'Analytics'} onClick={() => onPageChange?.('Analytics')} />
        </nav>
      </div>

      {/* User Profile */}
      <div className="px-6 flex flex-col items-center gap-3 mt-auto">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
          alt="Ann Kowalski"
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div className="text-center">
          <p className="text-sm font-medium">Ann Kowalski</p>
          <MoreHorizontal className="w-4 h-4 text-gray-400 mx-auto mt-1" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all w-full text-left ${
        active
          ? 'bg-[#1a1a1a] text-white shadow-lg'
          : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
