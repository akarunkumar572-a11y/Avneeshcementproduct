import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  Gauge,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DeliveryVehicle } from '../types';

export const DeliveryLogistics: React.FC = () => {
  const {
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    advanceVehicleWaypoint,
    t,
    triggerPushNotification,
  } = useApp();

  const [otpVerificationState, setOtpVerificationState] = useState<Record<string, string>>({});
  const [podSuccess, setPodSuccess] = useState<string | null>(null);

  const selectedVehicle =
    vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const handleSimulateAdvance = (vehicleId: string) => {
    advanceVehicleWaypoint(vehicleId);
  };

  const handleVerifyOtp = (vehicle: DeliveryVehicle) => {
    const entered = otpVerificationState[vehicle.id];
    if (entered === '8841' || entered?.length === 4) {
      setPodSuccess(vehicle.id);
      triggerPushNotification(
        `Digital POD Confirmed: ${vehicle.truckNumber}`,
        `Offload OTP verified at ${vehicle.destinationSite}. Consignee sign-off stamped.`,
        'ORDER'
      );
      setTimeout(() => setPodSuccess(null), 3500);
    } else {
      alert('Please enter valid 4-digit site supervisor offload OTP (Hint: 8841)');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-heading text-slate-900">
              {t.deliveriesTitle}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {vehicles.length} Trucks in Fleet
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.fleetTrackingSubtitle}
          </p>
        </div>

        {selectedVehicle && (
          <button
            id="advance-waypoint-btn"
            onClick={() => handleSimulateAdvance(selectedVehicle.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Simulate Waypoint GPS Advance</span>
          </button>
        )}
      </div>

      {/* Grid: Left Column Vehicles List, Right Column Active Selected GPS & Waypoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Vehicles List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Fleet Deployment Telemetry
          </div>

          {vehicles.map((veh) => {
            const isSelected = veh.id === selectedVehicle?.id;

            return (
              <div
                key={veh.id}
                id={`fleet-card-${veh.id}`}
                onClick={() => setSelectedVehicleId(veh.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-700'}`} />
                    <span className="font-bold font-mono text-sm tracking-tight">
                      {veh.truckNumber}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      veh.currentStatus === 'IN_TRANSIT'
                        ? isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-amber-100 text-amber-800'
                        : veh.currentStatus === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : isSelected
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {veh.currentStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className={`mt-2 text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  <div className="font-semibold">{veh.type} ({veh.capacityTonnes} Tonnes)</div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] truncate">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{veh.currentLocation}</span>
                  </div>
                </div>

                <div className={`mt-3 pt-2.5 flex items-center justify-between text-[11px] border-t ${
                  isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <span>Driver: {veh.driverName}</span>
                  <span className="font-mono font-semibold">
                    {veh.gpsSpeedKmH > 0 ? `${veh.gpsSpeedKmH} km/h` : 'At Bay'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Vehicle In-Depth Live Dispatch Console */}
        {selectedVehicle && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6">
            
            {/* Top Bar Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg font-bold text-slate-900 font-mono">
                    {selectedVehicle.truckNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300">
                    {selectedVehicle.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assigned Order: <strong>{selectedVehicle.assignedOrderId || 'Standard Yard Transit'}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500">Live GPS Speed</div>
                  <div className="text-base font-bold font-mono text-slate-900 flex items-center gap-1 justify-end">
                    <Gauge className="w-4 h-4 text-amber-500" />
                    <span>{selectedVehicle.gpsSpeedKmH} km/h</span>
                  </div>
                </div>

                <div className="text-right pl-3 border-l border-slate-200">
                  <div className="text-xs text-slate-500">Est. Arrival</div>
                  <div className="text-base font-bold font-mono text-emerald-600 flex items-center gap-1 justify-end">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVehicle.etaMinutes} mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver & Weighbridge Tare Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 flex items-center gap-1 font-semibold">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Assigned Driver
                </div>
                <div className="font-bold text-slate-900 mt-1">{selectedVehicle.driverName}</div>
                <div className="text-slate-500 text-[11px] font-mono">{selectedVehicle.driverPhone}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  Payload Capacity
                </div>
                <div className="font-bold text-slate-900 mt-1">{selectedVehicle.capacityTonnes} Metric Tonnes</div>
                <div className="text-slate-500 text-[11px]">Certified Weighbridge Gross</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Destination Site
                </div>
                <div className="font-bold text-slate-900 mt-1 truncate">{selectedVehicle.destinationSite}</div>
                <div className="text-slate-500 text-[11px]">Offload Crane Gate 2</div>
              </div>
            </div>

            {/* Live Waypoints & Route Checkpoints Timeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold font-heading text-slate-900">
                  Live Dispatch Checkpoints & Waypoint Progress
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  GPS: {selectedVehicle.lat.toFixed(4)}, {selectedVehicle.lng.toFixed(4)}
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedVehicle.waypoints.map((wp, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                      wp.passed
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          wp.passed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {wp.passed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <div className={`font-semibold ${wp.passed ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {wp.label}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {wp.passed ? `Checkpoint Cleared (${wp.timestamp || 'Logged'})` : 'Upcoming transit route milestone'}
                        </div>
                      </div>
                    </div>

                    {wp.passed && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                        VERIFIED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Proof of Delivery (POD) Offload Handshake */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  <KeyRound className="w-4 h-4" />
                  Digital Proof of Delivery (POD)
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Site Supervisor provides 4-digit offload handshake OTP to verify physical receipt.
                </p>
              </div>

              {podSuccess === selectedVehicle.id ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>POD Confirmed & Stamped</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="OTP: 8841"
                    value={otpVerificationState[selectedVehicle.id] || ''}
                    onChange={(e) =>
                      setOtpVerificationState((prev) => ({
                        ...prev,
                        [selectedVehicle.id]: e.target.value,
                      }))
                    }
                    className="w-24 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-center font-mono font-bold text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => handleVerifyOtp(selectedVehicle)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    Confirm Offload
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
