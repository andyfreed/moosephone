export interface PhoneExtension {
  name: string;
  extension: string;
  email: string;
}

export interface PhoneOrder {
  id?: string;
  quantity: number;
  extensions: PhoneExtension[];
  pricePerPhone: number;
  totalPrice: number;
  status: "pending" | "paid" | "provisioning" | "shipped" | "active";
  stripeSessionId?: string;
  customerEmail?: string;
  createdAt?: string;
}

export interface PhoneInventory {
  id: string;
  macAddress: string;
  model: string;
  orderId?: string;
  assignedExtension?: string;
  status: "available" | "assigned" | "active";
}

export const PHONE_MODELS = [
  {
    id: "yealink-t54w",
    name: "Yealink T54W",
    description: "16-line mid-level IP phone with 4.3\" color LCD and built-in Wi-Fi/Bluetooth",
    priceMonthly: 29.99,
    image: "/images/yealink-t54w.png",
  },
  {
    id: "yealink-t57w",
    name: "Yealink T57W",
    description: "16-line premium IP phone with 7\" adjustable color touch screen",
    priceMonthly: 39.99,
    image: "/images/yealink-t57w.png",
  },
  {
    id: "yealink-t46u",
    name: "Yealink T46U",
    description: "16-line classic IP phone with 4.3\" color LCD and dual USB ports",
    priceMonthly: 24.99,
    image: "/images/yealink-t46u.png",
  },
] as const;

export type PhoneModelId = (typeof PHONE_MODELS)[number]["id"];
