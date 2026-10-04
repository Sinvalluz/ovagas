import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(env.NEXT_PUBLIC_PROJECT_URL, env.NEXT_PUBLIC_SECRET_KEY, {
	auth: { autoRefreshToken: true, persistSession: true },
});

export { supabase };
