import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/server-actions/actions";
import { createClient } from "@/utils/supabase/server";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/ApiResponse";

export const GET = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  // TODO: fetch folder logic to be added
  const [
    // { data: folders, error: foldersError },
    { data: notes, error: notesError },
  ] = await Promise.all([
    // supabase.from("folders").select("id,title,user_id").eq("user_id", userId),
    supabase
      .from("notes")
      .select("id,title,folder_id,user_id,content, note_id")
      .is("folder_id", null)
      .eq("user_id", userId)
      .order("created_at", { ascending: true }),
  ]);

  // if (foldersError)
  //   throw new ApiError(500, `Error fetching folders: ${foldersError.message}`);
  if (notesError)
    throw new ApiError(500, `Error fetching notes: ${notesError.message}`);

  return ApiResponse.success(
    { folders: [], notes },
    "Directory fetched successfully"
  );
});
