import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(env.NEXT_PUBLIC_PROJECT_URL, env.NEXT_PUBLIC_PUBLISHABLE_KEY);

export { supabase };
