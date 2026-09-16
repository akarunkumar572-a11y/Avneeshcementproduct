import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  UserCheck,
  ShieldCheck,
  X,
  KeyRound,
  Mail,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export const OwnerLoginModal: React.FC = () => {
  const {
    isOwnerLoginModalOpen,
    setIsOwnerLoginModalOpen,
    ownerLogin,
  } = useApp();

  const [identifier, setIdentifier] = useState('owner@avanishcement.com');
  const [password, setPassword] = useState('avanish@2026');
  const [pin, setPin] = useState('1234');
  const [loginMethod, setLoginMethod] = useState<'password' | 'pin'>('password');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOwnerLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (loginMethod === 'pin') {
        if (!pin.trim()) {
          setError('Please enter your 4-digit Owner Security PIN.');
          setIsLoading(false);
          return;
        }
      } else {
        if (!identifier.trim() || !password.trim()) {
          setError('Please provide your owner email/username and password.');
          setIsLoading(false);
          return;
        }
      }

      ownerLogin(identifier, loginMethod === 'pin' ? pin : password);
      setIsLoading(false);
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      ownerLogin('owner@avanishcement.com', 'admin');
      setIsLoading(false);
    }, 300);
  };

  return (
    <div
      id="owner-login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsOwnerLoginModalOpen(false)}
    >
      <div
        id="owner-login-modal-dialog"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with concrete branding accent */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-6 relative">
          <button
            id="close-owner-login-modal-btn"
            onClick={() => setIsOwnerLoginModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Authorized Personnel
              </span>
              <h2 className="text-xl font-bold text-white">Owner Dashboard Login</h2>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Avanish Cement Products — Executive Operations & Plant Management Portal
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Quick Demo Login Callout */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1 text-xs">
              <span className="font-semibold text-amber-900 block mb-0.5">
                Instant Owner Demo Access
              </span>
              <span className="text-amber-800">
                Click below to instantly access live inventory, manufacturing logs, GPS trucks, and leads.
              </span>
              <button
                type="button"
                id="one-click-demo-owner-login-btn"
                onClick={handleQuickDemoLogin}
                disabled={isLoading}
                className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-xs shadow-sm transition-all active:scale-[0.98]"
              >
                <UserCheck className="w-4 h-4" />
                <span>1-Click Owner Demo Login</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>

          {/* Toggle Tab for Password vs PIN */}
          <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-medium text-slate-600">
            <button
              type="button"
              id="switch-to-password-login"
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-1.5 rounded-md text-center transition-colors ${
                loginMethod === 'password'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              id="switch-to-pin-login"
              onClick={() => setLoginMethod('pin')}
              className={`flex-1 py-1.5 rounded-md text-center transition-colors ${
                loginMethod === 'pin'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Owner Security PIN
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMethod === 'password' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Owner Email or Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="owner-email-input"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. owner@avanishcement.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Master Password
                    </label>
                    <span className="text-[11px] text-slate-400">Default: avanish@2026</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      id="owner-password-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 transition-all"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Quick 4-Digit Owner PIN
                  </label>
                  <span className="text-[11px] text-slate-400">PIN: 1234</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    id="owner-pin-input"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter 4-digit PIN"
                    className="w-full pl-9 pr-3 py-2.5 text-sm font-mono tracking-widest bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              id="submit-owner-login-btn"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Enter Owner Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Capabilities bullet list */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Owner Management Privileges:
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Manage Cement Product Catalog & wholesale pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Review client inquiries for Wall Boundaries, Gamla, Desks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Monitor real-time batching plant stock & delivery vehicles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>PostgreSQL database analytics and indexing queries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Avanish Cement Products Pvt. Ltd.
          </span>
          <button
            type="button"
            onClick={() => setIsOwnerLoginModalOpen(false)}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Back to Visitor Site
          </button>
        </div>
      </div>
    </div>
  );
};
