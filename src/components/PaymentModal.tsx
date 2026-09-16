import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  Lock,
  X,
  ArrowRight,
  Sparkles,
  Receipt,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    activeOrderToPay,
    processPayment,
    cartTotals,
    t,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CREDIT_CARD' | 'NEFT_RTGS'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');

  if (!isPaymentModalOpen) return null;

  const totalAmount = activeOrderToPay
    ? activeOrderToPay.grandTotal
    : cartTotals.grandTotal;

  const orderTitle = activeOrderToPay
    ? `Order #${activeOrderToPay.orderNumber}`
    : 'Wholesale Bulk Order Checkout';

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const ref =
      paymentMethod === 'UPI'
        ? `UPI-${Math.floor(1000000000 + Math.random() * 9000000000)}`
        : paymentMethod === 'NEFT_RTGS'
        ? utrNumber || `UTR-HDFC000021-${Math.floor(1000000 + Math.random() * 9000000)}`
        : `CC-AUTH-${Math.floor(100000 + Math.random() * 900000)}`;

    await processPayment(paymentMethod, ref);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900">
                {t.secureCheckout}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {orderTitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Hero */}
        <div className="my-4 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Total Payable (GST Included)</span>
            <span className="text-2xl font-bold font-heading text-amber-400">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-semibold border border-slate-700">
            <Lock className="w-3 h-3" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('UPI')}
            className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
              paymentMethod === 'UPI'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <QrCode className="w-5 h-5 text-amber-600" />
            <span>Instant UPI / QR</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('CREDIT_CARD')}
            className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
              paymentMethod === 'CREDIT_CARD'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <CreditCard className="w-5 h-5 text-amber-600" />
            <span>Corporate Card</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('NEFT_RTGS')}
            className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
              paymentMethod === 'NEFT_RTGS'
                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Building2 className="w-5 h-5 text-amber-600" />
            <span>NEFT / RTGS Wire</span>
          </button>
        </div>

        {/* Method Details Form */}
        <form onSubmit={handlePay} className="space-y-4 text-xs">
          
          {/* UPI Method */}
          {paymentMethod === 'UPI' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-center">
              <div className="font-semibold text-slate-800">
                Scan QR with Any UPI App (GPay, PhonePe, Paytm, BHIM)
              </div>
              
              {/* Synthetic UPI QR Box */}
              <div className="w-40 h-40 mx-auto bg-white p-2 rounded-lg border border-slate-300 shadow-inner flex flex-col items-center justify-center relative">
                <div className="w-32 h-32 bg-[radial-gradient(#0f172a_2px,transparent_2px)] [background-size:12px_12px] flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                    AVN
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                UPI ID: <strong>avanishcement.corp@hdfcbank</strong>
              </div>
            </div>
          )}

          {/* Corporate Card */}
          {paymentMethod === 'CREDIT_CARD' && (
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Valid Thru (MM/YY)
                  </label>
                  <input
                    type="text"
                    defaultValue="08/29"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs text-center"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    defaultValue="821"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* NEFT / RTGS Wire */}
          {paymentMethod === 'NEFT_RTGS' && (
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Virtual Bank Account for Wholesale RTGS:</div>
                <div className="text-[11px] font-mono">Beneficiary: Avanish Cement Products Pvt Ltd</div>
                <div className="text-[11px] font-mono">A/C: 50200088192841 (Current Account)</div>
                <div className="text-[11px] font-mono">IFSC: HDFC000021 • Bank: HDFC Bank</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Enter UTR / Bank Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTR-HDFC000021-9874120"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            id="submit-payment-gateway-btn"
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Verifying with Banking Network...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ₹{totalAmount.toLocaleString('en-IN')} & Generate Invoice</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
