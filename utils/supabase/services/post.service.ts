/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '@/types/post'
import { createClient } from '../client'

type PostInput = {
  title: string
  content: any // JSONB, so can be any serializable object
}

export async function createPost(input: PostInput) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title: input.title,
        content: input.content,
      }
    ])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')

  if (error) {
    throw error
  }

  return data
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') { // No rows found
      return null
    }
    throw error
  }

  return data
}
