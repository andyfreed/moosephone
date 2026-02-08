export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          is_admin?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "phones_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

interface PhoneExtensionRow {
  name: string;
  extension: string;
  email: string;
}
