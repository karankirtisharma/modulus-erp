import React from 'react';
import { Folder, Grid, FileText, Image as ImageIcon, File } from 'lucide-react';

export default function FilesList() {
  const files = [
    { name: 'Q1_Operations_Report.pdf', type: 'PDF', user: 'Alex J.', date: '2h ago', icon: <FileText className="w-4 h-4 text-red-500" /> },
    { name: 'Team_Workload_Sheet.xlsx', type: 'XLSX', user: 'Sarah W.', date: '5h ago', icon: <File className="w-4 h-4 text-green-500" /> },
    { name: 'Department_Guidelines.docx', type: 'DOCX', user: 'Michael C.', date: '1d ago', icon: <FileText className="w-4 h-4 text-blue-500" /> },
    { name: 'Resource_Allocation.fig', type: 'FIG', user: 'Alex J.', date: '2d ago', icon: <ImageIcon className="w-4 h-4 text-purple-500" /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#1a1a1a] text-white p-2 rounded-full">
            <Folder className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Documents & Resources</h3>
        </div>
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <Grid className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar">
        {files.map((file, i) => (
          <div key={i} className="flex flex-col gap-2 bg-white/60 backdrop-blur-sm border border-white p-3 rounded-2xl shadow-sm hover:bg-white/80 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                {file.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-gray-900 truncate">{file.name}</p>
                <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{file.type} • {file.date}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-100">
              <span className="text-[9px] text-gray-500 font-medium">Uploaded by: <span className="text-gray-900">{file.user}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
