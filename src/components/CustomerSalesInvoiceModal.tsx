import React, { useState } from 'react';
import {
  Printer,
  Share2,
  X,
  MessageSquare,
  CheckCircle,
  Copy,
  Building,
  Phone,
  Mail,
  MapPin,
  QrCode,
  ShieldCheck,
  Send,
  ExternalLink,
} from 'lucide-react';
import { Order } from '../types';
import {
  numberToIndianWords,
  sendInvoiceViaWhatsApp,
  shareInvoiceText,
} from '../utils/invoiceUtils';

interface CustomerSalesInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const CustomerSalesInvoiceModal: React.FC<CustomerSalesInvoiceModalProps> = ({
  order,
  onClose,
}) => {
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [showCustomPhoneInput, setShowCustomPhoneInput] = useState<boolean>(false);
  const [customWhatsAppPhone, setCustomWhatsAppPhone] = useState<string>(
    order.customerPhone || ''
  );

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const result = await shareInvoiceText(order);
    if (result.success) {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handleSendWhatsApp = (phoneToSend?: string) => {
    sendInvoiceViaWhatsApp(order, phoneToSend || customWhatsAppPhone);
  };

  // Generate UPI payment intent URI
  const upiUri = `upi://pay?pa=avanishcement@hdfcbank&pn=Avanish%20Cement%20Products&am=${order.grandTotal}&cu=INR&tn=Invoice%20${order.orderNumber}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden print:p-0 print:bg-white print:static print:block print:overflow-visible">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[94vh] max-h-[94vh] flex flex-col border border-slate-300 overflow-hidden print:h-auto print:max-h-none print:border-none print:shadow-none print:max-w-none print:rounded-none">
        
        {/* Top Pinned Control Bar (Hidden on Print) */}
        <div className="shrink-0 p-3.5 sm:p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 text-white rounded-t-2xl print:hidden z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>Official GST Tax Sales Invoice</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono border border-amber-400/30">
                  {order.orderNumber}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Authorized Commercial Document for Wholesale & Retail Supply
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap justify-end">
            {/* WhatsApp Direct Share Button */}
            <div className="relative">
              <button
                id="invoice-send-whatsapp-btn"
                onClick={() => handleSendWhatsApp()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                title={`Send to ${order.customerPhone}`}
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send on WhatsApp</span>
              </button>
            </div>

            {/* Custom Phone Toggle */}
            <button
              onClick={() => setShowCustomPhoneInput(!showCustomPhoneInput)}
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
              title="Send to different WhatsApp number"
            >
              <Send className="w-3.5 h-3.5" />
            </button>

            {/* Print Button */}
            <button
              id="invoice-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            {/* Share / Copy Button */}
            <button
              id="invoice-share-btn"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-all"
              title="Share or copy invoice text"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share</span>
            </button>

            {/* Close */}
            <button
              id="invoice-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Custom WhatsApp Number Prompt (When toggled) */}
        {showCustomPhoneInput && (
          <div className="shrink-0 p-3 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-950 print:hidden">
            <div className="flex items-center gap-2 flex-1">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold shrink-0">Send Invoice via WhatsApp to:</span>
              <input
                type="tel"
                value={customWhatsAppPhone}
                onChange={(e) => setCustomWhatsAppPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500 w-48"
              />
              <button
                onClick={() => handleSendWhatsApp(customWhatsAppPhone)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
              >
                <span>Send Now</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => setShowCustomPhoneInput(false)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Copy Toast Feedback */}
        {copiedToast && (
          <div className="shrink-0 bg-emerald-600 text-white py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2 print:hidden animate-fadeIn">
            <CheckCircle className="w-4 h-4" />
            <span>Invoice details copied to clipboard! You can paste it in WhatsApp, Email, or SMS.</span>
          </div>
        )}

        {/* Dedicated Scrollable Document Viewport with Visible Scrollbar */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-6 bg-slate-100/90 invoice-scroll-container print:p-0 print:bg-white print:overflow-visible">
          
          {/* Scroll Navigation Helper Banner (Hidden on Print) */}
          <div className="max-w-3xl mx-auto mb-3 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between shadow-2xs print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="font-semibold">Complete Invoice Document:</span>
              <span className="text-amber-800 text-[11px]">
                Scroll down below to view all items, bank transfer wire details & company stamp
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded hidden sm:inline">
              Scrollbar on right
            </span>
          </div>

          {/* Printable Tax Invoice Paper Layout */}
          <div
            id="tax-invoice-printable"
            className="p-6 sm:p-8 text-slate-900 bg-white font-sans text-xs rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto print:p-0 print:border-none print:shadow-none print:max-w-none print:rounded-none"
          >
          {/* Company Masthead Header */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              
              {/* Company Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 font-bold font-mono text-base flex items-center justify-center">
                    ACP
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-heading">
                      AVANISH CEMENT PRODUCTS
                    </h1>
                    <p className="text-[11px] font-semibold text-amber-700 tracking-wide">
                      HIGH-STRENGTH PRECAST CONCRETE & ARCHITECTURAL CASTINGS
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-[11px] pt-1">
                  Works & Regd. Office: Plot 48-B, Phase 2, KIADB Industrial Area, Jigani-Anekal Corridor, Bengaluru, Karnataka - 560105
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-700 font-medium">
                  <span><strong>GSTIN:</strong> 29AAACA9912E1Z5</span>
                  <span><strong>PAN:</strong> AAACA9912E</span>
                  <span><strong>State:</strong> Karnataka (Code 29)</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-800 font-semibold pt-0.5">
                  <span className="flex items-center gap-1 text-emerald-800">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <strong>Owner / Plant Desk:</strong> +91 6360164834, +91 8896704285
                  </span>
                  <span className="flex items-center gap-1 text-slate-700">
                    <Mail className="w-3 h-3 text-slate-500" />
                    dispatch@avanishcement.com
                  </span>
                </div>
              </div>

              {/* Invoice Badges & Metadata */}
              <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 w-full sm:w-auto">
                <div className="inline-block px-3 py-1 rounded bg-slate-900 text-white font-mono font-black text-sm tracking-wider uppercase mb-2">
                  TAX INVOICE
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 font-sans text-[11px]">Invoice No: </span>
                    <strong className="text-slate-950 text-sm">{order.orderNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans text-[11px]">Invoice Date: </span>
                    <strong className="text-slate-900">{order.createdAt}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans text-[11px]">E-Way Bill: </span>
                    <strong className="text-slate-900">{order.eWayBillNo || 'EWB-291048821903'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans text-[11px]">Supply Yard: </span>
                    <strong className="text-slate-900 font-sans">{order.assignedYardName}</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Consignee / Billed To & Delivery / Shipped To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-300">
            {/* Billed To (Buyer) */}
            <div className="p-3.5 border-b sm:border-b-0 sm:border-r border-slate-300 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                Details of Buyer / Billed To:
              </span>
              <div className="text-sm font-bold text-slate-950">
                {order.customerCompany || order.customerName}
              </div>
              <div className="font-semibold text-slate-800">
                Attn: {order.customerName}
              </div>
              <div className="text-slate-600 text-[11px]">
                {order.deliveryAddress || 'Site Delivery Location, Bengaluru Metro'}
              </div>
              <div className="pt-1 flex flex-wrap items-center gap-x-3 text-[11px]">
                <span><strong>Phone:</strong> {order.customerPhone}</span>
                {order.customerGst && (
                  <span className="font-mono"><strong>GSTIN:</strong> {order.customerGst}</span>
                )}
              </div>
            </div>

            {/* Shipped To (Consignee / Site) */}
            <div className="p-3.5 space-y-1 bg-slate-50/70">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                Consignee / Delivery Site Address:
              </span>
              <div className="text-sm font-bold text-slate-950">
                {order.deliverySite || 'Designated Construction Site'}
              </div>
              <div className="text-slate-600 text-[11px]">
                {order.deliveryAddress}
              </div>
              <div className="pt-1 grid grid-cols-2 gap-1 text-[11px] text-slate-700">
                <div>
                  <span className="text-slate-500">Dispatch Vehicle: </span>
                  <strong className="font-mono">{order.truckNumber || 'KA-05-AB-7744'}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Driver Contact: </span>
                  <strong>{order.driverName || 'Basavaraj Patil'} ({order.driverPhone || '+91 98455 31102'})</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold text-[11px] border-b border-slate-300">
                  <th className="py-2.5 px-3 border-r border-slate-300 text-center w-8">#</th>
                  <th className="py-2.5 px-3 border-r border-slate-300">Description of Goods & Specification</th>
                  <th className="py-2.5 px-2 border-r border-slate-300 text-center font-mono">HSN Code</th>
                  <th className="py-2.5 px-2 border-r border-slate-300 text-right font-mono">Qty</th>
                  <th className="py-2.5 px-3 border-r border-slate-300 text-right font-mono">Unit Rate (₹)</th>
                  <th className="py-2.5 px-2 border-r border-slate-300 text-right font-mono">Disc %</th>
                  <th className="py-2.5 px-3 text-right font-mono">Taxable Value (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 border-r border-slate-300 text-center font-mono text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-300">
                      <div className="font-bold text-slate-950">{item.productName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        SKU: {item.sku || 'AVN-PRECAST-STD'} • Heavy IS Grade Concrete Casting
                      </div>
                    </td>
                    <td className="py-2.5 px-2 border-r border-slate-300 text-center font-mono text-slate-600">
                      6810 / 2523
                    </td>
                    <td className="py-2.5 px-2 border-r border-slate-300 text-right font-mono font-bold text-slate-950">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-300 text-right font-mono text-slate-800">
                      ₹{item.unitPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-2 border-r border-slate-300 text-right font-mono text-emerald-700">
                      {item.discountPercent > 0 ? `${item.discountPercent}%` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-950">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Tax Calculation Grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Left: Amount in Words & Terms */}
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-0.5">
                  Total Invoice Amount in Words:
                </span>
                <div className="text-xs font-bold text-slate-900 italic">
                  {numberToIndianWords(order.grandTotal)}
                </div>
              </div>

              {/* Bank Transfer Details & UPI QR */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-[11px] text-slate-700 w-full">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 block">
                    NEFT / RTGS / IMPS Bank Transfer Wire:
                  </span>
                  <div><strong>Account Name:</strong> Avanish Cement Products Pvt Ltd</div>
                  <div><strong>Bank Name:</strong> HDFC Bank Ltd • Current Account</div>
                  <div><strong>Account No:</strong> <span className="font-mono font-bold text-slate-950">50200088192841</span></div>
                  <div><strong>IFSC Code:</strong> <span className="font-mono font-bold text-slate-950">HDFC000021</span> (Jigani Branch)</div>
                  <div><strong>UPI VPA:</strong> <span className="font-mono font-semibold text-emerald-800">avanishcement@hdfcbank</span></div>
                  <div className="text-[10px] text-slate-500 pt-0.5">
                    Payment Status: <strong className="text-emerald-700 font-mono uppercase">{order.paymentStatus}</strong> ({order.paymentMethod})
                    {order.transactionId && ` • Ref: ${order.transactionId}`}
                  </div>
                </div>

                {/* Instant QR Code Box */}
                <div className="shrink-0 text-center p-2.5 bg-white rounded-xl border border-slate-300 shadow-xs">
                  <div className="w-20 h-20 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-200 text-slate-900 font-mono font-bold text-[9px] relative overflow-hidden">
                    <QrCode className="w-16 h-16 text-slate-800" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 block mt-1">Scan to Pay UPI</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Cost Calculation Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span>Taxable Goods Subtotal:</span>
                  <span className="font-mono font-semibold">₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>

                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Wholesale Volume Discount:</span>
                    <span className="font-mono">-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-700">
                  <span>CGST (9% Central GST):</span>
                  <span className="font-mono">₹{Math.round(order.gstAmount / 2).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span>SGST (9% State GST):</span>
                  <span className="font-mono">₹{Math.round(order.gstAmount / 2).toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span>Flatbed Freight & Crane Transit:</span>
                  <span className="font-mono">₹{order.shippingFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 border-t-2 border-slate-300 flex justify-between items-baseline font-bold text-sm text-slate-950">
                  <span>Total Payable Invoice Amount:</span>
                  <span className="font-mono text-base text-amber-700 font-black">
                    ₹{order.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Terms & Conditions & Signatory Box */}
          <div className="mt-5 pt-4 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[10px] text-slate-600">
            <div>
              <span className="font-bold text-slate-900 block mb-1 uppercase tracking-wider">
                Standard Supply Terms & Conditions:
              </span>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                <li>Goods once supplied and inspected at site will not be taken back or exchanged.</li>
                <li>Precast boundary walls & RCC pipes must be unloaded on level ground using crane slings.</li>
                <li>Any transit breakage must be endorsed on the consignment receipt before vehicle departure.</li>
                <li>Interest @ 18% p.a. will be charged on all bills unpaid beyond the agreed credit limit.</li>
                <li>All disputes are subject to exclusive Bengaluru Jurisdiction only.</li>
              </ol>
            </div>

            {/* Official Signatory Box */}
            <div className="flex flex-col justify-between items-end text-right">
              <div>
                <span className="font-black text-slate-900 text-xs block">
                  For AVANISH CEMENT PRODUCTS
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Authorized Commercial & Dispatch Signatory
                </span>
              </div>

              {/* Official Seal / Signature Stamp */}
              <div className="mt-6 flex items-center gap-3">
                <div className="border border-dashed border-slate-400 px-3 py-1.5 rounded text-center text-[9px] font-mono text-slate-500">
                  [OFFICIAL PRECAST STAMP]
                </div>
                <div className="w-36 border-b border-slate-800 text-center pb-1">
                  <span className="font-mono text-xs text-slate-800 font-bold">Er. Avanish Sharma</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Footer Note */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
            This is a computer-generated GST Tax Invoice issued by Avanish Cement Products Pvt Ltd • Ph: +91 6360164834 / +91 8896704285
          </div>

        </div>

      </div>

      {/* Bottom Pinned Quick Action Footer (Hidden on Print) */}
      <div className="shrink-0 p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-2xl print:hidden z-10">
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-slate-500 font-medium">Invoice Total Payable:</span>
          <span className="text-base sm:text-lg font-black font-mono text-slate-900">
            ₹{order.grandTotal.toLocaleString('en-IN')}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            order.paymentStatus === 'PAID'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {order.paymentStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Complete Invoice</span>
          </button>
          <button
            onClick={() => handleSendWhatsApp()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Send on WhatsApp</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>

    </div>
  </div>
);
};
