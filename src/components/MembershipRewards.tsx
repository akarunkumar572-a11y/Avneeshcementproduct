import React, { useState } from 'react';
import {
  Award,
  Crown,
  Gift,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Coins,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MembershipRewards: React.FC = () => {
  const { rewards, redeemPointsForCredit, t } = useApp();

  const [pointsToRedeemInput, setPointsToRedeemInput] = useState<number>(5000);

  const tierMilestones = [
    { name: 'Silver Builder', minSpend: '₹0', multiplier: '1.0x', points: 0 },
    { name: 'Gold Contractor', minSpend: '₹25 Lakhs', multiplier: '1.5x', points: 20000, current: true },
    { name: 'Platinum Infrastructure Club', minSpend: '₹1 Crore', multiplier: '2.0x', points: 40000 },
  ];

  const handleRedeem = (pts: number) => {
    if (rewards.currentPoints >= pts) {
      redeemPointsForCredit(pts);
    } else {
      alert(`Insufficient points. You currently have ${rewards.currentPoints.toLocaleString()} points.`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Crown className="w-3.5 h-3.5" />
              Avanish Concrete Club — Builder Loyalty Rewards
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {t.rewardsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Earn 1 point per ₹100 spent on precast products & bulk cement. Redeem directly for freight waivers and credit notes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
            <span className="text-[11px] text-slate-400 block">Available Point Balance</span>
            <div className="text-2xl font-bold font-heading text-amber-400 flex items-center gap-1.5 justify-end mt-0.5">
              <Coins className="w-5 h-5 text-amber-500" />
              <span>{rewards.currentPoints.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">
              = ₹{rewards.currentPoints.toLocaleString('en-IN')} Credit Value
            </span>
          </div>
        </div>
      </div>

      {/* Tier Progress & Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Current Membership Standing
            </span>
            <h2 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2 mt-0.5">
              <Crown className="w-5 h-5 text-amber-500" />
              <span>{rewards.tier}</span>
            </h2>
          </div>
          <div className="text-xs text-slate-600">
            Lifetime Wholesale Spend: <strong className="text-slate-900">₹{(rewards.lifetimeSpent / 100000).toFixed(2)} Lakhs</strong>
          </div>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tierMilestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                m.current
                  ? 'bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-400/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className={m.current ? 'text-amber-950' : 'text-slate-800'}>{m.name}</span>
                {m.current && (
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold">
                    Active
                  </span>
                )}
              </div>
              <div className="text-slate-500 text-[11px]">Spend: {m.minSpend}</div>
              <div className="text-amber-700 font-semibold text-[11px]">Points: {m.multiplier} multiplier</div>
            </div>
          ))}
        </div>

        {/* Progress Bar to Next Tier */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-700">
            <span>Progress to <strong>Platinum Infrastructure Club</strong></span>
            <span className="font-mono font-semibold">{rewards.pointsToNextTier.toLocaleString('en-IN')} points required</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full w-[62%] transition-all"></div>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Tier Benefits, Right Column Redeem Points */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tier Benefits */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Active Gold Contractor Exclusive Privileges
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {rewards.tierBenefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Redeem Voucher Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-500" />
            Redeem Points for Invoice Discount Vouchers
          </h3>
          <p className="text-xs text-slate-600">
            Convert loyalty points into instant credit applied to your next cement order or hydraulic crane freight.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[2500, 5000, 10000].map((pts) => (
              <button
                key={pts}
                id={`redeem-btn-${pts}`}
                onClick={() => handleRedeem(pts)}
                className="p-3 rounded-lg border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/50 text-center transition-all text-xs group"
              >
                <div className="font-bold text-slate-900 group-hover:text-amber-700">
                  ₹{pts.toLocaleString('en-IN')} Off
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {pts.toLocaleString('en-IN')} Points
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Custom Redemption:</span>
            <button
              onClick={() => handleRedeem(2000)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
            >
              Redeem 2,000 Pts (₹2,000 Credit)
            </button>
          </div>
        </div>

      </div>

      {/* Rewards Ledger History */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold font-heading text-slate-900">
          Points Transaction Ledger
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {rewards.recentActivity.map((act) => (
            <div key={act.id} className="py-2.5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">{act.description}</div>
                <div className="text-[11px] text-slate-400">{act.date}</div>
              </div>
              <div
                className={`font-mono font-bold text-xs ${
                  act.type === 'EARNED' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {act.points > 0 ? `+${act.points.toLocaleString('en-IN')}` : act.points.toLocaleString('en-IN')} Pts
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
