import React, { useState, useEffect } from 'react';
import feeService from '../../services/feeService';
import FeeCard from '../../components/fees/FeeCard';
import FeeTable from '../../components/fees/FeeTable';
import PaymentHistory from '../../components/fees/PaymentHistory';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { Search, Filter, DollarSign, Download, Plus } from 'lucide-react';

export const ManageFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Payment collection modal
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [payAmount, setPayAmount] = useState('');

  const fetchFees = async () => {
    setLoading(true);
    try {
      const data = await feeService.getFees();
      setFees(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const totalAssessed = fees.reduce((sum, f) => sum + f.totalAmount, 0);
  const totalCollected = fees.reduce((sum, f) => sum + f.paidAmount, 0);
  const totalPending = totalAssessed - totalCollected;

  const handleOpenPay = (fee) => {
    setSelectedFee(fee);
    const balance = fee.totalAmount - fee.paidAmount;
    setPayAmount(String(balance));
    setPayModalOpen(true);
  };

  const handleSavePayment = async (e) => {
    e.preventDefault();
    if (!selectedFee || !payAmount) return;

    await feeService.recordPayment(selectedFee.id, parseFloat(payAmount));
    setPayModalOpen(false);
    fetchFees();
  };

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Tuition Fees &amp; Financial Audits
          </h1>
          <p className="text-xs text-slate-500">
            Monitor institutional fee collections, installment plans, and outstanding student dues.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <FeeCard title="Total Assessed" amount={totalAssessed} count={fees.length} type="total" />
        <FeeCard title="Total Collected" amount={totalCollected} type="collected" />
        <FeeCard title="Outstanding Dues" amount={totalPending} type="pending" />
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white text-slate-700 focus:outline-none"
          >
            <option value="All">All Invoices</option>
            <option value="Paid">Paid Only</option>
            <option value="Partial">Partial Payments</option>
            <option value="Pending">Pending Dues</option>
          </select>
        </div>
      </div>

      {/* Fee Table */}
      {loading ? (
        <Loader text="Loading financial records..." />
      ) : (
        <FeeTable feeRecords={filteredFees} onRecordPayment={handleOpenPay} />
      )}

      {/* Payment History */}
      <PaymentHistory />

      {/* Record Payment Modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Record Fee Payment Receipt"
        maxWidth="max-w-md"
      >
        {selectedFee && (
          <form onSubmit={handleSavePayment} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <p className="font-bold text-slate-800">{selectedFee.studentName}</p>
              <p className="text-slate-500">Roll: {selectedFee.rollNumber} &bull; {selectedFee.semester}</p>
              <p className="text-rose-600 font-semibold">
                Balance Due: ${selectedFee.totalAmount - selectedFee.paidAmount}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount Being Paid ($)
              </label>
              <input
                type="number"
                required
                min="1"
                max={selectedFee.totalAmount - selectedFee.paidAmount}
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setPayModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Confirm &amp; Issue Receipt
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ManageFees;
