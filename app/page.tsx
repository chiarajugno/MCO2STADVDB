'use client'

import Header from '@/components/Header';
import Home from '@/components/Home'
import { MantineProvider } from "@mantine/core";

export default function HomePage() {
  return (
    <MantineProvider>
      <Header />
      <Home />
    </MantineProvider>
  );
}