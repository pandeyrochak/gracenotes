"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2Icon, SquarePen } from "lucide-react";
import { useNotesStore } from "@/store/useNotesStore";
import axiosInstance from "@/lib/axiosInstance";
import { fetchDirectory } from "@/utils/functions/getFolderDirectory";
import { useToast } from "@/components/ui/use-toast";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

const AddNoteButton = () => {
  const {
    updateFileDirectory,
    currentUserId,
    fileDirectory,
    addNewNoteToStore,
  } = useNotesStore();
  const { toast } = useToast();
  const { updateTempNote } = useNotesStore();

  const handleCreateNote = async () => {
    updateTempNote(true);
    const newNoteId = uuidv4();
    const newNote = {
      id: "",
      title: "Untitled Note",
      content: "",
      folder_id: "temp",
      user_id: currentUserId,
      note_id: newNoteId,
      created_at: "",
    };
    addNewNoteToStore(newNote);
    try {
      const response = await axiosInstance.post("/notes", { createdNote: newNote });
      if (response.status === 200) {
        updateTempNote(false);
        console.log(
          `Note created successfully: ${JSON.stringify(response.data, null, 2)}`
        );
      }
    } catch (error) {
      console.log(`Error creating note: ${error}`);
    }
    // updateTempNote(true);
    // try {
    //   const response = await axiosInstance.post("/notes");
    //   console.log(`axios response: ${JSON.stringify(response, null, 2)}`);
    //   if (response.status === 200) {
    //     const newFileDirectory = await fetchDirectory();
    //     if (newFileDirectory.success) {
    //       updateFileDirectory(newFileDirectory.data);
    //       updateTempNote(false);
    //       toast({
    //         title: "✅ Success",
    //         description: "Note created successfully",
    //         variant: "default",
    //       });
    //     } else {
    //       updateTempNote(false);
    //       toast({
    //         title: "❌ Error",
    //         description: "Error updating directory",
    //         variant: "destructive",
    //       });
    //     }
    //   }
    // } catch (error) {
    //   updateTempNote(false);
    //   toast({
    //     title: "Something went wrong",
    //     description: `Error: ${error}`,
    //     variant: "destructive",
    //   });
    // }
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleCreateNote}>
      <SquarePen
        className="h-5 w-5 text-muted-foreground"
        strokeWidth={"1.5"}
      />
      <span className="sr-only">Add Note</span>
    </Button>
  );
};

export default AddNoteButton;
