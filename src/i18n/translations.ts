import { Language } from '../types';

export interface Translations {
  brandName: string;
  brandTagline: string;
  navDashboard: string;
  navCatalog: string;
  navInventory: string;
  navOrders: string;
  navDeliveries: string;
  navPostgres: string;
  navStores: string;
  navRewards: string;
  
  // Dashboard & Metrics
  totalInventoryVal: string;
  activeWholesaleOrders: string;
  inTransitDeliveries: string;
  cementRewardPoints: string;
  quickActions: string;
  createOrderBtn: string;
  recordStockBtn: string;
  dispatchFleetBtn: string;
  viewDbSchemaBtn: string;
  realtimeSyncActive: string;
  devicesConnected: string;

  // Inventory
  inventoryTitle: string;
  inventorySubtitle: string;
  searchProductPlaceholder: string;
  filterAllCategories: string;
  stockInBtn: string;
  stockOutBtn: string;
  inStock: string;
  lowStockAlert: string;
  batchNumber: string;
  reorderLevel: string;
  adjustStockModalTitle: string;
  quantityUnits: string;

  // Wholesale & Orders
  wholesaleCatalogTitle: string;
  wholesaleSubtitle: string;
  bulkDiscountAvailable: string;
  unitPrice: string;
  addToBulkOrder: string;
  orderSummary: string;
  subtotal: string;
  wholesaleDiscount: string;
  gstTax: string;
  shippingFreight: string;
  grandTotal: string;
  proceedToCheckout: string;
  
  // Deliveries
  deliveriesTitle: string;
  fleetTrackingSubtitle: string;
  vehicleNo: string;
  driver: string;
  statusTransit: string;
  statusDelivered: string;
  statusLoading: string;
  speed: string;
  eta: string;
  destination: string;
  trackLive: string;

  // Stores & Google Map
  storesTitle: string;
  storesSubtitle: string;
  openGoogleMaps: string;
  getDirections: string;
  plantCapacity: string;
  supervisorContact: string;

  // DB Schema & Indexing
  schemaTitle: string;
  schemaSubtitle: string;
  copySqlCode: string;
  copied: string;
  indexingStrategy: string;

  // Payment
  secureCheckout: string;
  payViaUPI: string;
  payViaCards: string;
  payViaRTGS: string;
  payNow: string;
  paymentSuccessful: string;

  // Rewards
  rewardsTitle: string;
  tierStatus: string;
  redeemPoints: string;

  // Prompt Question
  whatNextTitle: string;
  whatNextHelp: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: 'Avanish Cement Products',
    brandTagline: 'Industrial Heavy Precast & Bulk Cement Supply',
    navDashboard: 'Dashboard',
    navCatalog: 'Wholesale Catalog',
    navInventory: 'Inventory & Stock',
    navOrders: 'Wholesale Orders',
    navDeliveries: 'Fleet & Deliveries',
    navPostgres: 'PostgreSQL Schema & Indexing',
    navStores: 'Plants & Store Locations',
    navRewards: 'Builder Club Rewards',

    totalInventoryVal: 'Total Stock Inventory',
    activeWholesaleOrders: 'Active Wholesale Orders',
    inTransitDeliveries: 'In-Transit Deliveries',
    cementRewardPoints: 'Club Reward Points',
    quickActions: 'Operational Quick Actions',
    createOrderBtn: 'Create Wholesale Order',
    recordStockBtn: 'Record Production Batch',
    dispatchFleetBtn: 'Dispatch Vehicle',
    viewDbSchemaBtn: 'Explore DB Architecture',
    realtimeSyncActive: 'Live Sync Active',
    devicesConnected: 'Devices Synced Across Yards',

    inventoryTitle: 'Warehouse Inventory & Stock Management',
    inventorySubtitle: 'Live stock telemetry across Plant 1 Yard, City Depot, and Quarry Batching Works',
    searchProductPlaceholder: 'Search products by SKU, name, or grade...',
    filterAllCategories: 'All Categories',
    stockInBtn: 'Stock Inward (+)',
    stockOutBtn: 'Stock Outward (-)',
    inStock: 'In Stock',
    lowStockAlert: 'Low Stock Threshold',
    batchNumber: 'Batch ID',
    reorderLevel: 'Safety Reorder Level',
    adjustStockModalTitle: 'Adjust Yard Inventory Level',
    quantityUnits: 'Units / Bags / Meters',

