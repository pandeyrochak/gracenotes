import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  } else {
    redirect("/home");
  }

  return (
    <div className="text-muted text-xl flex flex-col items-center justify-center h-screen italic">
      Go to /home to get started.
      <Link href="/home">Home</Link>
    </div>
  );
}
