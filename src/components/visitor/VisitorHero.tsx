import React from 'react';
import { ProductCategory } from '../../types';
import {
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  Calculator,
  Download,
  PhoneCall,
  CheckCircle2,
  TreePine,
  Layers,
  Award,
} from 'lucide-react';

interface VisitorHeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenEstimator: () => void;
  onOpenQuote: () => void;
}

export const VisitorHero: React.FC<VisitorHeroProps> = ({
  onSelectCategory,
  onOpenEstimator,
  onOpenQuote,
}) => {
  return (
    <section id="hero-section" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden py-14 lg:py-20">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Factory Manufacturer & Precast Concrete Specialist</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Superior Precast Cement Products for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Resilient Boundaries, Landscaping & Urban Living
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              We manufacture heavy-duty <strong>wall mount compound boundaries</strong>, decorative 
              <strong> cement gamla</strong>, multi-tier <strong>nursery plant stands</strong>, robust 
              <strong> park desks & benches</strong>, and <strong>custom engraved name displays</strong>. 
              Engineered with M30/M40 grade vibrated concrete for lifetime weather endurance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-request-quote-btn"
                onClick={onOpenQuote}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Request Quotation & Samples</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-open-wall-calculator-btn"
                onClick={onOpenEstimator}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-600 transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Boundary Wall Cost Calculator</span>
              </button>

              <a
                href="tel:+916360164834"
                title="Call Plant Office: +91 6360164834 / +91 8896704285"
                className="px-4 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 font-medium rounded-xl text-sm border border-white/10 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Plant: +91 6360164834</span>
              </a>
            </div>

            {/* Key Advantages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-700/60 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>65% Faster than brickwork</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>IS 456 & IS 2185 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Crane & Truck Fleet Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Category Showcase Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Featured Product Categories
                </h3>
                <span className="text-[11px] text-slate-400">Click to view items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Wall Mount Boundaries */}
                <div
                  onClick={() => onSelectCategory(ProductCategory.WALL_MOUNT_BOUNDARIES)}
                  className="group p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-amber-500/80 cursor-pointer transition-all hover:bg-slate-900"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                      Wall Boundaries
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    Prestressed compound planks & grooved H-column posts. Quick boundary perimeter installation.
                  </p>
                </div>

                {/* Gamla & Planters */}
                <div
                  onClick={() => onSelectCategory(ProductCategory.GAMLA_PLANTERS)}
                  className="group p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-emerald-500/80 cursor-pointer transition-all hover:bg-slate-900"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TreePine className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      Cement Gamla
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    Bell pots, lotus bowls, conical & modern square planters. Durable for outdoor landscapes.
                  </p>
                </div>

                {/* Nursery Plants & Planters */}
                <div
                  onClick={() => onSelectCategory(ProductCategory.NURSERY_PLANTS)}
                  className="group p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-emerald-500/80 cursor-pointer transition-all hover:bg-slate-900"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TreePine className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-teal-400 transition-colors">
                      Nursery Plants & Desks
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    Multi-tier concrete plant benches, vertical garden slabs, and reinforced specimen pots.
                  </p>
                </div>

                {/* Desks & Benches */}
                <div
                  onClick={() => onSelectCategory(ProductCategory.DESK_BENCH)}
                  className="group p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-sky-500/80 cursor-pointer transition-all hover:bg-slate-900"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                      Desks & Benches
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    Heavy precast concrete park benches, garden seating desks & study tables for institutions.
                  </p>
                </div>

                {/* Name Displays */}
                <div
                  onClick={() => onSelectCategory(ProductCategory.NAME_DISPLAY)}
                  className="group p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-amber-500/80 cursor-pointer transition-all hover:bg-slate-900 sm:col-span-2"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                      Villa & Society Name Displays
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Custom-cast engraved monolithic entrance signs, villa house name plaques, and gated township markers.
                  </p>
                </div>
              </div>

              {/* Live Plant Stock Status Ticker */}
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Ready Stock Available at Plant 1 & 2
                </span>
                <span className="text-amber-400 font-semibold">Bulk Discounts &gt; 100 units</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">28+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Years in Precast Casting
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">500+ km</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Compound Boundaries Cast
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Gamla & Planter Moulds
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">3 Plants</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Modern Batching Yards
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
