import { fetchDirectory } from "@/utils/functions/getFolderDirectory";
import { useNotesStore } from "@/store/useNotesStore";
import axiosInstance from "@/lib/axiosInstance";

export const deleteNote = async (id: string, title: string) => {
  const { updateFileDirectory } = useNotesStore.getState();
  try {
    const body = {
      noteId: id,
    };
    const noteDeleteResponse = await axiosInstance.delete("/notes", {
      data: body,
    });
    if (noteDeleteResponse.status === 200) {
      const response = await fetchDirectory();
      updateFileDirectory(response.data);
      return {
        status: 200,
        message: `"${title}" has been deleted successfully`,
        title: "Note deleted",
      };
    } else {
      return {
        status: 400,
        message: `Error: ${noteDeleteResponse.status}`,
        title: "Error deleting note",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: `Error: ${error}`,
      title: "Something went wrong",
    };
  }
};
