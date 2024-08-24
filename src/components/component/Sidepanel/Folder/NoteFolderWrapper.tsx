"use client";
import Loading from "@/app/home/loading";
import { Collapsible } from "@/components/ui/collapsible";
import { ReactNode, Suspense, useState } from "react";

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
