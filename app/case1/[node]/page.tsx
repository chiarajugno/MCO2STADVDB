'use client'

import Header from '@/components/Header';
import Case1 from '@/components/Case1'
import { MantineProvider } from "@mantine/core";

type Params = Promise<{ node: string }>;

export default async function Case1Page({ 
    params, 
}: {
    params: Params;
}) {

    const { node } = await params;
    return (
        <MantineProvider>
            <Header />
            <Case1 node={node}/>
        </MantineProvider>
     );
}