'use client';

import Header from '@/components/Header';
import Node from '@/components/Node';
import { MantineProvider } from '@mantine/core';

export default function NodePage({ 
    params, 
}: {
    params: { node: string };
}) {
  return (
    <MantineProvider>
      <Header />
      <Node node={params.node} />
    </MantineProvider>
  );
}
