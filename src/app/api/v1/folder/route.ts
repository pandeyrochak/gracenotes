import { NextResponse, NextRequest } from "next/server";
import { getCurrentUserId } from "@/server-actions/actions";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  // Extract folderId from the request body
  const  {searchParams}  = new URL(request.url);
  const folderId = searchParams.get("folderId")?.toString();
    console.log(`🛠️ Here is folder ID`,typeof(folderId), typeof(userId), userId)
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!folderId) {
    return NextResponse.json(
      { error: "Folder ID is required" },
      { status: 400 }
    );
  }

  // Fetch notes for the specified folder
  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, title, content, created_at, user_id, folder_id")
    .eq("folder_id", folderId)
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notes });
}
