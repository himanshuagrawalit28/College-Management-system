import React from 'react';
import EventCard from './EventCard';

export const EventList = ({ events, onDelete }) => {
  if (!events || events.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No upcoming events scheduled on campus.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default EventList;
