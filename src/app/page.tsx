import NotesTitleBar from "@/components/component/NotesViewPanel/NotesTitleBar";
import NotesView from "@/components/component/NotesViewPanel/NotesView/NotesView";
import Sidepanel from "@/components/component/Sidepanel/Sidepanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    // <div className="grid h-screen w-full grid-cols-[350px_1fr] bg-background">
    //   <Sidepanel />
    //   <div className="flex flex-col">
    //     {/* notes panel header */}
    //     <NotesTitleBar />
    //     {/* Notes View */}
    //     <NotesView />
    //   </div>
    // </div>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-screen" maxSize={30} minSize={20}>
        <Sidepanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-screen">
        <div className="flex flex-col h-full">
          {/* notes panel header */}
          <NotesTitleBar />
          {/* Notes View */}
          <NotesView />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
