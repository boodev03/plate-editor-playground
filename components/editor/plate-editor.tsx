"use client";

import * as React from "react";
import { Plate, usePlateEditor } from "platejs/react";

import { EditorKit } from "@/components/editor/editor-kit";
import { SettingsDialog } from "@/components/editor/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { SaveButton } from "./save-button";
import { TitleInput } from "./title-input";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "../ui/button";

export function PlateEditor() {
  const [postTitle, setPostTitle] = React.useState("Untitled Post");

  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });

  const handleSave = (postId: string) => {
    console.log("Post saved with ID:", postId);
    toast.success("Post saved successfully");
  };

  const handleError = (error: Error) => {
    console.error("Save failed:", error);
    toast.error("Save failed");
  };

  return (
    <div className="space-y-4">
      <Plate editor={editor}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <TitleInput initialTitle={postTitle} onTitleChange={setPostTitle} />
          </div>
          <SaveButton
            title={postTitle}
            onSave={handleSave}
            onError={handleError}
          />
          <Link href="/posts">
            <Button variant="outline">Posts</Button>
          </Link>
        </div>
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </div>
  );
}

const value = [
  {
    children: [{ text: "Welcome to the Plate Playground!" }],
    type: "h1",
  },
];
