import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(env.PROJECT_URL, env.PUBLISHABLE_KEY);

export { supabase };