    wholesaleCatalogTitle: 'Wholesale Cement & Precast Catalog',
    wholesaleSubtitle: 'Direct factory pricing with tiered wholesale volume discounts for builders & contractors',
    bulkDiscountAvailable: 'Wholesale Tier Discount Active',
    unitPrice: 'Base Unit Price',
    addToBulkOrder: 'Add to Order',
    orderSummary: 'Wholesale Order Summary',
    subtotal: 'Gross Subtotal',
    wholesaleDiscount: 'Wholesale Tier Savings',
    gstTax: 'GST (18% / 28% Tax)',
    shippingFreight: 'Flatbed Crane Freight',
    grandTotal: 'Grand Total Payable',
    proceedToCheckout: 'Proceed to Secure Checkout',

    deliveriesTitle: 'Customer Deliveries & Heavy Fleet Logistics',
    fleetTrackingSubtitle: 'Live tracking of 10-wheeler flatbeds, hydraulic cranes, and tippers with waypoint status',
    vehicleNo: 'Truck Registration',
    driver: 'Designated Driver',
    statusTransit: 'On Route to Site',
    statusDelivered: 'Delivered & Offloaded',
    statusLoading: 'Loading at Yard',
    speed: 'GPS Speed',
    eta: 'Est. Arrival',
    destination: 'Construction Site',
    trackLive: 'Live Tracking Simulator',

    storesTitle: 'Manufacturing Plants & Physical Store Yards',
    storesSubtitle: 'Find physical batching plants, stock yards, and pickup points with Google Maps',
    openGoogleMaps: 'Open in Google Maps',
    getDirections: 'Get Driving Directions',
    plantCapacity: 'Daily Precast Output',
    supervisorContact: 'Yard Dispatch Supervisor',

    schemaTitle: 'PostgreSQL Relational Architecture & Indexing Strategy',
    schemaSubtitle: 'Production-ready database DDL, foreign key constraints, and search query index optimization',
    copySqlCode: 'Copy Complete SQL DDL',
    copied: 'Copied to Clipboard!',
    indexingStrategy: 'Search Query Indexing Strategy',

    secureCheckout: 'Secure Wholesale Payment Gateway',
    payViaUPI: 'Instant UPI / QR Scan',
    payViaCards: 'Corporate Card / Debit',
    payViaRTGS: 'NEFT / RTGS Bank Transfer',
    payNow: 'Confirm & Authorize Payment',
    paymentSuccessful: 'Transaction Verified & Invoice Generated',

    rewardsTitle: 'Avanish Concrete Club - Contractor Rewards',
    tierStatus: 'Membership Tier',
    redeemPoints: 'Redeem Points for Discount',

