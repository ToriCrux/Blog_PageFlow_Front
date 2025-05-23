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

type PostContainerProps = {
  searchTerm: string;
};

export default function PostContainer({ searchTerm }: PostContainerProps) {
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

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={poppins.className}>
      {filteredPosts.map((post) => (
        <PostWrapper key={post.id} className="mb-8">
          <PostHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AuthorImage />
              <div className="font-bold text-lg">{post.author.name}</div>
            </div>

            {post.author.id === userId && (
              <div className="flex items-center gap-4 text-gray-600">
                <EditIcon
                  onClick={() => handleEdit(post)}
                  className="cursor-pointer text-xl hover:text-blue-500"
                >
                  ✎
                </EditIcon>
                <DeleteIcon
                  onClick={() => handleDelete(post.id)}
                  className="cursor-pointer text-xl hover:text-red-500"
                >
                  ✖
                </DeleteIcon>
              </div>
            )}
          </PostHeader>

          <PostBody className="mt-4">
            {editingPostId === post.id ? (
              <>
                <InputStyled
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
                <TextareaStyled
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
              </>
            ) : (
              <>
                <PostTitle className="text-2xl font-bold text-gray-800">{post.title}</PostTitle>
                <PostContent className="text-lg text-gray-700 mt-2">{post.content}</PostContent>
              </>
            )}

            <div className="mt-4">
              <div
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 font-semibold hover:text-blue-600"
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

          <PostFooter className="flex justify-between items-center mt-4">
            {editingPostId === post.id ? (
              <SendEditIcon onClick={() => handleSubmitEdit(post.id)} className="text-blue-500 cursor-pointer">
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <SendEditIcon
                  onClick={() => handleCommentSubmit(post.id)}
                  className="text-blue-500 cursor-pointer"
                >
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
