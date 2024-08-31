"use client";
import FolderContextMenu from "@/components/component/Sidepanel/Folder/FolderContextMenu";
import NoteFolderWrapper from "@/components/component/Sidepanel/Folder/NoteFolderWrapper";
import Note from "@/components/component/Sidepanel/Note/Note";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Folder as FolderIcon } from "lucide-react";
import { FolderProps } from "@/types/interfaces";
import { useState } from "react";
import { useNotesStore } from "@/store/useNotesStore";
import axiosInstance from "@/lib/axiosInstance";
import Loading from "@/app/home/loading";

const Folder = ({ id, title }: FolderProps) => {
  const { updateFolderNotes, folderNotes } = useNotesStore();
  const [tempData, setTempData] = useState<any>([]);
  const fetchFolder = async () => {
    const notesForFolder = await axiosInstance.get(`/folder?folderId=${id}`);
    updateFolderNotes(id.toString(), notesForFolder.data);
    setTempData(notesForFolder.data?.notes);
  };
  const deleteFolderHandler = async () => {
    // TODO: implement delete folder
  };
  const renameFolderHandler = async () => {
    // TODO: implement rename folder
  };
  return (
    <NoteFolderWrapper>
      <div className="space-y-2 sidepanel-folder-item">
        <CollapsibleTrigger
          className="flex items-center justify-between rounded-md px-3 py-2 font-medium transition-colors hover:bg-border w-full"
          onClick={fetchFolder}
        >
          <div className="truncate text-muted-foreground flex items-center justify-between w-full">
            <div className="flex items-center font-normal text-sm">
              <FolderIcon className="h-4 w-4 mr-2" strokeWidth={"1.5"} />
              {title}
            </div>
            <FolderContextMenu
              deleteHandler={deleteFolderHandler}
              renameHandler={renameFolderHandler}
            />
          </div>
          {/* <div className="h-4 w-4 text-muted-foreground" /> */}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-2 ml-4 CollapsibleFolder border-l-2 border-muted">
          {tempData ? (
            tempData.map((note: any) => (
              <Note key={note.id} id={note.id} title={note.title} />
            ))
          ) : (
            <div className="flex items-center justify-center h-4 w-full">
              <Loading />
            </div>
          )}
        </CollapsibleContent>
      </div>
    </NoteFolderWrapper>
  );
};

export default Folder;
