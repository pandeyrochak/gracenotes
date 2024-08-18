"use client";

import React from "react";
import { useParams } from "next/navigation";

const NotePage = () => {
  const { id } = useParams();
  return <div>Note page</div>;
};

export default NotePage;
