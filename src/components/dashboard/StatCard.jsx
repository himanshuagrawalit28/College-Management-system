import React from 'react';

export const StatCard = ({ title, value, change, isPositive = true, icon: Icon, color = 'indigo' }) => {
  const colorStyles = {
    indigo: {
      bg: 'bg-indigo-50 text-indigo-600',
      border: 'hover:border-indigo-200',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-200',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-200',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600',
      border: 'hover:border-purple-200',
    },
    rose: {
      bg: 'bg-rose-50 text-rose-600',
      border: 'hover:border-rose-200',
    },
  };

  const style = colorStyles[color] || colorStyles.indigo;

  return (
    <div className={`glass-card p-5 glass-card-hover transition-all duration-200 ${style.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl ${style.bg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-3 flex items-center text-xs font-medium">
          <span className={isPositive ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
