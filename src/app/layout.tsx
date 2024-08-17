import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import NotesTitleBar from "@/components/component/NotesViewPanel/NotesTitleBar";
import NotesView from "@/components/component/NotesViewPanel/NotesView/NotesView";
import Sidepanel from "@/components/component/Sidepanel/Sidepanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
