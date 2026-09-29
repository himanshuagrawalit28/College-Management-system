import React from 'react';
import { formatDate } from '../../utils/helpers';
import { Calendar, Clock, MapPin, Users, Trash2 } from 'lucide-react';

export const EventCard = ({ event, onDelete }) => {
  return (
    <div className="glass-card p-5 glass-card-hover flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="badge-warning text-[10px]">{event.category || 'General'}</span>
          {onDelete && (
            <button
              onClick={() => onDelete(event)}
              className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
              title="Cancel Event"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <h4 className="text-base font-bold text-slate-900 font-['Outfit']">{event.title}</h4>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{event.description}</p>
      </div>

      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          <span className="font-semibold text-slate-800">{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>{event.time || '10:00 AM - 04:00 PM'}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span className="truncate">{event.venue}</span>
        </div>
        {event.organizer && (
          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
            <Users className="w-3 h-3" />
            <span className="truncate">Organized by {event.organizer}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
