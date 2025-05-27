// Componentes/CriarPost/page.tsx
"use client";

import {
  PostContainer,
  Divider,
  ActionsRow,
  ActionButton,
  SendButton,
} from "./styles";

import { Montserrat, Poppins } from "next/font/google";
import { useCriarPost } from "./useCriarPost";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function CriarPost() {
  const {
    title,
    setTitle,
    post,
    setPost,
    categorias,
    selectedCategoria,
    setSelectedCategoria,
    handleSend,
  } = useCriarPost();

  return (
    <div className={poppins.className}>
      <PostContainer>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent resize-none outline-none text-gray-700 placeholder-gray-500 mb-2"
        />

        <Editor
          apiKey="4knoygedy11gmj5630ocpttktkw3zaeynfopcxk93zn86moc"
          value={post}
          onEditorChange={(content) => setPost(content)}
          init={{
            height: 300,
            menubar: false,
            plugins: [],
            toolbar:
              "undo redo | formatselect | bold italic underline | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <select
          value={selectedCategoria ?? ""}
          onChange={(e) => setSelectedCategoria(Number(e.target.value))}
          className="w-full mt-4 mb-2 p-2 rounded bg-white text-gray-800 border border-gray-300"
        >
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

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
    </div>
  );
}
