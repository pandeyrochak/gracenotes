import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/server-actions/actions";
import { createClient } from "@/utils/supabase/server";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/ApiResponse";

// GET /api/v1/notes
export const GET = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { searchParams } = new URL(req.url);
  const noteId = searchParams.get("noteId")?.toString();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!noteId) {
    throw new ApiError(400, "Note ID is required");
  }

  const { data, error } = await supabase
    .from("notes")
    .select("content, title")
    .eq("user_id", userId)
    .eq("id", noteId);

  if (error) {
    throw new ApiError(500, `Error fetching note: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new ApiError(404, "Note not found");
  }

  return ApiResponse.success(data[0], "Note fetched successfully");
});
