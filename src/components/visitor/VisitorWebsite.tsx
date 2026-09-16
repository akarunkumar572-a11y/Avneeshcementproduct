import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, Product } from '../../types';
import { VisitorNavbar } from './VisitorNavbar';
import { VisitorHero } from './VisitorHero';
import { VisitorCatalog } from './VisitorCatalog';
import { BoundaryWallEstimator } from './BoundaryWallEstimator';
import { VisitorQuoteModal } from './VisitorQuoteModal';
import { OwnerLoginModal } from './OwnerLoginModal';
import { VisitorFooter } from './VisitorFooter';
import { StoreLocatorMap } from '../StoreLocatorMap';
import {
  MessageSquare,
  Sparkles,
  Layers,
  Award,
  ShieldCheck,
  Building,
  CheckCircle2,
  PhoneCall,
  Truck,
} from 'lucide-react';

export const VisitorWebsite: React.FC = () => {
  const {
    visitorSelectedCategory,
    setVisitorSelectedCategory,
    setIsVisitorQuoteDrawerOpen,
    isVisitorQuoteDrawerOpen,
    toastMessage,
  } = useApp();

  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterCategory = (category: ProductCategory) => {
    setVisitorSelectedCategory(category);
    handleNavigateSection('catalog-section');
  };

  const handleOpenQuoteWithProduct = (product: Product) => {
    setSelectedProductForQuote(product);
    setIsVisitorQuoteDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-amber-500/50 flex items-center gap-3 animate-slideIn">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <VisitorNavbar
        onNavigateSection={handleNavigateSection}
        onFilterCategory={handleFilterCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <VisitorHero
          onSelectCategory={handleFilterCategory}
          onOpenEstimator={() => handleNavigateSection('estimator-section')}
          onOpenQuote={() => setIsVisitorQuoteDrawerOpen(true)}
        />

        {/* Boundary Wall Cost Estimator Section */}
        <BoundaryWallEstimator />

        {/* Visitor Product Catalog */}
        <VisitorCatalog
          selectedCategory={visitorSelectedCategory}
          onCategoryChange={(cat) => setVisitorSelectedCategory(cat)}
          onOpenQuoteWithProduct={handleOpenQuoteWithProduct}
        />

        {/* Manufacturing Plants & Physical Yard Network */}
        <section id="plants-section" className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2">
                <Building className="w-3.5 h-3.5 text-amber-600" />
                <span>Modern Production Infrastructure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Manufacturing Plants & Dispatch Yards
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Equipped with automatic batching plants, prestressing wire beds, high-frequency 
                vibration tables, and a fleet of 12 crane-mounted trucks for on-site boundary erection.
              </p>
            </div>

            {/* Embedded Store & Yard Locator Map */}
            <StoreLocatorMap />
          </div>
        </section>

        {/* Quality Assurance & Commercial Trust Banner */}
        <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">
                    Standardized M30 & M40 Precast Concrete
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Strict adherence to Indian Standards IS 456 & IS 2185. High compressive strength 
                    and water-impermeable casting ensure 50+ years of outdoor lifespan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">
                    GPS Fleet & Crane Delivery
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Heavy-duty 16-wheelers and boom crane trucks capable of unloading and sliding 
                    precast boundary planks directly into column grooves at your site.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">
                    Custom Moulding & Society Branding
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Custom sizes for Gamla, multi-tier nursery planters, concrete study desks, and 
                    engraved society entrance monoliths with bespoke logos and brass letters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <VisitorFooter
        onSelectCategory={handleFilterCategory}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/916360164834?text=Hi%20Avanish%20Cement,%20I%20am%20interested%20in%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all group"
        title="Chat with Plant Manager on WhatsApp: +91 6360164834"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="hidden sm:inline text-xs font-bold pr-1">WhatsApp Plant Manager</span>
      </a>

      {/* Quotation Request Drawer */}
      <VisitorQuoteModal initialSelectedProduct={selectedProductForQuote} />

      {/* Owner Login Modal */}
      <OwnerLoginModal />
    </div>
  );
};
