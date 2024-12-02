'use client'

import Header from '@/components/Header';
import Node2 from '@/components/Node2'
import { MantineProvider } from "@mantine/core";

export default function HomePage() {
  return (
    <MantineProvider>
      <Header />
      <Node2 />
    </MantineProvider>
  );
}