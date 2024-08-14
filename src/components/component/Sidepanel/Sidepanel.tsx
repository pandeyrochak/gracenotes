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
import Folder from "@/components/component/Sidepanel/Folder/Folder";

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
      <Folder />
      <Folder />
    </div>
  );
};

export default Sidepanel;
