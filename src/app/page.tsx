import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="text-muted text-xl flex flex-col items-center justify-center h-screen italic">
      Nothing here yet. Add or Open a note to get started.
    </div>
  );
}
