import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import {
  Search,
  Filter,
  Layers,
  TreePine,
  Building,
  Award,
  Plus,
  Check,
  Eye,
  X,
  PhoneCall,
  SlidersHorizontal,
  Package,
} from 'lucide-react';

interface VisitorCatalogProps {
  selectedCategory: ProductCategory | 'All';
  onCategoryChange: (category: ProductCategory | 'All') => void;
  onOpenQuoteWithProduct?: (product: Product) => void;
}

export const VisitorCatalog: React.FC<VisitorCatalogProps> = ({
  selectedCategory,
  onCategoryChange,
  onOpenQuoteWithProduct,
}) => {
  const { products, setIsVisitorQuoteDrawerOpen } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'All', label: 'All Products', icon: Package },
    { id: ProductCategory.WALL_MOUNT_BOUNDARIES, label: 'Wall Mount Boundaries', icon: Layers, highlight: true },
    { id: ProductCategory.GAMLA_PLANTERS, label: 'Cement Gamla & Pots', icon: TreePine },
    { id: ProductCategory.NURSERY_PLANTS, label: 'Nursery Plants & Planters', icon: TreePine },
    { id: ProductCategory.DESK_BENCH, label: 'Desks & Park Benches', icon: Building },
    { id: ProductCategory.NAME_DISPLAY, label: 'Name Displays & Signs', icon: Award },
    { id: ProductCategory.SOLID_BLOCKS, label: 'Solid Blocks & Bricks', icon: Layers },
    { id: ProductCategory.PAVERS, label: 'Paver Blocks & Kerbs', icon: Layers },
    { id: ProductCategory.RCC_PIPES, label: 'RCC Hume Pipes', icon: Layers },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.grade && p.grade.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleAddToQuote = (prod: Product) => {
    setAddedProductIds((prev) => ({ ...prev, [prod.id]: true }));
    if (onOpenQuoteWithProduct) {
      onOpenQuoteWithProduct(prod);
    } else {
      setIsVisitorQuoteDrawerOpen(true);
    }
  };

  return (
    <section id="catalog-section" className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>Factory Direct Product Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Precast Concrete & Architectural Cement Products
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Browse our complete catalog of Wall Mount Boundaries, Heavy Cement Gamla, Nursery Stands, 
              Benches, and Engraved Name Displays with technical specifications and wholesale rates.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="visitor-catalog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search boundaries, gamla, desks..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'All'
                ? products.length
                : products.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id as ProductCategory | 'All')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : cat.highlight
                    ? 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or select "All Products" to see our full inventory.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('All');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const isAdded = addedProductIds[prod.id];
              return (
                <div
                  key={prod.id}
                  id={`product-card-${prod.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-xs hover:shadow-lg transition-all flex flex-col overflow-hidden"
                >
                  {/* Image container */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                        {prod.category}
                      </span>
                    </div>

                    {/* Grade or Highlight Tag */}
                    {prod.grade && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-xs">
                          {prod.grade}
                        </span>
                      </div>
                    )}

                    {/* Stock pill */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-600/90 text-white backdrop-blur-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                        In Stock ({prod.totalStock} {prod.unit}s)
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>SKU: {prod.sku}</span>
                        <span>{prod.weightApprox || 'Heavy Concrete'}</span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    {/* Pricing and Action */}
                    <div className="pt-4 mt-3 border-t border-slate-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-slate-400">Wholesale Rate</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-slate-900">
                              ₹{prod.basePrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-500">/ {prod.unit}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          +18% GST Verified
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProductForModal(prod)}
                          className="py-2 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>View Specs</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToQuote(prod)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Quote</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Product Technical Specs Modal */}
        {selectedProductForModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
            onClick={() => setSelectedProductForModal(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 bg-slate-900">
                <img
                  src={selectedProductForModal.imageUrl}
                  alt={selectedProductForModal.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProductForModal(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500 text-slate-950">
                    {selectedProductForModal.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs text-slate-400">SKU: {selectedProductForModal.sku}</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedProductForModal.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedProductForModal.description}
                  </p>
                </div>

                {/* Specs Table */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Cement Grade:</span>
                    <span className="font-bold text-slate-800">{selectedProductForModal.grade || 'M35 Precast'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Weight / Size:</span>
                    <span className="font-bold text-slate-800">{selectedProductForModal.weightApprox || selectedProductForModal.dimensions || 'Heavy Precast'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Factory Rate:</span>
                    <span className="font-bold text-amber-600 text-sm">
                      ₹{selectedProductForModal.basePrice.toLocaleString('en-IN')} / {selectedProductForModal.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Stock:</span>
                    <span className="font-bold text-emerald-700">
                      {selectedProductForModal.totalStock} {selectedProductForModal.unit}s
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={`tel:+916360164834`}
                    title="Call Plant Desk: +91 6360164834 / +91 8896704285"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Inquire via Call</span>
                  </a>

                  <button
                    onClick={() => {
                      handleAddToQuote(selectedProductForModal);
                      setSelectedProductForModal(null);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Quotation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
