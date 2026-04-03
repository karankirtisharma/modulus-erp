import React from 'react';

export default function Timeline() {
  const categories = ['UI Team', 'Backend Team', 'Marketing Team', 'Product Team', 'HR Operations'];
  const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Team Workload Timeline</h3>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <div className="w-2 h-2 bg-[#1a1a1a] rounded-full"></div> Active Task
          <div className="w-2 h-2 bg-white border border-gray-300 rounded-full ml-2"></div> Planning
        </div>
      </div>
      <div className="flex flex-1 relative mt-4">
        {/* Y-axis Labels */}
        <div className="w-32 flex flex-col justify-between pb-8 z-10">
          {categories.map((cat, i) => (
            <div key={i} className="text-xs font-medium text-gray-500 h-10 flex items-center">
              {cat}
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative">
          {/* Vertical Grid Lines & X-axis Labels */}
          <div className="absolute inset-0 flex justify-between">
            {hours.map((hour, i) => (
              <div key={i} className="flex flex-col items-center h-full relative w-0">
                <div className="absolute top-0 bottom-8 border-l border-dashed border-gray-300/50" />
                <span className="absolute bottom-0 text-[10px] font-medium text-gray-400 whitespace-nowrap -translate-x-1/2">
                  {hour}
                </span>
              </div>
            ))}
          </div>

          {/* Task Bars */}
          <div className="absolute inset-0 top-0 bottom-8 flex flex-col justify-between py-2">
            {/* UI Team */}
            <div className="h-10 relative flex items-center">
              <TaskBar start={0} width={45} label="Design System Update" avatars={['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=12']} duration="4h" />
            </div>
            {/* Backend Team */}
            <div className="h-10 relative flex items-center">
              <TaskBar start={20} width={30} label="API Optimization" avatars={['https://i.pravatar.cc/150?img=13']} duration="2.5h" />
            </div>
            {/* Marketing Team */}
            <div className="h-10 relative flex items-center">
              <TaskBar start={10} width={60} label="Campaign Assets" avatars={['https://i.pravatar.cc/150?img=14', 'https://i.pravatar.cc/150?img=15']} duration="5h" hasPlus />
            </div>
            {/* Product Team */}
            <div className="h-10 relative flex items-center">
              <TaskBar start={40} width={40} label="Roadmap Review" avatars={['https://i.pravatar.cc/150?img=16', 'https://i.pravatar.cc/150?img=17']} duration="3h" />
            </div>
            {/* HR Operations */}
            <div className="h-10 relative flex items-center">
              <TaskBar start={65} width={20} label="Onboarding" avatars={['https://i.pravatar.cc/150?img=18']} duration="1.5h" variant="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskBar({ start, width, label, avatars, duration, hasPlus, variant = 'dark' }: { start: number, width: number, label: string, avatars: string[], duration: string, hasPlus?: boolean, variant?: 'dark' | 'light' }) {
  return (
    <div
      className={`absolute h-8 rounded-full flex items-center justify-between px-1 shadow-sm ${
        variant === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-white/60 border border-white text-gray-800 backdrop-blur-sm'
      }`}
      style={{ left: `${start}%`, width: `${width}%` }}
    >
      <div className="flex flex-col ml-3 truncate pr-2 min-w-0">
        <span className="text-[9px] font-bold leading-tight uppercase opacity-70">{duration}</span>
        <span className="text-[10px] font-medium leading-tight truncate">{label}</span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <div className="flex -space-x-2">
          {avatars.map((src, i) => (
            <img key={i} src={src} className="w-6 h-6 rounded-full border-2 border-[#1a1a1a] object-cover" alt="avatar" />
          ))}
        </div>
        {hasPlus && (
          <button className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <span className="text-xs leading-none">+</span>
          </button>
        )}
      </div>
    </div>
  );
}
