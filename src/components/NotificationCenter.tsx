import React from 'react';
import {
  Bell,
  X,
  Check,
  Truck,
  Layers,
  MapPin,
  CreditCard,
  Award,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';

export const NotificationCenter: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    browserNotificationsEnabled,
    requestBrowserNotificationPermission,
    triggerPushNotification,
  } = useApp();

  if (!isOpen) return null;

  const iconMap: Record<NotificationItem['type'], React.ReactNode> = {
    ORDER: <Truck className="w-4 h-4 text-blue-500" />,
    STOCK: <Layers className="w-4 h-4 text-amber-500" />,
    LOCATION: <MapPin className="w-4 h-4 text-emerald-500" />,
    PAYMENT: <CreditCard className="w-4 h-4 text-purple-500" />,
    REWARD: <Award className="w-4 h-4 text-amber-500" />,
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm font-heading text-slate-900">
                Push Notifications & Location Alerts
              </h2>
              <p className="text-[11px] text-slate-500">
                Real-time dispatch telemetry and yard inventory warnings
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

        {/* Browser Push Permission Alert Card */}
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800 text-xs flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-amber-400 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Browser Push Alerts
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {browserNotificationsEnabled
                ? 'Active — alerts sent to desktop and mobile'
                : 'Enable system notifications for truck arrival warnings'}
            </p>
          </div>

          {!browserNotificationsEnabled && (
            <button
              onClick={requestBrowserNotificationPermission}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors shadow-sm"
            >
              Enable
            </button>
          )}
        </div>

        {/* Quick Simulator Bar for Demo */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs space-y-1.5">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Simulate Incoming Push Alert:
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() =>
                triggerPushNotification(
                  'Location Alert: Truck Approaching Gate',
                  'Vehicle KA-04-E-8821 is 1.5 km away from Electronic City Metro Pier 28.',
                  'LOCATION'
                )
              }
              className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700"
            >
              📍 Site Proximity Alert
            </button>
            <button
              onClick={() =>
                triggerPushNotification(
                  'Curing Yield Alert',
                  '1,200 Solid Concrete Blocks cleared steam curing tests at Plant 1.',
                  'STOCK'
                )
              }
              className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700"
            >
              🧱 Curing Stock Alert
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No recent notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all text-xs cursor-pointer ${
                  notif.read
                    ? 'bg-white border-slate-200 text-slate-700'
                    : 'bg-amber-50/50 border-amber-300 text-slate-900 shadow-xs ring-1 ring-amber-400/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{iconMap[notif.type]}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 font-heading">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <button
            onClick={markAllNotificationsRead}
            className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
          <span className="text-slate-400 font-mono text-[10px]">
            {notifications.filter((n) => !n.read).length} Unread
          </span>
        </div>

      </div>
    </div>
  );
};
