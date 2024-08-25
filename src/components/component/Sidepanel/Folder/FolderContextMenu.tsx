"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";

const FolderContextMenu = () => {
  const handleMenuButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleRenameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // logic for rename
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // logic for delete
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="unstyled" size="icon" onClick={handleMenuButtonClick} className="h-4 w-4">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem asChild>
          <Button
            variant="unstyled"
            onClick={handleRenameClick}
            className="w-full outline-none justify-start cursor-pointer hover:bg-accent"
          >
            <PencilIcon className="h-3 w-3 mr-2" />
            Rename
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="unstyled"
            onClick={handleDeleteClick}
            className="w-full outline-none justify-start cursor-pointer hover:bg-accent"
          >
            <TrashIcon className="h-3 w-3 mr-2" />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderContextMenu;
