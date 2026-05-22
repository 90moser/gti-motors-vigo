import { createClient } from "@supabase/supabase-js";

const url = "https://gsylncgebguoooabmyid.supabase.co";
const anonKey =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

export const supabase = createClient(url, anonKey);
