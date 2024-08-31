import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useNotesStore } from "@/store/useNotesStore";
import DownloadNoteModal from "@/components/component/NotesViewPanel/DownloadDialog";

const NotesTitleBar = () => {
  const { currentNote, currentNoteSavedState } = useNotesStore();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{currentNote.title}</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{currentNoteSavedState ? "Saved" : "Unsaved"}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDownloadModalOpen(true)}
        >
          <DownloadIcon className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
        <DownloadNoteModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default NotesTitleBar;
