"use client";

import { Button } from "@/components/ui/button";
import { createPost } from "@/utils/supabase/services/post.service";
import { Save } from "lucide-react";
import { useState } from "react";
import { useEditor } from "./editor-kit";

interface SaveButtonProps {
  title?: string;
  onSave?: (postId: string) => void;
  onError?: (error: Error) => void;
}

export function SaveButton({
  title = "Untitled Post",
  onSave,
  onError,
}: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const editor = useEditor();

  const handleSave = async () => {
    if (!editor) return;

    setIsSaving(true);

    try {
      // Get the current editor value
      const content = editor.children;
      // Save to database using your post service
      const savedPost = await createPost({
        title,
        content: content,
      });

      onSave?.(savedPost.id);
    } catch (error) {
      console.error("Error saving post:", error);
      onError?.(error as Error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving}
      className="flex items-center gap-2"
    >
      <Save className="h-4 w-4" />
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
}
