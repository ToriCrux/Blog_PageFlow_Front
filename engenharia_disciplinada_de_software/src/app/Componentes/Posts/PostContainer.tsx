"use client";

import { useEffect, useState } from "react";
import { getAllPosts, PostData } from "../../API/Posts/GetPosts/GetPostsAPI";
import { deletePostById } from "../../API/Posts/DeletePost/DeletePost";
import { updatePost } from "../../API/Posts/PutPost/EditarPost";
import { postComment } from "../../API/Comments/PostComents/PostComentsAPI";
import { getAllComments, CommentData } from "../../API/Comments/GetComents/GetComents";
import { useSearchParams } from "next/navigation";
import { getPostsByCategory } from "../../API/Posts/GetPostCategory/GetPostCategory";

import {
  PostWrapper,
  PostHeader,
  PostBody,
  PostFooter,
  AuthorImage,
  PostTitle,
  PostContent,
  CommentBox,
  DeleteIcon,
  EditIcon,
  SendEditIcon,
  InputStyled,
  TextareaStyled,
} from "./styles";

import { Montserrat, Poppins } from "next/font/google";
export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function PostContainer() {
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
      let postsData = null;

      if (categoryName) {
        postsData = await getPostsByCategory(categoryName);
      } else {
        postsData = await getAllPosts();
      }

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
    const confirmDelete = confirm("Deseja realmente excluir este post?");
    if (!confirmDelete) return;

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

      // Atualiza a lista de comentários
      const updatedComments = await getAllComments();
      setComments(updatedComments);
    } else {
      alert("Erro ao enviar comentário.");
    }
  };

  return (
    <div className={poppins.className}>
      {posts.map((post) => (
        <PostWrapper key={post.id}>
          <PostHeader>
            <AuthorImage />
            <div className="font-bold">{post.author.name}</div>

            {post.author.id === userId && (
              <>
                <EditIcon onClick={() => handleEdit(post)}>✎</EditIcon>
                <DeleteIcon onClick={() => handleDelete(post.id)}>✖</DeleteIcon>
              </>
            )}
          </PostHeader>

          <PostBody>
            {editingPostId === post.id ? (
              <>
                <InputStyled
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <TextareaStyled
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </>
            ) : (
              <>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </>
            )}

            <div className="mt-4">
              <p className="font-semibold text-sm text-gray-600">Comentários:</p>
              <ul className="text-sm text-gray-800 pl-4 list-disc">
                {comments.map((comment, index) => (
                  <li key={index} className="mt-1">
                    {comment.content}
                  </li>
                ))}
              </ul>
            </div>
          </PostBody>

          <PostFooter>
            {editingPostId === post.id ? (
              <SendEditIcon onClick={() => handleSubmitEdit(post.id)}>
                <i className="fas fa-paper-plane" />
              </SendEditIcon>
            ) : (
              <>
                <CommentBox
                  placeholder="Write a comment..."
                  value={commentInput[post.id] || ""}
                  onChange={(e) =>
                    setCommentInput((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                />
                <SendEditIcon onClick={() => handleCommentSubmit(post.id)}>
                  <i className="fas fa-paper-plane" />
                </SendEditIcon>
              </>
            )}
          </PostFooter>
        </PostWrapper>
      ))}
    </div>
  );
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return null;
  }
}
