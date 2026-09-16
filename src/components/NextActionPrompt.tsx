import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  Database,
  Truck,
  AlertTriangle,
  Download,
  FileSpreadsheet,
  Check,
  Send,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NextActionPrompt: React.FC = () => {
  const {
    t,
    setActiveTab,
    executeNextAction,
    triggerPushNotification,
    products,
    orders,
  } = useApp();

  const [customInput, setCustomInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const presetActions = [
    {
      id: 'simulate-low-stock',
      label: 'Simulate Low Stock Alert at Jigani Yard',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      action: () => {
        executeNextAction('SIMULATE_LOW_STOCK');
        setFeedbackMessage('Triggered low stock threshold warning for Solid Concrete Blocks (Batch 2026-BLK-12A).');
        setTimeout(() => setFeedbackMessage(null), 4000);
      },
    },
    {
      id: 'export-tax-csv',
      label: 'Export GST & Tax Audit Spreadsheet',
      icon: <FileSpreadsheet className="w-4 h-4 text-emerald-500" />,
      action: () => {
        // Generate CSV file download
        const headers = ['Order Number,Customer,GSTIN,Grand Total,GST Amount,Status,Date\n'];
        const rows = orders.map(
          (o) =>
            `${o.orderNumber},"${o.customerCompany}",${o.customerGst},${o.grandTotal},${o.gstAmount},${o.status},${o.createdAt}`
        );
        const blob = new Blob([headers.join('') + rows.join('\n')], {
          type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Avanish_Cement_Orders_GST_Audit_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setFeedbackMessage('Exported GST audit spreadsheet with HSN breakdowns and order totals.');
        setTimeout(() => setFeedbackMessage(null), 4000);
      },
    },
    {
      id: 'inspect-postgres-indexes',
      label: 'Inspect PostgreSQL Search Index Strategy',
      icon: <Database className="w-4 h-4 text-blue-500" />,
      action: () => {
        setActiveTab('postgres');
        setFeedbackMessage('Navigated to PostgreSQL DDL & Indexing Strategy console.');
        setTimeout(() => setFeedbackMessage(null), 4000);
      },
    },
    {
      id: 'dispatch-heavy-fleet',
      label: 'Simulate Real-Time Fleet Waypoint Advance',
      icon: <Truck className="w-4 h-4 text-amber-500" />,
      action: () => {
        executeNextAction('SIMULATE_DELIVERY_PROGRESS');
        setActiveTab('deliveries');
        setFeedbackMessage('Dispatched Crane Truck KA-04-E-8821 to Next Highway Checkpoint.');
        setTimeout(() => setFeedbackMessage(null), 4000);
      },
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const query = customInput.toLowerCase();
    if (query.includes('stock') || query.includes('inventory')) {
      setActiveTab('inventory');
      setFeedbackMessage(`Navigating to Inventory for: "${customInput}"`);
    } else if (query.includes('order') || query.includes('invoice') || query.includes('tax')) {
      setActiveTab('orders');
      setFeedbackMessage(`Navigating to Orders & Invoices for: "${customInput}"`);
    } else if (query.includes('map') || query.includes('store') || query.includes('yard') || query.includes('location')) {
      setActiveTab('stores');
      setFeedbackMessage(`Navigating to Physical Store Locator for: "${customInput}"`);
    } else if (query.includes('delivery') || query.includes('truck') || query.includes('fleet')) {
      setActiveTab('deliveries');
      setFeedbackMessage(`Navigating to Fleet Telemetry for: "${customInput}"`);
    } else if (query.includes('database') || query.includes('sql') || query.includes('index') || query.includes('schema')) {
      setActiveTab('postgres');
      setFeedbackMessage(`Navigating to PostgreSQL Schema for: "${customInput}"`);
    } else if (query.includes('reward') || query.includes('point') || query.includes('club')) {
      setActiveTab('rewards');
      setFeedbackMessage(`Navigating to Loyalty Club for: "${customInput}"`);
    } else {
      triggerPushNotification(
        'Action Request Received',
        `Configured workflow for: "${customInput}". All modules updated.`,
        'ORDER'
      );
      setFeedbackMessage(`Configured action: "${customInput}". Relevant parameters updated.`);
    }

    setCustomInput('');
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900">
              {t.whatNextTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.whatNextSubtitle}
            </p>
          </div>
        </div>

        {feedbackMessage && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* Preset Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presetActions.map((act) => (
          <button
            key={act.id}
            id={act.id}
            onClick={act.action}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                {act.icon}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-slate-950 leading-snug">
              {act.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Prompt Input */}
      <form onSubmit={handleCustomSubmit} className="pt-2">
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="what-next-custom-input"
            type="text"
            placeholder='Type what you want to execute next (e.g. "Check cement stock", "Inspect schema index", "Dispatch crane truck")...'
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="w-full pl-9 pr-24 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
          <button
            id="what-next-submit-btn"
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold text-xs flex items-center gap-1 transition-colors"
          >
            <span>Execute</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

    </div>
  );
};
