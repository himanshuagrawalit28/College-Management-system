import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import { CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const FeeCard = ({ title, amount, count, type = 'total' }) => {
  const styles = {
    total: {
      bg: 'bg-indigo-50 text-indigo-600',
      icon: CreditCard,
    },
    collected: {
      bg: 'bg-emerald-50 text-emerald-600',
      icon: CheckCircle2,
    },
    pending: {
      bg: 'bg-rose-50 text-rose-600',
      icon: AlertCircle,
    },
  };

  const current = styles[type] || styles.total;
  const Icon = current.icon;

  return (
    <div className="glass-card p-5 glass-card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">
            {formatCurrency(amount)}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl ${current.bg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {count !== undefined && (
        <span className="text-[11px] font-medium text-slate-400 mt-2 block">
          {count} Student Invoices
        </span>
      )}
    </div>
  );
};

export default FeeCard;
