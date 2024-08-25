"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import NotesTitleBar from "@/components/component/NotesViewPanel/NotesTitleBar";
import NotesView from "@/components/component/NotesViewPanel/NotesView/NotesView";
import Loading from "../../loading";
import { useNotesStore } from "@/store/useNotesStore";

const NotePage = () => {
  const { id } = useParams();
  const [noteContent, setNoteContent] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { currentNote, updateCurrentNote } = useNotesStore();

  const fetchNoteContent = async () => {
    try {
      const response = await axiosInstance.get(`/notes?noteId=${id}`);
      if (response.data.success) {
        updateCurrentNote({
          title: response.data.data.title,
          content: response.data.data.content,
          id: id.toString(),
        });
      } else {
        setError(response.data.message || "An error occurred");
      }
    } catch (err) {
      setError("Failed to fetch note content");
      console.error("Error fetching note:", err);
    }
  };

  useEffect(() => {
    fetchNoteContent();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NotesTitleBar />
      <NotesView />
    </>
  );
};

export default NotePage;
