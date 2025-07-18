"use client";

import { Plate } from "platejs/react";
import { EditorKit } from "@/components/editor/editor-kit";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { usePlateEditor } from "platejs/react";
import type { Value } from "platejs";

interface PostRendererProps {
  content: Value;
  readOnly?: boolean;
}

export function PostRenderer({ content, readOnly = true }: PostRendererProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: content,
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="demo" readOnly={readOnly} />
      </EditorContainer>
    </Plate>
  );
}
