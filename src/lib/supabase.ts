import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          google_id: string;
          email: string;
          name: string;
          access_token: string;
          refresh_token: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          google_id: string;
          email: string;
          name: string;
          access_token: string;
          refresh_token: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          google_id?: string;
          email?: string;
          name?: string;
          access_token?: string;
          refresh_token?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          gmb_location_id: string;
          name: string;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          gmb_location_id: string;
          name: string;
          timezone: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          gmb_location_id?: string;
          name?: string;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          profile_id: string;
          content: string;
          image_url: string | null;
          scheduled_for: string;
          status: 'scheduled' | 'posted' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile_id: string;
          content: string;
          image_url?: string | null;
          scheduled_for: string;
          status?: 'scheduled' | 'posted' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile_id?: string;
          content?: string;
          image_url?: string | null;
          scheduled_for?: string;
          status?: 'scheduled' | 'posted' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          business_name: string;
          business_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          business_name: string;
          business_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          business_name?: string;
          business_type?: string;
          created_at?: string;
        };
      };
    };
  };
};