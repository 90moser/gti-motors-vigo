import { createClient } from "@supabase/supabase-js";

const url =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  "https://gsylncgebguoooabmyid.supabase.co";

const anonKey =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeWxuY2dlYmd1b29vYWJteWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTAyMzEsImV4cCI6MjA5NDE2NjIzMX0.abRq6kwODr4-75tmb6BhDg90-C1WfiLYNgQ7xT45mKg";

export const supabase = createClient(url, anonKey);
