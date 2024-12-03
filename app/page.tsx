'use client'

import Header from '@/components/Header';
import Node from '@/components/Node'
import { MantineProvider } from "@mantine/core";

export default function HomePage() {
  return (
    <MantineProvider>
      <Header />
      <Node node="1"/>
    </MantineProvider>
  );
}