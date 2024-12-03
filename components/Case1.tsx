import React, { useState } from 'react';
import { Roboto } from 'next/font/google';
import { Button } from '@mantine/core';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

type Props = {
  node: string;
}

export default function Case1({ node } : Props) {
  const [results, setResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async () => {
    setIsRunning(true);
    setResults([]);

    try {
      let route = "";

      if(node == "1") {
        route = "case1Node1"
      }

      const response = await fetch(`/api/tests/${route}`); 
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value);
            setResults((prev) => [...prev, chunk]);
          }
        }
      }
    } catch (error) {
      setResults((prev) => [...prev, `Error: ${error}`]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-start mx-12 my-20'>
      <div className='flex flex-col mb-8'>
        <h1 className='text-[24px]' style={roboto.style}>
          <span className='font-semibold'>Case #1: </span> 
          Concurrent transactions in two or more nodes are reading the same data item.
        </h1>
      </div>
      <div className='flex flex-row w-full justify-center mb-8'>
        <div className='flex flex-col w-[80%] p-4 items-start justify-start border-2 border-black rounded-md'>
          <p className="text-[20px] font-semibold" style={roboto.style}>Node 1</p>
          <p className="text-[18px] text-[#4682B4]" style={roboto.style}>
            SELECT * FROM all_games WHERE app_id = 1;
          </p>
        </div>
      </div>
      <Button variant="filled" onClick={runTest} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Run Test'}
      </Button>
      <div className="mt-8 w-full">
        <h2 className="text-[20px] font-semibold" style={roboto.style}>
          Action Output:
        </h2>
        <div className="mt-4 p-4 border-2 border-gray-300 rounded-md h-[300px] overflow-y-auto">
          {results.map((result, index) => (
            <>
            <p key={index} className={`text-[16px]`}>
              {result}
            </p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
