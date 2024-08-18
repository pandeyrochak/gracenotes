import React from "react";
import Sidepanel from "@/components/component/Sidepanel/Sidepanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="bg-background">
      {/* sidepanle to be available on all pages */}
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
        <div className="flex flex-col h-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default HomeLayout;
