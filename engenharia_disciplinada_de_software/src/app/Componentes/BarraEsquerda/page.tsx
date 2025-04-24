// BarraEsquerda/BarraEsquerda.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUserData } from "./useUserData";
import { MenuItemWithIcon } from "./MenuItemWithIcon";

import {
  Container,
  MenuWrapper,
  UserInfo,
  UserName,
  UserStatus,
  Footer
} from "./styles";

import { Montserrat, Poppins } from "next/font/google";
export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function BarraEsquerda() {
  const [expanded, setExpanded] = useState(false);
  const { user, token } = useUserData();
  const router = useRouter();
  const pathname = usePathname();

  const handleGoTo = (path: string) => router.push(path);

  return (
    <div className={poppins.className}>
      <Container
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        $expanded={expanded}
      >
        <MenuWrapper>
          {expanded && user && (
            <UserInfo>
              <Image src="/Perfil.svg" alt="User" width={50} height={50} />
              <div>
                <UserName>{user.name}</UserName>
                {token ? (
                  <UserStatus>🟢 Ativo</UserStatus>
                ) : (
                  <UserStatus>🔴 Offline</UserStatus>
                )}
              </div>
            </UserInfo>
          )}

          <MenuItemWithIcon
            icon="fas fa-home"
            label="Home"
            expanded={expanded}
            selected={pathname === "/Home"}
            onClick={() => handleGoTo("/Home")}
          />
          <MenuItemWithIcon
            icon="fas fa-search"
            label="Search"
            expanded={expanded}
            onClick={() => handleGoTo("/Search")}
          />
          <MenuItemWithIcon
            icon="fas fa-layer-group"
            label="Categories"
            expanded={expanded}
            onClick={() => handleGoTo("/Categorias")}
          />
          <MenuItemWithIcon
            icon="fas fa-user"
            label="User"
            expanded={expanded}
            selected={pathname === "/User"}
            onClick={() => handleGoTo("/User")}
          />
        </MenuWrapper>

        <Footer>
          <MenuItemWithIcon
            icon="fas fa-cog"
            label="Settings"
            expanded={expanded}
            onClick={() => {}}
          />
          <MenuItemWithIcon
            icon="fas fa-exclamation-circle"
            label="Support"
            expanded={expanded}
            onClick={() => {}}
          />
        </Footer>
      </Container>
    </div>
  );
}
