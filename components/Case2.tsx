import React from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

export default function Case2() {
    return (
      <div className='flex flex-col items-start m-20'>
        <h1 className='text-[24px]' style={roboto.style}>
          <span className='font-semibold'>Case #2: </span> 
          At least one transaction in the three nodes is writing (update / delete) and the other concurrent transactions are reading the same data item.
          </h1>
      </div>
    );
};

