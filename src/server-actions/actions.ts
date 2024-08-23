"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/home", "layout");
  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // @ts-ignore
  const { error, signUpData } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
  console.log("signUpData", JSON.stringify(signUpData));
  // update DIsplay name in user profile
  // @ts-ignore
  // const { updateError } = await supabase.from("profiles").upsert({
  //   id: signUpData?.user?.id,
  //   display_name: signUpData?.user?.email,
  // });
  // if (updateError) {
  //   return { updateError: updateError.message, success: true };
  // }

  revalidatePath("/home", "layout");
  return { success: true };
}

export async function loginWithGoogle() {
  console.log("loginWithGoogle");
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://gracenotes.vercel.app/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  redirect(data.url);
  return { success: true };
}
