import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Apex Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-semibold text-slate-800">
              Apex Institute of Higher Education
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-500">
            <Link to={ROUTES.HOME} className="hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to={ROUTES.ABOUT} className="hover:text-indigo-600 transition">
              About
            </Link>
            <Link to={ROUTES.CONTACT} className="hover:text-indigo-600 transition">
              Helpdesk & Support
            </Link>
            <span>v1.0.0 (Production Ready)</span>
          </div>

          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Apex College. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
