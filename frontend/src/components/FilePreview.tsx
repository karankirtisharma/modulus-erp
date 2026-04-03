import React from 'react';
import { FileText, MoreHorizontal } from 'lucide-react';

export default function FilePreview() {
  return (
    <div className="flex flex-col h-full relative z-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
          <FileText className="w-4 h-4" />
          <span className="text-xs font-medium">File Preview</span>
        </div>
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 relative rounded-2xl overflow-hidden mb-4 bg-gradient-to-b from-transparent to-black/50 flex items-center justify-center">
        {/* 3D Fluid Image */}
        <img
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop"
          alt="3D Fluid"
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
        />
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <h4 className="text-sm font-semibold">Video Scope.mp4</h4>
          <p className="text-[10px] text-gray-400">23 GB, 01...</p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
          <img src="https://i.pravatar.cc/150?img=5" alt="Marta" className="w-5 h-5 rounded-full" />
          <span className="text-[10px] font-medium pr-1">Marta Adams</span>
        </div>
      </div>
    </div>
  );
}
