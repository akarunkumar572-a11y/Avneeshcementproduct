import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Warehouse,
  ExternalLink,
  Navigation,
  CheckCircle,
  Truck,
  Building,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StoreLocatorMap: React.FC = () => {
  const { stores, selectedStoreId, setSelectedStoreId, setActiveTab, t } = useApp();

  const selectedStore =
    stores.find((s) => s.id === selectedStoreId) || stores[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-heading text-slate-900">
            {t.storesTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.storesSubtitle}
          </p>
        </div>

        <a
          href={selectedStore.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
        >
          <Navigation className="w-4 h-4" />
          <span>{t.getDirections}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Grid: Stores Cards + Google Maps Embed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Yard Selector Cards */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Physical Plant & Depot Locations
          </div>

          {stores.map((store) => {
            const isSelected = store.id === selectedStore.id;

            return (
              <div
                key={store.id}
                id={`store-card-${store.id}`}
                onClick={() => setSelectedStoreId(store.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm font-heading">{store.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  )}
                </div>

                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {store.type}
                </span>

                <p className={`mt-2 text-xs line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {store.address}, {store.city} - {store.pincode}
                </p>

                <div className={`mt-3 pt-2.5 flex items-center justify-between text-[11px] border-t ${
                  isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-amber-500" />
                    {store.fleetCount} Trucks Stationed
                  </span>
                  <span className="font-semibold text-amber-500">View on Map</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Cols: Google Maps Embedded Iframe & Plant Specs */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Embedded Google Maps Container */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-xs text-slate-900">
                  Google Maps Interactive Facility Locator
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Lat: {selectedStore.lat}, Lng: {selectedStore.lng}
              </span>
            </div>

            {/* Responsive Iframe Embed */}
            <div className="relative h-72 sm:h-96 w-full bg-slate-100">
              <iframe
                title={selectedStore.name}
                src={selectedStore.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Plant Operations & Dispatch Supervisor Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-slate-900">
                {selectedStore.name} — Facility Operations
              </h3>
              <button
                onClick={() => setActiveTab('inventory')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Check Inventory at this Yard</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 font-semibold flex items-center gap-1">
                  <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                  Daily Precast Capacity
                </div>
                <div className="font-bold text-slate-900 mt-1">{selectedStore.dailyCapacity}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Operating Hours
                </div>
                <div className="font-bold text-slate-900 mt-1">{selectedStore.openHours}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Supervisor In-Charge
                </div>
                <div className="font-bold text-slate-900 mt-1">{selectedStore.supervisor}</div>
                <div className="text-slate-500 text-[11px] font-mono">{selectedStore.phone}</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
