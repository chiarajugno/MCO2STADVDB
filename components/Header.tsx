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
                            <a href="/node/1" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Node 1
                            </a>
                        </li>
                        <li>
                            <a href="/node/2" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Node 2
                            </a>
                        </li>
                        <li>
                            <a href="/node/3" className="font-semibold hover:text-gray-300" style={roboto.style}>
                                Node 3
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
