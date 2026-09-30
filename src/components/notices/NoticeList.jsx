import React from 'react';
import NoticeCard from './NoticeCard';

export const NoticeList = ({ notices, onDelete }) => {
  if (!notices || notices.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No active campus circulars or notices found.
      </div>
    );
  }

  // Sort pinned first
  const sorted = [...notices].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {sorted.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoticeList;