    whatNextTitle: 'What would you like to explore or do next?',
    whatNextHelp: 'Select a guided enterprise workflow or trigger an automated action.',
  },

  hi: {
    brandName: 'अवनिश सीमेंट प्रोडक्ट्स',
    brandTagline: 'औद्योगिक हेवी प्रीकास्ट एवं थोक सीमेंट आपूर्ति',
    navDashboard: 'डैशबोर्ड',
    navCatalog: 'थोक कैटलॉग',
    navInventory: 'इन्वेंटरी एवं स्टॉक',
    navOrders: 'थोक ऑर्डर ट्रैकिंग',
    navDeliveries: 'डिलीवरी एवं फ्लीट',
    navPostgres: 'पोस्टग्रेएसक्यूएल स्कीमा',
    navStores: 'प्लांट एवं स्टोर मैप',
    navRewards: 'कांट्रैक्टर रिवार्ड्स',

    totalInventoryVal: 'कुल स्टॉक इन्वेंटरी',
    activeWholesaleOrders: 'सक्रिय थोक ऑर्डर',
    inTransitDeliveries: 'मार्गस्थ वाहन (ट्रांजिट)',
    cementRewardPoints: 'रिवार्ड पॉइंट्स',
    quickActions: 'त्वरित संचालन',
    createOrderBtn: 'नया थोक ऑर्डर बनाएं',
    recordStockBtn: 'उत्पादन बैच जोड़ें',
    dispatchFleetBtn: 'वाहन रवाना करें',
    viewDbSchemaBtn: 'डेटाबेस स्कीमा देखें',
    realtimeSyncActive: 'लाइव सिंक सक्रिय',
    devicesConnected: 'यार्ड्स में सिंक किए गए डिवाइस',

    inventoryTitle: 'गोदाम इन्वेंटरी एवं स्टॉक प्रबंधन',
    inventorySubtitle: 'प्लांट 1 यार्ड, सिटी डिपो और कंक्रीट बैचिंग में रीयल-टाइम स्टॉक',
    searchProductPlaceholder: 'उत्पाद का नाम, एसकेयू या ग्रेड खोजें...',
    filterAllCategories: 'सभी श्रेणियां',
    stockInBtn: 'स्टॉक आवक (+)',
    stockOutBtn: 'स्टॉक निकासी (-)',
    inStock: 'उपलब्ध स्टॉक',
    lowStockAlert: 'कम स्टॉक सीमा अलर्ट',
    batchNumber: 'बैच संख्या',
    reorderLevel: 'सुरक्षा पुनरावृत्ति स्तर',
    adjustStockModalTitle: 'यार्ड इन्वेंटरी स्तर समायोजित करें',
    quantityUnits: 'इकाइयां / बैग / मीटर',

    wholesaleCatalogTitle: 'थोक सीमेंट एवं प्रीकास्ट उत्पाद',
    wholesaleSubtitle: 'बिल्डरों और ठेकेदारों के लिए डायरेक्ट फैक्टरी मूल्य एवं भारी छूट',
    bulkDiscountAvailable: 'थोक टियर छूट उपलब्ध',
    unitPrice: 'मूल इकाई दर',
    addToBulkOrder: 'ऑर्डर में जोड़ें',
    orderSummary: 'थोक ऑर्डर सारांश',
    subtotal: 'सकल उप-योग',
    wholesaleDiscount: 'थोक टियर बचत',
    gstTax: 'जीएसटी (18% / 28%)',
    shippingFreight: 'क्रेन फ्लैटबेड भाड़ा',
    grandTotal: 'कुल देय राशि',
    proceedToCheckout: 'सुरक्षित भुगतान के लिए आगे बढ़ें',

    deliveriesTitle: 'ग्राहक डिलीवरी एवं फ्लीट लॉजिस्टिक्स',
    fleetTrackingSubtitle: '10-पहिया फ्लैटबेड, हाइड्रोलिक क्रेन और ट्रकों की लाइव जीपीएस ट्रैकिंग',
    vehicleNo: 'ट्रक पंजीकरण संख्या',
    driver: 'नामित चालक',
    statusTransit: 'साइट के मार्ग में',
    statusDelivered: 'सफलतापूर्वक अनलोड हुआ',
    statusLoading: 'यार्ड में लोडिंग चालू',
    speed: 'जीपीएस गति',
    eta: 'अनुमानित आगमन समय',
    destination: 'निर्माण स्थल (साइट)',
    trackLive: 'लाइव जीपीएस सिम्युलेटर',

    storesTitle: 'मैन्युफैक्चरिंग प्लांट एवं स्टोर यार्ड',
    storesSubtitle: 'गूगल मैप्स की सहायता से निकटतम प्लांट और पिकअप पॉइंट खोजें',
    openGoogleMaps: 'गूगल मैप में खोलें',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    plantCapacity: 'दैनिक उत्पादन क्षमता',
    supervisorContact: 'यार्ड डिस्पेच सुपरवाइजर',

    schemaTitle: 'पोस्टग्रेएसक्यूएल रिलेशनल डेटाबेस स्कीमा एवं इंडेक्सिंग',
    schemaSubtitle: 'उपयोगकर्ता, उत्पाद, ऑर्डर और डिलीवरी तालिकाओं के लिए ऑप्टिमाइज्ड DDL और सर्च इंडेक्स',
    copySqlCode: 'पूर्ण SQL DDL कॉपी करें',
    copied: 'क्लिपबोर्ड में कॉपी हुआ!',
    indexingStrategy: 'सर्च क्वेरी इंडेक्सिंग रणनीति',

    secureCheckout: 'सुरक्षित थोक भुगतान गेटवे',
    payViaUPI: 'त्वरित यूपीआई / क्यूआर कोड',
    payViaCards: 'कॉर्पोरेट कार्ड / डेबिट',
    payViaRTGS: 'एनईएफटी / आरटीजीएस बैंक ट्रांसफर',
    payNow: 'भुगतान की पुष्टि करें',
    paymentSuccessful: 'भुगतान सत्यापित एवं चालान तैयार',

    rewardsTitle: 'अवनिश कंक्रीट क्लब - लॉयल्टी रिवार्ड्स',
    tierStatus: 'सदस्यता स्तर',
    redeemPoints: 'छूट के लिए पॉइंट भुनाएं',

    whatNextTitle: 'आप आगे क्या करना चाहते हैं?',
    whatNextHelp: 'नीचे दिए गए किसी भी त्वरित व्यावसायिक प्रवाह का चयन करें।',
  },

  kn: {
    brandName: 'ಅವನೀಶ್ ಸಿಮೆಂಟ್ ಪ್ರಾಡಕ್ಟ್ಸ್',
    brandTagline: 'ಕೈಗಾರಿಕಾ ಪ್ರಿಕಾಸ್ಟ್ ಮತ್ತು ಸಗಟು ಸಿಮೆಂಟ್ ಸರಬರಾಜು',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navCatalog: 'ಸಗಟು ಕ್ಯಾಟಲಾಗ್',
    navInventory: 'ದಾಸ್ತಾನು ಮತ್ತು ಸ್ಟಾಕ್',
    navOrders: 'ಸಗಟು ಆರ್ಡರ್‌ಗಳು',
    navDeliveries: 'ಫ್ಲೀಟ್ ಮತ್ತು ವಿತರಣೆಗಳು',
    navPostgres: 'PostgreSQL ಸ್ಕೀಮಾ',
    navStores: 'ಪ್ಲಾಂಟ್ ಮತ್ತು ಮಳಿಗೆಗಳು',
    navRewards: 'ಬಿಲ್ಡರ್ ರಿವಾರ್ಡ್ಸ್',

    totalInventoryVal: 'ಒಟ್ಟು ಸ್ಟಾಕ್ ದಾಸ್ತಾನು',
    activeWholesaleOrders: 'ಸಕ್ರಿಯ ಸಗಟು ಆದೇಶಗಳು',
    inTransitDeliveries: 'ಮಾರ್ಗದಲ್ಲಿರುವ ವಿತರಣೆಗಳು',
    cementRewardPoints: 'ಕ್ಲಬ್ ರಿವಾರ್ಡ್ ಪಾಯಿಂಟ್‌ಗಳು',
    quickActions: 'ತ್ವರಿತ ಕಾರ್ಯಾಚರಣೆಗಳು',
    createOrderBtn: 'ಹೊಸ ಸಗಟು ಆರ್ಡರ್ ರಚಿಸಿ',
    recordStockBtn: 'ಉತ್ಪಾದನಾ ಬ್ಯಾಚ್ ಸೇರಿಸಿ',
    dispatchFleetBtn: 'ವಾಹನ ರವಾನಿಸಿ',
    viewDbSchemaBtn: 'ಡೇಟಾಬೇಸ್ ಸ್ಕೀಮಾ ವೀಕ್ಷಿಸಿ',
    realtimeSyncActive: 'ಲೈವ್ ಸಿಂಕ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    devicesConnected: 'ಸಂಪರ್ಕಿತ ಸಾಧನಗಳು',

    inventoryTitle: 'ಗೋದಾಮಿನ ದಾಸ್ತಾನು ನಿರ್ವಹಣೆ',
    inventorySubtitle: 'ಪ್ಲಾಂಟ್ 1 ಯಾರ್ಡ್ ಮತ್ತು ಸಿಟಿ ಡಿಪೋದಲ್ಲಿ ನೈಜ-ಸಮಯದ ಸ್ಟಾಕ್ ಮಾಹಿತಿ',
    searchProductPlaceholder: 'ಉತ್ಪನ್ನದ ಹೆಸರು ಅಥವಾ ಗ್ರೇಡ್ ಹುಡುಕಿ...',
    filterAllCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    stockInBtn: 'ಸ್ಟಾಕ್ ಒಳಬರುವಿಕೆ (+)',
    stockOutBtn: 'ಸ್ಟಾಕ್ ಹೊರಹೋಗುವಿಕೆ (-)',
    inStock: 'ಸ್ಟಾಕ್ ಲಭ್ಯವಿದೆ',
    lowStockAlert: 'ಕಡಿಮೆ ಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆ',
    batchNumber: 'ಬ್ಯಾಚ್ ಸಂಖ್ಯೆ',
    reorderLevel: 'ಮರುಆದೇಶ ಮಟ್ಟ',
    adjustStockModalTitle: 'ಸ್ಟಾಕ್ ಮಟ್ಟವನ್ನು ಸರಿಹೊಂದಿಸಿ',
    quantityUnits: 'ಘಟಕಗಳು / ಚೀಲಗಳು / ಮೀಟರ್‌ಗಳು',

    wholesaleCatalogTitle: 'ಸಗಟು ಸಿಮೆಂಟ್ ಮತ್ತು ಪ್ರಿಕಾಸ್ಟ್ ಕ್ಯಾಟಲಾಗ್',
    wholesaleSubtitle: 'ಗುತ್ತಿಗೆದಾರರಿಗೆ ಫ್ಯಾಕ್ಟರಿ ನೇರ ಬೆಲೆ ಮತ್ತು ಬೃಹತ್ ರಿಯಾಯಿತಿಗಳು',
    bulkDiscountAvailable: 'ಸಗಟು ರಿಯಾಯಿತಿ ಲಭ್ಯವಿದೆ',
    unitPrice: 'ಮೂಲ ಬೆಲೆ',
    addToBulkOrder: 'ಆರ್ಡರ್‌ಗೆ ಸೇರಿಸಿ',
    orderSummary: 'ಆರ್ಡರ್ ಸಾರಾಂಶ',
    subtotal: 'ಉಪಮೊತ್ತ',
    wholesaleDiscount: 'ಸಗಟು ಉಳಿತಾಯ',
    gstTax: 'ಜಿಎಸ್‌ಟಿ (18% / 28%)',
    shippingFreight: 'ಫ್ಲಾಟ್‌ಬೆಡ್ ಕ್ರೇನ್ ಸಾರಿಗೆ ಶುಲ್ಕ',
    grandTotal: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
    proceedToCheckout: 'ಸುರಕ್ಷಿತ ಪಾವತಿಗೆ ಮುಂದುವರಿಯಿರಿ',

    deliveriesTitle: 'ಗ್ರಾಹಕರ ವಿತರಣೆ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್',
    fleetTrackingSubtitle: 'ಟ್ರಕ್‌ಗಳು ಮತ್ತು ಕ್ರೇನ್‌ಗಳ ಲೈವ್ ಜಿಪಿಎಸ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    vehicleNo: 'ವಾಹನ ನೋಂದಣಿ ಸಂಖ್ಯೆ',
    driver: 'ಚಾಲಕನ ಹೆಸರು',
    statusTransit: 'ಮಾರ್ಗದಲ್ಲಿದೆ',
    statusDelivered: 'ವಿತರಿಸಲಾಗಿದೆ',
    statusLoading: 'ಲೋಡಿಂಗ್ ನಡೆಯುತ್ತಿದೆ',
    speed: 'ಜಿಪಿಎಸ್ ವೇಗ',
    eta: 'ನಿರೀಕ್ಷಿತ ಸಮಯ',
    destination: 'ನಿರ್ಮಾಣ ತಾಣ',
    trackLive: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',

    storesTitle: 'ಉತ್ಪಾದನಾ ಘಟಕಗಳು ಮತ್ತು ಯಾರ್ಡ್‌ಗಳು',
    storesSubtitle: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮೂಲಕ ಹತ್ತಿರದ ಪ್ಲಾಂಟ್ ಹುಡುಕಿ',
    openGoogleMaps: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    getDirections: 'ಮಾರ್ಗಸೂಚಿ ಪಡೆಯಿರಿ',
    plantCapacity: 'ದೈನಂದಿನ ಸಾಮರ್ಥ್ಯ',
    supervisorContact: 'ಮೇಲ್ವಿಚಾರಕರ ಸಂಪರ್ಕ',

    schemaTitle: 'PostgreSQL ಡೇಟಾಬೇಸ್ ವಿನ್ಯಾಸ ಮತ್ತು ಇಂಡೆಕ್ಸಿಂಗ್',
    schemaSubtitle: 'ಬಳಕೆದಾರರು, ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಆದೇಶಗಳಿಗಾಗಿ ಆಪ್ಟಿಮೈಸ್ಡ್ ಸ್ಕೀಮಾ',
    copySqlCode: 'SQL ಕೋಡ್ ನಕಲಿಸಿ',
    copied: 'ನಕಲಿಸಲಾಗಿದೆ!',
    indexingStrategy: 'ಹುಡುಕಾಟ ಇಂಡೆಕ್ಸಿಂಗ್ ತಂತ್ರ',

    secureCheckout: 'ಸುರಕ್ಷಿತ ಸಗಟು ಪಾವತಿ ಗೇಟ್‌ವೇ',
    payViaUPI: 'ತಕ್ಷಣದ ಯುಪಿಐ / ಕ್ಯೂಆರ್ ಕೋಡ್',
    payViaCards: 'ಕಾರ್ಡ್ ಪಾವತಿ',
    payViaRTGS: 'ನೆಫ್ಟ್ / ಆರ್‌ಟಿಜಿಎಸ್ ವರ್ಗಾವಣೆ',
    payNow: 'ಪಾವತಿ ಖಚಿತಪಡಿಸಿ',
    paymentSuccessful: 'ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ',

    rewardsTitle: 'ಅವನೀಶ್ ಕಾಂಕ್ರೀಟ್ ಕ್ಲಬ್ - ರಿವಾರ್ಡ್ಸ್',
    tierStatus: 'ಸದಸ್ಯತ್ವದ ಹಂತ',
    redeemPoints: 'ಪಾಯಿಂಟ್‌ಗಳನ್ನು ರಿಡೀಮ್ ಮಾಡಿ',

    whatNextTitle: 'ಮುಂದೆ ನೀವು ಏನನ್ನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
    whatNextHelp: 'ಕೆಳಗಿನ ಕ್ರಿಯೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಆರಿಸಿ.',
  },

  ta: {
    brandName: 'அவனிஷ் சிமெண்ட் தயாரிப்புகள்',
    brandTagline: 'தொழில்துறை ப்ரீகாஸ்ட் & மொத்த சிமெண்ட் விநியோகம்',
    navDashboard: 'டாஷ்போர்டு',
    navCatalog: 'மொத்த விற்பனை பட்டியல்',
    navInventory: 'சரக்கு இருப்பு (இன்வென்டரி)',
    navOrders: 'மொத்த ஆர்டர்கள்',
    navDeliveries: 'டெலிவரி & வாகனங்கள்',
    navPostgres: 'PostgreSQL ஸ்கீமா',
    navStores: 'ஆலைகள் & இருப்பிடங்கள்',
    navRewards: 'பில்டர் கிளப் வெகுமதிகள்',

    totalInventoryVal: 'மொத்த சரக்கு இருப்பு',
    activeWholesaleOrders: 'செயலில் உள்ள ஆர்டர்கள்',
    inTransitDeliveries: 'வழியில் உள்ள வாகனங்கள்',
    cementRewardPoints: 'கிளப் ரிவார்டு புள்ளிகள்',
    quickActions: 'விரைவு செயல்பாடுகள்',
    createOrderBtn: 'புதிய ஆர்டரை உருவாக்கவும்',
    recordStockBtn: 'உற்பத்தி தொகுப்பை பதிவு செய்',
    dispatchFleetBtn: 'வாகனத்தை அனுப்பவும்',
    viewDbSchemaBtn: 'தரவுத்தள திட்டத்தை காண்க',
    realtimeSyncActive: 'நேரடி ஒத்திசைவு செயலில் உள்ளது',
    devicesConnected: 'இணைக்கப்பட்ட சாதனங்கள்',

    inventoryTitle: 'கிடங்கு இருப்பு மேலாண்மை',
    inventorySubtitle: 'ஆலை 1 மற்றும் நகர கிடங்கில் நிகழ்நேர இருப்பு நிலை',
    searchProductPlaceholder: 'தயாரிப்பு பெயர் அல்லது குறியீட்டைத் தேடுங்கள்...',
    filterAllCategories: 'அனைத்து பிரிவுகள்',
    stockInBtn: 'சரக்கு உள்ளீடு (+)',
    stockOutBtn: 'சரக்கு வெளியீடு (-)',
    inStock: 'இருப்பில் உள்ளது',
    lowStockAlert: 'குறைந்த இருப்பு எச்சரிக்கை',
    batchNumber: 'தொகுதி எண் (பேட்ச்)',
    reorderLevel: 'மறுஆர்டர் வரம்பு',
    adjustStockModalTitle: 'இருப்பு அளவை மாற்றவும்',
    quantityUnits: 'அலகுகள் / பைகள் / மீட்டர்கள்',

    wholesaleCatalogTitle: 'மொத்த சிமெண்ட் & ப்ரீகாஸ்ட் பட்டியல்',
    wholesaleSubtitle: 'கட்டுமான நிறுவனங்களுக்கு தொழிற்சாலை நேரடி விலை மற்றும் தள்ளுபடிகள்',
    bulkDiscountAvailable: 'மொத்த தள்ளுபடி கிடைக்கிறது',
    unitPrice: 'அடிப்படை விலை',
    addToBulkOrder: 'ஆர்டரில் சேர்க்கவும்',
    orderSummary: 'ஆர்டர் சுருக்கம்',
    subtotal: 'மொத்த தொகை',
    wholesaleDiscount: 'மொத்த தள்ளுபடி சேமிப்பு',
    gstTax: 'ஜிஎஸ்டி (18% / 28%)',
    shippingFreight: 'வாகன போக்குவரத்து கட்டணம்',
    grandTotal: 'செலுத்த வேண்டிய மொத்த தொகை',
    proceedToCheckout: 'பாதுகாப்பான கட்டணத்தை செலுத்தவும்',

    deliveriesTitle: 'வாடிக்கையாளர் டெலிவரி & சரக்கு வாகனங்கள்',
    fleetTrackingSubtitle: 'ஹைட்ராலிக் கிரேன்கள் மற்றும் லாரிகளின் நேரடி ஜிபிஎஸ் கண்காணிப்பு',
    vehicleNo: 'வாகன பதிவு எண்',
    driver: 'ஓட்டுநர் பெயர்',
    statusTransit: 'தளத்தை நோக்கி பயணிக்கிறது',
    statusDelivered: 'டெலிவரி செய்யப்பட்டது',
    statusLoading: 'ஏற்றப்படுகிறது',
    speed: 'ஜிபிஎஸ் வேகம்',
    eta: 'எதிர்பார்க்கப்படும் வருகை நேரம்',
    destination: 'கட்டுமான தளம்',
    trackLive: 'நேரடி ஜிபிஎஸ் கண்காணிப்பு',

    storesTitle: 'உற்பத்தி ஆலைகள் & விற்பனை முனையங்கள்',
    storesSubtitle: 'கூகுள் மேப்ஸ் மூலம் அருகிலுள்ள ஆலை மற்றும் கிடங்கை கண்டறியவும்',
    openGoogleMaps: 'கூகுள் வரைபடத்தில் பார்க்கவும்',
    getDirections: 'திசைகளைப் பெறுக',
    plantCapacity: 'தினசரி உற்பத்தி திறன்',
    supervisorContact: 'கண்காணிப்பாளர் தொடர்பு',

    schemaTitle: 'PostgreSQL தரவுத்தள வடிவமைப்பு & அட்டவணைப்படுத்தல்',
    schemaSubtitle: 'பயனர்கள், தயாரிப்புகள் மற்றும் ஆர்டர்களுக்கான உகந்த ஸ்கீமா',
    copySqlCode: 'SQL குறியீட்டை நகலெடுக்கவும்',
    copied: 'நகலெடுக்கப்பட்டது!',
    indexingStrategy: 'தேடல் குறியீட்டு உத்தி',

    secureCheckout: 'பாதுகாப்பான மொத்த கட்டண நுழைவாயில்',
    payViaUPI: 'உடனடி யுபிஐ / கியூஆர் ஸ்கேன்',
    payViaCards: 'கார்டு மூலம் பணம் செலுத்தவும்',
    payViaRTGS: 'வங்கி பரிமாற்றம் (RTGS / NEFT)',
    payNow: 'கட்டணத்தை உறுதிப்படுத்தவும்',
    paymentSuccessful: 'பரிவர்த்தனை சரிபார்க்கப்பட்டது',

    rewardsTitle: 'அவனிஷ் கான்கிரீட் கிளப் - ரிவார்டுகள்',
    tierStatus: 'உறுப்பினர் தகுதி',
    redeemPoints: 'புள்ளிகளை மீட்டெடுக்கவும்',

    whatNextTitle: 'அடுத்து நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
    whatNextHelp: 'கீழே உள்ள விரைவு நடவடிக்கைகளில் ஒன்றைத் தேர்ந்தெடுக்கவும்.',
  },

  te: {
    brandName: 'అవనీష్ సిమెంట్ ప్రొడక్ట్స్',
    brandTagline: 'ఇండస్ట్రియల్ ప్రీకాస్ట్ మరియు హోల్‌సేల్ సిమెంట్ సరఫరా',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navCatalog: 'హోల్‌సేల్ కేటలాగ్',
    navInventory: 'ఇన్వెంటరీ & స్టాక్',
    navOrders: 'హోల్‌సేల్ ఆర్డర్లు',
    navDeliveries: 'డెలివరీలు & ఫ్లీట్',
    navPostgres: 'PostgreSQL స్కీమా',
    navStores: 'ప్లాంట్లు & లొకేషన్లు',
    navRewards: 'బిల్డర్ రివార్డ్స్',

    totalInventoryVal: 'మొత్తం స్టాక్ ఇన్వెంటరీ',
    activeWholesaleOrders: 'యాక్టివ్ హోల్‌సేల్ ఆర్డర్లు',
    inTransitDeliveries: 'రవాణాలో ఉన్న వాహనాలు',
    cementRewardPoints: 'క్లబ్ రివార్డ్ పాయింట్లు',
    quickActions: 'త్వరిత చర్యలు',
    createOrderBtn: 'కొత్త హోల్‌సేల్ ఆర్డర్ సృష్టించండి',
    recordStockBtn: 'ఉత్పత్తి బ్యాచ్ నమోదు చేయండి',
    dispatchFleetBtn: 'వాహనాన్ని పంపించండి',
    viewDbSchemaBtn: 'డేటాబేస్ స్కీమా చూడండి',
    realtimeSyncActive: 'లైవ్ సింక్ యాక్టివ్',
    devicesConnected: 'కనెక్ట్ చేయబడిన పరికరాలు',

    inventoryTitle: 'గోదాము ఇన్వెంటరీ మరియు స్టాక్ నిర్వహణ',
    inventorySubtitle: 'ప్లాంట్ 1 మరియు నగర డిపోలో రియల్-టైమ్ స్టాక్ సమాచారం',
    searchProductPlaceholder: 'ఉత్పత్తి పేరు లేదా గ్రేడ్ వెతకండి...',
    filterAllCategories: 'అన్ని విభాగాలు',
    stockInBtn: 'స్టాక్ లోపలికి (+)',
    stockOutBtn: 'స్టాక్ బయటకు (-)',
    inStock: 'స్టాక్ అందుబాటులో ఉంది',
    lowStockAlert: 'తక్కువ స్టాక్ హెచ్చరిక',
    batchNumber: 'బ్యాచ్ నంబర్',
    reorderLevel: 'భద్రతా రీఆర్డర్ స్థాయి',
    adjustStockModalTitle: 'స్టాక్ స్థాయిని మార్చండి',
    quantityUnits: 'యూనిట్లు / బ్యాగులు / మీటర్లు',

    wholesaleCatalogTitle: 'హోల్‌సేల్ సిమెంట్ & ప్రీకాస్ట్ కేటలాగ్',
    wholesaleSubtitle: 'బిల్డర్లు మరియు కాంట్రాక్టర్లకు ఫ్యాక్టరీ నేరుగా ధరలు మరియు భారీ రాయితీలు',
    bulkDiscountAvailable: 'హోల్‌సేల్ రాయితీ అందుబాటులో ఉంది',
    unitPrice: 'మూల ధర',
    addToBulkOrder: 'ఆర్డర్‌కు జోడించండి',
    orderSummary: 'ఆర్డర్ సారాంశం',
    subtotal: 'మొత్తం ధర',
    wholesaleDiscount: 'హోల్‌సేల్ పొదుపు',
    gstTax: 'జీఎస్టీ (18% / 28%)',
    shippingFreight: 'రవాణా రుసుము',
    grandTotal: 'మొత్తం చెల్లించవలసిన మొత్తం',
    proceedToCheckout: 'సురక్షిత చెల్లింపుకు కొనసాగండి',

    deliveriesTitle: 'కస్టమర్ డెలివరీలు & హెవీ ఫ్లీట్ లాజిస్టిక్స్',
    fleetTrackingSubtitle: 'హైడ్రాలిక్ క్రేన్లు మరియు లారీల లైవ్ జీపీఎస్ ట్రాకింగ్',
    vehicleNo: 'ట్రక్ రిజిస్ట్రేషన్ నంబర్',
    driver: 'డ్రైవర్ పేరు',
    statusTransit: 'సైట్ వైపు రవాణాలో ఉంది',
    statusDelivered: 'డెలివరీ పూర్తయింది',
    statusLoading: 'లోడింగ్ జరుగుతోంది',
    speed: 'జీపీఎస్ వేగం',
    eta: 'చేరుకునే సమయం',
    destination: 'నిర్మాణ స్థలం',
    trackLive: 'లైవ్ ట్రాకింగ్',

    storesTitle: 'ఉత్పత్తి ప్లాంట్లు & స్టోర్ యార్డులు',
    storesSubtitle: 'గూగుల్ మ్యాప్స్ ద్వారా సమీప ప్లాంట్‌ను కనుగొనండి',
    openGoogleMaps: 'గూగుల్ మ్యాప్స్‌లో తెరవండి',
    getDirections: 'మార్గదర్శకాలను పొందండి',
    plantCapacity: 'రోజువారీ ఉత్పత్తి సామర్థ్యం',
    supervisorContact: 'పర్యవేక్షకుడి సంప్రదింపు',

    schemaTitle: 'PostgreSQL డేటాబేస్ నిర్మాణం మరియు ఇండెక్సింగ్',
    schemaSubtitle: 'వినియోగదారులు, ఉత్పత్తులు మరియు ఆర్డర్ల కోసం ఆప్టిమైజ్ చేసిన స్కీమా',
    copySqlCode: 'పూర్తి SQL కోడ్ కాపీ చేయండి',
    copied: 'కాపీ చేయబడింది!',
    indexingStrategy: 'సెర్చ్ ఇండెక్సింగ్ వ్యూహం',

    secureCheckout: 'సురక్షిత హోల్‌సేల్ చెల్లింపు గేట్‌వే',
    payViaUPI: 'తక్షణ యూపీఐ / క్యూఆర్ కోడ్',
    payViaCards: 'కార్డు చెల్లింపు',
    payViaRTGS: 'బ్యాంక్ బదిలీ (NEFT / RTGS)',
    payNow: 'చెల్లింపును నిర్ధారించండి',
    paymentSuccessful: 'చెల్లింపు విజయవంతమైంది',

    rewardsTitle: 'అవనీష్ కాంక్రీట్ క్లబ్ - రివార్డులు',
    tierStatus: 'సభ్యత్వ స్థాయి',
    redeemPoints: 'పాయింట్లను రిడీమ్ చేయండి',

    whatNextTitle: 'తరువాత మీరు ఏమి చేయాలనుకుంటున్నారు?',
    whatNextHelp: 'క్రింది చర్యలలో ఒకదాన్ని ఎంచుకోండి.',
  },
};
