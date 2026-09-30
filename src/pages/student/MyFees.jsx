import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Modal from '../../components/common/Modal';
import { CreditCard, CheckCircle2, Clock, Download, ShieldCheck, DollarSign, FileText } from 'lucide-react';

const FEE_BREAKDOWN = [
  { item: 'Tuition Fee (Autumn 2026)', amount: 3200, status: 'Paid' },
  { item: 'Computer Laboratory & Cloud Facility Fee', amount: 500, status: 'Paid' },
  { item: 'Digital Library & Journal Subscriptions', amount: 300, status: 'Paid' },
  { item: 'Campus Amenities & Student Welfare Fund', amount: 200, status: 'Paid' },
];

export const MyFees = () => {
  const [breakdown, setBreakdown] = useState(FEE_BREAKDOWN);
  const [paidTotal, setPaidTotal] = useState(4200);
  const [totalAssessed] = useState(4200);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const balance = totalAssessed - paidTotal;

  const handlePay = (e) => {
    e.preventDefault();
    setPaidTotal(totalAssessed);
    const receipt = {
      txId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      amount: balance,
      payer: 'Alex Rivera',
      roll: 'CS2023-018',
      term: 'Autumn Semester 2026',
    };
    setReceiptData(receipt);
    setPayModalOpen(false);
    setReceiptModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Tuition Fees &amp; Payments
          </h1>
          <p className="text-xs text-slate-500">
            Semester invoices, tuition ledger breakdown, and payment transaction receipts.
          </p>
        </div>

        {balance > 0 ? (
          <button
            onClick={() => setPayModalOpen(true)}
            className="btn-primary text-xs"
          >
            <DollarSign className="w-4 h-4" /> Pay Balance Online ({formatCurrency(balance)})
          </button>
        ) : (
          <span className="badge-success text-xs px-3 py-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> All Semester Fees Cleared
          </span>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Fee Assessed</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">
            {formatCurrency(totalAssessed)}
          </h3>
          <span className="text-[11px] text-slate-400">Academic Year 2026-27</span>
        </div>

        <div className="glass-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase">Paid Amount</span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1 font-['Outfit']">
            {formatCurrency(paidTotal)}
          </h3>
          <span className="text-[11px] text-emerald-600 font-medium">100% Cleared</span>
        </div>

        <div className="glass-card p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase">Outstanding Balance</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">
            {formatCurrency(balance)}
          </h3>
          <span className="text-[11px] text-slate-400">Next installment: Nil</span>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 font-['Outfit']">
            Semester Fee Component Breakdown
          </h3>
          <span className="badge-primary">Autumn 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Fee Component</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {breakdown.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{item.item}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="badge-success text-[10px] font-bold">{item.status}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setReceiptData({
                          txId: `TXN-82910${idx}`,
                          date: '2026-09-14',
                          amount: item.amount,
                          payer: 'Alex Rivera',
                          roll: 'CS2023-018',
                          term: item.item,
                        });
                        setReceiptModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      <FileText className="w-3.5 h-3.5" /> View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Tuition Fee Payment Gateway"
        maxWidth="max-w-md"
      >
        <form onSubmit={handlePay} className="space-y-4">
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs space-y-1">
            <span className="text-indigo-800 font-semibold block">Total Amount to Pay</span>
            <div className="text-xl font-extrabold text-indigo-950 font-['Outfit']">
              {formatCurrency(balance)}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cardholder Name
            </label>
            <input type="text" required defaultValue="Alex Rivera" className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Debit / Credit Card Number
            </label>
            <input
              type="text"
              required
              placeholder="4532 •••• •••• 8821"
              defaultValue="4532 9812 3421 8821"
              className="input-field font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expiry (MM/YY)
              </label>
              <input type="text" required placeholder="08/28" defaultValue="08/28" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security CVV
              </label>
              <input type="password" required maxLength="4" defaultValue="892" className="input-field" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setPayModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <ShieldCheck className="w-4 h-4" /> Authorize Payment
            </button>
          </div>
        </form>
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        title="Official Fee Payment Receipt"
        maxWidth="max-w-md"
      >
        {receiptData && (
          <div className="space-y-4 text-xs">
            <div className="text-center pb-4 border-b border-slate-200">
              <img src="/logo.png" alt="Apex Logo" className="w-10 h-10 mx-auto object-contain mb-1" />
              <h3 className="font-bold text-slate-800 text-sm">Apex Institute of Higher Education</h3>
              <p className="text-slate-500 text-[11px]">Finance &amp; Accounts Registry</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-800">{receiptData.txId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Date:</span>
                <span className="font-semibold text-slate-800">{formatDate(receiptData.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-semibold text-slate-800">{receiptData.payer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-semibold text-slate-800">{receiptData.roll}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Component:</span>
                <span className="font-semibold text-slate-800">{receiptData.term}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-sm">
                <span className="text-slate-800">Total Paid:</span>
                <span className="text-emerald-600">{formatCurrency(receiptData.amount)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button onClick={() => setReceiptModalOpen(false)} className="btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn-primary"
              >
                <Download className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyFees;
