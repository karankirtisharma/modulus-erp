import React from 'react';
import { Grid } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value1: 20, value2: 10 },
  { value1: 40, value2: 25 },
  { value1: 30, value2: 45 },
  { value1: 60, value2: 30 },
  { value1: 45, value2: 50 },
  { value1: 70, value2: 40 },
];

export default function OngoingProjects() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
          <p className="text-xs text-gray-500 mt-1">Efficiency trend</p>
          <div className="text-2xl font-bold text-gray-900 mt-1">92.4%</div>
          <p className="text-[10px] text-gray-400">Average team output</p>
        </div>
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <Grid className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="h-24 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value1" stroke="#1a1a1a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="value2" stroke="#a0a0a0" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <ProjectStat label="UI Team Performance" value="94.2%" color="bg-[#1a1a1a]" />
        <ProjectStat label="Backend Team Performance" value="89.5%" color="bg-gray-400" />
        <ProjectStat label="Marketing Team Performance" value="91.8%" color="bg-gray-200" />
      </div>
    </div>
  );
}

function ProjectStat({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between text-xs font-medium">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}
