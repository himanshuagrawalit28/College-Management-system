import React from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Receipt, CheckCircle, FileText } from 'lucide-react';

const DEFAULT_HISTORY = [
  { id: 'tx_101', studentName: 'Alex Rivera', amount: 4200, method: 'Online NetBanking', date: '2026-09-14', txId: 'TXN-90281-OK' },
  { id: 'tx_102', studentName: 'Sophia Patel', amount: 2100, method: 'Credit Card', date: '2026-09-18', txId: 'TXN-83920-OK' },
  { id: 'tx_103', studentName: 'David Kim', amount: 3900, method: 'Bank Transfer', date: '2026-09-22', txId: 'TXN-71932-OK' },
];

export const PaymentHistory = ({ history = DEFAULT_HISTORY }) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
          Recent Payment Transactions
        </h3>
        <span className="badge-success">Gateway Live</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Amount Paid</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Payment Date</th>
              <th className="py-3 px-4 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                <td className="py-3 px-4 font-mono font-bold text-indigo-600">{tx.txId}</td>
                <td className="py-3 px-4 font-semibold text-slate-850">{tx.studentName}</td>
                <td className="py-3 px-4 font-bold text-emerald-600">
                  {formatCurrency(tx.amount)}
                </td>
                <td className="py-3 px-4 text-slate-600">{tx.method}</td>
                <td className="py-3 px-4 text-slate-500">{formatDate(tx.date)}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => alert(`Downloading official fee receipt for ${tx.studentName} [${tx.txId}]`)}
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" /> Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
