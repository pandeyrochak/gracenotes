"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useNotesStore } from "@/store/useNotesStore";
import React, { useEffect, useState } from "react";
import Folder from "./Folder/Folder";
import Note from "./Note/Note";
import Loading from "@/app/home/loading"; // Adjust the import path as needed
import { useToast } from "@/components/ui/use-toast";
import { fetchDirectory } from "@/utils/functions/getFolderDirectory";
import { Loader2 } from "lucide-react";
import AddNoteButton from "./AddNoteButton";

const DirectoryList = () => {
  const { updateFileDirectory, fileDirectory } = useNotesStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAndUpdateDirectory = async () => {
    console.log("fetchAndUpdateDirectory");
    setIsLoading(true);
    const response = await fetchDirectory();
    if (response.success) {
      updateFileDirectory(response.data);
      console.log(
        `===response.data: ${JSON.stringify(response.data, null, 2)}`
      );
      toast({
        title: "Directory updated",
        description: "Directory updated successfully",
        variant: "default",
      });
    } else {
      setError(response.message);
      toast({
        title: "Something went wrong",
        description: response.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!fileDirectory.notes.length) {
      fetchAndUpdateDirectory();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <p className="text-muted-foreground text-sm flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin-fast" />
        Fetching directory...
      </p>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  return (
    <div className="overflow-y-auto h-[calc(100vh-88px)] hide-scrollbars">
      {fileDirectory?.folders?.length === 0 &&
      fileDirectory?.notes?.length === 0 ? (
        <div className="text-muted-foreground text-sm flex items-center flex-col justify-center">
          <AddNoteButton />
          Create your first note
        </div>
      ) : (
        <>
          {fileDirectory?.folders?.map((folder) => (
            <Folder id={folder.id} title={folder.title} key={folder.id} />
          ))}
          {fileDirectory?.notes?.map((note) => (
            <Note id={note.note_id} title={note.title} key={note.note_id} />
          ))}
          {/* {tempNote && (
            <Note id="temp" title="Untitled Note" key="temp" isTemp={true} />
          )} */}
        </>
      )}
    </div>
  );
};

export default DirectoryList;
