import NotesTitleBar from "@/components/component/NotesViewPanel/NotesTitleBar";
import NotesView from "@/components/component/NotesViewPanel/NotesView/NotesView";
import Sidepanel from "@/components/component/Sidepanel/Sidepanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <ResizablePanelGroup direction="horizontal">
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
