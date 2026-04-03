import React from 'react';
import { Share2, MoreVertical, Plus, Search, Bell, Download, Check, Circle, CheckCircle2, Gift, Stethoscope, LayoutGrid, List, MoreHorizontal, Pin, Edit2, Trash2, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold tracking-tight">Operations Overview</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:bg-black transition-colors">
            <Plus className="w-4 h-4" />
            Create
          </button>
          <button className="bg-white/50 p-3 rounded-full border border-white/60 shadow-sm hover:bg-white/70 transition-colors">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button className="bg-white/50 p-3 rounded-full border border-white/60 relative shadow-sm hover:bg-white/70 transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
          </button>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
            alt="Dilan"
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Employees Online</p>
            <h3 className="text-3xl font-semibold">248</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <Circle className="w-6 h-6 fill-current" />
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Pending Approvals</p>
            <h3 className="text-3xl font-semibold">12</h3>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Critical Tasks</p>
            <h3 className="text-3xl font-semibold text-red-600">7</h3>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <Bell className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto pr-2 pb-2 custom-scrollbar">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Work Summary */}
          <div className="col-span-12 lg:col-span-4 bg-[#1a1a1a] text-white rounded-[32px] p-6 shadow-xl flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-medium">Work Summary</h2>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><Share2 className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex gap-6 mb-8">
              <div>
                <div className="text-5xl font-semibold mb-1">142</div>
                <div className="text-sm text-gray-400 leading-tight">Tasks<br/>Completed</div>
              </div>
              <div>
                <div className="text-5xl font-semibold mb-1">38</div>
                <div className="text-sm text-gray-400 leading-tight">Active<br/>Tasks</div>
              </div>
            </div>
            <div className="flex gap-3 mt-auto">
              <div className="flex-1 bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold text-red-400">7</div>
                <div className="text-xs text-gray-400">Blocked Tasks</div>
              </div>
              <div className="flex-1 bg-white text-black rounded-2xl p-4 flex flex-col items-center justify-center">
                <div className="text-2xl font-semibold">12</div>
                <div className="text-xs text-gray-500 text-center">Pending<br/>Approvals</div>
              </div>
            </div>
          </div>

          {/* Team Activity (Weekly) */}
          <div className="col-span-12 lg:col-span-4 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-medium">Team Activity (Weekly)</h2>
              <button className="p-1.5 hover:bg-white/50 rounded-full transition-colors"><Share2 className="w-4 h-4 text-gray-600" /></button>
            </div>
            <div className="flex gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-black rounded-full"></div>Completed Tasks</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-gray-400 rounded-full"></div>Assigned Tasks</div>
            </div>
            <div className="flex-1 relative min-h-[150px] w-full flex items-end">
              {/* Mock Chart */}
              <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0,40 Q10,35 20,40 T40,30 T60,45 T80,10 T100,20" fill="none" stroke="black" strokeWidth="1.5" />
                <path d="M0,45 Q15,45 30,35 T60,35 T80,40 T100,35" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
                <circle cx="80" cy="10" r="2" fill="black" />
                <rect x="73" y="2" width="14" height="6" rx="2" fill="black" />
                <text x="80" y="6" fill="white" fontSize="3" textAnchor="middle" fontWeight="bold">+24%</text>
              </svg>
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 font-medium px-1">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center -mt-1">S</span><span>S</span>
              </div>
            </div>
          </div>

          {/* Monthly Performance */}
          <div className="col-span-12 lg:col-span-4 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-xl font-medium">Monthly Performance</h2>
              <button className="p-1.5 hover:bg-white/50 rounded-full transition-colors"><Share2 className="w-4 h-4 text-gray-600" /></button>
            </div>
            <p className="text-xs text-gray-500 mb-6">Task Completion Rate & Productivity</p>
            
            <div className="flex items-center justify-between mb-auto">
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"></div>Task Completion Rate</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-600 rounded-full"></div>Productivity Score</div>
              </div>
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="black" strokeWidth="3" strokeDasharray="85, 100" />
                  <path d="M18 6 a 12 12 0 0 1 0 24 a 12 12 0 0 1 0 -24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="92, 100" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">85%</span>
                  <span className="text-[8px] text-gray-500 -mt-1">avg rate</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-[#1a1a1a] text-white p-3 rounded-full hover:bg-black transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex-1 bg-white border border-gray-200 text-black py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                Download Report <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="col-span-12 lg:col-span-3 bg-white/40 backdrop-blur-md rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Pending Approvals</h2>
              <div className="flex items-center gap-2">
                <div className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-full">3 Action Required</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center"></div>
                <span className="text-sm font-medium">Leave Request - John D.</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center"></div>
                <span className="text-sm font-medium">Expense Approval - Q3</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center"></div>
                <span className="text-sm font-medium">Task Extension - API Auth</span>
              </label>
            </div>
          </div>

          {/* Active Workflows */}
          <div className="col-span-12 lg:col-span-9 flex flex-col">
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="text-xl font-medium">Active Workflows</h2>
              <button className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {/* Task Card 1 */}
              <div className="min-w-[240px] bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 flex flex-col relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    In Progress
                  </div>
                  <button className="p-1 text-gray-400 hover:text-black"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <h3 className="text-lg font-medium leading-tight mb-2">Database Migration</h3>
                <p className="text-sm text-gray-500 mb-4">Assigned: Backend Team</p>
                <div className="mt-auto flex justify-between items-end">
                  <span className="text-xs text-gray-400">Deadline: Oct 15</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">BT</span>
                  </div>
                </div>
              </div>

              {/* Task Card 2 */}
              <div className="min-w-[240px] bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 flex flex-col relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    Review
                  </div>
                  <button className="p-1 text-gray-400 hover:text-black"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <h3 className="text-lg font-medium leading-tight mb-2">Q3 Financial Report</h3>
                <p className="text-sm text-gray-500 mb-4">Assigned: Finance Team</p>
                <div className="mt-auto flex justify-between items-end">
                  <span className="text-xs text-gray-400">Deadline: Oct 12</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">FT</span>
                  </div>
                </div>
              </div>

              {/* Add Task */}
              <button className="min-w-[200px] rounded-[28px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-white/20 hover:border-gray-400 transition-all gap-2">
                <Plus className="w-6 h-6" />
                <span className="font-medium">New Workflow</span>
              </button>
            </div>
          </div>

          {/* Active Projects */}
          <div className="col-span-12 flex flex-col mt-2">
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="text-xl font-medium">Active Projects</h2>
              <div className="flex items-center gap-4">
                <button className="text-sm text-gray-600 flex items-center gap-1 font-medium">
                  Sort by <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
                <div className="flex items-center gap-2 bg-white/50 p-1 rounded-lg border border-white/60">
                  <button className="p-1 bg-white rounded shadow-sm"><LayoutGrid className="w-4 h-4 text-black" /></button>
                  <button className="p-1 text-gray-500 hover:text-black"><List className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project 1 */}
              <div className="bg-[#2a2a2a] text-white rounded-[24px] p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">ERP System Upgrade</h3>
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-[10px] font-medium">
                    65%
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> In progress
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mt-auto">
                  <span className="text-white">Assigned:</span> Core Engineering Team
                </p>
              </div>

              {/* Project 2 */}
              <div className="bg-[#2a2a2a] text-white rounded-[24px] p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Client Portal v2</h3>
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-medium">
                    100%
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Completed
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mt-auto">
                  <span className="text-white">Assigned:</span> Frontend Team
                </p>
              </div>

              {/* Project 3 */}
              <div className="bg-[#2a2a2a] text-white rounded-[24px] p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Security Audit 2024</h3>
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-[10px] font-medium">
                    25%
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div> Planning
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mt-auto">
                  <span className="text-white">Assigned:</span> Security Ops
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
