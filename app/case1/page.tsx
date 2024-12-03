'use client'

import Header from '@/components/Header';
import Case1 from '@/components/Case1'
import { MantineProvider } from "@mantine/core";

export default function Case1Page() {
  return (
    <MantineProvider>
      <Header />
      <Case1 />
    </MantineProvider>
  );
}