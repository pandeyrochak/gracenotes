import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin text-muted-foreground" />
    </div>
  );
};

export default loading;
