/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { WholesaleCatalog } from './components/WholesaleCatalog';
import { InventoryManager } from './components/InventoryManager';
import { OrderTracker } from './components/OrderTracker';
import { DeliveryLogistics } from './components/DeliveryLogistics';
import { PostgresSchemaExplorer } from './components/PostgresSchemaExplorer';
import { StoreLocatorMap } from './components/StoreLocatorMap';
import { MembershipRewards } from './components/MembershipRewards';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { NotificationCenter } from './components/NotificationCenter';
import { RealtimeSyncModal } from './components/RealtimeSyncModal';
import { NextActionPrompt } from './components/NextActionPrompt';
import { VisitorWebsite } from './components/visitor/VisitorWebsite';
import { OwnerInquiriesManager } from './components/OwnerInquiriesManager';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Building,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { viewMode, activeTab, toastMessage, t } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);

  // If currently in Visitor Mode, render the public-facing showcase website
  if (viewMode === 'visitor') {
    return <VisitorWebsite />;
  }

  // Owner Operations Dashboard
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Notification for Real-Time Synchronization */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-semibold text-slate-100">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Primary Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Active Tab View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <DashboardOverview
              onOpenCart={() => setIsCartOpen(true)}
              onOpenInventoryAdjustment={() => setIsAdjustmentModalOpen(true)}
            />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-8">
            <OwnerInquiriesManager />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <WholesaleCatalog onOpenCart={() => setIsCartOpen(true)} />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-8">
            <InventoryManager
              isOpenAdjustmentModal={isAdjustmentModalOpen}
              setIsOpenAdjustmentModal={setIsAdjustmentModalOpen}
            />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8">
            <OrderTracker />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'deliveries' && (
          <div className="space-y-8">
            <DeliveryLogistics />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'postgres' && (
          <div className="space-y-8">
            <PostgresSchemaExplorer />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="space-y-8">
            <StoreLocatorMap />
            <NextActionPrompt />
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-8">
            <MembershipRewards />
            <NextActionPrompt />
          </div>
        )}

      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <NotificationCenter isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      <RealtimeSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
      <PaymentModal />

      {/* Enterprise Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs font-mono">
                  ACP
                </div>
                <span className="font-bold text-white font-heading text-sm">
                  AVANISH CEMENT PRODUCTS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Manufacturer of high-strength precast concrete elements, RCC Hume pipes, solid masonry blocks, and bulk industrial cement.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                GSTIN: 29AAACA9912E1Z5
              </div>
            </div>

            {/* Plants & Depots */}
            <div className="space-y-1.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Manufacturing Plants
              </div>
              <div className="text-[11px] text-slate-400">Plant 1: Jigani Industrial Area, Bengaluru</div>
              <div className="text-[11px] text-slate-400">North Depot: Nelamangala Highway Hub</div>
              <div className="text-[11px] text-slate-400">Airport Yard: Devanahalli Batching Facility</div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-1.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Compliance & Testing
              </div>
              <div className="text-[11px] text-slate-400">IS 12269 (OPC 53 Grade) Certified</div>
              <div className="text-[11px] text-slate-400">IS 458:2003 (NP2/NP3 RCC Hume Pipes)</div>
              <div className="text-[11px] text-slate-400">IS 2185 Part 1 (Heavy Precast Masonry)</div>
            </div>

            {/* Support & Dispatch Desk */}
            <div className="space-y-1.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Commercial Dispatch Desk
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>+91 6360164834 / +91 8896704285</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-amber-400" />
                <span>dispatch@avanishcement.com</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                24/7 Crane Dispatch & Weighbridge Active
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              © 2026 Avanish Cement Products. All rights reserved. Relational PostgreSQL Architecture v16.2.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Supply</span>
              <span>•</span>
              <span>E-Way Bill Compliance</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
