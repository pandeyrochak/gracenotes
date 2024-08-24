import { NextResponse, NextRequest } from "next/server";
import { getCurrentUserId } from "@/server-actions/actions";
import { createClient } from "@/utils/supabase/server";

// GET /api/v1/notes
export async function GET(request: NextRequest) {
  // supabase client
  const supabase = createClient();
  // get user id
  const userId = await getCurrentUserId();
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("noteId")?.toString();
  // if user is not logged in, return 401
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // get notes
  const { data, error } = await supabase
    .from("notes")
    .select("content")
    .eq("user_id", userId)
    .eq("id", noteId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // return notes
  return NextResponse.json({ data });
}
