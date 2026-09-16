import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language, ProductCategory } from '../../types';
import {
  Building2,
  Phone,
  MessageSquare,
  Globe,
  Lock,
  LayoutDashboard,
  Calculator,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface VisitorNavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onFilterCategory?: (category: ProductCategory) => void;
}

export const VisitorNavbar: React.FC<VisitorNavbarProps> = ({
  onNavigateSection,
  onFilterCategory,
}) => {
  const {
    language,
    setLanguage,
    isOwnerLoggedIn,
    ownerUser,
    setIsOwnerLoginModalOpen,
    setViewMode,
    setIsVisitorQuoteDrawerOpen,
    inquiries,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length;

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onFilterCategory) {
      onFilterCategory(cat);
    }
    onNavigateSection('catalog-section');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Bar for Dispatch Hotline & Language */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Plant Orders & Technical Inquiries Open
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <a
              href="tel:+916360164834"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 6360164834 / +91 8896704285</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Manufacturing Yards: Peenya, Electronic City & Hosur Corridor
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/916360164834?text=Hi%20Avanish%20Cement,%20I%20am%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Plant Manager</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Language Selector */}
            <div className="relative flex items-center gap-1 pl-2 border-l border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="visitor-language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-200 text-xs py-0.5 pr-2 focus:outline-none cursor-pointer hover:text-white"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-800 text-white">
                    {l.native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigateSection('hero-section')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-800 to-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                  AVANISH
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold uppercase tracking-wider">
                  CEMENT PRODUCTS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Precast Prestressed Boundaries, Gamla, Nursery & Architectural Concrete
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <button
              onClick={() => onNavigateSection('hero-section')}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Overview
            </button>

            {/* Products Dropdown / Direct Filter */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <span>Products Catalog</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCategoryMenuOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      setIsCategoryMenuOpen(false);
                      onNavigateSection('catalog-section');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 font-bold text-slate-900 text-xs border-b border-slate-100 flex items-center justify-between"
                  >
                    <span>View All Products</span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">All Items</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.WALL_MOUNT_BOUNDARIES)}
                    className="w-full text-left px-4 py-2 hover:bg-amber-50 hover:text-amber-900 text-slate-700 text-xs flex items-center justify-between"
                  >
                    <span>Wall Mount Boundaries</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">Hot</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.GAMLA_PLANTERS)}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 text-xs"
                  >
                    Cement Gamla & Pots
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.NURSERY_PLANTS)}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 text-xs"
                  >
                    Nursery Plants & Planters
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.DESK_BENCH)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700 text-xs"
                  >
                    Concrete Desks & Park Benches
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.NAME_DISPLAY)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700 text-xs"
                  >
                    Villa & Society Name Displays
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.PAVERS)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700 text-xs"
                  >
                    Interlocking Pavers & Kerbs
                  </button>
                  <button
                    onClick={() => handleCategoryClick(ProductCategory.RCC_PIPES)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 text-slate-700 text-xs"
                  >
                    RCC Pipes & Drainage Slabs
                  </button>
                </div>
              )}
            </div>

            {/* Quick direct highlights */}
            <button
              onClick={() => handleCategoryClick(ProductCategory.WALL_MOUNT_BOUNDARIES)}
              className="px-3 py-2 rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors font-bold flex items-center gap-1.5"
            >
              <span>Boundaries</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            </button>

            <button
              onClick={() => handleCategoryClick(ProductCategory.GAMLA_PLANTERS)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Gamla & Pots
            </button>

            <button
              onClick={() => handleCategoryClick(ProductCategory.DESK_BENCH)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Desks & Benches
            </button>

            <button
              onClick={() => handleCategoryClick(ProductCategory.NAME_DISPLAY)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Name Displays
            </button>

            <button
              onClick={() => onNavigateSection('estimator-section')}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>Wall Calculator</span>
            </button>

            <button
              onClick={() => onNavigateSection('plants-section')}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Factory Plants
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Request Fast Quotation */}
            <button
              id="visitor-request-quote-nav-btn"
              onClick={() => setIsVisitorQuoteDrawerOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Request Quote</span>
            </button>

            {/* Owner Login / Switch to Dashboard */}
            {isOwnerLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  id="go-to-owner-dashboard-btn"
                  onClick={() => setViewMode('owner')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] border border-amber-500/30"
                  title="Switch to Owner Operations Dashboard"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">Owner Dashboard</span>
                  <span className="md:hidden">Owner</span>
                  {pendingInquiriesCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                      {pendingInquiriesCount}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <button
                id="open-owner-login-modal-btn"
                onClick={() => setIsOwnerLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors border border-slate-300"
                title="Owner Login Panel"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Owner Login</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateSection('hero-section');
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left text-slate-800 hover:bg-slate-100"
            >
              Overview & Highlights
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateSection('catalog-section');
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left text-slate-800 hover:bg-slate-100"
            >
              All Cement Products
            </button>
            <button
              onClick={() => handleCategoryClick(ProductCategory.WALL_MOUNT_BOUNDARIES)}
              className="p-2.5 rounded-lg bg-amber-50 text-left text-amber-900 font-bold hover:bg-amber-100"
            >
              Wall Mount Boundaries
            </button>
            <button
              onClick={() => handleCategoryClick(ProductCategory.GAMLA_PLANTERS)}
              className="p-2.5 rounded-lg bg-slate-50 text-left text-slate-800 hover:bg-slate-100"
            >
              Cement Gamla & Pots
            </button>
            <button
              onClick={() => handleCategoryClick(ProductCategory.NURSERY_PLANTS)}
              className="p-2.5 rounded-lg bg-slate-50 text-left text-slate-800 hover:bg-slate-100"
            >
              Nursery Plants & Planters
            </button>
            <button
              onClick={() => handleCategoryClick(ProductCategory.DESK_BENCH)}
              className="p-2.5 rounded-lg bg-slate-50 text-left text-slate-800 hover:bg-slate-100"
            >
              Desks & Benches
            </button>
            <button
              onClick={() => handleCategoryClick(ProductCategory.NAME_DISPLAY)}
              className="p-2.5 rounded-lg bg-slate-50 text-left text-slate-800 hover:bg-slate-100"
            >
              Name Displays
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateSection('estimator-section');
              }}
              className="p-2.5 rounded-lg bg-amber-50 text-left text-amber-900 hover:bg-amber-100 flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Wall Calculator</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsVisitorQuoteDrawerOpen(true);
              }}
              className="flex-1 py-2 px-3 bg-amber-600 text-white rounded-lg text-xs font-semibold text-center"
            >
              Request Quote / Inquiry
            </button>
            {isOwnerLoggedIn ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setViewMode('owner');
                }}
                className="flex-1 py-2 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold text-center"
              >
                Owner Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOwnerLoginModalOpen(true);
                }}
                className="py-2 px-3 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-300"
              >
                Owner Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
