"use client";

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
import { usePostContainer } from "./usePostContainer";
import { useState } from "react";

export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function PostContainer() {
  const {
    posts,
    userId,
    editingPostId,
    editedTitle,
    editedContent,
    commentInput,
    setEditedTitle,
    setEditedContent,
    setCommentInput,
    handleDelete,
    handleEdit,
    handleSubmitEdit,
    handleCommentSubmit,
  } = usePostContainer();

  const [visibleComments, setVisibleComments] = useState<Record<number, boolean>>({});

  const toggleComments = (postId: number) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
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
              <div
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 font-semibold"
                onClick={() => toggleComments(post.id)}
              >
                💬 {post.comments?.length ?? 0} comentário{(post.comments?.length !== 1 ? "s" : "")}
                <span>{visibleComments[post.id] ? "🔼" : "🔽"}</span>
              </div>

              {visibleComments[post.id] && (
                <ul className="text-sm text-gray-800 pl-4 list-disc mt-1">
                  {(post.comments ?? []).map((comment, index) => (
                    <li key={index}>{comment.content}</li>
                  ))}
                </ul>
              )}
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
