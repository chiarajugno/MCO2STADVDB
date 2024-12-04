import React, { useState } from 'react';
import { Roboto } from 'next/font/google';
import { MantineProvider, Button, Affix } from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

type Props = {
  node: string;
}

export default function Case3({ node } : Props) {
  const [results, setResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const query = 
    node === "1"
      ? "SELECT * FROM all_games WHERE app_id = 1;"
      : node === "2"
      ? "SELECT * FROM before_2020 WHERE app_id = 1;"
      : node === "3"
      ? "SELECT * FROM after_and_2020 WHERE app_id = 1;"
      : "";

  const runTest = async () => {
    setIsRunning(true);
    setResults([]);

    try {
      let route = "";

      if(node == "1") {
        route = "node1"
      }
      else if (node == "2") {
        route = "node2"
      }
      else if (node == "3") {
        route = "node3"
      }

      const response = await fetch(`/api/tests/case3/${route}`); 
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
        notifications.show({
          message: 'Transaction completed!',
          color: 'green',
        })
        
      }
    } catch (error) {
      setResults((prev) => [...prev, `Error: ${error}`]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <MantineProvider>
      <Notifications />
      <div className='flex flex-col items-center justify-start mx-12 my-20'>
        <div className='flex flex-col mb-8'>
          <h1 className='text-[24px]' style={roboto.style}>
            <span className='font-semibold'>Case #3: </span> 
            Concurrent transactions in two or more nodes are writing (update / delete) the same data item.
          </h1>
        </div>
        <div className='flex flex-row w-full justify-center mb-8'>
          <div className='flex flex-col w-[80%] p-4 items-start justify-start border-2 border-black rounded-md'>
            <p className="text-[20px] font-semibold" style={roboto.style}>Node {node}</p>
            <p className="text-[18px] text-[#4682B4]" style={roboto.style}>
              {query}
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
              <p key={index} className={`text-[16px]`} style={roboto.style}>
                {result}
              </p>
              </>
            ))}
          </div>
        </div>
        <Affix position={{ bottom: 20, right: 20 }}>
            <div className='flex flex-col items-center justify-center bg-black h-30 px-4 py-2 rounded-md'>
              <p className="text-[16px] text-white" style={roboto.style}>
                Connected to Node {node}
              </p>
            </div>
        </Affix>
      </div>
    </MantineProvider>
    
  );
}
