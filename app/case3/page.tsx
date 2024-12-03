'use client'

import Header from '@/components/Header';
import Case3 from '@/components/Case3'
import { MantineProvider } from "@mantine/core";

export default function Case3Page() {
  return (
    <MantineProvider>
      <Header />
      <Case3 />
    </MantineProvider>
  );
}