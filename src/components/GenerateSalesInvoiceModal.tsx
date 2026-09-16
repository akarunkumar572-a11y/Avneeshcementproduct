import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  X,
  Building,
  User,
  Phone,
  MapPin,
  Truck,
  CheckCircle,
  CreditCard,
  Percent,
  Layers,
  Calendar,
  AlertCircle,
  Boxes,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderItem, Product } from '../types';

interface InvoiceLineItemDraft {
  productId: string;
  productName: string;
  sku: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  totalPrice: number;
}

interface GenerateSalesInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceGenerated: (createdOrder: Order) => void;
  initialData?: {
    customerName?: string;
    customerPhone?: string;
    customerCompany?: string;
    customerGst?: string;
    deliveryAddress?: string;
    deliverySite?: string;
    items?: Array<{
      productId?: string;
      productName?: string;
      quantity?: number;
      unitPrice?: number;
    }>;
  };
}

export const GenerateSalesInvoiceModal: React.FC<GenerateSalesInvoiceModalProps> = ({
  isOpen,
  onClose,
  onInvoiceGenerated,
  initialData,
}) => {
  const { products, stores, createOrder } = useApp();

  // Basic Details State
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCompany, setCustomerCompany] = useState<string>('');
  const [customerGst, setCustomerGst] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliverySite, setDeliverySite] = useState<string>('');
  const [assignedYardId, setAssignedYardId] = useState<string>('yard-1');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'NEFT_RTGS' | 'CREDIT_30_DAYS' | 'CASH'>('NEFT_RTGS');
  const [paymentStatus, setPaymentStatus] = useState<'PAID' | 'PENDING' | 'OVERDUE'>('PAID');
  const [shippingFee, setShippingFee] = useState<number>(4500);
  const [truckNumber, setTruckNumber] = useState<string>('KA-05-AB-7744');
  const [driverName, setDriverName] = useState<string>('Basavaraj Patil');
  const [driverPhone, setDriverPhone] = useState<string>('+91 98455 31102');
  const [eWayBillNo, setEWayBillNo] = useState<string>('');

  // Items State
  const [items, setItems] = useState<InvoiceLineItemDraft[]>([]);

  // Initialize data when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      const generatedInvNo = `ACP-2026-INV-${Math.floor(1000 + Math.random() * 9000)}`;
      setInvoiceNumber(generatedInvNo);
      setEWayBillNo(`EWB-29${Math.floor(1000000000 + Math.random() * 9000000000)}`);

      setCustomerName(initialData?.customerName || '');
      setCustomerPhone(initialData?.customerPhone || '');
      setCustomerCompany(initialData?.customerCompany || '');
      setCustomerGst(initialData?.customerGst || '');
      setDeliveryAddress(initialData?.deliveryAddress || '');
      setDeliverySite(initialData?.deliverySite || initialData?.deliveryAddress || '');

      if (initialData?.items && initialData.items.length > 0) {
        const mappedItems: InvoiceLineItemDraft[] = initialData.items.map((item) => {
          const matchedProd = products.find((p) => p.id === item.productId || p.name === item.productName);
          const price = item.unitPrice || matchedProd?.price || 1500;
          const qty = item.quantity || 1;
          return {
            productId: matchedProd?.id || 'custom-item-' + Date.now(),
            productName: item.productName || matchedProd?.name || 'Precast Custom Product',
            sku: matchedProd?.sku || 'AVN-CUSTOM',
            unit: matchedProd?.unit || 'Nos',
            quantity: qty,
            unitPrice: price,
            discountPercent: 5,
            totalPrice: Math.round(qty * price * 0.95),
          };
        });
        setItems(mappedItems);
      } else if (products.length > 0) {
        // Default with 2 popular products (Wall Mount Boundary or Gamla/Desk)
        const p1 = products.find((p) => p.category === 'PRECAST_WALLS') || products[0];
        const p2 = products.find((p) => p.category === 'GAMLA_PLANTERS') || products[1];
        setItems([
          {
            productId: p1.id,
            productName: p1.name,
            sku: p1.sku,
            unit: p1.unit,
            quantity: 50,
            unitPrice: p1.price,
            discountPercent: 5,
            totalPrice: Math.round(50 * p1.price * 0.95),
          },
          {
            productId: p2.id,
            productName: p2.name,
            sku: p2.sku,
            unit: p2.unit,
            quantity: 20,
            unitPrice: p2.price,
            discountPercent: 8,
            totalPrice: Math.round(20 * p2.price * 0.92),
          },
        ]);
      }
    }
  }, [isOpen, initialData, products]);

  if (!isOpen) return null;

  // Handle adding an item from catalog
  const handleAddCatalogItem = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const newItem: InvoiceLineItemDraft = {
      productId: prod.id,
      productName: prod.name,
      sku: prod.sku,
      unit: prod.unit,
      quantity: 10,
      unitPrice: prod.price,
      discountPercent: 5,
      totalPrice: Math.round(10 * prod.price * 0.95),
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Add a blank custom line item
  const handleAddCustomItem = () => {
    const newItem: InvoiceLineItemDraft = {
      productId: `custom-${Date.now()}`,
      productName: 'Precast Site Erection & Crane Service',
      sku: 'AVN-SRV-CRANE',
      unit: 'Service',
      quantity: 1,
      unitPrice: 8500,
      discountPercent: 0,
      totalPrice: 8500,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (
    index: number,
    field: keyof InvoiceLineItemDraft,
    value: string | number
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };

      if (field === 'quantity' || field === 'unitPrice' || field === 'discountPercent') {
        const qty = Number(item.quantity) || 0;
        const rate = Number(item.unitPrice) || 0;
        const disc = Number(item.discountPercent) || 0;
        const rawTotal = qty * rate;
        item.totalPrice = Math.round(rawTotal * (1 - disc / 100));
      }

      updated[index] = item;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Computations
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const totalItemNet = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = subtotal - totalItemNet;
  const gstAmount = Math.round(totalItemNet * 0.18); // 18% GST standard on precast/cement
  const grandTotal = totalItemNet + gstAmount + Number(shippingFee || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Please add at least one line item to the invoice.');
      return;
    }

    const assignedYard = stores.find((s) => s.id === assignedYardId);

    const orderItems: OrderItem[] = items.map((i) => ({
      productId: i.productId,
      productName: i.productName,
      sku: i.sku,
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      discountPercent: i.discountPercent,
      totalPrice: i.totalPrice,
    }));

    const newOrderData: Partial<Order> = {
      orderNumber: invoiceNumber,
      customerName: customerName || 'Contractor / Client',
      customerPhone: customerPhone || '+91 6360164834',
      customerCompany: customerCompany || customerName || 'Direct Construction Client',
      customerGst: customerGst || '29AABCP1102K1Z4',
      deliveryAddress: deliveryAddress || 'Site Delivery Location, Bengaluru',
      deliverySite: deliverySite || 'Commercial Precast Installation Site',
      assignedYardId: assignedYardId,
      assignedYardName: assignedYard?.name || 'Avanish Works (Plant 1)',
      status: 'CONFIRMED',
      items: orderItems,
      subtotal,
      discountAmount,
      gstAmount,
      shippingFee: Number(shippingFee || 0),
      grandTotal,
      paymentMethod,
      paymentStatus,
      transactionId: `TXN-INV-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      eWayBillNo: eWayBillNo || `EWB-29${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      truckNumber,
      driverName,
      driverPhone,
    };

    const created = await createOrder(newOrderData);
    onInvoiceGenerated(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white">
                Generate Customer Sales Invoice
              </h2>
              <p className="text-xs text-slate-300">
                Create official GST Tax Invoices for retail clients, builders & highway contractors
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Invoice & Customer Header Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>1. Customer & Supply Metadata</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Invoice Number *
                </label>
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Customer / Buyer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Customer Mobile (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Company / Firm Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Reddy Constructions Pvt Ltd"
                  value={customerCompany}
                  onChange={(e) => setCustomerCompany(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Customer GSTIN (B2B)
                </label>
                <input
                  type="text"
                  placeholder="29AABCR1234F1Z9"
                  value={customerGst}
                  onChange={(e) => setCustomerGst(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono uppercase outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Dispatch Plant / Yard
                </label>
                <select
                  value={assignedYardId}
                  onChange={(e) => setAssignedYardId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Delivery Site / Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Villa Project Site Pier 14, Jigani Industrial Extension"
                  value={deliverySite}
                  onChange={(e) => setDeliverySite(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Complete Billing & Site Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Survey 42/1, Anekal Road, Jigani, Bengaluru - 560105"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Line Items */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-amber-500" />
                <span>2. Products & Precast Line Items ({items.length})</span>
              </div>

              {/* Quick Add Product Dropdown */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddCatalogItem(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium outline-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    + Pick from Product Catalog...
                  </option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.price}/{p.unit})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddCustomItem}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Custom Item / Service</span>
                </button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">Item Description</th>
                    <th className="py-2.5 px-2 w-20 text-center">Unit</th>
                    <th className="py-2.5 px-2 w-24 text-right">Qty</th>
                    <th className="py-2.5 px-2 w-28 text-right">Unit Rate (₹)</th>
                    <th className="py-2.5 px-2 w-20 text-right">Disc %</th>
                    <th className="py-2.5 px-3 w-32 text-right">Net Total (₹)</th>
                    <th className="py-2.5 px-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.productName}
                          onChange={(e) => handleUpdateItem(idx, 'productName', e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-slate-200 rounded font-medium outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => handleUpdateItem(idx, 'unit', e.target.value)}
                          className="w-full px-1.5 py-1 text-xs text-center border border-slate-200 rounded font-mono"
                        />
                      </td>
                      <td className="py-2 px-2 text-right">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(idx, 'quantity', Number(e.target.value))}
                          className="w-full px-2 py-1 text-xs text-right font-mono font-bold border border-slate-200 rounded outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-2 px-2 text-right">
                        <input
                          type="number"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItem(idx, 'unitPrice', Number(e.target.value))}
                          className="w-full px-2 py-1 text-xs text-right font-mono border border-slate-200 rounded outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-2 px-2 text-right">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={item.discountPercent}
                          onChange={(e) => handleUpdateItem(idx, 'discountPercent', Number(e.target.value))}
                          className="w-full px-1.5 py-1 text-xs text-right font-mono border border-slate-200 rounded text-emerald-700 font-semibold"
                        />
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                        ₹{item.totalPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Logistics & Payment Terms */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Transit Logistics & Payment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                >
                  <option value="PAID">PAID (Full Cleared)</option>
                  <option value="PENDING">PENDING (On Delivery / Credit)</option>
                  <option value="OVERDUE">OVERDUE</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="NEFT_RTGS">NEFT / RTGS Wire</option>
                  <option value="UPI">UPI / QR Code</option>
                  <option value="CREDIT_30_DAYS">Credit (30 Days)</option>
                  <option value="CASH">Cash on Site</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Crane Freight / Shipping (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Dispatch Truck No.
                </label>
                <input
                  type="text"
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  placeholder="KA-05-AB-7744"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Live Invoice Total Summary & Confirmation */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-slate-400">Total Payable Amount:</div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                ₹{grandTotal.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-2">
                <span>Subtotal: ₹{subtotal.toLocaleString('en-IN')}</span>
                <span>•</span>
                <span>GST (18%): ₹{gstAmount.toLocaleString('en-IN')}</span>
                <span>•</span>
                <span>Freight: ₹{shippingFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="generate-invoice-submit-btn"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Create & Open Tax Invoice</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
