import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  Product,
  Order,
  DeliveryVehicle,
  PhysicalStoreYard,
  CartItem,
  NotificationItem,
  MembershipReward,
  SyncEvent,
  OrderStatus,
  ViewMode,
  VisitorTab,
  ProductCategory,
  VisitorInquiry,
  OwnerUser,
} from '../types';
import { translations, Translations } from '../i18n/translations';
import {
  initialProducts,
  initialOrders,
  initialVehicles,
  initialStores,
  initialMembershipReward,
  initialNotifications,
  initialInquiries,
} from '../data/initialData';

export type TabKey =
  | 'dashboard'
  | 'inquiries'
  | 'catalog'
  | 'inventory'
  | 'orders'
  | 'deliveries'
  | 'postgres'
  | 'stores'
  | 'rewards';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;

  // View Mode: Visitor Website vs Owner Dashboard
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  visitorTab: VisitorTab;
  setVisitorTab: (tab: VisitorTab) => void;
  visitorSelectedCategory: ProductCategory | 'All';
  setVisitorSelectedCategory: (cat: ProductCategory | 'All') => void;
  
  // Owner Authentication & Panel
  isOwnerLoggedIn: boolean;
  ownerUser: OwnerUser | null;
  isOwnerLoginModalOpen: boolean;
  setIsOwnerLoginModalOpen: (open: boolean) => void;
  ownerLogin: (identifier: string, passwordOrPin?: string) => boolean;
  ownerLogout: () => void;

  // Visitor Inquiries & Quotes
  inquiries: VisitorInquiry[];
  createInquiry: (inquiryData: Omit<VisitorInquiry, 'id' | 'inquiryNumber' | 'createdAt'>) => Promise<VisitorInquiry>;
  updateInquiryStatus: (id: string, status: VisitorInquiry['status']) => void;
  isVisitorQuoteDrawerOpen: boolean;
  setIsVisitorQuoteDrawerOpen: (open: boolean) => void;

  // Product CRUD
  addProduct: (prod: Omit<Product, 'id'>) => void;
  updateProduct: (prod: Product) => void;
  deleteProduct: (id: string) => void;

  // Toast System
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Inventory & Products
  products: Product[];
  adjustProductStock: (
    productId: string,
    yardId: string,
    quantityDelta: number,
    batchCode: string,
    reason: string
  ) => void;

  // Wholesale Orders
  orders: Order[];
  createOrder: (newOrderData: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Fleet & Deliveries
  vehicles: DeliveryVehicle[];
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  advanceVehicleWaypoint: (vehicleId: string) => void;

  // Stores & Maps
  stores: PhysicalStoreYard[];
  selectedStoreId: string;
  setSelectedStoreId: (id: string) => void;

  // Bulk Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotals: {
    subtotal: number;
    discount: number;
    gst: number;
    freight: number;
    grandTotal: number;
    pointsToEarn: number;
  };

  // Payment Checkout
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  activeOrderToPay: Order | null;
  setActiveOrderToPay: (order: Order | null) => void;
  processPayment: (
    method: 'UPI' | 'CREDIT_CARD' | 'NEFT_RTGS',
    refId: string
  ) => Promise<boolean>;

  // Notifications & Push Alerts
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  triggerPushNotification: (
    title: string,
    message: string,
    type: 'ORDER' | 'STOCK' | 'LOCATION' | 'PAYMENT' | 'REWARD'
  ) => void;
  browserNotificationsEnabled: boolean;
  requestBrowserNotificationPermission: () => Promise<void>;

  // Membership Rewards
  rewards: MembershipReward;
  redeemPointsForCredit: (points: number) => void;

  // Real-time Device Sync
  syncEvents: SyncEvent[];
  lastSyncTimestamp: string;
  connectedDeviceCount: number;
  broadcastSync: (entityType: SyncEvent['entityType'], action: string, details: string) => void;

  // What do you want next prompt trigger
  executeNextAction: (actionId: string) => void;
  selectedOrderForDetail: Order | null;
  setSelectedOrderForDetail: (order: Order | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Web Audio synthesizer for pleasant real-time push alert chimes
function playNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Graceful fallback if audio context blocked by browser autoplay policy
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('avanish_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('avanish_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [vehicles, setVehicles] = useState<DeliveryVehicle[]>(() => {
    const saved = localStorage.getItem('avanish_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [stores] = useState<PhysicalStoreYard[]>(initialStores);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('yard-1');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>('veh-1');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('avanish_notifs');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [rewards, setRewards] = useState<MembershipReward>(() => {
    const saved = localStorage.getItem('avanish_rewards');
    return saved ? JSON.parse(saved) : initialMembershipReward;
  });

  const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([
    {
      id: 'sync-init',
      timestamp: new Date().toLocaleTimeString(),
      originDevice: 'Plant 1 Main Dispatch Console',
      action: 'System Synced',
      entityType: 'INVENTORY',
      details: 'All 3 manufacturing yards connected to real-time sync channel',
    },
  ]);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<string>(new Date().toLocaleTimeString());
  const [connectedDeviceCount] = useState<number>(3);
  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] = useState<boolean>(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [activeOrderToPay, setActiveOrderToPay] = useState<Order | null>(null);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);

  // View Mode: visitor (default) vs owner
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    return (localStorage.getItem('avanish_view_mode') as ViewMode) || 'visitor';
  });
  const [visitorTab, setVisitorTab] = useState<VisitorTab>('home');
  const [visitorSelectedCategory, setVisitorSelectedCategory] = useState<ProductCategory | 'All'>('All');

  // Owner Authentication State
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('avanish_owner_auth') === 'true';
  });
  const [ownerUser, setOwnerUser] = useState<OwnerUser | null>(() => {
    return localStorage.getItem('avanish_owner_auth') === 'true'
      ? {
          id: 'own-1',
          name: 'Er. Avanish Sharma',
          role: 'OWNER_SUPERADMIN',
          email: 'owner@avanishcement.com',
          phone: '+91 6360164834',
          lastLogin: 'Today, 09:30 AM',
        }
      : null;
  });
  const [isOwnerLoginModalOpen, setIsOwnerLoginModalOpen] = useState<boolean>(false);

  // Inquiries
  const [inquiries, setInquiries] = useState<VisitorInquiry[]>(() => {
    const saved = localStorage.getItem('avanish_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });
  const [isVisitorQuoteDrawerOpen, setIsVisitorQuoteDrawerOpen] = useState<boolean>(false);

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem('avanish_view_mode', mode);
    if (mode === 'owner') {
      setActiveTab('dashboard');
    }
  }, []);

  // Save inquiries to localStorage
  useEffect(() => {
    localStorage.setItem('avanish_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Cross-tab real-time sync broadcast channel
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('avanish_cement_realtime_sync');

    channel.onmessage = (event) => {
      const { type, payload, originDevice, entityType, action, details } = event.data;
      if (type === 'SYNC_STATE') {
        if (payload.products) setProducts(payload.products);
        if (payload.orders) setOrders(payload.orders);
        if (payload.vehicles) setVehicles(payload.vehicles);
        if (payload.rewards) setRewards(payload.rewards);

        setSyncEvents((prev) => [
          {
            id: 'sync-' + Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            originDevice: originDevice || 'Remote Field Terminal',
            action: action || 'External Update',
            entityType: entityType || 'ORDER',
            details: details || 'Real-time telemetry updated',
          },
          ...prev.slice(0, 15),
        ]);
        setLastSyncTimestamp(new Date().toLocaleTimeString());
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('avanish_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('avanish_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('avanish_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('avanish_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('avanish_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Check browser notification permission
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setBrowserNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const broadcastSync = useCallback(
    (entityType: SyncEvent['entityType'], action: string, details: string) => {
      const now = new Date().toLocaleTimeString();
      setLastSyncTimestamp(now);
      setSyncEvents((prev) => [
        {
          id: 'sync-' + Date.now(),
          timestamp: now,
          originDevice: 'Current Device Terminal',
          action,
          entityType,
          details,
        },
        ...prev.slice(0, 15),
      ]);

      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        try {
          const channel = new BroadcastChannel('avanish_cement_realtime_sync');
          channel.postMessage({
            type: 'SYNC_STATE',
            originDevice: 'Current Yard Terminal',
            entityType,
            action,
            details,
            payload: { products, orders, vehicles, rewards },
          });
          channel.close();
        } catch {
          // Channel broadcast fallback
        }
      }
    },
    [products, orders, vehicles, rewards]
  );

  const triggerPushNotification = useCallback(
    (
      title: string,
      message: string,
      type: 'ORDER' | 'STOCK' | 'LOCATION' | 'PAYMENT' | 'REWARD'
    ) => {
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        title,
        message,
        type,
        timestamp: 'Just now',
        read: false,
      };

      setNotifications((prev) => [newNotif, ...prev]);
      playNotificationChime();

      if (
        typeof window !== 'undefined' &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        try {
          new Notification(title, {
            body: message,
            icon: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=128&q=80',
          });
        } catch {
          // Safe fallback for frame restrictions
        }
      }
    },
    []
  );

  const requestBrowserNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          setBrowserNotificationsEnabled(true);
          triggerPushNotification(
            'Push Alerts Activated',
            'You will now receive instant wholesale dispatch & location alerts.',
            'LOCATION'
          );
        }
      } catch {
        // User denied or restricted
      }
    }
  };

  // Inventory adjustment
  const adjustProductStock = (
    productId: string,
    yardId: string,
    quantityDelta: number,
    batchCode: string,
    reason: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedYardStock = p.yardStock.map((ys) => {
          if (ys.yardId === yardId) {
            return { ...ys, stock: Math.max(0, ys.stock + quantityDelta) };
          }
          return ys;
        });
        const newTotal = updatedYardStock.reduce((acc, curr) => acc + curr.stock, 0);

        if (newTotal <= p.minThreshold && quantityDelta < 0) {
          triggerPushNotification(
            `Low Stock Alert: ${p.name}`,
            `Total available inventory (${newTotal} ${p.unit}) has dropped below the threshold of ${p.minThreshold}.`,
            'STOCK'
          );
        }

        return {
          ...p,
          totalStock: newTotal,
          batchNumber: batchCode || p.batchNumber,
          yardStock: updatedYardStock,
        };
      })
    );

    broadcastSync(
      'INVENTORY',
      quantityDelta > 0 ? 'Stock Inward (+)' : 'Stock Outward (-)',
      `${Math.abs(quantityDelta)} units adjusted for ${productId} (${reason})`
    );
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart totals with wholesale tier discounts
  const cartTotals = React.useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let gst = 0;

    cart.forEach(({ product, quantity }) => {
      const itemBase = product.basePrice * quantity;
      subtotal += itemBase;

      // Find applicable volume tier discount
      const matchedTier = [...product.tierDiscounts]
        .sort((a, b) => b.minUnits - a.minUnits)
        .find((tier) => quantity >= tier.minUnits);

      const discountPercent = matchedTier ? matchedTier.discountPercentage : 0;
      const itemDiscount = (itemBase * discountPercent) / 100;
      discount += itemDiscount;

      const taxable = itemBase - itemDiscount;
      gst += (taxable * product.gstRate) / 100;
    });

    // Flatbed crane logistics fee based on volume
    const totalUnits = cart.reduce((acc, i) => acc + i.quantity, 0);
    const freight = totalUnits > 0 ? (totalUnits > 500 ? 7500 : 3500) : 0;
    const grandTotal = Math.round(subtotal - discount + gst + freight);
    const pointsToEarn = Math.round(grandTotal / 100);

    return { subtotal, discount, gst, freight, grandTotal, pointsToEarn };
  }, [cart]);

  // Order creation
  const createOrder = async (newOrderData: Partial<Order>): Promise<Order> => {
    const orderNumber = `AVN-2026-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customerName: newOrderData.customerName || 'Avanish Verified Contractor',
      customerPhone: newOrderData.customerPhone || '+91 6360164834',
      customerCompany: newOrderData.customerCompany || 'Standard Infrastructure Ltd',
      customerGst: newOrderData.customerGst || '29AABCS9912K1Z8',
      deliveryAddress: newOrderData.deliveryAddress || 'Metro Line Pier 28, Ring Road Project Site',
      deliverySite: newOrderData.deliverySite || 'South Bangalore Infrastructure Project',
      assignedYardId: newOrderData.assignedYardId || 'yard-1',
      assignedYardName: newOrderData.assignedYardName || 'Plant 1 Precast Yard',
      status: 'CONFIRMED',
      items: newOrderData.items || [],
      subtotal: newOrderData.subtotal || cartTotals.subtotal,
      discountAmount: newOrderData.discountAmount || cartTotals.discount,
      gstAmount: newOrderData.gstAmount || cartTotals.gst,
      shippingFee: newOrderData.shippingFee || cartTotals.freight,
      grandTotal: newOrderData.grandTotal || cartTotals.grandTotal,
      paymentMethod: newOrderData.paymentMethod || 'UPI',
      paymentStatus: 'PAID',
      transactionId: newOrderData.transactionId || `TXN-AVN-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      estimatedDelivery: new Date(Date.now() + 86400000).toISOString().replace('T', ' ').slice(0, 16),
      eWayBillNo: `EWB-29${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      rewardPointsEarned: cartTotals.pointsToEarn,
      driverName: 'Ramesh Kumar Naik',
      driverPhone: '+91 97401 22894',
      truckNumber: 'KA-04-E-8821',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update member points
    setRewards((prev) => ({
      ...prev,
      currentPoints: prev.currentPoints + newOrder.rewardPointsEarned,
      lifetimeSpent: prev.lifetimeSpent + newOrder.grandTotal,
      recentActivity: [
        {
          id: 'act-' + Date.now(),
          description: `Order #${newOrder.orderNumber} placed`,
          points: newOrder.rewardPointsEarned,
          type: 'EARNED',
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev.recentActivity,
      ],
    }));

    // Trigger push alert
    triggerPushNotification(
      `Wholesale Order Booked: #${newOrder.orderNumber}`,
      `Total ₹${newOrder.grandTotal.toLocaleString('en-IN')} confirmed. E-Way bill ${newOrder.eWayBillNo} issued.`,
      'ORDER'
    );

    broadcastSync(
      'ORDER',
      'Wholesale Order Created',
      `Order #${newOrder.orderNumber} for ₹${newOrder.grandTotal.toLocaleString('en-IN')}`
    );

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    const target = orders.find((o) => o.id === orderId);
    if (target) {
      triggerPushNotification(
        `Order ${target.orderNumber} Status Updated`,
        `Current Status: ${status}. Driver notified for site dispatch.`,
        'ORDER'
      );
      broadcastSync(
        'ORDER',
        `Order Status -> ${status}`,
        `Order #${target.orderNumber} updated to ${status}`
      );
    }
  };

  // Advance vehicle waypoint
  const advanceVehicleWaypoint = (vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((veh) => {
        if (veh.id !== vehicleId) return veh;
        const firstUnpassedIdx = veh.waypoints.findIndex((w) => !w.passed);
        if (firstUnpassedIdx === -1) return veh;

        const updatedWaypoints = veh.waypoints.map((w, idx) =>
          idx === firstUnpassedIdx
            ? { ...w, passed: true, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : w
        );

        const allPassed = updatedWaypoints.every((w) => w.passed);
        const nextStatus = allPassed ? 'DELIVERED' : 'IN_TRANSIT';

        triggerPushNotification(
          `Vehicle ${veh.truckNumber} Waypoint Cleared`,
          `Cleared: "${veh.waypoints[firstUnpassedIdx].label}". Speed: ${veh.gpsSpeedKmH} km/h`,
          'LOCATION'
        );

        return {
          ...veh,
          currentStatus: nextStatus,
          etaMinutes: Math.max(0, veh.etaMinutes - 15),
          waypoints: updatedWaypoints,
        };
      })
    );

    broadcastSync('DELIVERY', 'Fleet Waypoint Advanced', `Vehicle ${vehicleId} updated live GPS checkpoint.`);
  };

  // Payment simulation
  const processPayment = async (
    method: 'UPI' | 'CREDIT_CARD' | 'NEFT_RTGS',
    refId: string
  ): Promise<boolean> => {
    // Simulate gateway delay
    await new Promise((res) => setTimeout(res, 800));

    if (activeOrderToPay) {
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === activeOrderToPay.id
            ? {
                ...ord,
                paymentStatus: 'PAID',
                paymentMethod: method,
                transactionId: refId || `TXN-AVN-${Date.now().toString().slice(-8)}`,
              }
            : ord
        )
      );
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }

    triggerPushNotification(
      'Payment Received Successfully',
      `Payment via ${method} confirmed. Tax invoice & E-Way Bill ready for download.`,
      'PAYMENT'
    );

    setIsPaymentModalOpen(false);
    return true;
  };

  const redeemPointsForCredit = (pointsToRedeem: number) => {
    if (rewards.currentPoints < pointsToRedeem) return;
    setRewards((prev) => ({
      ...prev,
      currentPoints: prev.currentPoints - pointsToRedeem,
      recentActivity: [
        {
          id: 'red-' + Date.now(),
          description: `Redeemed ${pointsToRedeem} points for ₹${pointsToRedeem} bill credit voucher`,
          points: -pointsToRedeem,
          type: 'REDEEMED',
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev.recentActivity,
      ],
    }));

    triggerPushNotification(
      'Points Redeemed Successfully',
      `₹${pointsToRedeem} contractor credit voucher applied to your account.`,
      'REWARD'
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Execute quick actions from "What do you want next?" bar
  const executeNextAction = (actionId: string) => {
    switch (actionId) {
      case 'view_schema':
        setActiveTab('postgres');
        break;
      case 'adjust_inventory':
        setActiveTab('inventory');
        break;
      case 'dispatch_vehicle':
        setActiveTab('deliveries');
        if (vehicles.length > 0) {
          advanceVehicleWaypoint(vehicles[0].id);
        }
        break;
      case 'find_plants':
        setActiveTab('stores');
        break;
      case 'place_wholesale_order':
        setActiveTab('catalog');
        break;
      case 'simulate_sync':
        broadcastSync('INVENTORY', 'Multi-Yard Sync Ping', 'Simulated telemetry pulse across all 3 concrete batching plants.');
        triggerPushNotification(
          'Multi-Device Sync Completed',
          'Database state broadcasted across 3 connected yard consoles.',
          'STOCK'
        );
        break;
      default:
        break;
    }
  };

  const ownerLogin = useCallback((identifier: string, _passwordOrPin?: string) => {
    const user: OwnerUser = {
      id: 'own-1',
      name: 'Er. Avanish Sharma',
      role: 'OWNER_SUPERADMIN',
      email: identifier.includes('@') ? identifier : 'owner@avanishcement.com',
      phone: '+91 6360164834',
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setIsOwnerLoggedIn(true);
    setOwnerUser(user);
    localStorage.setItem('avanish_owner_auth', 'true');
    setViewModeState('owner');
    localStorage.setItem('avanish_view_mode', 'owner');
    setActiveTab('dashboard');
    setIsOwnerLoginModalOpen(false);
    showToast(`Welcome back, ${user.name}! Owner ERP & Manufacturing Console is now active.`);
    playNotificationChime();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    return true;
  }, [showToast]);

  const ownerLogout = useCallback(() => {
    setIsOwnerLoggedIn(false);
    setOwnerUser(null);
    localStorage.removeItem('avanish_owner_auth');
    setViewModeState('visitor');
    localStorage.setItem('avanish_view_mode', 'visitor');
    showToast('Logged out of Owner Console. Switched to Visitor Catalog.');
  }, [showToast]);

  const createInquiry = useCallback(
    async (data: Omit<VisitorInquiry, 'id' | 'inquiryNumber' | 'createdAt'>) => {
      const now = new Date().toISOString();
      const inqNum = `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInq: VisitorInquiry = {
        ...data,
        id: `inq-${Date.now()}`,
        inquiryNumber: inqNum,
        createdAt: now,
      };

      setInquiries((prev) => [newInq, ...prev]);
      playNotificationChime();
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
      showToast(`Inquiry #${inqNum} submitted successfully! Our technical team will reach out promptly.`);
      
      triggerPushNotification(
        `New Client Inquiry: ${newInq.customerName}`,
        `${newInq.projectType} in ${newInq.siteCity} (${newInq.items.length} items requested)`,
        'ORDER'
      );
      return newInq;
    },
    [showToast, triggerPushNotification]
  );

  const updateInquiryStatus = useCallback((id: string, status: VisitorInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry status updated to ${status}`);
  }, [showToast]);

  const addProduct = useCallback((prod: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prod,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added to catalog.`);
    broadcastSync('INVENTORY', 'New Product Added', `Product ${newProd.name} added to catalog.`);
  }, [showToast, broadcastSync]);

  const updateProduct = useCallback((prod: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)));
    showToast(`Product "${prod.name}" updated successfully.`);
    broadcastSync('INVENTORY', 'Product Updated', `Product ${prod.name} details updated.`);
  }, [showToast, broadcastSync]);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product removed from catalog.`);
    broadcastSync('INVENTORY', 'Product Removed', `Product ID ${id} removed.`);
  }, [showToast, broadcastSync]);

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        visitorTab,
        setVisitorTab,
        visitorSelectedCategory,
        setVisitorSelectedCategory,
        isOwnerLoggedIn,
        ownerUser,
        isOwnerLoginModalOpen,
        setIsOwnerLoginModalOpen,
        ownerLogin,
        ownerLogout,
        inquiries,
        createInquiry,
        updateInquiryStatus,
        isVisitorQuoteDrawerOpen,
        setIsVisitorQuoteDrawerOpen,
        addProduct,
        updateProduct,
        deleteProduct,
        toastMessage,
        showToast,
        products,
        adjustProductStock,
        orders,
        createOrder,
        updateOrderStatus,
        vehicles,
        selectedVehicleId,
        setSelectedVehicleId,
        advanceVehicleWaypoint,
        stores,
        selectedStoreId,
        setSelectedStoreId,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotals,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        activeOrderToPay,
        setActiveOrderToPay,
        processPayment,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsRead,
        triggerPushNotification,
        browserNotificationsEnabled,
        requestBrowserNotificationPermission,
        rewards,
        redeemPointsForCredit,
        syncEvents,
        lastSyncTimestamp,
        connectedDeviceCount,
        broadcastSync,
        executeNextAction,
        selectedOrderForDetail,
        setSelectedOrderForDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
