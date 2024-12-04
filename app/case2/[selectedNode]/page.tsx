'use client'

import Header from '@/components/Header';
import Case2 from '@/components/Case2'
import { MantineProvider } from "@mantine/core";

type Params = Promise<{ selectedNode: string }>;

export default async function Case2Page({ 
    params, 
}: {
    params: Params;
}) {

    const { selectedNode } = await params;
    return (
        <MantineProvider>
            <Header />
            <Case2 node={selectedNode}/>
        </MantineProvider>
     );
}