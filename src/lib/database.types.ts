export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          model: string;
          quantity: number;
          extensions: PhoneExtensionRow[];
          price_per_phone: number;
          total_price: number;
          status: "pending" | "paid" | "provisioning" | "shipped" | "active";
          stripe_session_id: string | null;
          stripe_subscription_id: string | null;
          customer_email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          model: string;
          quantity: number;
          extensions: PhoneExtensionRow[];
          price_per_phone: number;
          total_price: number;
          status?: "pending" | "paid" | "provisioning" | "shipped" | "active";
          stripe_session_id?: string | null;
          stripe_subscription_id?: string | null;
          customer_email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          model?: string;
          quantity?: number;
          extensions?: PhoneExtensionRow[];
          price_per_phone?: number;
          total_price?: number;
          status?: "pending" | "paid" | "provisioning" | "shipped" | "active";
          stripe_session_id?: string | null;
          stripe_subscription_id?: string | null;
          customer_email?: string | null;
          updated_at?: string;
        };
      };
      phones: {
        Row: {
          id: string;
          mac_address: string;
          model: string;
          order_id: string | null;
          assigned_to: string | null;
          assigned_extension: string | null;
          status: "available" | "assigned" | "active";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mac_address: string;
          model: string;
          order_id?: string | null;
          assigned_to?: string | null;
          assigned_extension?: string | null;
          status?: "available" | "assigned" | "active";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mac_address?: string;
          model?: string;
          order_id?: string | null;
          assigned_to?: string | null;
          assigned_extension?: string | null;
          status?: "available" | "assigned" | "active";
          updated_at?: string;
        };
      };
    };
  };
}

interface PhoneExtensionRow {
  name: string;
  extension: string;
  email: string;
}
