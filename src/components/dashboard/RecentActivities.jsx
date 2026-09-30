import React from 'react';
import { UserPlus, Award, CreditCard, Bell, Calendar, CheckCircle } from 'lucide-react';

const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    type: 'fee',
    title: 'Tuition Fee Payment Received',
    desc: 'Sophia Patel paid $2,100 for Autumn Term installment.',
    time: '15 mins ago',
    icon: CreditCard,
    color: 'emerald',
  },
  {
    id: 2,
    type: 'student',
    title: 'New Student Enrollment',
    desc: 'Alex Rivera registered for B.Tech Computer Science.',
    time: '1 hour ago',
    icon: UserPlus,
    color: 'indigo',
  },
  {
    id: 3,
    type: 'result',
    title: 'Exam Marks Published',
    desc: 'Prof. Sarah Jenkins uploaded CS301 mid-term scores.',
    time: '3 hours ago',
    icon: Award,
    color: 'purple',
  },
  {
    id: 4,
    type: 'notice',
    title: 'Campus Notice Circulated',
    desc: 'Mid-Term Examinations timetable has been pinned.',
    time: '5 hours ago',
    icon: Bell,
    color: 'amber',
  },
];

export const RecentActivities = ({ activities = DEFAULT_ACTIVITIES }) => {
  const getBadgeStyle = (color) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'amber':
        return 'bg-amber-50 text-amber-600';
      default:
        return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-['Outfit']">Recent Activities</h3>
          <p className="text-xs text-slate-500">Live feed of institutional events and updates</p>
        </div>
        <span className="badge-primary">Live Updates</span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon || CheckCircle;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${getBadgeStyle(act.color)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{act.title}</h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{act.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;
