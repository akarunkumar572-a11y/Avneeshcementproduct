import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VisitorInquiry, Order } from '../types';
import {
  Inbox,
  Search,
  Filter,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingBag,
  FileText,
} from 'lucide-react';
import { GenerateSalesInvoiceModal } from './GenerateSalesInvoiceModal';
import { CustomerSalesInvoiceModal } from './CustomerSalesInvoiceModal';

export const OwnerInquiriesManager: React.FC = () => {
  const {
    inquiries,
    updateInquiryStatus,
    createOrder,
    setActiveTab,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | VisitorInquiry['status']>('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<VisitorInquiry | null>(null);
  const [invoiceInquiry, setInvoiceInquiry] = useState<VisitorInquiry | null>(null);
  const [activeGeneratedOrder, setActiveGeneratedOrder] = useState<Order | null>(null);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === 'NEW').length;
    const contactedCount = inquiries.filter((i) => i.status === 'CONTACTED').length;
    const quotedCount = inquiries.filter((i) => i.status === 'QUOTED').length;
    const closedCount = inquiries.filter((i) => i.status === 'CLOSED').length;
    const totalValue = inquiries.reduce((sum, i) => sum + (i.estimatedTotal || 0), 0);

    return { total, newCount, contactedCount, quotedCount, closedCount, totalValue };
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchStatus = statusFilter === 'ALL' || inq.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.phone.includes(searchQuery) ||
        inq.siteCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.inquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.projectType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const handleConvertToOrder = async (inq: VisitorInquiry) => {
    try {
      const orderItems = inq.items.map((it) => ({
        productId: it.productId,
        productName: it.productName,
        category: 'PRECAST_WALLS' as const,
        quantity: it.quantity,
        unit: it.unit,
        unitPrice: it.estimatedPrice,
        gstRate: 0.18,
        total: Math.round(it.quantity * it.estimatedPrice * 1.18),
      }));

      const grandTotal = orderItems.reduce((acc, it) => acc + it.total, 0);

      await createOrder({
        customerName: inq.customerName,
        customerPhone: inq.phone,
        customerGstin: 'Unregistered / Retail B2B',
        billingAddress: inq.siteCity,
        deliverySiteAddress: inq.siteCity,
        sourceYardId: 'yard-1',
        items: orderItems,
        subtotal: inq.estimatedTotal,
        discountAmount: 0,
        gstAmount: Math.round(inq.estimatedTotal * 0.18),
        freightAmount: 3500,
        grandTotal: grandTotal + 3500,
        status: 'CONFIRMED',
        paymentStatus: 'PENDING',
        deliveryStatus: 'SCHEDULED',
        scheduledDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      });

      updateInquiryStatus(inq.id, 'CLOSED');
      showToast(`Inquiry ${inq.inquiryNumber} converted to active Wholesale Order!`);
      setActiveTab('orders');
    } catch {
      showToast('Error converting inquiry to order.');
    }
  };

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^\d+]/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Owner Dashboard • Client Lead Pipeline</span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">
              Visitor Inquiries & Product Quote Requests
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Live inquiries received from the public visitor website for wall boundaries, gamla, 
              nursery stands, desks, and name displays.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Total Pipeline Value</span>
              <span className="text-xl font-extrabold text-amber-600">
                ₹{stats.totalValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div
            onClick={() => setStatusFilter('ALL')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="text-[11px] block opacity-80">Total Inquiries</span>
            <span className="text-xl font-bold">{stats.total}</span>
          </div>

          <div
            onClick={() => setStatusFilter('NEW')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              statusFilter === 'NEW'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <span className="text-[11px] block opacity-80">New Uncontacted</span>
            <span className="text-xl font-bold">{stats.newCount}</span>
          </div>

          <div
            onClick={() => setStatusFilter('CONTACTED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              statusFilter === 'CONTACTED'
                ? 'bg-sky-600 text-white border-sky-600'
                : 'bg-sky-50 border-sky-200 text-sky-900 hover:bg-sky-100'
            }`}
          >
            <span className="text-[11px] block opacity-80">Contacted / Site Visit</span>
            <span className="text-xl font-bold">{stats.contactedCount}</span>
          </div>

          <div
            onClick={() => setStatusFilter('QUOTED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              statusFilter === 'QUOTED'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
            }`}
          >
            <span className="text-[11px] block opacity-80">Formal Quotation Sent</span>
            <span className="text-xl font-bold">{stats.quotedCount}</span>
          </div>

          <div
            onClick={() => setStatusFilter('CLOSED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              statusFilter === 'CLOSED'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <span className="text-[11px] block opacity-80">Converted to Order</span>
            <span className="text-xl font-bold">{stats.closedCount}</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, phone, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
          />
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong>{filteredInquiries.length}</strong> of {inquiries.length} inquiries
        </div>
      </div>

      {/* Inquiries Cards Grid */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No inquiries found</h3>
          <p className="text-xs text-slate-500 mt-1">
            There are no inquiries matching your current filter settings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredInquiries.map((inq) => {
            const isSelected = selectedInquiry?.id === inq.id;
            const cleanPhone = getCleanPhone(inq.phone);

            return (
              <div
                key={inq.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
                  inq.status === 'NEW'
                    ? 'border-amber-400 bg-amber-50/10'
                    : 'border-slate-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {inq.inquiryNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5">
                      {inq.customerName}
                    </h3>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      updateInquiryStatus(
                        inq.id,
                        e.target.value as VisitorInquiry['status']
                      )
                    }
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                      inq.status === 'NEW'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : inq.status === 'CONTACTED'
                        ? 'bg-sky-100 text-sky-900 border-sky-300'
                        : inq.status === 'QUOTED'
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUOTED">QUOTED</option>
                    <option value="CLOSED">CLOSED (ORDER)</option>
                  </select>
                </div>

                {/* Location and Category */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{inq.siteCity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{inq.projectType}</span>
                  </div>
                </div>

                {/* Boundary wall dimensions if any */}
                {(inq.wallLengthFeet || inq.wallHeightFeet) && (
                  <div className="mb-3 px-3 py-1.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                    <span className="font-semibold">Boundary Wall Dimensions:</span>
                    <span className="font-bold">
                      {inq.wallLengthFeet} ft Length × {inq.wallHeightFeet} ft Height
                    </span>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-1.5 mb-3 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Requested Cement Products ({inq.items.length}):
                  </span>
                  {inq.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs text-slate-700"
                    >
                      <span className="truncate flex-1 pr-2 font-medium">
                        • {it.productName}
                      </span>
                      <span className="font-bold whitespace-nowrap text-slate-900">
                        {it.quantity} {it.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {inq.notes && (
                  <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 italic mb-3">
                    "{inq.notes}"
                  </div>
                )}

                {/* Footer with estimated price & action buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Est. Total</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      ₹{inq.estimatedTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Call Button */}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Call Client"
                    >
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hello%20${encodeURIComponent(
                        inq.customerName
                      )},%20this%20is%20Er.%20Avanish%20Sharma%20from%20Avanish%20Cement%20Products.%20We%20received%20your%20inquiry%20${
                        inq.inquiryNumber
                      }%20regarding%20${encodeURIComponent(inq.projectType)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      title="Follow up on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                    </a>

                    {/* Sales Invoice Button */}
                    <button
                      type="button"
                      onClick={() => setInvoiceInquiry(inq)}
                      className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                      title="Generate Official GST Sales Invoice for this client"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Sales Invoice</span>
                    </button>

                    {/* Convert to Order Button */}
                    {inq.status !== 'CLOSED' && (
                      <button
                        type="button"
                        onClick={() => handleConvertToOrder(inq)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                        title="Convert into active Wholesale Order"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                        <span>To Order</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Generate Sales Invoice Modal (Pre-populated from Inquiry) */}
      {invoiceInquiry && (
        <GenerateSalesInvoiceModal
          isOpen={!!invoiceInquiry}
          onClose={() => setInvoiceInquiry(null)}
          initialData={{
            customerName: invoiceInquiry.customerName,
            customerPhone: invoiceInquiry.phone,
            customerCompany: `${invoiceInquiry.customerName} (Site Client)`,
            deliverySite: `${invoiceInquiry.projectType} Site, ${invoiceInquiry.siteCity}`,
            deliveryAddress: `${invoiceInquiry.siteCity}, Karnataka`,
            items: invoiceInquiry.requestedProducts.map((p) => ({
              productName: p.productName,
              quantity: p.quantity,
              unitPrice: p.unitPrice,
            })),
          }}
          onInvoiceGenerated={(createdOrder) => {
            updateInquiryStatus(invoiceInquiry.id, 'QUOTED');
            showToast(`Invoice generated for ${invoiceInquiry.customerName}!`);
            setInvoiceInquiry(null);
            setActiveGeneratedOrder(createdOrder);
          }}
        />
      )}

      {/* Full GST Tax Sales Invoice Modal for viewing, printing & WhatsApp sharing */}
      {activeGeneratedOrder && (
        <CustomerSalesInvoiceModal
          order={activeGeneratedOrder}
          onClose={() => setActiveGeneratedOrder(null)}
        />
      )}
    </div>
  );
};
