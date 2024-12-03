'use client'

import Header from '@/components/Header';
import Case2 from '@/components/Case2'
import { MantineProvider } from "@mantine/core";

export default function Case2Page() {
  return (
    <MantineProvider>
      <Header />
      <Case2 />
    </MantineProvider>
  );
}