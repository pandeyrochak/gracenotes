"use client";
import React, { Suspense, useState } from "react";
import Sidepanel from "@/components/component/Sidepanel/Sidepanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/toaster";
import Loading from "./loading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background">
      <Toaster />

      {/* Mobile view */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-2 m-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[385px] p-0">
            <Sidepanel />
          </SheetContent>
        </Sheet>
        <main className="p-4">
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col h-full">{children}</div>
          </Suspense>
        </main>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          <ResizablePanel
            className="h-screen"
            maxSize={30}
            minSize={20}
            defaultSize={20}
          >
            <Sidepanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="h-screen" defaultSize={80}>
            <Suspense fallback={<Loading />}>
              <div className="flex flex-col h-full p-4">{children}</div>
            </Suspense>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default HomeLayout;
