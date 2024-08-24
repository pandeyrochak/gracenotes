import { trace } from "console";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const initZustandDevTools = (stores = []) => {
  // @ts-ignore
  return true;
};
interface NotesStoreState {
  currentUserId: string;
  activeNoteContent: string;
  activeNoteId: string;
  fileDirectory: fileDirectory;
  folderNotes: Record<string, Note[]>;
  updateFileDirectory: (directory: any) => boolean;
  updateCurrentUserId: (userId: string) => boolean;
  updateActiveNoteId: (noteId: string) => boolean;
  updateActiveNoteContent: (content: string) => boolean;
  updateFolderNotes: (folderId: string, notes: Note[]) => boolean;
}
interface fileDirectory {
  folders: Folder[];
  notes: Note[];
}
interface Folder {
  id: string;
  title: string;
  user_id: string;
}
interface Note {
  id: string;
  title: string;
  user_id: string;
  content: string;
  created_at: string;
  folder_id: string;
}

export const useNotesStore = create<NotesStoreState>()(
  devtools(
    immer((set) => ({
      currentUserId: "",
      activeNoteId: "",
      fileDirectory: { folders: [], notes: [] },
      activeNoteContent: "",
      folderNotes: {},
      updateFileDirectory: (directory: fileDirectory) => {
        set((state: NotesStoreState) => {
          state.fileDirectory = directory;
        });
        return true;
      },
      updateCurrentUserId: (userId: string) => {
        set((state: NotesStoreState) => {
          state.currentUserId = userId;
        });
        return true;
      },
      updateActiveNoteId: (noteId: string) => {
        set((state: NotesStoreState) => {
          state.activeNoteId = noteId;
        });
        return true;
      },
      updateActiveNoteContent: (content: string) => {
        set((state: NotesStoreState) => {
          state.activeNoteContent = content;
        });
        return true;
      },
      updateFolderNotes: (folderId: string, notes: Note[]) => {
        set((state: NotesStoreState) => {
          state.folderNotes[folderId] = notes;
        });
        return true;
      },
    })),
    { name: "notesStore", enabled: initZustandDevTools(), trace: true }
  )
);
