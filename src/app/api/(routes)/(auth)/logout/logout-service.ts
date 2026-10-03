import SupabaseAuthError from "@/app/api/_errors/supabase-auth-error";
import { supabase } from "@/lib/supabase";

export default async function logoutService() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new SupabaseAuthError();
}
