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

// POST /api/v1/notes
export const POST = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  // const { content } = await req.json();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // if (!content) {
  //   throw new ApiError(400, "Content is required");
  // }

  const { data, error } = await supabase
    .from("notes")
    .insert([{ user_id: userId, title: "Untitled Note", content: "" }])
    .single();

  if (error) {
    throw new ApiError(500, `Error creating note: ${error.message}`);
  }

  return ApiResponse.success(data, "Note created successfully");
});

// DELETE /api/v1/notes
export const DELETE = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { noteId } = await req.json();
  console.log(`===noteId: ${noteId}`);

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!noteId) {
    throw new ApiError(400, "Note ID is required");
  }

  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("user_id", userId)
    .eq("id", noteId)
    .single();

  if (error) {
    throw new ApiError(500, `Error deleting note: ${error.message}`);
  }

  return ApiResponse.success(data, "Note deleted successfully");
});

// PUT /api/v1/notes
export const PUT = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { noteId, title, content } = await req.json();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!noteId) {
    throw new ApiError(400, "Note ID is required");
  }

  const updateData: any = {};
  if (title) updateData.title = title;
  if (content) updateData.content = content;

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "At least one of title or content is required");
  }

  const { data, error } = await supabase
    .from("notes")
    .update(updateData)
    .eq("user_id", userId)
    .eq("id", noteId)
    .single();

  if (error) {
    throw new ApiError(500, `Error updating note: ${error.message}`);
  }

  return ApiResponse.success(data, "Note updated successfully");
});
