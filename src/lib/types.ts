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
    id: "standard",
    name: "Standard",
    description: "Essential cloud phone with HD audio, color display, and Wi-Fi connectivity",
    priceMonthly: 24.99,
    image: "/images/phone-standard.png",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Advanced cloud phone with large color display, Wi-Fi, and Bluetooth",
    priceMonthly: 29.99,
    image: "/images/phone-professional.png",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium cloud phone with 7\" touch screen, Wi-Fi, Bluetooth, and expanded line support",
    priceMonthly: 39.99,
    image: "/images/phone-executive.png",
  },
] as const;

export type PhoneModelId = (typeof PHONE_MODELS)[number]["id"];
