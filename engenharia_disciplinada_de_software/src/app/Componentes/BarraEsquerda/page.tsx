'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Container,
  MenuWrapper,
  IconWrapper,
  IconLabel,
  UserInfo,
  UserName,
  UserStatus,
  MenuItem,
  Footer
} from "./styles";

import { BlogUser, fetchUserData } from "@/app/API/UserAPI/ApiUserData";

export default function BarraEsquerda() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState<BlogUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      const data = await fetchUserData();
      setUser(data);
    };
    loadUser();
  }, []);

  return (
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
              {user && token ? (
                <UserStatus>🟢 Ativo</UserStatus>
              ) : (
                <UserStatus>🔴 Offline</UserStatus>
              )}
            </div>
          </UserInfo>
        )}

        <MenuItem $selected>
          <IconWrapper><i className="fas fa-home" /></IconWrapper>
          {expanded && <IconLabel>Home</IconLabel>}
        </MenuItem>

        <MenuItem>
          <IconWrapper><i className="fas fa-search" /></IconWrapper>
          {expanded && <IconLabel>Search</IconLabel>}
        </MenuItem>

        <MenuItem>
          <IconWrapper><i className="fas fa-layer-group" /></IconWrapper>
          {expanded && <IconLabel>Categories</IconLabel>}
        </MenuItem>

        <MenuItem>
          <IconWrapper><i className="fas fa-user" /></IconWrapper>
          {expanded && <IconLabel>User</IconLabel>}
        </MenuItem>
      </MenuWrapper>

      <Footer>
        <MenuItem>
          <IconWrapper><i className="fas fa-cog" /></IconWrapper>
          {expanded && <IconLabel>Settings</IconLabel>}
        </MenuItem>
        <MenuItem>
          <IconWrapper><i className="fas fa-exclamation-circle" /></IconWrapper>
          {expanded && <IconLabel>Support</IconLabel>}
        </MenuItem>
      </Footer>
    </Container>
  );
}
