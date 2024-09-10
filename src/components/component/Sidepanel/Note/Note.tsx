"use client";
import { useToast } from "@/components/ui/use-toast";
import { useNotesStore } from "@/store/useNotesStore";
import { NoteProps } from "@/types/interfaces";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import FolderContextMenu from "../Folder/FolderContextMenu";
import { deleteNote } from "@/utils/functions/deleteNote";
import { renameNote } from "@/utils/functions/renameNote";
import { fetchDirectory } from "@/utils/functions/getFolderDirectory";
import Loading from "@/app/home/loading";
import { Loader } from "lucide-react";

const Note = ({ id, title, isTemp }: NoteProps) => {
  console.log(`===Note: ${JSON.stringify({ id, title, isTemp }, null, 2)}`);
  const [noteTitle, setNoteTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { updateFileDirectory, updateCurrentNote } = useNotesStore();
  const { toast } = useToast();

  // handler to rename a note
  const renameNoteHandler = async (newTitle: string) => {
    const noteRenameResponse = await renameNote(id, title, newTitle);
    if (noteRenameResponse?.status === 200) {
      setNoteTitle(newTitle);
      toast({
        title: "✅ Renamed",
        description: `"${title}" has been renamed to "${newTitle}" successfully`,
      });
      const updatedFileDirectory = await fetchDirectory();
      if (updatedFileDirectory.success) {
        updateFileDirectory(updatedFileDirectory.data);
      }
    } else {
      toast({
        title: "❌ Error",
        description: noteRenameResponse?.message,
      });
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      // @ts-ignore
      renameNoteHandler(e.target.value);
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    renameNoteHandler(e.target.value);
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);
  const handleLinkClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing) {
      e.preventDefault();
    } else {
      setIsEditing(true);
    }
  };

  if (isTemp) {
    return (
      <div className="sidepanel-note-item h-fit rounded-md px-3 pl-0 py-0 text-sm font-normal transition-colors hover:bg-border text-muted-foreground flex justify-between items-center">
        <span className={`flex-grow py-2 px-0 pl-3 `}>{noteTitle}</span>
        <Loader className="text-muted-foreground animate-spin w-4 h-4" />
      </div>
    );
  }

  return (
    <div className="sidepanel-note-item rounded-md px-3 pl-0 py-0 text-sm font-normal transition-colors hover:bg-border text-muted-foreground flex justify-between items-center border border-muted mb-2">
      <Link
        ref={linkRef}
        href={`/home/note/${id}`}
        className="flex-grow"
        prefetch={false}
        onClick={handleLinkClick}
      >
        <input
          ref={inputRef}
          defaultValue={noteTitle}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`flex-grow py-2 px-0 pl-3 ${
            isEditing ? "block" : "hidden"
          }`}
        />
        <span
          className={`flex-grow py-2 px-0 pl-3 ${
            isEditing ? "hidden" : "block"
          }`}
          onDoubleClick={handleDoubleClick}
        >
          {noteTitle}
        </span>
      </Link>
      <FolderContextMenu
        deleteHandler={() => deleteNote(id, noteTitle)}
        renameHandler={() => setIsEditing(true)}
      />
    </div>
  );
};

export default Note;
