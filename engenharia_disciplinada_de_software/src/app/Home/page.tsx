"use client"


import NavBar from "../Componentes/NavBar/page";
import BarraEsquerda from "../Componentes/BarraEsquerda/page";
import CriarPost from "../Componentes/CriarPost/page";

export default function Home() {


  return (
    <>
      <NavBar />
      <BarraEsquerda />
      <main className="pt-20 pl-20 pr-4">
        <div className="max-w-2xl mx-auto">
          <CriarPost />
        </div>
      </main>
    </>
  );
}
