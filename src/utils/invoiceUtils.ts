import { Order } from '../types';

/**
 * Converts a number to Indian Currency words (Rupees and Paise)
 */
export function numberToIndianWords(num: number): string {
  if (num === 0) return 'Rupees Zero Only';

  const singleDigits = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  ];
  const teens = [
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  function convertTwoDigits(n: number): string {
    if (n === 0) return '';
    if (n < 10) return singleDigits[n];
    if (n < 20) return teens[n - 10];
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    return `${tens[ten]}${unit ? ' ' + singleDigits[unit] : ''}`;
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let str = '';
    if (hundred > 0) {
      str += `${singleDigits[hundred]} Hundred`;
      if (rest > 0) str += ' and ';
    }
    str += convertTwoDigits(rest);
    return str;
  }

  const rounded = Math.round(num);
  let crore = Math.floor(rounded / 10000000);
  let lakh = Math.floor((rounded % 10000000) / 100000);
  let thousand = Math.floor((rounded % 100000) / 1000);
  let remainder = rounded % 1000;

  let result = '';

  if (crore > 0) {
    result += `${convertTwoDigits(crore)} Crore `;
  }
  if (lakh > 0) {
    result += `${convertTwoDigits(lakh)} Lakh `;
  }
  if (thousand > 0) {
    result += `${convertTwoDigits(thousand)} Thousand `;
  }
  if (remainder > 0) {
    result += `${convertThreeDigits(remainder)} `;
  }

  return `Rupees ${result.trim()} Only`;
}

/**
 * Formats an order into a complete, professional WhatsApp invoice message
 */
export function formatInvoiceForWhatsApp(order: Order): string {
  const itemLines = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.productName}*\n   Qty: ${item.quantity} | Rate: ₹${item.unitPrice.toLocaleString('en-IN')}${
          item.discountPercent > 0 ? ` (-${item.discountPercent}%)` : ''
        } = ₹${item.totalPrice.toLocaleString('en-IN')}`
    )
    .join('\n');

  return (
`🧾 *AVANISH CEMENT PRODUCTS*
*GST TAX SALES INVOICE*
----------------------------------------
📋 *Invoice / Order No:* ${order.orderNumber}
📅 *Date:* ${order.createdAt}
👤 *Billed To:* ${order.customerName}
🏢 *Company:* ${order.customerCompany || 'Direct Customer'}
📱 *Customer Phone:* ${order.customerPhone}
📍 *Delivery Site:* ${order.deliverySite || order.deliveryAddress}
${order.customerGst ? `🏛️ *Customer GSTIN:* ${order.customerGst}\n` : ''}${order.eWayBillNo ? `🚛 *E-Way Bill:* ${order.eWayBillNo}\n` : ''}----------------------------------------
*ITEMIZED BILL:*
${itemLines}
----------------------------------------
💰 *Taxable Subtotal:* ₹${order.subtotal.toLocaleString('en-IN')}
${order.discountAmount > 0 ? `🏷️ *Wholesale Discount:* -₹${order.discountAmount.toLocaleString('en-IN')}\n` : ''}🏛️ *GST (CGST+SGST):* ₹${order.gstAmount.toLocaleString('en-IN')}
🚚 *Freight & Crane Dispatch:* ₹${order.shippingFee.toLocaleString('en-IN')}
----------------------------------------
⭐ *GRAND TOTAL:* ₹${order.grandTotal.toLocaleString('en-IN')}
💳 *Payment Status:* ${order.paymentStatus} (${order.paymentMethod})
${order.transactionId ? `🔖 *Payment Ref / UTR:* ${order.transactionId}\n` : ''}----------------------------------------
🏦 *BANK ACCOUNT FOR PAYMENT:*
• *Bank:* HDFC Bank Ltd (Current A/c)
• *A/c Name:* Avanish Cement Products Pvt Ltd
• *A/c Number:* 50200088192841
• *IFSC Code:* HDFC000021 (Jigani Branch)
• *UPI ID:* avanishcement@hdfcbank

📞 *OWNER & DISPATCH CONTACT:*
• +91 6360164834
• +91 8896704285
🏢 Plot 48-B, Phase 2, KIADB Industrial Area, Jigani, Bengaluru - 560105

_Thank you for choosing Avanish Cement Products! High-strength Precast & Heavy Cement Solutions._`
  );
}

/**
 * Opens WhatsApp with pre-filled message for an order
 */
export function sendInvoiceViaWhatsApp(order: Order, customPhone?: string): void {
  const targetPhone = customPhone || order.customerPhone || '916360164834';
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
  const message = formatInvoiceForWhatsApp(order);
  const encoded = encodeURIComponent(message);
  
  // If target has no country code and is 10 digits, prefix 91
  const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const url = `https://wa.me/${finalPhone}?text=${encoded}`;
  window.open(url, '_blank');
}

/**
 * Triggers native share sheet or copies to clipboard
 */
export async function shareInvoiceText(
  order: Order
): Promise<{ success: boolean; method: 'native' | 'clipboard' }> {
  const text = formatInvoiceForWhatsApp(order);
  const title = `Sales Invoice ${order.orderNumber} - Avanish Cement Products`;

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
      });
      return { success: true, method: 'native' };
    } catch {
      // User may have cancelled or share failed, fallback to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return { success: true, method: 'clipboard' };
  } catch {
    return { success: false, method: 'clipboard' };
  }
}
