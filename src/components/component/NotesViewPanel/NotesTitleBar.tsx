import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FilePenIcon,
  ShareIcon,
  CopyIcon,
  MailIcon,
  XIcon,
} from "lucide-react";
const NotesTitleBar = () => {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Meeting Agenda</h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <ShareIcon className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <CopyIcon className="h-4 w-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MailIcon className="h-4 w-4 mr-2" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <XIcon className="h-4 w-4 mr-2" />
              Tweet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NotesTitleBar;
