"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useNotesStore } from "@/store/useNotesStore";
import React, { Suspense, useEffect } from "react";
import Folder from "./Folder/Folder";
import Note from "./Note/Note";

const DirectoryList = () => {
  const { updateFileDirectory, fileDirectory } = useNotesStore();
  const fetchDirectory = async () => {
    const fileDirectory = await axiosInstance.get("/directory");
    updateFileDirectory(fileDirectory.data);
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  return (
    <>
      <div>
        {fileDirectory?.folders?.map((folder) => (
          <Folder id={folder.id} title={folder.title} key={folder.id} />
        ))}
        {fileDirectory?.notes?.map((note) => (
          <Note id={note.id} title={note.title} key={note.id} />
        ))}
      </div>
    </>
  );
};
export default DirectoryList;
