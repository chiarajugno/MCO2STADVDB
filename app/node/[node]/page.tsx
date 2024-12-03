'use client';

import Header from '@/components/Header';
import Node from '@/components/Node';
import { MantineProvider } from '@mantine/core';

type Params = Promise<{ node: string }>;

export default async function NodePage({ 
    params, 
}: {
    params: Params;
}) {

    const { node } = await params;

    return (
        <MantineProvider>
            <Header />
            <Node node={node} />
        </MantineProvider>
    );
}
