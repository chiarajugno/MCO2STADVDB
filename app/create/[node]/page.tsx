'use client';

import Header from '@/components/Header';
import Create from '@/components/Create';
import { MantineProvider } from '@mantine/core';
import NodeAffix from '@/components/NodeAffix';

type Params = Promise<{ node: string }>;

export default async function CreatePage({ 
    params, 
}: {
    params: Params;
}) {

    const { node } = await params;

    return (
        <MantineProvider>
            <Header />
            <Create node={node} />
            <NodeAffix node={node} />
        </MantineProvider>
    );
}