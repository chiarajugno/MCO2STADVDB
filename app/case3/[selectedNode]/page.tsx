'use client'

import Header from '@/components/Header';
import Case3 from '@/components/Case3'
import { MantineProvider } from "@mantine/core";

type Params = Promise<{ selectedNode: string }>;

export default async function Case3Page({ 
    params, 
}: {
    params: Params;
}) {

    const { selectedNode } = await params;
    return (
        <MantineProvider>
            <Header />
            <Case3 node={selectedNode}/>
        </MantineProvider>
     );
}