import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  Warehouse,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const InventoryManager: React.FC<{
  isOpenAdjustmentModal: boolean;
  setIsOpenAdjustmentModal: (open: boolean) => void;
}> = ({ isOpenAdjustmentModal, setIsOpenAdjustmentModal }) => {
  const { products, adjustProductStock, stores, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedYardFilter, setSelectedYardFilter] = useState<string>('ALL');

  // Adjustment Modal State
  const [targetProduct, setTargetProduct] = useState<Product | null>(products[0] || null);
  const [adjustmentYard, setAdjustmentYard] = useState<string>('yard-1');
  const [adjustmentDelta, setAdjustmentDelta] = useState<number>(500);
  const [isAddition, setIsAddition] = useState<boolean>(true);
  const [batchCodeInput, setBatchCodeInput] = useState<string>('');
  const [reasonInput, setReasonInput] = useState<string>('Production Batch Release');

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.grade.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    'ALL',
    'Cement',
    'Blocks & Pavers',
    'Precast Walls & Pipes',
    'Infrastructure Precast',
  ];

  const handleOpenAdjust = (prod: Product, isAdd: boolean) => {
    setTargetProduct(prod);
    setIsAddition(isAdd);
    setAdjustmentDelta(isAdd ? 500 : 100);
    setBatchCodeInput(prod.batchNumber);
    setReasonInput(isAdd ? 'Automated Plant Curing Output' : 'Contractor Site Dispatch');
    setIsOpenAdjustmentModal(true);
  };

  const handleConfirmAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProduct) return;

    const delta = isAddition ? Math.abs(adjustmentDelta) : -Math.abs(adjustmentDelta);
    adjustProductStock(
      targetProduct.id,
      adjustmentYard,
      delta,
      batchCodeInput || targetProduct.batchNumber,
      reasonInput
    );
    setIsOpenAdjustmentModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-heading text-slate-900">
              {t.inventoryTitle}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
              {products.length} Active SKUs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.inventorySubtitle}
          </p>
        </div>

        <button
          id="inventory-record-batch-header-btn"
          onClick={() => {
            setTargetProduct(products[0]);
            setIsAddition(true);
            setIsOpenAdjustmentModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{t.recordStockBtn}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="inventory-search-input"
            type="text"
            placeholder={t.searchProductPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`inventory-cat-filter-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat === 'ALL' ? t.filterAllCategories : cat}
            </button>
          ))}
        </div>

        {/* Yard Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Warehouse className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            id="inventory-yard-filter-select"
            value={selectedYardFilter}
            onChange={(e) => setSelectedYardFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All 3 Physical Yards</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Inventory Master Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-semibold text-[11px]">
                <th className="py-3 px-4">Product Details & Grade</th>
                <th className="py-3 px-4">Category & HSN</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4 text-right">Base Price</th>
                <th className="py-3 px-4">Yard Breakdown</th>
                <th className="py-3 px-4 text-center">Consolidated Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((prod) => {
                const isLowStock = prod.totalStock <= prod.minThreshold;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Name & Grade */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
                            {prod.name}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span className="font-mono">{prod.sku}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-100 font-semibold text-slate-700">
                              {prod.grade}
                            </span>
                            <span>•</span>
                            <span>{prod.unit}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & HSN */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-medium text-slate-800">{prod.category}</div>
                      <div className="text-[11px] text-slate-400 font-mono">HSN: {prod.hsnCode} (GST {prod.gstRate}%)</div>
                    </td>

                    {/* Batch Number & Strength */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px] inline-block">
                        {prod.batchNumber}
                      </div>
                      {prod.compressiveStrength && (
                        <div className="text-[10px] text-slate-500 mt-1 max-w-[180px] truncate" title={prod.compressiveStrength}>
                          {prod.compressiveStrength}
                        </div>
                      )}
                    </td>

                    {/* Base Price */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-slate-900">
                        ₹{prod.basePrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">per {prod.unit}</div>
                    </td>

                    {/* Yard Breakdown */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1 text-[11px]">
                        {prod.yardStock.map((ys) => (
                          <div key={ys.yardId} className="flex items-center justify-between text-slate-600">
                            <span className="text-slate-500 truncate max-w-[110px]">
                              {ys.yardName.replace('Precast Yard', '').replace('Depot', '')}
                            </span>
                            <span className="font-mono font-medium text-slate-800">
                              {ys.stock.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Consolidated Stock Level with Low Stock Indicator */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`text-sm font-bold font-mono ${isLowStock ? 'text-rose-600' : 'text-slate-900'}`}>
                          {prod.totalStock.toLocaleString('en-IN')}
                        </span>
                        {isLowStock ? (
                          <span className="mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-3 h-3" />
                            Low (&lt; {prod.minThreshold})
                          </span>
                        ) : (
                          <span className="mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700">
                            <CheckCircle className="w-3 h-3" />
                            Healthy
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Adjustment Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          id={`btn-stock-in-${prod.id}`}
                          onClick={() => handleOpenAdjust(prod, true)}
                          title="Record Inward Production Batch"
                          className="p-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`btn-stock-out-${prod.id}`}
                          onClick={() => handleOpenAdjust(prod, false)}
                          title="Record Outward Dispatch"
                          className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {isOpenAdjustmentModal && targetProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isAddition ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {isAddition ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">
                    {isAddition ? 'Record Inward Batch' : 'Record Outward Dispatch'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {targetProduct.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpenAdjustmentModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAdjustment} className="mt-4 space-y-4 text-xs">
              
              {/* Product SKU and Grade */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">SKU:</span>{' '}
                  <span className="font-mono font-semibold text-slate-900">{targetProduct.sku}</span>
                </div>
                <div className="text-slate-700 font-medium">
                  Grade: <span className="font-bold">{targetProduct.grade}</span>
                </div>
              </div>

              {/* Yard Selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Precast Yard / Warehouse
                </label>
                <select
                  value={adjustmentYard}
                  onChange={(e) => setAdjustmentYard(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Quantity ({targetProduct.unit})
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={adjustmentDelta}
                  onChange={(e) => setAdjustmentDelta(parseInt(e.target.value) || 0)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white text-sm"
                />
              </div>

              {/* Batch Code */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Batch Code / QC Certificate
                </label>
                <input
                  type="text"
                  required
                  value={batchCodeInput}
                  onChange={(e) => setBatchCodeInput(e.target.value)}
                  placeholder="e.g. BATCH-2026-OPC-09B"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason for Adjustment
                </label>
                <input
                  type="text"
                  required
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpenAdjustmentModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  id="confirm-stock-adjustment-btn"
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-bold text-slate-950 transition-colors shadow-sm ${
                    isAddition
                      ? 'bg-amber-500 hover:bg-amber-400'
                      : 'bg-rose-500 hover:bg-rose-400 text-white'
                  }`}
                >
                  {isAddition ? 'Record Inward (+) Stock' : 'Record Outward (-) Dispatch'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
