import React from 'react';
import {
  Radio,
  CheckCircle2,
  X,
  Laptop,
  Smartphone,
  Server,
  Zap,
  RotateCw,
  Layers,
  Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RealtimeSyncModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { isLiveSyncing, triggerCrossTabPulse, t } = useApp();

  if (!isOpen) return null;

  const terminals = [
    {
      name: 'Plant 1 Jigani Dispatch Tower',
      device: 'Master Production Terminal',
      icon: <Server className="w-4 h-4 text-amber-500" />,
      status: 'Connected (Channel: avanish_erp_sync)',
      latency: '2 ms',
    },
    {
      name: 'North Nelamangala Depot Weighbridge',
      device: 'Industrial Desktop Client',
      icon: <Laptop className="w-4 h-4 text-blue-500" />,
      status: 'Synchronized (Listening)',
      latency: '4 ms',
    },
    {
      name: 'Fleet Driver Tablet (KA-04-E-8821)',
      device: 'Mobile GPS Node',
      icon: <Smartphone className="w-4 h-4 text-emerald-500" />,
      status: 'Active Telemetry Link',
      latency: '14 ms',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                {t.realtimeSyncModalTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {t.realtimeSyncModalDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sync Status Banner */}
        <div className="my-4 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
            <div>
              <div className="font-bold text-xs">Cross-Device BroadcastChannel Active</div>
              <div className="text-[11px] text-slate-400">
                Changes in Stock, Orders, and Fleets propagate instantly without reload.
              </div>
            </div>
          </div>

          <button
            id="trigger-telemetry-pulse-btn"
            onClick={triggerCrossTabPulse}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Send Sync Pulse</span>
          </button>
        </div>

        {/* Connected Node Terminals */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Connected Facility Terminals:
          </div>

          {terminals.map((term, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-white border border-slate-200 shadow-2xs">
                  {term.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{term.name}</div>
                  <div className="text-[11px] text-slate-500">{term.device}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1 justify-end">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{term.status}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Latency: {term.latency}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
        >
          Close Status Window
        </button>

      </div>
    </div>
  );
};
