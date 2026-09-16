import React, { useState } from 'react';
import {
  Boxes,
  Bell,
  Globe,
  Radio,
  ShoppingCart,
  Database,
  Truck,
  Package,
  Layers,
  MapPin,
  Award,
  ChevronDown,
  LayoutDashboard,
  Check,
  Globe2,
  Inbox,
  LogOut,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language, TabKey } from '../types';

export const Header: React.FC<{
  onOpenNotifications: () => void;
  onOpenCart: () => void;
  onOpenSyncModal: () => void;
}> = ({ onOpenNotifications, onOpenCart, onOpenSyncModal }) => {
  const {
    language,
    setLanguage,
    t,
    activeTab,
    setActiveTab,
    unreadNotifsCount,
    cart,
    connectedDeviceCount,
    setViewMode,
    ownerLogout,
    ownerUser,
    inquiries,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length;

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  interface NavItem {
    key: TabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { key: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    {
      key: 'inquiries',
      label: 'Visitor Leads & Inquiries',
      icon: Inbox,
      badge: pendingInquiriesCount,
      highlight: pendingInquiriesCount > 0,
    },
    { key: 'catalog', label: t.navCatalog, icon: Package },
    { key: 'inventory', label: t.navInventory, icon: Layers },
    { key: 'orders', label: t.navOrders, icon: Boxes },
    { key: 'deliveries', label: t.navDeliveries, icon: Truck },
    { key: 'postgres', label: t.navPostgres, icon: Database, highlight: true },
    { key: 'stores', label: t.navStores, icon: MapPin },
    { key: 'rewards', label: t.navRewards, icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      {/* Top Banner / Corporate Identity Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
                  AVANISH
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>OWNER CONSOLE</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Executive Operations, Live Batching Plants & Wholesale Dispatch
              </p>
            </div>
          </div>

          {/* Right Action Icons: Switch View, Live Sync Pill, Lang Switcher, Notifications, Cart, Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Visitor Website Button */}
            <button
              id="switch-to-visitor-website-btn"
              onClick={() => setViewMode('visitor')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
              title="Preview Customer Facing Visitor Website"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Visitor Website</span>
              <span className="sm:hidden">Website</span>
            </button>

            {/* Real-time Sync Status Button */}
            <button
              id="header-sync-status-btn"
              onClick={onOpenSyncModal}
              title="Real-time Multi-Device Sync Telemetry"
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">
                {t.realtimeSyncActive}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-slate-900 text-emerald-400 text-[10px] font-mono">
                {connectedDeviceCount} Yards
              </span>
            </button>

            {/* Multilingual Switcher Dropdown */}
            <div className="relative">
              <button
                id="header-lang-switcher-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-44 rounded-lg bg-slate-800 border border-slate-700 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsLangOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                    Select Language / भाषा
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        language === l.code
                          ? 'bg-amber-500/15 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{l.native}</span>
                        <span className="text-[10px] text-slate-400">{l.label}</span>
                      </div>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <button
              id="header-notifications-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-md bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all"
              title="Push Notifications & Location Alerts"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 shadow-sm animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Cart / Wholesale Checkout Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
              title="Wholesale Order Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.orderSummary}</span>
              {totalCartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-slate-950 text-amber-400 text-[10px] font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Owner Logout button */}
            <button
              id="header-owner-logout-btn"
              onClick={ownerLogout}
              className="p-2 rounded-md bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700 text-slate-400 transition-colors"
              title="Logout from Owner Dashboard"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                id={`nav-tab-${item.key}`}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : item.highlight
                    ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && !item.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

