import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function requirePublicSupabaseConfig() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Supabase public environment variables are missing. Check .env.local.",
    );
  }

  return { supabaseUrl, supabasePublishableKey };
}

export const supabase = createClient(
  requirePublicSupabaseConfig().supabaseUrl,
  requirePublicSupabaseConfig().supabasePublishableKey,
);

export function createAdminSupabaseClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "SUPABASE_SECRET_KEY belum dikonfigurasi. Tambahkan hanya di environment server.",
    );
  }

  return createClient(requirePublicSupabaseConfig().supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
