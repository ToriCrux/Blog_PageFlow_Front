"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../Componentes/NavBar/page";
import BarraEsquerda from "../Componentes/BarraEsquerda/page";
import { getAllCategories, CategoriaData } from "../API/Categorias/PostCategorias";
import { CategoriaCard } from "./styles";

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

  const handleCategoriaClick = (categoriaName: string) => {
    router.push(`/Home?category=${categoriaName}`);
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
