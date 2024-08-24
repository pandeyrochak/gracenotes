"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import NotesTitleBar from "@/components/component/NotesViewPanel/NotesTitleBar";
import NotesView from "@/components/component/NotesViewPanel/NotesView/NotesView";
import Loading from "../../loading";

const NotePage = () => {
  const { id } = useParams();
  const [noteContent, setNoteContent] = useState<string>("");
  const fetchNoteContent = async () => {
    const noteContentResponse = await axiosInstance.get(`/notes?noteId=${id}`);
    // console.log(noteContentResponse.data.data[0].content);
    setNoteContent(noteContentResponse.data.data[0].content);
  };
  useEffect(() => {
    fetchNoteContent();
  }, [id]);
  return (
    <>
      <NotesTitleBar />
      {noteContent ? <NotesView content={noteContent} /> : <Loading />}
      {/* <NotesView content={noteContent} /> */}
    </>
  );
};

export default NotePage;
