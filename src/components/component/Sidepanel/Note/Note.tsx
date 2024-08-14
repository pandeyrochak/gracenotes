import React from "react";
import Link from "next/link";
interface NoteProps {
  title: string;
  content: string;
}
const Note = () => {
  return (
    <Link
      href="#"
      className="block rounded-md px-3 py-2 text-sm font-normal transition-colors hover:bg-border text-muted-foreground"
      prefetch={false}
    >
      Meeting Agenda
    </Link>
  );
};

export default Note;
