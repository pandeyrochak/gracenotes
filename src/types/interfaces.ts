export interface FolderProps {
  id: string;
  title: string;
  notes: NoteProps[];
}

export interface NoteProps {
  id: string;
  title: string;
  content: string;
}
