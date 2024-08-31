import axiosInstance from "@/lib/axiosInstance";

export const updateNoteContent = async (noteId: string, content: string) => {
  try {
    const response = await axiosInstance.put(`/notes`, { noteId, content });
    if (response.status === 200) {
      return {
        success: true,
        message: "Note content updated successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to update note content: ${error}`,
    };
  }
};
