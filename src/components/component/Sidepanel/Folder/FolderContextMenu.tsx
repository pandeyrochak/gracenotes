"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Loader, Loader2, PencilIcon, TrashIcon } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/home/loading";
interface FolderContextMenuProps {
  deleteHandler: () => void;
  renameHandler: () => void;
}

const FolderContextMenu = ({
  deleteHandler,
  renameHandler,
}: FolderContextMenuProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
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
    setIsDeleting(true);
    e.stopPropagation();
    // logic for delete
    const response: any = await deleteHandler();
    if (response.status === 200) {
      setIsDeleting(false);
      toast.toast({
        title: response.title,
        description: response.message,
        variant: "default",
      });
    } else {
      setIsDeleting(false);
      toast.toast({
        title: response.title,
        description: response.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center note-folder-context-menu gap-2">
        <Button
          variant="unstyled"
          onClick={(e) => {
            e.stopPropagation();
            handleRenameClick(e);
          }}
          className="w-5 h-5 outline-none flex items-center justify-center cursor-pointer hover:bg-accent p-0"
        >
          <PencilIcon className="w-3 h-3" />
        </Button>
        {isDeleting ? (
          <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
        ) : (
          <Button
            variant="unstyled"
            onClick={handleDeleteClick}
            className="w-5 h-5 outline-none flex items-center justify-center cursor-pointer hover:bg-accent p-0"
          >
            <TrashIcon className="w-3 h-3 text-destructive" />
          </Button>
        )}
      </div>
      {/* <DropdownMenu>
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
      </DropdownMenu> */}
    </>
  );
};

export default FolderContextMenu;
