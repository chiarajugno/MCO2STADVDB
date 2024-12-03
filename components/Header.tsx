import React from 'react';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">STADVDB MCO2</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Node 1
                            </a>
                        </li>
                        <li>
                            <a href="/node2" className="hover:text-gray-300">
                                Node 2
                            </a>
                        </li>
                        <li>
                            <a href="/node3" className="hover:text-gray-300">
                                Node 3
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Case 1
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Case 2
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Case 3
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

