"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../Componentes/NavBar/page";
import BarraEsquerda from "../Componentes/BarraEsquerda/page";
import { getAllCategories, CategoriaData } from "../API/Categorias/PostCategorias";
import { getPostsByCategory } from "../API/Posts/GetPostCategory/GetPostCategory";
import { CategoriaCard } from "./styles";
import { PostData } from "../API/Posts/GetPosts/GetPostsAPI";

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

    try {
      const posts = await getPostsByCategory(categoriaName);

      if (!posts) {
        console.error("❌ Erro ao carregar posts da categoria.");
        return;
      }

      console.log("📦 Posts recebidos:", posts);

      sessionStorage.setItem("postsByCategory", JSON.stringify(posts));
      router.push(url);
    } catch (err) {
      console.error("❌ Erro ao buscar posts:", err);
    }
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
