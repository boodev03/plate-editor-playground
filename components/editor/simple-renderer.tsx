"use client";

import { PlateView, usePlateViewEditor } from "platejs/react";
import { BaseEditorKit } from "./editor-base-kit";
import { Value } from "platejs";

interface IProps {
  value: Value;
}

export function PostContent({ value }: IProps) {
  const editor = usePlateViewEditor({
    plugins: BaseEditorKit,
    value,
  });

  return <PlateView editor={editor} />;
}
