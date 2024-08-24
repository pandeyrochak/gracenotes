"use client";
import React, { Suspense, useRef } from "react";
import { ForwardRefEditor } from "../../Editor/ForwardRefEditor";
import { Button } from "@/components/ui/button";
const markdown = `# Welcome to GraceNotes

## Introduction
This is a sample note to demonstrate the capabilities of our markdown editor.

### Key Features
- **Rich Text Formatting**: Bold, italic, underline, and more
- **Lists**: Bullet points and numbered lists
- **Headings**: Multiple levels of headings for organization

## Sample Content

### To-Do List
- [ ] Complete project proposal
- [ ] Review team feedback
- [x] Schedule team meeting

### Code Snippet
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('User');
\`\`\`

### Quote
> The only way to do great work is to love what you do. - Steve Jobs

---

Feel free to edit this note and explore the editor's features!`;
const NotesView = ({ content }: { content: string }) => {
  const editorRef = useRef<any>(null);
  const getNotesMarkdown = () => {
    const markdown = editorRef.current.getMarkdown();
    console.log(markdown);
  };
  return (
    <div
      className="flex-1 p-4 flex flex-col"
      style={{ height: "calc(100vh - 76px)", overflowY: "hidden" }}
    >
      {/* <Button variant={"default"} onClick={getNotesMarkdown} className="w-fit">
        Get markdown
      </Button> */}
      <Suspense fallback={<div>Loading...</div>}>
        <ForwardRefEditor markdown={content} ref={editorRef} />
      </Suspense>
    </div>
  );
};

export default NotesView;
