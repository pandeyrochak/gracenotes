import { NextResponse, NextRequest } from "next/server";
import { getCurrentUserId } from "@/server-actions/actions";
import { createClient } from "@/utils/supabase/server";
import { ApiError, ApiResponse, asyncHandler } from "@/utils/ApiResponse";

// GET /api/v1/folder
export const GET = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get("folderId")?.toString();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!folderId) {
    throw new ApiError(400, "Folder ID is required");
  }

  const { data, error } = await supabase
    .from("notes")
    .select("id, title, content, created_at, user_id, folder_id")
    .eq("folder_id", folderId)
    .eq("user_id", userId);

  if (error) {
    throw new ApiError(500, `Error fetching folder notes: ${error.message}`);
  }

  return ApiResponse.success(data, "Folder notes fetched successfully");
});
// POST /api/v1/folder
export const POST = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { name } = await req.json();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!name) {
    throw new ApiError(400, "Folder name is required");
  }

  const { data, error } = await supabase
    .from("folders")
    .insert([{ user_id: userId, name }])
    .single();

  if (error) {
    throw new ApiError(500, `Error creating folder: ${error.message}`);
  }

  return ApiResponse.success(data, "Folder created successfully");
});
// DELETE /api/v1/folder
export const DELETE = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { folderId } = await req.json();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!folderId) {
    throw new ApiError(400, "Folder ID is required");
  }

  const { data, error } = await supabase
    .from("folders")
    .delete()
    .eq("user_id", userId)
    .eq("id", folderId)
    .single();

  if (error) {
    throw new ApiError(500, `Error deleting folder: ${error.message}`);
  }

  return ApiResponse.success(data, "Folder deleted successfully");
});

// PUT /api/v1/folder
export const PUT = asyncHandler(async (req: NextRequest) => {
  const supabase = createClient();
  const userId = await getCurrentUserId();
  const { folderId, name } = await req.json();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!folderId) {
    throw new ApiError(400, "Folder ID is required");
  }

  if (!name) {
    throw new ApiError(400, "Folder name is required");
  }

  const { data, error } = await supabase
    .from("folders")
    .update({ name })
    .eq("user_id", userId)
    .eq("id", folderId)
    .single();

  if (error) {
    throw new ApiError(500, `Error updating folder: ${error.message}`);
  }

  return ApiResponse.success(data, "Folder updated successfully");
});
