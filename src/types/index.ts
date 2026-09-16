export type Language = 'en' | 'hi' | 'kn' | 'ta' | 'te';

export type ViewMode = 'visitor' | 'owner';

export type VisitorTab = 'home' | 'catalog' | 'boundaries' | 'factory' | 'quote';

export type AppTab =
  | 'dashboard'
  | 'inquiries'
  | 'catalog'
  | 'inventory'
  | 'orders'
  | 'deliveries'
  | 'postgres'
  | 'stores'
  | 'rewards';

export type TabKey = AppTab;

export const ProductCategory = {
  WALL_MOUNT_BOUNDARIES: 'Wall Mount Boundaries',
  GAMLA_PLANTERS: 'Gamla & Planters',
  NURSERY_PLANTS: 'Nursery Plants & Planters',
  DESK_BENCH: 'Cement Desks & Benches',
  NAME_DISPLAY: 'Cement Name Displays',
  OTHER_PRODUCTS: 'Other Cement Products',
  SOLID_BLOCKS: 'Blocks & Pavers',
  PAVERS: 'Blocks & Pavers',
  RCC_PIPES: 'Precast Walls & Pipes',
  CEMENT: 'Cement',
  INFRASTRUCTURE: 'Infrastructure Precast',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export type ProductGrade = 'M25' | 'M30' | 'M40' | 'OPC 53' | 'PPC' | 'NP3' | 'Heavy Duty' | 'Architectural Concrete';

export interface TierDiscount {
  minUnits: number;
  discountPercentage: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  grade: ProductGrade;
  description: string;
  unit: string;
  basePrice: number;
  hsnCode: string;
  gstRate: number; // e.g. 18 or 28
  totalStock: number;
  minThreshold: number;
  batchNumber: string;
  dimensions?: string;
  compressiveStrength?: string;
  weightApprox?: string;
  finishOptions?: string[];
  isFeatured?: boolean;
  tierDiscounts: TierDiscount[];
  imageUrl: string;
  additionalImages?: string[];
  yardStock: {
    yardId: string;
    yardName: string;
    stock: number;
  }[];
}

export interface VisitorInquiryItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  estimatedPrice: number;
}

export interface VisitorInquiry {
  id: string;
  inquiryNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  siteCity: string;
  projectType: 'Boundary Wall Construction' | 'Home Garden & Villa' | 'Nursery / Landscaping' | 'Commercial & Society' | 'Custom Cement Work';
  wallLengthFeet?: number;
  wallHeightFeet?: number;
  items: VisitorInquiryItem[];
  notes?: string;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONFIRMED' | 'ARCHIVED';
  createdAt: string;
  estimatedTotal?: number;
}

export interface OwnerUser {
  id: string;
  name: string;
  role: 'OWNER_SUPERADMIN' | 'PLANT_HEAD' | 'DISPATCH_INCHARGE';
  email: string;
  phone: string;
  lastLogin: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'DISPATCHED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  discountPercent: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCompany: string;
  customerGst: string;
  deliveryAddress: string;
  deliverySite: string;
  assignedYardId: string;
  assignedYardName: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  gstAmount: number;
  shippingFee: number;
  grandTotal: number;
  paymentMethod: 'UPI' | 'NEFT_RTGS' | 'CREDIT_CARD' | 'NET_BANKING' | 'CREDIT_30_DAYS';
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIAL';
  transactionId?: string;
  createdAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
  eWayBillNo?: string;
  rewardPointsEarned: number;
  driverName?: string;
  driverPhone?: string;
  truckNumber?: string;
}

export interface DeliveryVehicle {
  id: string;
  truckNumber: string;
  type: 'Flatbed 10-Wheeler' | 'Hydraulic Crane 12-Wheeler' | 'Tipper 6-Wheeler' | 'Mini-Truck Tata 407';
  capacityTonnes: number;
  driverName: string;
  driverPhone: string;
  currentStatus: 'IDLE' | 'LOADING' | 'IN_TRANSIT' | 'UNLOADING' | 'RETURNING';
  assignedOrderId?: string;
  currentLocation: string;
  destinationSite: string;
  etaMinutes: number;
  gpsSpeedKmH: number;
  lat: number;
  lng: number;
  waypoints: {
    label: string;
    passed: boolean;
    timestamp?: string;
  }[];
}

export interface PhysicalStoreYard {
  id: string;
  name: string;
  type: 'Manufacturing Plant & Precast Yard' | 'Wholesale Logistics Depot' | 'Batching & Quarry Yard';
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  supervisor: string;
  openHours: string;
  dailyCapacity: string;
  fleetCount: number;
  lat: number;
  lng: number;
  googleMapsEmbedUrl: string;
  directionsUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ORDER' | 'STOCK' | 'LOCATION' | 'PAYMENT' | 'REWARD';
  timestamp: string;
  read: boolean;
  orderId?: string;
  actionUrl?: string;
}

export interface MembershipReward {
  currentPoints: number;
  tier: 'Silver Builder' | 'Gold Contractor' | 'Platinum Infrastructure Club';
  lifetimeSpent: number;
  pointsToNextTier: number;
  tierBenefits: string[];
  recentActivity: {
    id: string;
    description: string;
    points: number;
    type: 'EARNED' | 'REDEEMED';
    date: string;
  }[];
}

export interface SyncEvent {
  id: string;
  timestamp: string;
  originDevice: string;
  action: string;
  entityType: 'INVENTORY' | 'ORDER' | 'DELIVERY' | 'PAYMENT';
  details: string;
}
