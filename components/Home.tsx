import { useEffect, useState, useTransition } from 'react';
import { Game } from '@/types/types';
import { MantineProvider, Table, Pagination, Loader, UnstyledButton} from '@mantine/core';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});


export default function Home() {
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [totalGames, setTotalGames] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 20; 

    const fetchGames = async (page: number) => {
        try {
            const data = await fetch(`/api/get_all_games?page=${page}&limit=${limit}`);
            const { games, total } = await data.json();
            console.log(games, total);

            if (games.length !== 0) {
                setAllGames(games);
                setTotalGames(total);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error fetching games: ', error);
        }
    };

    useEffect(() => {
        fetchGames(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalGames / limit);

    return (
        <MantineProvider>
            <div className="w-full flex flex-col items-center justify-center p-12">
                <div className="flex flex-row justify-center space-x-4 w-full">
                    <UnstyledButton component="a" href="/">
                        <div className="flex flex-col items-center justify-center w-[164px] h-[40px] pt-1 mb-10
                                        hover:ease-in hover:duration-200 hover:bg-[#23012C]
                                        bg-[#7851A9] shadow-xl rounded-lg">
                            <p className="text-[16px] text-[#FFFFFF]">
                                Case 1
                            </p>
                        </div>
                    </UnstyledButton>

                    <UnstyledButton component="a" href="/">
                        <div className="flex flex-col items-center justify-center w-[164px] h-[40px] pt-1 mb-10
                                        hover:ease-in hover:duration-200 hover:bg-[#23012C]
                                        bg-[#7851A9] shadow-xl rounded-lg">
                            <p className="text-[16px] text-[#FFFFFF]">
                                Case 2
                            </p>
                        </div>
                    </UnstyledButton>

                    <UnstyledButton component="a" href="/">
                        <div className="flex flex-col items-center justify-center w-[164px] h-[40px] pt-1 mb-10
                                        hover:ease-in hover:duration-200 hover:bg-[#23012C]
                                        bg-[#7851A9] shadow-xl rounded-lg">
                            <p className="text-[16px] text-[#FFFFFF]">
                                Case 3
                            </p>
                        </div>
                    </UnstyledButton>
                </div>

                
                <h1 className="text-[32px] font-semibold mb-4" style={roboto.style}>Central Node - All Games</h1>
                {loading ? (
                    <Loader className="mt-8" color="blue" />
                ) : (
                    <Table className="mb-8" striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th className="text-[18px]" style={roboto.style}>App ID</Table.Th>
                                <Table.Th className="text-[18px]" style={roboto.style}>Name</Table.Th>
                                <Table.Th className="text-[18px]" style={roboto.style}>Release Date</Table.Th>
                                <Table.Th className="text-[18px]" style={roboto.style}>Price</Table.Th>
                                <Table.Th className="text-[18px]" style={roboto.style}>Positive Ratings</Table.Th>
                                <Table.Th className="text-[18px]" style={roboto.style}>Negative Ratings</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {allGames.length > 0 &&
                                allGames.map((game, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{game.app_id}</Table.Td>
                                        <Table.Td>{game.name}</Table.Td>
                                        <Table.Td>{game.release_date}</Table.Td>
                                        <Table.Td>{game.price.toFixed(2)}</Table.Td>
                                        <Table.Td>{game.positive_ratings}</Table.Td>
                                        <Table.Td>{game.negative_ratings}</Table.Td>
                                    </Table.Tr>
                                ))}
                        </Table.Tbody>
                    </Table>
                )}
                
                <div className="flex flex-col justify-center items-center">
                    <Pagination
                        value={currentPage}
                        onChange={setCurrentPage}
                        total={totalPages}
                    />
                </div>

            </div>
        </MantineProvider>
    );
}
