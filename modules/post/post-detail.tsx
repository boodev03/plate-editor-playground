/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PostContent } from "@/components/editor/simple-renderer";
import type { Post } from "@/types/post";
import { getPostById } from "@/utils/supabase/services/post.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    async function fetchPost() {
      try {
        const data = await getPostById(id as string);
        setPost(data);
      } catch (error) {
        console.error("[PostDetail]: Error while getting post", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);
  if (loading) {
    return (
      <div className="p-4 border rounded shadow animate-pulse bg-gray-100 dark:bg-gray-800">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
      </div>
    );
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <article className="max-w-4xl mx-auto p-6">
      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500">
          Published on {new Date(post.created_at).toLocaleDateString()}
        </div>
      </header>

      {/* Post Content */}
      <div>
        <PostContent value={post.content as any} />
      </div>
    </article>
  );
}
