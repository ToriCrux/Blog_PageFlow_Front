"use client"

import { useEffect, useState } from 'react';
import { BlogUser, fetchUserData } from "../API/UserAPI/ApiUserData";
import NavBar from "../Componentes/NavBar/page";
import BarraEsquerda from "../Componentes/BarraEsquerda/page";
import CriarPost from "../Componentes/CriarPost/page";

export default function Home() {
  const [userData, setUserData] = useState<BlogUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchUserData();
      setUserData(user);
    };

    loadUser();
  }, []);

  if (!userData) {
    return <p>Carregando informações do usuário...</p>;
  }

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
