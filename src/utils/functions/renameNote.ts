import axiosInstance from "@/lib/axiosInstance";

export const renameNote = async (
  id: string,
  title: string,
  newTitle: string
) => {
  if (!newTitle || newTitle === title) {
    return;
  }
  try {
    const body = {
      noteId: id,
      title: newTitle,
    };
    const noteRenameResponse = await axiosInstance.put("/notes", body);
    return {
      status: noteRenameResponse.status,
      message: noteRenameResponse.data.message,
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong",
      data: null,
    };
  }
};
