"use client";

import { useEffect, useState } from "react";
import {
  PostContainer,
  TextArea,
  Divider,
  ActionsRow,
  ActionButton,
  SendButton,
} from "./styles";
import { createPost } from "../../API/Posts/WritePost/WritePostApi";
import { getAllCategories, CategoriaData } from "../../API/Categorias/PostCategorias";

import { Montserrat, Poppins } from "next/font/google";
export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function CriarPost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [categorias, setCategorias] = useState<CategoriaData[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getAllCategories();
      setCategorias(data);
      if (data.length > 0) setSelectedCategoria(data[0].id);
    };
    fetchCategorias();
  }, []);

  const handleSend = async () => {
    if (!selectedCategoria || post.trim() === "" || title.trim() === "") return;

    const response = await createPost({
      title,
      content: post,
      categoryId: selectedCategoria,
    });

    if (response) {
      console.log("Post criado com sucesso:", response);
      setPost("");
      setTitle("");
      setSelectedCategoria(categorias[0]?.id || null);
    }
  };

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

        <TextArea
          placeholder="Write a post..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        {/* Dropdown de categorias */}
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
