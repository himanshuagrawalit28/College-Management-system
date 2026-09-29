import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { Home, AlertCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-glass">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 font-['Outfit']">404</h1>
          <h2 className="text-lg font-bold text-slate-800 mt-1">Page Not Found</h2>
          <p className="text-xs text-slate-500 mt-2">
            The page or module you requested could not be located in the College Management Portal.
          </p>
        </div>

        <Link to={ROUTES.HOME} className="btn-primary w-full inline-flex">
          <Home className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
