import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/server-actions/actions";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // get folders for the logged in user
  const { data: folders, error: foldersError } = await supabase
    .from("folders")
    .select("id,title,user_id")
    .eq("user_id", userId);

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("id,title,folder_id,user_id, content")
    .is("folder_id", null)
    .eq("user_id", userId);

  return NextResponse.json({ folders, notes });
}
