"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
interface FolderContextMenuProps {
  deleteHandler: () => void;
  renameHandler: () => void;
}

const FolderContextMenu = ({
  deleteHandler,
  renameHandler,
}: FolderContextMenuProps) => {
  const toast = useToast();
  const handleMenuButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleRenameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // logic for rename
    renameHandler();
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // logic for delete
    const response: any = await deleteHandler();
    if (response.status === 200) {
      toast.toast({
        title: response.title,
        description: response.message,
        variant: "default",
      });
    } else {
      toast.toast({
        title: response.title,
        description: response.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="note-folder-context-menu">
        <Button
          variant="unstyled"
          size="icon"
          onClick={handleMenuButtonClick}
          className="h-4 w-4"
        >
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
