import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Lock,
  MessageSquare,
  ArrowUp,
} from 'lucide-react';

interface VisitorFooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const VisitorFooter: React.FC<VisitorFooterProps> = ({
  onSelectCategory,
  onNavigateSection,
}) => {
  const { setIsOwnerLoginModalOpen, isOwnerLoggedIn, setViewMode } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">
                Avanish Cement Products Pvt. Ltd.
              </h3>
              <p className="text-slate-400 text-xs">
                Heavy Precast Prestressed Concrete & Architectural Cement Casting
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/916360164834"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Dispatch</span>
            </a>

            <a
              href="tel:+916360164834"
              title="Call: +91 6360164834 / +91 8896704285"
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+91 6360164834 / +91 8896704285</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About & Assurance */}
          <div className="space-y-3">
            <span className="text-white font-bold text-sm block">About Avanish Cement</span>
            <p className="leading-relaxed text-slate-400">
              Specialized manufacturers of precast prestressed compound boundary walls, decorative 
              cement gamla pots, nursery plant racks, durable concrete study desks & park benches, 
              and engraved township name displays.
            </p>
            <div className="flex items-center gap-2 text-slate-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>IS 456 & IS 2185 Grade Compliant</span>
            </div>
          </div>

          {/* Col 2: Cement Product Categories */}
          <div className="space-y-3">
            <span className="text-white font-bold text-sm block">Core Products</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory(ProductCategory.WALL_MOUNT_BOUNDARIES)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Wall Mount Boundaries & H-Columns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory(ProductCategory.GAMLA_PLANTERS)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Cement Gamla & Bell Planters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory(ProductCategory.NURSERY_PLANTS)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Nursery Plants & Concrete Benches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory(ProductCategory.DESK_BENCH)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Concrete Desks, Tables & Benches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory(ProductCategory.NAME_DISPLAY)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Villa & Society Name Displays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory(ProductCategory.PAVERS)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Interlocking Pavers & Kerb Stones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Yards */}
          <div className="space-y-3">
            <span className="text-white font-bold text-sm block">Factory Locations</span>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Plant 1 (Main Yard):</strong> Plot 42-A, Peenya Industrial Area 3rd Stage, 
                  Bengaluru, KA 560058
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Plant 2:</strong> Electronic City Phase 2, Near Metro Casting Yard, 
                  Bengaluru, KA 560100
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Plant 3:</strong> NH-44 Hosur Industrial Corridor, TN/KA Border Yard
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Timings & Owner Portal */}
          <div className="space-y-3">
            <span className="text-white font-bold text-sm block">Plant Dispatch Hours</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Mon – Sat: 8:00 AM – 7:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Sunday: 9:00 AM – 2:00 PM (Dispatches)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>dispatch@avanishcement.com</span>
              </div>
            </div>

            {/* Owner Portal Access Link */}
            <div className="pt-3 border-t border-slate-800">
              {isOwnerLoggedIn ? (
                <button
                  onClick={() => setViewMode('owner')}
                  className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors border border-amber-500/40 text-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Go to Owner Dashboard (Logged In)</span>
                </button>
              ) : (
                <button
                  id="footer-owner-login-btn"
                  onClick={() => setIsOwnerLoginModalOpen(true)}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-slate-700 text-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Owner Administration Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} Avanish Cement Products Pvt. Ltd. All rights reserved. GSTIN: 29AABCA4491F1Z6
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateSection('estimator-section')}
              className="hover:text-slate-300"
            >
              Boundary Calculator
            </button>
            <button
              onClick={() => onNavigateSection('catalog-section')}
              className="hover:text-slate-300"
            >
              Catalog
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
