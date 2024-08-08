import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/component/ThemeToggleIcon";
import UserAvatar from "@/components/component/UserAvatar";
import NoteFolder from "@/components/component/Sidepanel/NoteFolder";

const Sidepanel = () => {
  return (
    <div className="border-r bg-muted/40 p-4 h-full w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Grace Notes</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserAvatar />
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Add Note</span>
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <NoteFolder />
      <Collapsible>
        <div className="space-y-2">
          <CollapsibleTrigger className="flex items-center justify-between rounded-md px-3 py-2 font-medium transition-colors hover:bg-muted w-full">
            <div className="truncate text-muted-foreground">Personal Notes</div>
            <div className="h-4 w-4 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-4">
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
              prefetch={false}
            >
              Grocery List
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
              prefetch={false}
            >
              Vacation Planning
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground"
              prefetch={false}
            >
              Fitness Goals
            </Link>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default Sidepanel;
