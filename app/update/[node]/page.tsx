'use client';

import Header from '@/components/Header';
import Update from '@/components/Update';
import { MantineProvider } from '@mantine/core';
import NodeAffix from '@/components/NodeAffix';

type Params = Promise<{ node: string }>;

export default async function UpdatePage({ 
    params, 
}: {
    params: Params;
}) {

    const { node } = await params;

    return (
        <MantineProvider>
            <Header />
            <Update />
            <NodeAffix node={node} />
        </MantineProvider>
    );
}
