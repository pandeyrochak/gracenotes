import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import NoteFolderWrapper from "@/components/component/Sidepanel/NoteFolderWrapper";

const NoteFolder = () => {
  return (
    <NoteFolderWrapper>
      <div className="space-y-2">
        <CollapsibleTrigger className="flex items-center justify-between rounded-md px-3 py-2 font-medium transition-colors hover:bg-muted w-full">
          <div className="truncate text-muted-foreground">Work Notes</div>
          <div className="h-4 w-4 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-4">
          <Link
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
            prefetch={false}
          >
            Meeting Agenda
          </Link>
          <Link
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
            prefetch={false}
          >
            Project Roadmap
          </Link>
          <Link
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
            prefetch={false}
          >
            Team Updates
          </Link>
        </CollapsibleContent>
      </div>
    </NoteFolderWrapper>
  );
};

export default NoteFolder;
