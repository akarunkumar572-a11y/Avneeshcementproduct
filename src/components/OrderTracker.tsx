import React, { useState } from 'react';
import {
  Boxes,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  FileText,
  Building,
  User,
  Phone,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Download,
  AlertCircle,
  X,
  CreditCard,
  Plus,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { CustomerSalesInvoiceModal } from './CustomerSalesInvoiceModal';
import { GenerateSalesInvoiceModal } from './GenerateSalesInvoiceModal';
import { sendInvoiceViaWhatsApp } from '../utils/invoiceUtils';

export const OrderTracker: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    selectedOrderForDetail,
    setSelectedOrderForDetail,
    t,
    setIsPaymentModalOpen,
    setActiveOrderToPay,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState<boolean>(false);

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'ALL') return true;
    return o.status === activeFilter;
  });

  const statusSteps: OrderStatus[] = [
    'CONFIRMED',
    'IN_PRODUCTION',
    'DISPATCHED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-heading text-slate-900">
              Wholesale Orders & Sales Invoices
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {orders.length} Active Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate, print, and share GST Tax Invoices, dispatch manifests & WhatsApp payment wires
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap justify-between lg:justify-end">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['ALL', 'CONFIRMED', 'IN_PRODUCTION', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((st) => (
              <button
                key={st}
                id={`order-filter-${st}`}
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          {/* New Sales Invoice Button */}
          <button
            id="open-generate-sales-invoice-btn"
            onClick={() => setIsGenerateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Sales Invoice</span>
          </button>
        </div>
      </div>

      {/* Orders List Cards */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const currentStepIndex = statusSteps.indexOf(order.status);

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all overflow-hidden"
            >
              {/* Order Card Top Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {order.orderNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        order.paymentStatus === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentStatus} ({order.paymentMethod})
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Booked: {order.createdAt}</span>
                      <span>•</span>
                      <span>Yard: <strong className="text-slate-700">{order.assignedYardName}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-sm font-bold font-heading text-slate-900">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      E-Way: {order.eWayBillNo || 'Pending'}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      id={`whatsapp-invoice-btn-${order.id}`}
                      onClick={() => sendInvoiceViaWhatsApp(order)}
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title={`Send Invoice on WhatsApp to ${order.customerPhone}`}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    <button
                      id={`view-tax-invoice-btn-${order.id}`}
                      onClick={() => setSelectedOrderForDetail(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Sales Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lifecycle Progress Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center justify-between">
                  <span>Logistics Pipeline Status:</span>
                  <span className="text-amber-600 font-bold">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0"></div>
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-500 transition-all duration-500 -z-0"
                    style={{
                      width: `${Math.max(
                        0,
                        (currentStepIndex / (statusSteps.length - 1)) * 100
                      )}%`,
                    }}
                  ></div>

                  {statusSteps.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                            isPassed
                              ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isPassed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`mt-1.5 text-[10px] font-medium hidden sm:block ${
                            isCurrent
                              ? 'text-amber-700 font-bold'
                              : isPassed
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.replace(/_/g, ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Status Update Quick Action Controls */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Assigned Truck: <strong className="font-mono text-slate-800">{order.truckNumber || 'Assigning...'}</strong></span>
                    {order.driverName && <span>({order.driverName})</span>}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {order.status === 'CONFIRMED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'IN_PRODUCTION')}
                        className="px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold border border-purple-200 transition-colors"
                      >
                        Start Plant Production
                      </button>
                    )}
                    {order.status === 'IN_PRODUCTION' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'OUT_FOR_DELIVERY')}
                        className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200 transition-colors"
                      >
                        Dispatch Fleet Truck
                      </button>
                    )}
                    {order.status === 'OUT_FOR_DELIVERY' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                        className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200 transition-colors"
                      >
                        Verify Site Offload & Deliver
                      </button>
                    )}
                    {order.paymentStatus !== 'PAID' && (
                      <button
                        onClick={() => {
                          setActiveOrderToPay(order);
                          setIsPaymentModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shadow-xs"
                      >
                        Pay Invoice
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="p-4 sm:p-5 bg-slate-50/40 text-xs">
                <div className="font-semibold text-slate-700 mb-2">Itemized Cement & Precast Products:</div>
                <div className="divide-y divide-slate-200/60 border border-slate-200 rounded-lg bg-white overflow-hidden">
                  {order.items.map((item, index) => (
                    <div key={index} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          SKU: {item.sku} • Rate: ₹{item.unitPrice} • {item.discountPercent}% Tier Discount
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-semibold text-slate-800">
                          {item.quantity.toLocaleString('en-IN')} units
                        </div>
                        <div className="font-bold text-slate-900">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    Delivery Site: <strong className="text-slate-700">{order.deliverySite}</strong> ({order.deliveryAddress})
                  </span>
                  <span>Estimated: {order.estimatedDelivery}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Full GST Tax Sales Invoice Modal (Printable & Shareable) */}
      {selectedOrderForDetail && (
        <CustomerSalesInvoiceModal
          order={selectedOrderForDetail}
          onClose={() => setSelectedOrderForDetail(null)}
        />
      )}

      {/* Generate Sales Invoice Modal */}
      <GenerateSalesInvoiceModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onInvoiceGenerated={(createdOrder) => {
          setSelectedOrderForDetail(createdOrder);
        }}
      />

    </div>
  );
};
