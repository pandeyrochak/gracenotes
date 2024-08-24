import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen animate-spin">
      <Loader className="text-muted-foreground" />
    </div>
  );
};

export default Loading;
