import React from 'react';
import { ArrowRight, Users, Activity, TrendingUp } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, LineChart, Line } from 'recharts';

const sparklineData = [{v: 10}, {v: 25}, {v: 15}, {v: 40}, {v: 20}, {v: 50}, {v: 30}];
const barData = [{v: 20}, {v: 40}, {v: 30}, {v: 60}, {v: 45}, {v: 70}, {v: 50}, {v: 80}, {v: 65}];

export default function TeamSection() {
  return (
    <div className="flex flex-col h-full">
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-semibold text-gray-900">Departments</h3>
          <button className="bg-[#1a1a1a] text-white p-1.5 rounded-full hover:bg-black transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <StatItem icon={<Users className="w-4 h-4" />} label="Total Employees" value="48" change="+2" />
          <StatItem icon={<Activity className="w-4 h-4" />} label="Active Tasks" value="156" change="+12" />
          <StatItem icon={<TrendingUp className="w-4 h-4" />} label="Efficiency" value="94%" sparkline />
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-4 flex-1">
        <TeamCard
          title="UI/UX Team"
          subtitle="Product Design"
          avatars={['https://i.pravatar.cc/150?img=31', 'https://i.pravatar.cc/150?img=32', 'https://i.pravatar.cc/150?img=33']}
          progress={85}
          val1="12 Tasks"
          val2="8 Members"
        />
        <TeamCard
          title="Backend Team"
          subtitle="Core Infrastructure"
          avatars={['https://i.pravatar.cc/150?img=41', 'https://i.pravatar.cc/150?img=42', 'https://i.pravatar.cc/150?img=43']}
          progress={62}
          val1="24 Tasks"
          val2="12 Members"
        />
        <TeamCard
          title="Marketing Team"
          subtitle="Growth & Brand"
          avatars={['https://i.pravatar.cc/150?img=51', 'https://i.pravatar.cc/150?img=52', 'https://i.pravatar.cc/150?img=53']}
          progress={45}
          val1="18 Tasks"
          val2="6 Members"
        />
        <div className="flex-1 bg-[#0f0f0f] rounded-[24px] p-5 text-white flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 50% 150%, rgba(255,255,255,0.4) 0%, transparent 50%)'
          }} />
          <h4 className="text-sm font-semibold mb-auto relative z-10">HR Team</h4>
          <div className="mt-auto relative z-10">
            <div className="flex justify-between text-[10px] text-gray-400 font-medium mb-2">
              <span>COMPLETION</span>
              <span>92%</span>
            </div>
            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-white rounded-full" style={{ width: '92%' }} />
            </div>
            <div className="flex gap-4 text-[10px] font-medium border-t border-white/10 pt-3">
              <span>4 Active Tasks</span>
              <span>5 Members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value, change, sparkline }: { icon: React.ReactNode, label: string, value: string, change?: string, sparkline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#1a1a1a] text-white p-2 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 font-medium">{label}</p>
        <div className="flex items-end gap-2">
          <span className="text-lg font-bold text-gray-900 leading-none">{value}</span>
          {change && <span className="text-[10px] font-medium text-gray-500 mb-0.5">{change}</span>}
          {sparkline && (
            <div className="w-16 h-4 mb-0.5 ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line type="monotone" dataKey="v" stroke="#1a1a1a" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamCard({ title, subtitle, avatars, progress, val1, val2 }: { title: string, subtitle: string, avatars: string[], progress: number, val1: string, val2: string }) {
  return (
    <div className="flex-1 bg-[#0f0f0f] rounded-[24px] p-5 text-white flex flex-col relative overflow-hidden">
      {/* Abstract wavy background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 60%)'
      }} />

      <div className="relative z-10">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-[10px] text-gray-400 mt-0.5">{subtitle}</p>

        <div className="flex -space-x-2 mt-4">
          {avatars.map((src, i) => (
            <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-[#0f0f0f] object-cover" alt="avatar" />
          ))}
        </div>
      </div>

      <div className="mt-auto relative z-10">
        <div className="flex justify-between text-[10px] text-gray-400 font-medium mb-2">
          <span>PROGRESS</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-4 text-xs font-medium border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border border-white/50" /> {val1}</div>
          <div className="flex items-center gap-1.5"><Users className="w-3 h-3 text-white/50" /> {val2}</div>
        </div>
      </div>
    </div>
  );
}
