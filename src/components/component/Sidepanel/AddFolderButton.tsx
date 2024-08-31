import React from "react";
import { Button } from "@/components/ui/button";
import { LucideFolderPlus } from "lucide-react";

const AddFolderButton = () => {
  return (
    <Button variant="ghost" size="icon">
      <LucideFolderPlus className="h-5 w-5" />
      <span className="sr-only">Add Note</span>
    </Button>
  );
};

export default AddFolderButton;
