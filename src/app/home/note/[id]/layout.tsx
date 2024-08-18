import NotesTitleBar from "@/components/component/NotesViewPanel/NotesTitleBar";
import NotesView from "@/components/component/NotesViewPanel/NotesView/NotesView";
import React from "react";

const NoteLayout = () => {
  return (
    <>
      <NotesTitleBar />
      <NotesView />
    </>
  );
};

export default NoteLayout;
