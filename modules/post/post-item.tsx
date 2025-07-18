import React from "react";
import type { Post } from "@/types/post";
import Link from "next/link";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="p-4 border rounded shadow block"
    >
      <div className="text-xs text-gray-500 mb-1">ID: {post.id}</div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <div className="text-sm text-muted-foreground">
        {new Date(post.created_at).toLocaleString()}
      </div>
    </Link>
  );
}
