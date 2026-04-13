"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { EditorKit } from "@/components/editor/editor-kit";
import { UseFormSetValue } from "react-hook-form";
import { ArticleFormData } from "./ArticleDialog";

interface EditorProps {
  setValue: UseFormSetValue<ArticleFormData>;
  value: string;
}

const SlateEditor = ({ value, setValue }: EditorProps) => {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (() => {
      try {
        return JSON.parse(value);
      } catch {
        return [{ type: "p", children: [{ text: "" }] }];
      }
    })(),
  });

  return (
    <Plate
      editor={editor}
      onValueChange={({ value }) =>
        setValue("story", JSON.stringify(value), { shouldDirty: true })
      }
    >
      <EditorContainer>
        <Editor
          value={value}
          onChange={(val) => {
            setValue("story", JSON.stringify(val));
          }}
          placeholder="Type your amazing content here..."
          className="dark:text-white text-zinc-800"
        />
      </EditorContainer>
    </Plate>
  );
};

export default SlateEditor;
