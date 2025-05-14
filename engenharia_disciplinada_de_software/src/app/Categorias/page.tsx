"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../Componentes/NavBar/page";
import BarraEsquerda from "../Componentes/BarraEsquerda/page";
import { getAllCategories, CategoriaData } from "../API/Categorias/PostCategorias";
import { getPostsByCategory } from "../API/Posts/GetPostCategory/GetPostCategory";
import { getAllComments, CommentData } from "../API/Comments/GetComents/GetComents";
import { CategoriaCard } from "./styles";
import { PostData } from "../API/Posts/GetPosts/GetPostsAPI";

type PostWithComments = PostData & {
  comments?: CommentData[];
};

export default function Categorias() {
  const [categorias, setCategorias] = useState<CategoriaData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getAllCategories();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  const handleCategoriaClick = async (categoriaName: string) => {
    const url = `/Home?category=${categoriaName}`;
    console.log("🔍 Categoria clicada:", categoriaName);
    console.log("🔗 Redirecionando para:", url);

    try {
      const posts: PostData[] = await getPostsByCategory(categoriaName);
      const comments: CommentData[] = await getAllComments();

      const postsWithComments: PostWithComments[] = posts.map((post) => ({
        ...post,
        comments: comments.filter((c) => c.postId === post.id),
      }));

      console.log("📦 Posts da categoria com comentários:");
      postsWithComments.forEach((post) => {
        console.log("📝 Post:", {
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.author?.name,
          comments: post.comments,
        });
      });
    } catch (err) {
      console.error("❌ Erro ao buscar posts/comentários:", err);
    }

    router.push(url);
  };

  return (
    <>
      <NavBar />
      <BarraEsquerda />

      <main className="pt-20 pl-20 pr-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Categorias</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categorias.map((categoria) => (
              <CategoriaCard
                key={categoria.id}
                onClick={() => handleCategoriaClick(categoria.name)}
              >
                {categoria.name}
              </CategoriaCard>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
