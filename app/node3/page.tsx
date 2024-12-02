'use client'

import Header from '@/components/Header';
import Node3 from '@/components/Node3'
import { MantineProvider } from "@mantine/core";

export default function HomePage() {
  return (
    <MantineProvider>
      <Header />
      <Node3 />
    </MantineProvider>
  );
}