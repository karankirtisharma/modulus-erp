import React from 'react';
import { Calendar, ChevronRight, Video, Clock, Sun, Search, Bell, Inbox } from 'lucide-react';
import Timeline from './Timeline';
import OngoingProjects from './OngoingProjects';
import FilePreview from './FilePreview';
import FilesList from './FilesList';
import TeamSection from './TeamSection';

export default function ManagementPage() {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      {/* Header Row */}
      <div className="flex justify-between items-start">
        {/* Left Header */}
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-4">Team Operations</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white/50 px-4 py-2 rounded-full border border-white/60 shadow-sm">
              <Calendar className="w-4 h-4" />
              <span>APRIL 2, 2026</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="flex items-center bg-white/50 rounded-full p-1 border border-white/60 text-sm font-medium shadow-sm">
              <button className="px-4 py-1.5 bg-white rounded-full shadow-sm text-gray-900">Day</button>
              <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 transition-colors">Week</button>
              <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 transition-colors">Month</button>
              <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 transition-colors">Year</button>
            </div>
          </div>
        </div>
        {/* Right Header */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 rounded-full text-sm font-medium shadow-lg hover:bg-black transition-colors">
            <div className="bg-white/20 p-1.5 rounded-full"><Video className="w-4 h-4" /></div>
            Video conference
          </button>
          <div className="flex items-center gap-3 bg-white/50 px-5 py-3 rounded-full border border-white/60 text-sm font-medium shadow-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>14:07</span>
            <Sun className="w-4 h-4 text-gray-500 ml-2" />
            <span>23° Sunny</span>
          </div>
          <div className="flex items-center bg-white/50 rounded-full border border-white/60 p-1.5 pr-4 shadow-sm">
            <div className="bg-[#1a1a1a] text-white p-2 rounded-full mr-3">
              <Search className="w-4 h-4" />
            </div>
            <input type="text" placeholder="Search operations..." className="bg-transparent border-none outline-none text-sm w-32 placeholder:text-gray-500" />
          </div>
          <button className="bg-[#1a1a1a] text-white p-3.5 rounded-full shadow-lg hover:bg-black transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="bg-white/50 p-3.5 rounded-full border border-white/60 relative shadow-sm hover:bg-white/70 transition-colors">
            <Inbox className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">+9</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 grid grid-cols-12 grid-rows-[1fr_auto_auto] gap-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* Top Row */}
        <div className="col-span-12 lg:col-span-7 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
          <Timeline />
        </div>
        <div className="col-span-12 lg:col-span-3 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
          <OngoingProjects />
        </div>
        <div className="col-span-12 lg:col-span-2 bg-[#0f0f0f] rounded-[32px] p-6 shadow-xl flex flex-col text-white relative overflow-hidden">
          <FilePreview />
        </div>

        {/* Middle Row */}
        <div className="col-span-12 lg:col-span-3 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
          <FilesList />
        </div>
        <div className="col-span-12 lg:col-span-9 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
          <TeamSection />
        </div>

        {/* Bottom Row - Employee Directory */}
        <div className="col-span-12 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Employee Directory</h2>
            <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-4 px-4">Name</th>
                  <th className="pb-4 px-4">Role</th>
                  <th className="pb-4 px-4">Department</th>
                  <th className="pb-4 px-4">Tasks Assigned</th>
                  <th className="pb-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 hover:bg-white/30 transition-colors">
                  <td className="py-4 px-4 font-medium">Alex Johnson</td>
                  <td className="py-4 px-4 text-gray-500">Senior Designer</td>
                  <td className="py-4 px-4 text-gray-500">UI/UX Team</td>
                  <td className="py-4 px-4 text-gray-500">12</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Active</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-white/30 transition-colors">
                  <td className="py-4 px-4 font-medium">Sarah Williams</td>
                  <td className="py-4 px-4 text-gray-500">Backend Lead</td>
                  <td className="py-4 px-4 text-gray-500">Backend Team</td>
                  <td className="py-4 px-4 text-gray-500">8</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase">On Leave</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/30 transition-colors">
                  <td className="py-4 px-4 font-medium">Michael Chen</td>
                  <td className="py-4 px-4 text-gray-500">Marketing Manager</td>
                  <td className="py-4 px-4 text-gray-500">Marketing Team</td>
                  <td className="py-4 px-4 text-gray-500">15</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
