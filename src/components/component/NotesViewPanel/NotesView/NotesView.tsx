"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { ForwardRefEditor } from "../../Editor/ForwardRefEditor";
import { Button } from "@/components/ui/button";
import { useNotesStore } from "@/store/useNotesStore";
import Loading from "@/app/home/loading";
import { debounce } from "lodash";
import { updateNoteContent } from "@/utils/functions/updateNoteContent";
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
const NotesView = () => {
  const editorRef = useRef<any>(null);
  const { currentNote, updateCurrentNote } = useNotesStore();
  const getNotesMarkdown = () => {
    const markdown = editorRef.current.getMarkdown();
    console.log(markdown);
  };
  const handleEditorChange = debounce(async (markdown: string) => {
    updateCurrentNote({ ...currentNote, content: markdown });
    useNotesStore.getState().updateCurrentNoteSavedState(false);
    const response = await updateNoteContent(currentNote.id, markdown);
    response?.success &&
      useNotesStore.getState().updateCurrentNoteSavedState(true);
  }, 2000);
  useEffect(() => {}, [currentNote]);
  return (
    <div
      className="flex-1 p-4 flex flex-col"
      style={{ height: "calc(100vh - 76px)", overflowY: "hidden" }}
    >
      {/* <Button variant={"default"} onClick={getNotesMarkdown} className="w-fit">
        Get markdown
      </Button> */}
      <Suspense fallback={<Loading />}>
        <ForwardRefEditor
          markdown={currentNote.content}
          ref={editorRef}
          onChange={handleEditorChange}
        />
      </Suspense>
    </div>
  );
};

export default NotesView;
