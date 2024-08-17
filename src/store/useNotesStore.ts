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
  fileDirectory: any[];
}
interface Folder {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
interface Note {
  id: string;
  title: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  folderId: string;
}

export const useNotesStore = create(
  devtools(
    immer((set) => ({
      // write your store logic here
      currentUserId: "",
      activeNoteId: "",
      fileDirectory: [],
      activeNoteContent: "",
      // store ends
    })),
    { name: "notesStore", enabled: initZustandDevTools(), trace: true }
  )
);
