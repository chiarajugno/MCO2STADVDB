import React, { useEffect, useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { UnstyledButton } from '@mantine/core';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

export default function Header() {
    const [selectedNode, setSelectedNode] = useState<string>("1");

    const handleNodeChange = (node: string) => {
        setSelectedNode(node);
    };

    useEffect(() => {
    }, [selectedNode]);

    return (
        <header className="bg-[#23012C] text-white shadow-md">
            <div className="container mx-auto px-4 py-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold" style={roboto.style}>STADVDB MCO2</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/node/1" >
                                <UnstyledButton onClick={() => handleNodeChange("1")} 
                                    className="font-semibold hover:text-gray-300 text-white"
                                    style={roboto.style}>
                                    Node 1
                                </UnstyledButton> 
                            </Link>
                        </li>
                        <li>
                            <Link href="/node/2" >
                                <UnstyledButton onClick={() => handleNodeChange("2")} 
                                    className="font-semibold hover:text-gray-300 text-white"
                                    style={roboto.style}>
                                    Node 2
                                </UnstyledButton> 
                            </Link>
                        </li>
                        <li>
                            <Link href="/node/3" >
                                <UnstyledButton onClick={() => handleNodeChange("3")} 
                                    className="font-semibold hover:text-gray-300 text-white"
                                    style={roboto.style}>
                                    Node 3
                                </UnstyledButton> 
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
