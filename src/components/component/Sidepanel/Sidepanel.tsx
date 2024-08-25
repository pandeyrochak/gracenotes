import DirectoryList from "@/components/component/Sidepanel/DirectoryList";
import { ThemeToggle } from "@/components/component/ThemeToggleIcon";
import UserAvatar from "@/components/component/UserAvatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilePlus2Icon, LucideFolderPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Sidepanel = () => {
  return (
    <div className="border-r bg-muted/40 p-4 h-full w-full">
      <div className="flex items-center justify-between">
        {/* TODO: Add logo here */}
        <Link href="/home" className="text-lg font-semibold">
          <Image src="/favicon.ico" alt="logo" width={20} height={20} className="home-icon"/>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserAvatar />
          <Button variant="ghost" size="icon">
            <FilePlus2Icon className="h-5 w-5" />
            <span className="sr-only">Add Note</span>
          </Button>
          <Button variant="ghost" size="icon">
            <LucideFolderPlus className="h-5 w-5" />
            <span className="sr-only">Add Note</span>
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
      <DirectoryList />
    </div>
  );
};

export default Sidepanel;
