// src/app/page.tsx
import React from 'react';

import { Metadata } from 'next';
import Home from './Home/page';

export const metadata: Metadata = {
  title: 'Home | Projeto de Bloco'
}

const HomePage: React.FC = () => {
  return <Home />;
};

export default HomePage;
