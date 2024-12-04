'use client';

import Header from '@/components/Header';
import Delete from '@/components/Delete';
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
            <Delete node={node}/>
            <NodeAffix node={node} />
        </MantineProvider>
    );
}
