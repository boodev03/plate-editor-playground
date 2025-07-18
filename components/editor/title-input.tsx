"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

interface TitleInputProps {
  initialTitle?: string;
  onTitleChange?: (title: string) => void;
}

export function TitleInput({
  initialTitle = "",
  onTitleChange,
}: TitleInputProps) {
  const [title, setTitle] = useState(initialTitle);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="post-title">Post Title</Label>
      <Input
        id="post-title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter your post title..."
        className="max-w-md"
      />
    </div>
  );
}
