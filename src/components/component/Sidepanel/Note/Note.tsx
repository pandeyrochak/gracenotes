"use client";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { useNotesStore } from "@/store/useNotesStore";
import { NoteProps } from "@/types/interfaces";
import { fetchDirectory } from "@/utils/functions/getFolderDirectory";
import Link from "next/link";
import { useRef, useState } from "react";
import FolderContextMenu from "../Folder/FolderContextMenu";
const Note = ({ id, title }: NoteProps) => {
  const { toast } = useToast();
  const { updateFileDirectory } = useNotesStore();
  const [noteTitle, setNoteTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  // handler to delete a note
  const deleteNoteHandler = async () => {
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
  // handler to rename a note
  const renameNoteHandler = async () => {
    // TODO: implement rename note
    alert("rename note");
  };

  return (
    <Link
      href={`/home/note/${id}`}
      className="sidepanel-note-item rounded-md px-3 pl-0 py-0 text-sm font-normal transition-colors hover:bg-border text-muted-foreground flex justify-between items-center"
      prefetch={false}
    >
      <span className="flex-grow py-2 px-0 pl-3">{noteTitle}</span>
      <FolderContextMenu
        deleteHandler={deleteNoteHandler}
        renameHandler={renameNoteHandler}
      />
    </Link>
  );
};

export default Note;
