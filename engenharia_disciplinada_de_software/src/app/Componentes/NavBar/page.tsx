'use client';

import Image from 'next/image';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, LogoArea, IconGroup, IconButton } from "./styles";

export default function NavBar() {
  return (
    <Container>
      <LogoArea>
        <Image src="/logo.svg" alt="Logo" width={120} height={40} />
      </LogoArea>

      <IconGroup>
        <IconButton>
          <i className="fas fa-bell" />
        </IconButton>
        <IconButton>
          <i className="fas fa-moon" />
        </IconButton>
      </IconGroup>
    </Container>
  );
}
