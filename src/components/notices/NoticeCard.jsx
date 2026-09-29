import React from 'react';
import { formatDate } from '../../utils/helpers';
import { Pin, Calendar, User, Trash2 } from 'lucide-react';

export const NoticeCard = ({ notice, onDelete }) => {
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Examination':
        return 'badge-danger';
      case 'Events':
        return 'badge-warning';
      case 'Finance':
        return 'badge-success';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div
      className={`glass-card p-5 glass-card-hover flex flex-col justify-between space-y-3 relative ${
        notice.pinned ? 'border-l-4 border-l-indigo-600 bg-indigo-50/20' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={getCategoryBadge(notice.category)}>{notice.category}</span>
          <div className="flex items-center gap-2">
            {notice.pinned && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                <Pin className="w-3.5 h-3.5 fill-indigo-600" /> Pinned
              </span>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(notice)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">{notice.title}</h4>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{notice.content}</p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{notice.author || 'Admin Office'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(notice.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
