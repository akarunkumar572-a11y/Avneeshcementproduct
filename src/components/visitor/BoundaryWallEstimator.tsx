import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calculator,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Coins,
  Send,
  Sparkles,
} from 'lucide-react';

export const BoundaryWallEstimator: React.FC = () => {
  const { createInquiry } = useApp();

  const [lengthFeet, setLengthFeet] = useState<number>(200);
  const [heightFeet, setHeightFeet] = useState<number>(6);
  const [textureFinish, setTextureFinish] = useState<'smooth' | 'brick' | 'stone'>('smooth');
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);

  // Quick form for quotation
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  // Precast calculation rules:
  // Planks are standard 7 feet long x 1 foot tall (approx 84" x 12" x 2")
  // Posts spaced every 7 feet center-to-center
  const calculation = useMemo(() => {
    const bays = Math.ceil(lengthFeet / 7);
    const numberOfPosts = bays + 1;
    const planksPerBay = heightFeet; // 1 ft height per plank
    const totalPlanks = bays * planksPerBay;

    // Rates (factory precast standard)
    const plankRate = textureFinish === 'brick' ? 460 : textureFinish === 'stone' ? 480 : 420;
    const postRate = heightFeet <= 6 ? 850 : heightFeet <= 8 ? 1050 : 1350;

    const materialsTotal = totalPlanks * plankRate + numberOfPosts * postRate;
    const erectionRatePerFoot = 85; // labor, crane, grouting alignment
    const erectionCost = includeInstallation ? lengthFeet * heightFeet * 0.45 * erectionRatePerFoot : 0;
    const estimatedGrandTotal = Math.round(materialsTotal + erectionCost);

    const traditionalBrickCost = Math.round(lengthFeet * heightFeet * 380); // Conventional 9" brick wall with plastering & painting is ~₹380/sq.ft
    const savingsVsBrick = Math.max(0, traditionalBrickCost - estimatedGrandTotal);
    const percentageSavings = traditionalBrickCost > 0 ? Math.round((savingsVsBrick / traditionalBrickCost) * 100) : 40;

    const installDays = Math.max(1, Math.ceil(lengthFeet / 150));

    return {
      bays,
      numberOfPosts,
      totalPlanks,
      plankRate,
      postRate,
      materialsTotal,
      erectionCost,
      estimatedGrandTotal,
      traditionalBrickCost,
      savingsVsBrick,
      percentageSavings,
      installDays,
    };
  }, [lengthFeet, heightFeet, textureFinish, includeInstallation]);

  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    setIsSubmitting(true);
    try {
      const inq = await createInquiry({
        customerName: clientName.trim(),
        phone: clientPhone.trim(),
        email: '',
        siteCity: clientCity.trim() || 'Site Address to be provided',
        projectType: 'Boundary Wall Construction',
        wallLengthFeet: lengthFeet,
        wallHeightFeet: heightFeet,
        items: [
          {
            productId: 'prod-wall-1',
            productName: `Precast Prestressed Boundary Planks (${textureFinish} finish)`,
            quantity: calculation.totalPlanks,
            unit: 'Planks (7ft x 1ft)',
            estimatedPrice: calculation.plankRate,
          },
          {
            productId: 'prod-wall-2',
            productName: `RCC Grooved H-Column Posts (${heightFeet + 2}ft total length)`,
            quantity: calculation.numberOfPosts,
            unit: 'Posts',
            estimatedPrice: calculation.postRate,
          },
        ],
        notes: `Estimated ${lengthFeet} ft length x ${heightFeet} ft height. ${includeInstallation ? 'Includes crane alignment & installation' : 'Supply only'}. Estimated total: ₹${calculation.estimatedGrandTotal.toLocaleString('en-IN')}`,
        status: 'NEW',
        estimatedTotal: calculation.estimatedGrandTotal,
      });

      setSubmittedInquiryId(inq.inquiryNumber);
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimator-section" className="py-14 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Precast Compound Boundary Wall Estimator
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Calculate exact planks, H-column poles, installation timeline, and instant cost savings 
            compared to conventional masonry brick boundaries.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form: Left 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Perimeter Length: <span className="text-amber-600 font-extrabold text-base">{lengthFeet} Feet</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">
                  Approx {(lengthFeet * 0.3048).toFixed(1)} Meters
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="10"
                value={lengthFeet}
                onChange={(e) => setLengthFeet(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>50 ft (Plot)</span>
                <span>250 ft</span>
                <span>500 ft (1 Acre)</span>
                <span>1000 ft</span>
                <span>2000 ft+ (Factory)</span>
              </div>
            </div>

            {/* Height Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Compound Wall Height
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[4, 5, 6, 7, 8].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHeightFeet(h)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      heightFeet === h
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{h} Feet</span>
                    <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                      {h === 6 ? 'Most Popular' : `${h * 12}"`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Texture and Finish */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Plank Surface Pattern & Finish
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTextureFinish('smooth')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    textureFinish === 'smooth'
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-500'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-slate-900 block">Smooth Grey Finish</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Classic precast concrete (₹420/plank)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextureFinish('brick')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    textureFinish === 'brick'
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-500'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-slate-900 block">Exposed Brick Texture</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Architectural groove (₹460/plank)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextureFinish('stone')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    textureFinish === 'stone'
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-500'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-slate-900 block">Granite Stone Texture</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Premium split-faced (₹480/plank)
                  </span>
                </button>
              </div>
            </div>

            {/* Scope of Work Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Include Turnkey Installation & Crane Erection?
                </span>
                <span className="text-[11px] text-slate-500">
                  Our professional crew will dig column pits, pour M20 concrete base, align H-poles & slide planks.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            {/* Quick Inquiry Form */}
            {submittedInquiryId ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm mb-0.5">
                    Quotation Request Sent! (Inquiry #{submittedInquiryId})
                  </span>
                  <span>
                    Our precast engineering team will contact you via phone/WhatsApp with your formal PDF quotation 
                    and site visit schedule.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitEstimate} className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                  Send this estimate directly to our plant dispatch:
                </span>
                <div className="grid sm:grid-cols-3 gap-2.5 mb-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile / WhatsApp *"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Site City / Area"
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className="p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Boundary Wall Estimate to Plant Office'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Results Summary: Right 5 cols */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl p-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Precast Material Breakdown
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Estimated Project Investment
              </h3>
            </div>

            {/* Total Price Display */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">
                Estimated Total (Materials {includeInstallation ? '+ Installation' : ''})
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-400">
                  ₹{calculation.estimatedGrandTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">
                  (~₹{Math.round(calculation.estimatedGrandTotal / lengthFeet)}/linear ft)
                </span>
              </div>
            </div>

            {/* Material Quantities */}
            <div className="space-y-3 text-xs border-y border-slate-700/80 py-4">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Prestressed Planks Required:</span>
                </span>
                <span className="font-bold text-white text-sm">
                  {calculation.totalPlanks} units
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>RCC Grooved H-Posts:</span>
                </span>
                <span className="font-bold text-white text-sm">
                  {calculation.numberOfPosts} posts
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Estimated Completion:</span>
                </span>
                <span className="font-bold text-emerald-400 text-sm">
                  {calculation.installDays} Days (vs 20 days brick)
                </span>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-400/30 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  <span>Savings vs Traditional Brickwork</span>
                </span>
                <span className="text-xs font-extrabold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20">
                  {calculation.percentageSavings}% Saved
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Conventional brick boundary would cost approx{' '}
                <span className="line-through text-slate-400">
                  ₹{calculation.traditionalBrickCost.toLocaleString('en-IN')}
                </span>
                . Precast saves up to{' '}
                <strong className="text-emerald-400">
                  ₹{calculation.savingsVsBrick.toLocaleString('en-IN')}
                </strong>{' '}
                in labor, curing water, plastering and time!
              </p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <p>• Prices include standard 18% GST invoice & E-Way transportation bill.</p>
              <p>• Delivery via heavy crane boom trucks directly to your site boundary.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
