"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/utils/supabase/services/post.service";
import type { Post as PostType } from "@/types/post";
import PostItem from "./post-item";

export default function Post() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.log("[Post]: Error while getting posts", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    // Simple skeleton loading
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse p-4 border rounded shadow bg-gray-100 dark:bg-gray-800"
          >
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="space-y-4 container mx-auto py-10">
      <h3>Posts</h3>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}
