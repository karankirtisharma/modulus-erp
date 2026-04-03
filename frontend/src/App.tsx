/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ManagementPage from './components/ManagementPage';
import DashboardPage from './components/DashboardPage';
import AnalyticsPage from './components/AnalyticsPage';

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans text-gray-800">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px) opacity(0.6)',
          transform: 'scale(1.05)'
        }}
      />

      {/* Floating Glass Shapes */}
      <div className="absolute top-[10%] left-[20%] w-32 h-32 bg-white/20 backdrop-blur-3xl rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] border border-white/30 z-0 animate-pulse" />
      <div className="absolute bottom-[5%] left-[45%] w-48 h-48 bg-white/20 backdrop-blur-3xl rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] border border-white/30 z-0 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[15%] right-[15%] w-24 h-24 bg-white/20 backdrop-blur-3xl rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] border border-white/30 z-0 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main Glass Container */}
      <div className="relative z-10 w-full max-w-[1600px] h-[90vh] min-h-[800px] bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] flex overflow-hidden p-6 gap-6">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 flex flex-col gap-6 overflow-hidden">
          {activePage === 'Dashboard' && <DashboardPage />}
          {activePage === 'Management' && <ManagementPage />}
          {activePage === 'Analytics' && <AnalyticsPage />}
        </main>
      </div>
    </div>
  );
}
