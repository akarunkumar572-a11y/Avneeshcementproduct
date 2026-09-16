import React, { useState } from 'react';
import {
  ShoppingCart,
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    createOrder,
    setActiveOrderToPay,
    setIsPaymentModalOpen,
    t,
  } = useApp();

  const [companyName, setCompanyName] = useState('Brigade Construction Consortium');
  const [customerName, setCustomerName] = useState('Karthik Somanna');
  const [gstin, setGstin] = useState('29AABCB1234F1Z4');
  const [deliverySite, setDeliverySite] = useState('Electronic City Metro Corridor Pier 28');
  const [deliveryAddress, setDeliveryAddress] = useState('Gate 4, Tech Boulevard Phase 3, Electronic City, Bengaluru');

  if (!isOpen) return null;

  const handleProceedToPayment = async () => {
    if (cart.length === 0) return;

    const orderItems = cart.map(({ product, quantity }) => {
      const itemBase = product.basePrice * quantity;
      const matchedTier = [...product.tierDiscounts]
        .sort((a, b) => b.minUnits - a.minUnits)
        .find((tier) => quantity >= tier.minUnits);
      const discountPercent = matchedTier ? matchedTier.discountPercentage : 0;
      const itemDiscount = (itemBase * discountPercent) / 100;

      return {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        unitPrice: product.basePrice,
        quantity,
        discountPercent,
        totalPrice: Math.round(itemBase - itemDiscount),
      };
    });

    const newOrder = await createOrder({
      customerCompany: companyName,
      customerName,
      customerGst: gstin,
      deliverySite,
      deliveryAddress,
      items: orderItems,
      subtotal: cartTotals.subtotal,
      discountAmount: cartTotals.discount,
      gstAmount: cartTotals.gst,
      shippingFee: cartTotals.freight,
      grandTotal: cartTotals.grandTotal,
    });

    setActiveOrderToPay(newOrder);
    onClose();
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm font-heading text-slate-900">
                {t.orderSummary}
              </h2>
              <p className="text-[11px] text-slate-500">
                Direct factory pricing with contractor volume discounts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Cart Empty */}
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">
                Your wholesale order is currently empty
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select cement bags, precast solid blocks, pipes, or pavers from the Wholesale Catalog to build your dispatch order.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Selected Products ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:text-rose-700 normal-case font-medium flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                {cart.map(({ product, quantity }) => {
                  const itemBase = product.basePrice * quantity;
                  const matchedTier = [...product.tierDiscounts]
                    .sort((a, b) => b.minUnits - a.minUnits)
                    .find((tier) => quantity >= tier.minUnits);
                  const discountPercent = matchedTier ? matchedTier.discountPercentage : 0;
                  const discountAmt = (itemBase * discountPercent) / 100;
                  const netPrice = itemBase - discountAmt;

                  return (
                    <div
                      key={product.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900">{product.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {product.sku} • Grade: {product.grade}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                        {/* Stepper */}
                        <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity - 50)}
                            className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center font-mono font-bold text-xs text-slate-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity + 50)}
                            className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-slate-900 font-mono text-sm">
                            ₹{Math.round(netPrice).toLocaleString('en-IN')}
                          </div>
                          {discountPercent > 0 && (
                            <div className="text-[10px] text-emerald-600 font-semibold">
                              {discountPercent}% tier savings applied
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contractor Consignee Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-500" />
                  <span>Contractor Consignee Details (For GST Tax Invoice)</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-600 text-[11px] mb-0.5">
                      Company / Enterprise Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 text-[11px] mb-0.5">
                        GSTIN (15-Digit)
                      </label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-[11px] mb-0.5">
                        Project Site Tag
                      </label>
                      <input
                        type="text"
                        value={deliverySite}
                        onChange={(e) => setDeliverySite(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-[11px] mb-0.5">
                      Physical Unloading Site Address
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs border border-slate-800">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Subtotal:</span>
                  <span className="font-mono">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Wholesale Volume Discount:</span>
                    <span className="font-mono">-₹{Math.round(cartTotals.discount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Applicable GST (CGST + SGST):</span>
                  <span className="font-mono">₹{Math.round(cartTotals.gst).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Flatbed Crane Unloading Freight:</span>
                  <span className="font-mono">₹{cartTotals.freight.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                  <span>Grand Total Payable:</span>
                  <span className="text-amber-400 font-mono text-base font-heading">
                    ₹{cartTotals.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[10px] text-amber-300 flex items-center gap-1 pt-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Earns +{cartTotals.pointsToEarn} Avanish Concrete Club reward points</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-white">
            <button
              id="cart-proceed-checkout-btn"
              onClick={handleProceedToPayment}
              className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>{t.proceedToCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
