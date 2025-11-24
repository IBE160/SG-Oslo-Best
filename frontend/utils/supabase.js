import { createClient } from '@supabase/supabase-js';

// Henter variabler fra frontend/.env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Opprett Supabase-klienten
export const supabase = createClient(supabaseUrl, supabaseAnonKey);