import { Roboto } from 'next/font/google';
import { MantineProvider, Affix } from '@mantine/core';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

type Props = {
  node: string;
}

export default function NodeAffix({ node } : Props) {

  return (
    <MantineProvider>
        <Affix position={{ bottom: 20, right: 20 }}>
            <div className='flex flex-col items-center justify-center bg-black h-30 px-4 py-2 rounded-md'>
              <p className="text-[16px] text-white" style={roboto.style}>
                Connected to Node {node}
              </p>
            </div>
        </Affix>
    </MantineProvider>
    
  );
}
