import FolderContextMenu from "@/components/component/Sidepanel/Folder/FolderContextMenu";
import NoteFolderWrapper from "@/components/component/Sidepanel/Folder/NoteFolderWrapper";
import Note from "@/components/component/Sidepanel/Note/Note";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Folder as FolderIcon } from "lucide-react";
import { FolderProps } from "@/types/interfaces";

const Folder = ({ id, title, notes }: FolderProps) => {
  return (
    <NoteFolderWrapper>
      <div className="space-y-2">
        <CollapsibleTrigger className="flex items-center justify-between rounded-md px-3 py-2 font-medium transition-colors hover:bg-border w-full">
          <div className="truncate text-muted-foreground flex items-center justify-between w-full">
            <div className="flex items-center">
              <FolderIcon className="h-5 w-5 mr-2" />
              {title}
            </div>
            <FolderContextMenu />
          </div>
          <div className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-2 ml-4 CollapsibleFolder border-l-2 border-muted">
          <Note
            id="1"
            title="Meeting Agenda"
            content="This is a meeting agenda"
          />
          <Note
            id="2"
            title="Meeting Agenda"
            content="This is a meeting agenda"
          />
        </CollapsibleContent>
      </div>
    </NoteFolderWrapper>
  );
};

export default Folder;
