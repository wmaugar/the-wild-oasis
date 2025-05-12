import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://bjltvwwneytexhymgwcr.supabase.co";
//const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbHR2d3duZXl0ZXhoeW1nd2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDU2NTUsImV4cCI6MjA1ODY4MTY1NX0.EmuPvkMAusX-hY0TZf727Fc1jpFgSYUobv8L_gKgjKI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
