"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Page = () => {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const doApiCall = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/notes?noteId=489c5379-89cc-4d6b-a4c3-6b21fb8defb1");
      const data = await response.json();
      setApiResponse(data);
      navigator.clipboard.writeText(JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto">
      <Button onClick={doApiCall} disabled={loading} variant={"default"}>
        {loading ? "Loading..." : "Do API Call"}
      </Button>
      {loading && <div>Loading...</div>}
      {!loading && apiResponse && (
        <pre className="mt-4">{JSON.stringify(apiResponse, null, 2)}</pre>
      )}
      {!loading && !apiResponse && <div>No user</div>}
    </div>
  );
};

export default Page;
