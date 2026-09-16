import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, VisitorInquiryItem } from '../../types';
import {
  X,
  Plus,
  Trash2,
  Send,
  MessageSquare,
  Sparkles,
  Building,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface VisitorQuoteModalProps {
  initialSelectedProduct?: Product | null;
}

export const VisitorQuoteModal: React.FC<VisitorQuoteModalProps> = ({
  initialSelectedProduct,
}) => {
  const {
    isVisitorQuoteDrawerOpen,
    setIsVisitorQuoteDrawerOpen,
    products,
    createInquiry,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [siteCity, setSiteCity] = useState('Bengaluru');
  const [projectType, setProjectType] = useState('Boundary Wall Construction');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    id: string;
    number: string;
  } | null>(null);

  // Quote cart items
  const [quoteItems, setQuoteItems] = useState<VisitorInquiryItem[]>(() => {
    if (initialSelectedProduct) {
      return [
        {
          productId: initialSelectedProduct.id,
          productName: initialSelectedProduct.name,
          quantity: 10,
          unit: initialSelectedProduct.unit,
          estimatedPrice: initialSelectedProduct.basePrice,
        },
      ];
    }
    // Default initial item
    const firstWall = products.find((p) => p.category === 'Wall Mount Boundaries') || products[0];
    return firstWall
      ? [
          {
            productId: firstWall.id,
            productName: firstWall.name,
            quantity: 50,
            unit: firstWall.unit,
            estimatedPrice: firstWall.basePrice,
          },
        ]
      : [];
  });

  if (!isVisitorQuoteDrawerOpen) return null;

  const handleAddItem = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    if (quoteItems.some((item) => item.productId === productId)) {
      setQuoteItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 10 }
            : item
        )
      );
    } else {
      setQuoteItems((prev) => [
        ...prev,
        {
          productId: prod.id,
          productName: prod.name,
          quantity: 10,
          unit: prod.unit,
          estimatedPrice: prod.basePrice,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const estimatedTotal = quoteItems.reduce(
    (sum, item) => sum + item.quantity * item.estimatedPrice,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || quoteItems.length === 0) return;

    setIsSubmitting(true);
    try {
      const inq = await createInquiry({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        siteCity: siteCity.trim(),
        projectType,
        items: quoteItems,
        notes: notes.trim(),
        status: 'NEW',
        estimatedTotal,
      });

      setSubmittedInquiry({ id: inq.id, number: inq.inquiryNumber });
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setCustomerName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setIsVisitorQuoteDrawerOpen(false);
  };

  return (
    <div
      id="visitor-quote-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={() => setIsVisitorQuoteDrawerOpen(false)}
    >
      <div
        id="visitor-quote-drawer-panel"
        className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Request Official Price Quotation
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct from Avanish Cement Manufacturing Plant
              </p>
            </div>
          </div>

          <button
            id="close-visitor-quote-drawer-btn"
            onClick={() => setIsVisitorQuoteDrawerOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {submittedInquiry ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Inquiry Submitted Successfully!
              </h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 max-w-md mx-auto space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Inquiry Reference:</span>
                  <span className="text-amber-700 font-mono">{submittedInquiry.number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Name:</span>
                  <span>{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-slate-900">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our plant dispatch coordinator has received your specs and will call / WhatsApp you 
                with delivery freight, crane availability, and official invoice format.
              </p>

              <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                <a
                  href={`https://wa.me/916360164834?text=Hello%20Avanish%20Cement,%20I%20have%20submitted%20Inquiry%20${submittedInquiry.number}%20for%20${encodeURIComponent(projectType)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Instantly</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product selection list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Selected Cement Products ({quoteItems.length})
                  </label>
                  <span className="text-xs text-slate-400">Specify required units</span>
                </div>

                {quoteItems.length === 0 ? (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-center">
                    No items selected yet. Choose a product from the dropdown below.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {quoteItems.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-slate-900 block truncate">
                            {item.productName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Rate: ₹{item.estimatedPrice.toLocaleString('en-IN')} / {item.unit}
                          </span>
                        </div>

                        {/* Quantity adjuster */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                Math.max(1, item.quantity - 5)
                              )
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.productId,
                                Number(e.target.value) || 1
                              )
                            }
                            className="w-14 text-center py-1 text-xs bg-white border border-slate-300 rounded-lg font-bold"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(item.productId, item.quantity + 5)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.productId)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 ml-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add more products picker */}
                <div className="mt-3">
                  <label className="text-[11px] text-slate-500 block mb-1">
                    Add another product to this quotation:
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddItem(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
                  >
                    <option value="" disabled>
                      + Select Wall Boundaries, Gamla, Nursery Stands, Desks...
                    </option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.basePrice} / {p.unit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Information */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Client & Site Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name / Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar / Brigade Ltd"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 6360164834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Boundary Wall Construction">Boundary Wall Construction</option>
                      <option value="Nursery / Landscaping">Nursery / Landscaping</option>
                      <option value="Commercial & Society">Commercial & Gated Society</option>
                      <option value="Residential Villa">Residential Villa</option>
                      <option value="Govt & Infrastructure">Govt & Infrastructure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Site Delivery Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarjapur Road / Whitefield, Bengaluru"
                    value={siteCity}
                    onChange={(e) => setSiteCity(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Dimensions / Custom Name Display Wording
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need name plate engraved 'SHIVAM VILLA' in bold relief. Require crane unloading."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Estimate Total Card */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    Estimated Material Value:
                  </span>
                  <span className="text-xl font-bold text-amber-400">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-1 rounded-md">
                  Ex-Yard Plant Pricing
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-visitor-quote-inquiry-btn"
                disabled={isSubmitting || quoteItems.length === 0}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quotation Request to Factory</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
