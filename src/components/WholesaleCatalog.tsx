import React, { useState } from 'react';
import {
  Package,
  Check,
  Plus,
  Minus,
  Sparkles,
  Percent,
  ShieldCheck,
  FileCheck,
  ShoppingCart,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const WholesaleCatalog: React.FC<{
  onOpenCart: () => void;
}> = ({ onOpenCart }) => {
  const { products, addToCart, t, cart } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    products.forEach((p) => {
      // Default starting quantity for bulk order
      initial[p.id] = p.category === 'Cement' ? 100 : p.category === 'Blocks & Pavers' ? 500 : 50;
    });
    return initial;
  });

  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const categories = [
    'ALL',
    'Cement',
    'Blocks & Pavers',
    'Precast Walls & Pipes',
    'Infrastructure Precast',
  ];

  const filteredProducts = products.filter(
    (p) => activeCategory === 'ALL' || p.category === activeCategory
  );

  const handleQtyChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, value),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 100;
    addToCart(product, qty);
    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 1200);
  };

  const totalCartItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="space-y-6">
      
      {/* Hero Wholesale Pricing Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Percent className="w-3.5 h-3.5" />
              Contractor Volume Discounts Active (Up to 18% Off Factory Base)
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {t.wholesaleCatalogTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {t.wholesaleSubtitle}
            </p>
          </div>

          {totalCartItems > 0 && (
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/10 shrink-0"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Review Order ({totalCartItems} Units)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`catalog-tab-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat === 'ALL' ? t.filterAllCategories : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const qty = quantities[product.id] || 100;
          const baseGross = product.basePrice * qty;

          // Compute matched tier discount
          const matchedTier = [...product.tierDiscounts]
            .sort((a, b) => b.minUnits - a.minUnits)
            .find((t) => qty >= t.minUnits);

          const discountPercent = matchedTier ? matchedTier.discountPercentage : 0;
          const discountAmt = (baseGross * discountPercent) / 100;
          const netItemPrice = baseGross - discountAmt;
          const effectiveUnitRate = netItemPrice / qty;

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-amber-400 transition-all shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Product Image and Badges */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold font-mono">
                      {product.sku}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold">
                      {product.grade}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-600/90 text-white text-[10px] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      IS Certified
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-slate-950/70 backdrop-blur-xs text-white text-[11px]">
                    <span>In Stock: <strong className="font-mono text-amber-300">{product.totalStock.toLocaleString('en-IN')}</strong> {product.unit}</span>
                    <span className="text-slate-300 font-mono">GST {product.gstRate}%</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold font-heading text-slate-900 leading-snug mt-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Technical Specs Pill */}
                  {product.compressiveStrength && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-0.5">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5 text-amber-500" />
                        Specification:
                      </div>
                      <div className="text-slate-600 font-mono text-[10px]">
                        {product.compressiveStrength}
                      </div>
                      {product.dimensions && (
                        <div className="text-slate-500 text-[10px]">
                          Dim: {product.dimensions}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Wholesale Tier Discount Matrix */}
                  <div className="border-t border-slate-100 pt-2.5">
                    <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Bulk Volume Pricing Tiers:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      {product.tierDiscounts.map((tier, idx) => {
                        const isCurrentActive = qty >= tier.minUnits;
                        return (
                          <div
                            key={idx}
                            className={`p-1.5 rounded border transition-colors ${
                              isCurrentActive
                                ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <div>{tier.minUnits}+ {product.unit.split(' ')[0]}</div>
                            <div className="text-amber-600 font-extrabold">
                              {tier.discountPercentage}% OFF
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Quantity & Price Card */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-xl space-y-3">
                
                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    Order Quantity:
                  </span>
                  <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-1">
                    <button
                      onClick={() => handleQtyChange(product.id, qty - 50)}
                      className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => handleQtyChange(product.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center font-bold font-mono text-xs text-slate-900 focus:outline-none"
                    />
                    <button
                      onClick={() => handleQtyChange(product.id, qty + 50)}
                      className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price Calculation with Tier Highlight */}
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <div className="text-[10px] text-slate-500">
                      Effective Rate:
                    </div>
                    <div className="text-xs font-bold text-slate-800 font-mono">
                      ₹{effectiveUnitRate.toFixed(1)} / {product.unit}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold font-heading text-slate-900">
                      ₹{Math.round(netItemPrice).toLocaleString('en-IN')}
                    </div>
                    {discountPercent > 0 && (
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        Saves ₹{Math.round(discountAmt).toLocaleString('en-IN')} ({discountPercent}% off)
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Bulk Order Button */}
                <button
                  id={`add-to-cart-${product.id}`}
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                    addedAnimation === product.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white'
                  }`}
                >
                  {addedAnimation === product.id ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Wholesale Order</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add {qty} {product.unit} to Order</span>
                    </>
                  )}
                </button>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
