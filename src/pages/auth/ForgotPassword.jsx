import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import { ROUTES } from '../../utils/constants';
import { validateEmail } from '../../utils/validation';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please provide a valid registered email address.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to={ROUTES.HOME} className="inline-flex items-center gap-2.5">
          <img src="/logo.png" alt="Apex Logo" className="w-12 h-12 object-contain" />
          <div className="text-left">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] block leading-none">
              Apex College
            </span>
            <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
              Security Portal
            </span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 font-['Outfit']">
          Reset Your Password
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          We will send security recovery instructions to your verified email.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-glass rounded-3xl border border-slate-200/80 sm:px-10">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Recovery Email Dispatched</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We've sent password reset instructions to{' '}
                <strong className="text-slate-800">{email}</strong>. Check your inbox and spam
                folders.
              </p>
              <Link to={ROUTES.LOGIN} className="btn-primary w-full inline-flex mt-4">
                <ArrowLeft className="w-4 h-4" /> Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@apexcollege.edu"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2"
              >
                {loading ? 'Sending link...' : 'Send Recovery Instructions'}{' '}
                <Send className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center">
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
