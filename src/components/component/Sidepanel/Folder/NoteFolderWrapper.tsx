"use client";
import { Collapsible } from "@/components/ui/collapsible";
import { ReactNode, useState } from "react";

const NoteFolderWrapper = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpenState = () => {
    setOpen((prev: boolean) => !prev);
  };
  return (
    <Collapsible open={open} onOpenChange={toggleOpenState}>
      {children}
    </Collapsible>
  );
};

export default NoteFolderWrapper;
