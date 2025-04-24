// Posts/usePostContainer.ts
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getAllPosts, PostData } from "../../API/Posts/GetPosts/GetPostsAPI";
import { deletePostById } from "../../API/Posts/DeletePost/DeletePost";
import { updatePost } from "../../API/Posts/PutPost/EditarPost";
import { postComment } from "../../API/Comments/PostComents/PostComentsAPI";
import { getAllComments, CommentData } from "../../API/Comments/GetComents/GetComents";
import { getPostsByCategory } from "../../API/Posts/GetPostCategory/GetPostCategory";

import { parseJwt } from "./parseJwt";

export function usePostContainer() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [commentInput, setCommentInput] = useState<Record<number, string>>({});
  const [comments, setComments] = useState<CommentData[]>([]);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      const postsData = categoryName
        ? await getPostsByCategory(categoryName)
        : await getAllPosts();

      const commentsData = await getAllComments();

      if (postsData) setPosts(postsData);
      setComments(commentsData);
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      setUserId(decoded?.id || null);
    }

    fetchData();
  }, [categoryName]);

  const handleDelete = async (postId: number) => {
    if (!confirm("Deseja realmente excluir este post?")) return;

    const success = await deletePostById(postId);
    if (success) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  const handleEdit = (post: PostData) => {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSubmitEdit = async (postId: number) => {
    const success = await updatePost({
      id: postId,
      title: editedTitle,
      content: editedContent,
      categoryId: 1,
    });

    if (success) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, title: editedTitle, content: editedContent } : p
        )
      );
      setEditingPostId(null);
    }
  };

  const handleCommentSubmit = async (postId: number) => {
    const content = commentInput[postId]?.trim();
    if (!content) return;

    const success = await postComment({
      content,
      approved: true,
      updatedAt: new Date().toISOString(),
    });

    if (success) {
      alert("Comentário enviado!");
      setCommentInput((prev) => ({ ...prev, [postId]: "" }));
      const updatedComments = await getAllComments();
      setComments(updatedComments);
    } else {
      alert("Erro ao enviar comentário.");
    }
  };

  return {
    posts, userId, editingPostId, editedTitle, editedContent,
    commentInput, comments,
    setEditedTitle, setEditedContent, setCommentInput,
    handleDelete, handleEdit, handleSubmitEdit, handleCommentSubmit,
  };
}
