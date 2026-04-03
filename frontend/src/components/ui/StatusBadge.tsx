import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusColors: Record<string, string> = {
  // Task/Leave statuses
  pending: 'bg-amber-100 text-amber-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  // User statuses
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-gray-200 text-gray-600',
  // Priority
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
  // Roles
  admin: 'bg-purple-100 text-purple-700',
  manager: 'bg-indigo-100 text-indigo-700',
  employee: 'bg-teal-100 text-teal-700',
};

const statusLabels: Record<string, string> = {
  'in-progress': 'In Progress',
  pending: 'Pending',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
  active: 'Active',
  inactive: 'Inactive',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  admin: 'Admin',
  manager: 'Manager',
  employee: 'Employee',
  sick: 'Sick',
  casual: 'Casual',
  annual: 'Annual',
  unpaid: 'Unpaid',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-600';
  const label = statusLabels[status] || status;

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-wide ${colorClass} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
    >
      {label}
    </span>
  );
}
