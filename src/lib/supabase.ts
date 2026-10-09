/** biome-ignore-all lint/style/noNonNullAssertion: <Env init> */

import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(env.PROJECT_URL, env.SECRET_KEY, {
	auth: { autoRefreshToken: true, persistSession: true },
});

export { supabase };
