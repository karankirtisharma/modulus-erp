import React from 'react';
import { Search, Bell, Calendar as CalendarIcon, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-medium tracking-tight">Business Insights</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/50 rounded-full border border-white/60 p-2 pr-4 shadow-sm">
            <Search className="w-5 h-5 text-gray-500 ml-2 mr-2" />
            <input type="text" placeholder="Search insights..." className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-gray-500" />
          </div>
          <button className="bg-white/50 p-3 rounded-full border border-white/60 relative shadow-sm hover:bg-white/70 transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>

      {/* Date Filters */}
      <div className="flex justify-end items-center gap-4">
        <div className="flex items-center bg-white/50 rounded-full p-1 border border-white/60 text-sm font-medium shadow-sm">
          <button className="px-5 py-2 text-gray-500 hover:text-gray-900 transition-colors">Day</button>
          <button className="px-5 py-2 text-gray-500 hover:text-gray-900 transition-colors">Week</button>
          <button className="px-5 py-2 bg-gray-400 text-white rounded-full shadow-sm">Month</button>
          <button className="px-5 py-2 text-gray-500 hover:text-gray-900 transition-colors">Year</button>
        </div>
        <div className="flex items-center gap-2 bg-white/50 px-5 py-2.5 rounded-full border border-white/60 text-sm font-medium shadow-sm">
          <CalendarIcon className="w-4 h-4 text-gray-600" />
          <span>1 Sep 2024 - 31 Sep 2024</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-2 custom-scrollbar">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-[#1a1a1a] text-white rounded-[32px] p-6 shadow-xl flex flex-col justify-between h-36">
            <span className="text-gray-400 text-sm">Active Employees</span>
            <div className="text-3xl font-semibold">248</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12 from last week</span>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col justify-between h-36">
            <span className="text-gray-500 text-sm">Tasks Completed</span>
            <div className="text-3xl font-semibold">1,240</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <ArrowUpRight className="w-3 h-3" />
              <span>8.4% efficiency increase</span>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col justify-between h-36">
            <span className="text-gray-500 text-sm">Pending Approvals</span>
            <div className="text-3xl font-semibold">12</div>
            <div className="flex items-center gap-1 text-xs text-red-500">
              <ArrowDownRight className="w-3 h-3" />
              <span>-3 from yesterday</span>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col justify-between h-36">
            <span className="text-gray-500 text-sm">Avg Task Completion Time</span>
            <div className="text-3xl font-semibold">4.2h</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <ArrowUpRight className="w-3 h-3" />
              <span>12% faster than Q3</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {/* Chart */}
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col h-80 relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-medium">Task Completion Trends</h2>
                  <div className="flex gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                      <div className="w-2 h-2 bg-[#2a2a2a] rounded-full"></div> Completed
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div> Pending
                    </div>
                  </div>
                </div>
                <button className="p-2 bg-white/50 rounded-full hover:bg-white/70 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 flex items-end gap-4 relative pl-8 pb-6">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400 py-2">
                  <span>200</span>
                  <span>150</span>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>
                {/* Bars */}
                <div className="flex-1 flex justify-between items-end h-full pt-4 px-2">
                  {[
                    { c: 60, p: 20 },
                    { c: 80, p: 30 },
                    { c: 120, p: 40 },
                    { c: 90, p: 25 },
                    { c: 150, p: 35 },
                    { c: 110, p: 20 }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 w-12">
                      <div className="w-full flex flex-col-reverse items-center h-48 relative">
                        <div className="w-8 bg-[#2a2a2a] rounded-t-lg" style={{ height: `${item.c}%` }}></div>
                        <div className="w-8 bg-gray-300 rounded-t-lg absolute bottom-0 opacity-50" style={{ height: `${item.p}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 px-4">
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span className="font-medium text-black">Mar</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Activity Logs</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/50 rounded-full hover:bg-white/70 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/50 rounded-full hover:bg-white/70 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-500 border-b border-white/50">
                    <tr>
                      <th className="pb-4 font-medium">User</th>
                      <th className="pb-4 font-medium">Action</th>
                      <th className="pb-4 font-medium">Module</th>
                      <th className="pb-4 font-medium">Time</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { user: 'Alex Johnson', action: 'Approved Leave', module: 'HR Ops', time: '14:02', status: 'Success' },
                      { user: 'Sarah Williams', action: 'Updated API', module: 'Backend', time: '13:45', status: 'Success' },
                      { user: 'Michael Chen', action: 'Created Campaign', module: 'Marketing', time: '12:30', status: 'Pending' },
                      { user: 'System', action: 'Backup Completed', module: 'Infrastructure', time: '12:00', status: 'Success' }
                    ].map((log, i) => (
                      <tr key={i} className="border-b border-white/30 last:border-0">
                        <td className="py-4 font-medium">{log.user}</td>
                        <td className="py-4 text-gray-600">{log.action}</td>
                        <td className="py-4 text-gray-500">{log.module}</td>
                        <td className="py-4 text-gray-500">{log.time}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* New Section: Department Analytics */}
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col mb-6">
              <h2 className="text-lg font-medium mb-6">Department Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/30 p-4 rounded-2xl border border-white/40">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Tasks per Department</p>
                  <div className="space-y-3">
                    {[
                      { name: 'UI/UX', count: 45, color: 'bg-black' },
                      { name: 'Backend', count: 78, color: 'bg-gray-600' },
                      { name: 'Marketing', count: 32, color: 'bg-gray-400' }
                    ].map((dept, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs font-medium">{dept.name}</span>
                        <div className="flex items-center gap-2 flex-1 mx-4">
                          <div className="h-1.5 flex-1 bg-white/50 rounded-full overflow-hidden">
                            <div className={`h-full ${dept.color}`} style={{ width: `${(dept.count / 80) * 100}%` }}></div>
                          </div>
                        </div>
                        <span className="text-xs font-bold">{dept.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/30 p-4 rounded-2xl border border-white/40">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Completion Rate</p>
                  <div className="flex flex-col items-center justify-center h-24">
                    <span className="text-3xl font-bold">94.2%</span>
                    <span className="text-[10px] text-green-600 font-bold">+2.1% this week</span>
                  </div>
                </div>
                <div className="bg-white/30 p-4 rounded-2xl border border-white/40">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Bottlenecks</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                      <span>API Documentation Delay</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-yellow-600 font-medium">
                      <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                      <span>Asset Approval Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* Activity Timeline */}
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col items-center">
              <div className="flex justify-between items-center w-full mb-6">
                <button className="p-1 hover:bg-white/50 rounded-full"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
                <span className="font-medium">Activity Timeline</span>
                <button className="p-1 hover:bg-white/50 rounded-full"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
              </div>
              <div className="grid grid-cols-5 gap-y-6 gap-x-4 w-full text-center text-sm">
                <div className="text-gray-400">Tue</div>
                <div className="text-gray-400">Wed</div>
                <div className="text-gray-400">Thu</div>
                <div className="text-gray-400">Fri</div>
                <div className="text-gray-400">Sat</div>
                
                <div className="font-medium">17</div>
                <div className="font-medium">18</div>
                <div className="bg-black text-white w-8 h-10 rounded-full flex items-center justify-center mx-auto shadow-md">19</div>
                <div className="font-medium">20</div>
                <div className="font-medium">21</div>
              </div>
            </div>

            {/* Productivity Growth */}
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">Productivity Growth</h3>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12.4% task efficiency</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Vs previous period</p>
              </div>
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="black" strokeWidth="4" strokeDasharray="82, 100" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
