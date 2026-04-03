import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  dark?: boolean;
}

export default function StatsCard({ title, value, icon, trend, trendUp, dark = false }: StatsCardProps) {
  return (
    <div
      className={`rounded-3xl p-6 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
        dark
          ? 'bg-[#1a1a1a] text-white shadow-xl'
          : 'bg-white/40 backdrop-blur-md border border-white/50 shadow-sm'
      }`}
    >
      <div>
        <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          {title}
        </p>
        <h3 className="text-3xl font-semibold">{value}</h3>
        {trend && (
          <p className={`text-xs mt-1 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend}
          </p>
        )}
      </div>
      {icon && (
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          dark ? 'bg-white/10' : 'bg-gray-100'
        }`}>
          {icon}
        </div>
      )}
    </div>
  );
}
