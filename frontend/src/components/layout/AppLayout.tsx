import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex relative overflow-hidden font-sans text-white">
      {/* Ambient glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] right-[20%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar */}
      <div className="h-screen sticky top-0 border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl z-20">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
