'use client';

import { useState } from "react";
import {
  PostContainer,
  TextArea,
  Divider,
  ActionsRow,
  ActionButton,
  SendButton
} from "./styles";

export default function CriarPost() {
  const [post, setPost] = useState("");

  const handleSend = () => {
    if (post.trim() === "") return;
    console.log("Post enviado:", post);
    setPost("");
  };

  return (
    <PostContainer >
      <TextArea
        placeholder="Write a post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <Divider />
      <ActionsRow>
        <div className="flex gap-2">
          <ActionButton>
            <i className="fas fa-image mr-2" />
            Pictures
          </ActionButton>
          <ActionButton>
            <i className="fas fa-map-marker-alt mr-2" />
            Location
          </ActionButton>
        </div>
        <SendButton onClick={handleSend}>
          <i className="fas fa-paper-plane" />
        </SendButton>
      </ActionsRow>
    </PostContainer>
  );
}
