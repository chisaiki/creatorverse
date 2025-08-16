import { createClient } from '@supabase/supabase-js';

{/*export the variable in the same line you create it*/}
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);