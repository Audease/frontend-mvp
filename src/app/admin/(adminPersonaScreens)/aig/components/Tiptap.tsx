"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import  Heading from "@tiptap/extension-heading";

const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Heading.configure({
      levels: [1, 2, 3, 4, 5, 6], 
    }),],
    content: description,
    editorProps: {
        attributes: {
            class:
            "rounded-md border min-h-[150px] border-input"
        },
    },
    onUpdate({editor}) {
        onChange(editor.getHTML())
        // console.log(editor.getHTML())
    }
  });

  return (
    <div>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
};

export default Tiptap;
