"use server";
import { createClient } from "@/utils/supabase/server";

export default async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}
