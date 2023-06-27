import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://nodoobhcobrwpycoceqi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZG9vYmhjb2Jyd3B5Y29jZXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MjMzOTAsImV4cCI6MjAwMzE5OTM5MH0.zCihJf5LJi1eLS7CxZUzBtsih-X465mpT9Vg0At8NoY";
export const supabase = createClient(supabaseUrl, supabaseKey);
