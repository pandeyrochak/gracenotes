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
        <Link href="/" className="text-lg font-semibold">
          Grace Notes
        </Link>
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
      <Folder id="1" title="Work Notes" notes={[]} />
      <Folder id="2" title="Personal Notes" notes={[]} />
    </div>
  );
};

export default Sidepanel;
