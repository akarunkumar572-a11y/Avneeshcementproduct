import React from 'react';
import {
  Layers,
  Boxes,
  Truck,
  Award,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Database,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardOverview: React.FC<{
  onOpenNewBatchModal: () => void;
  onOpenOrderModal: () => void;
}> = ({ onOpenNewBatchModal, onOpenOrderModal }) => {
  const {
    t,
    products,
    orders,
    vehicles,
    rewards,
    setActiveTab,
    setSelectedOrderForDetail,
    setSelectedVehicleId,
  } = useApp();

  // Aggregate stats
  const totalStockUnits = products.reduce((acc, p) => acc + p.totalStock, 0);
  const lowStockCount = products.filter((p) => p.totalStock <= p.minThreshold).length;
  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const inTransitTrucks = vehicles.filter((v) => v.currentStatus === 'IN_TRANSIT');

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Plant Status Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-amber-500/10 pointer-events-none blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                All 3 Precast Yards Operational
              </span>
              <span className="text-xs text-slate-400">
                Live Steam Curing & Dispatch Active
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-heading text-white">
              Avanish Cement Products — Enterprise Logistics & Wholesale ERP
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Real-time synchronization of precast inventory, batch curing, highway freight dispatch, and automated GST billing.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="dash-quick-order-btn"
              onClick={onOpenOrderModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createOrderBtn}</span>
            </button>
            <button
              id="dash-quick-batch-btn"
              onClick={onOpenNewBatchModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{t.recordStockBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core KPI Cards (60-30-10 Color Architecture) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Stock */}
        <div 
          onClick={() => setActiveTab('inventory')}
          className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.totalInventoryVal}
            </span>
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-amber-500/15 text-slate-700 group-hover:text-amber-600 flex items-center justify-center transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-heading text-slate-900">
              {totalStockUnits.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">Units</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Across 3 Plants
              </span>
              {lowStockCount > 0 && (
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                  {lowStockCount} Low Stock
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Active Wholesale Orders */}
        <div 
          onClick={() => setActiveTab('orders')}
          className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.activeWholesaleOrders}
            </span>
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-amber-500/15 text-slate-700 group-hover:text-amber-600 flex items-center justify-center transition-colors">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-heading text-slate-900">
              {activeOrders.length} <span className="text-xs font-normal text-slate-500">Pipelines</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span>₹{(orders.reduce((acc, o) => acc + o.grandTotal, 0) / 100000).toFixed(1)} Lakhs gross</span>
              <span className="text-amber-600 font-semibold flex items-center gap-0.5">
                Manage <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* In-Transit Deliveries */}
        <div 
          onClick={() => setActiveTab('deliveries')}
          className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.inTransitDeliveries}
            </span>
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-amber-500/15 text-slate-700 group-hover:text-amber-600 flex items-center justify-center transition-colors">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-heading text-slate-900">
              {inTransitTrucks.length} <span className="text-xs font-normal text-slate-500">Active Trucks</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span className="text-emerald-700 font-medium">GPS Telemetry On</span>
              <span className="text-amber-600 font-semibold flex items-center gap-0.5">
                Track Fleet <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Loyalty Reward Points */}
        <div 
          onClick={() => setActiveTab('rewards')}
          className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.cementRewardPoints}
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center transition-colors">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-heading text-amber-600">
              {rewards.currentPoints.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">Pts</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">{rewards.tier}</span>
              <span className="text-amber-700 font-medium">Redeem Credit</span>
            </div>
          </div>
        </div>

      </div>

      {/* Operational Highlights Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Wholesale Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-heading text-slate-900">
                Recent Wholesale Purchase Orders
              </h2>
              <p className="text-xs text-slate-500">
                Direct contractor deliveries, HSN GST billing, and truck assignments
              </p>
            </div>
            <button
              id="dash-view-all-orders-btn"
              onClick={() => setActiveTab('orders')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-semibold text-[11px]">
                  <th className="py-2.5 px-3">Order Code</th>
                  <th className="py-2.5 px-3">Contractor / Site</th>
                  <th className="py-2.5 px-3">Value (INR)</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => {
                  const statusColors: Record<string, string> = {
                    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
                    CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200',
                    IN_PRODUCTION: 'bg-purple-50 text-purple-700 border-purple-200',
                    DISPATCHED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    OUT_FOR_DELIVERY: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
                    DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
                  };

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-slate-900">{order.orderNumber}</div>
                        <div className="text-[10px] text-slate-600">{order.createdAt}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{order.customerCompany}</div>
                        <div className="text-[11px] text-slate-600 truncate max-w-xs">{order.deliverySite}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        ₹{order.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          id={`dash-view-invoice-${order.id}`}
                          onClick={() => {
                            setSelectedOrderForDetail(order);
                            setActiveTab('orders');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Fleet & PostgreSQL Quick Architecture Card */}
        <div className="space-y-4">
          
          {/* Active Fleet Tracker Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                Live Fleet GPS Dispatch
              </h3>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Telemetry
              </span>
            </div>

            <div className="space-y-3">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicleId(v.id);
                    setActiveTab('deliveries');
                  }}
                  className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-900 font-mono">{v.truckNumber}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      v.currentStatus === 'IN_TRANSIT'
                        ? 'bg-amber-100 text-amber-800'
                        : v.currentStatus === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {v.currentStatus}
                    </span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{v.currentLocation}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    <span>Driver: {v.driverName}</span>
                    <span className="font-semibold text-slate-700">{v.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Database Architecture Banner */}
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4" />
              PostgreSQL Relational Schema
            </div>
            <h4 className="text-sm font-bold font-heading text-white">
              Structured Tables & Search Indexing Strategy
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Examine production-ready DDL for <code>users</code>, <code>products</code>, <code>orders</code>, and composite/GIN indexes engineered for high-concurrency wholesale pipelines.
            </p>
            <button
              id="dash-explore-postgres-btn"
              onClick={() => setActiveTab('postgres')}
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{t.viewDbSchemaBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
