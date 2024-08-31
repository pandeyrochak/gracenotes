"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2Icon } from "lucide-react";
import { useNotesStore } from "@/store/useNotesStore";
import axiosInstance from "@/lib/axiosInstance";
import { fetchDirectory } from "@/utils/functions/getFolderDirectory";
import { useToast } from "@/components/ui/use-toast";

const AddNoteButton = () => {
  const { updateFileDirectory } = useNotesStore();
  const { toast } = useToast();

  const handleCreateNote = async () => {
    // TODO: create note logic here.
    try {
      const response = await axiosInstance.post("/notes");
      console.log(`axios response: ${JSON.stringify(response, null, 2)}`);
      if (response.status === 200) {
        const newFileDirectory = await fetchDirectory();
        if (newFileDirectory.success) {
          updateFileDirectory(newFileDirectory.data);
          toast({
            title: "✅ Success",
            description: "Note created successfully",
            variant: "default",
          });
        } else {
          toast({
            title: "❌ Error",
            description: "Error updating directory",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Error: ${error}`,
        variant: "destructive",
      });
    }
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleCreateNote}>
      <FilePlus2Icon
        className="h-5 w-5 text-muted-foreground"
        strokeWidth={"1.5"}
      />
      <span className="sr-only">Add Note</span>
    </Button>
  );
};

export default AddNoteButton;
