"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useNotesStore } from "@/store/useNotesStore";
import React, { useEffect, useState } from "react";
import Folder from "./Folder/Folder";
import Note from "./Note/Note";
import Loading from "@/app/home/loading"; // Adjust the import path as needed
import { useToast } from "@/components/ui/use-toast";

const DirectoryList = () => {
  const { updateFileDirectory, fileDirectory } = useNotesStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDirectory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/directory");
      if (response.data.success) {
        updateFileDirectory(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch directory");
        toast({
          title: "Something went wrong",
          description: response.data.message || "Failed to fetch directory",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error fetching directory:", err);
      setError("An error occurred while fetching the directory");
      toast({
        title: "Something went wrong",
        description: "An error occurred while fetching the directory",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      {fileDirectory?.folders?.map((folder) => (
        <Folder id={folder.id} title={folder.title} key={folder.id} />
      ))}
      {fileDirectory?.notes?.map((note) => (
        <Note id={note.id} title={note.title} key={note.id} />
      ))}
    </div>
  );
};

export default DirectoryList;
