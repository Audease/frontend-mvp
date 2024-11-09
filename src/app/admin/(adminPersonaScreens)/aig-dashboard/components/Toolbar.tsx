"use client";


import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";
import { Bold, Heading1, Heading2, Heading6, Italic } from "lucide-react";

type Props = {
  editor: Editor | null;                                                                          
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;                                              
  }
  return (
    <div className="border border-input bg-transparent rounded-lg p-2 my-2">
      <Toggle
        size="lg"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>
    </div>
  );
};

export default Toolbar;
