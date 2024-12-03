import React from 'react';
import { Divider } from '@mantine/core';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

export default function Header() {
    return (
        <header className="bg-[#23012C] text-white shadow-md">
            <div className="container mx-auto px-4 py-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold" style={roboto.style}>STADVDB MCO2</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Node 1
                            </a>
                        </li>
                        <li>
                            <a href="/node2" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Node 2
                            </a>
                        </li>
                        <li>
                            <a href="/node3" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Node 3
                            </a>
                        </li>
                        <Divider orientation="vertical" />
                        <li>
                            <a href="/case1" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Case 1
                            </a>
                        </li>
                        <li>
                            <a href="/case2" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Case 2
                            </a>
                        </li>
                        <li>
                            <a href="/case3" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Case 3
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

