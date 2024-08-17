import React from "react";
import Link from "next/link";
import { NoteProps } from "@/types/interfaces";

const Note = ({ id, title, content }: NoteProps) => {
  return (
    <Link
      href={`/note/${id}`}
      className="block rounded-md px-3 py-2 text-sm font-normal transition-colors hover:bg-border text-muted-foreground"
      prefetch={false}
    >
      {title}
    </Link>
  );
};

export default Note;
