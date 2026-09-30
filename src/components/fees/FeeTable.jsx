import React from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { DollarSign, CheckCircle2, Clock } from 'lucide-react';

export const FeeTable = ({ feeRecords, onRecordPayment }) => {
  if (!feeRecords || feeRecords.length === 0) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm">
        No fee records found.
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Roll Number</th>
              <th className="py-3.5 px-4">Semester</th>
              <th className="py-3.5 px-4">Total Fee</th>
              <th className="py-3.5 px-4">Paid Amount</th>
              <th className="py-3.5 px-4">Balance</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {feeRecords.map((fee) => {
              const balance = fee.totalAmount - fee.paidAmount;
              return (
                <tr key={fee.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4 font-bold text-slate-800">{fee.studentName}</td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{fee.rollNumber}</td>
                  <td className="py-3 px-4 text-slate-600">{fee.semester}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {formatCurrency(fee.totalAmount)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">
                    {formatCurrency(fee.paidAmount)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-rose-600">
                    {formatCurrency(balance)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        fee.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : fee.status === 'Partial'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{formatDate(fee.dueDate)}</td>
                  <td className="py-3 px-4 text-right">
                    {balance > 0 ? (
                      <button
                        onClick={() => onRecordPayment(fee)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition"
                      >
                        <DollarSign className="w-3.5 h-3.5" /> Collect
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Cleared
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeTable;
