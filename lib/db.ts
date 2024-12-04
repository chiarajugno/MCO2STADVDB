import mysql from 'mysql2/promise';

// export const createConnectionCentral = async (
//     timeoutMs: number = 5000
// ): Promise<mysql.Connection | null> => {
//     const timeoutPromise: Promise<never> = new Promise((_, reject) =>
//         setTimeout(() => reject(new Error("Connection timed out")), timeoutMs)
//     );

//     try {
//         const connectionPromise: Promise<mysql.Connection> = mysql.createConnection({
//             host: process.env.DATABASE_HOST,
//             user: process.env.DATABASE_USER || "",
//             password: process.env.DATABASE_PASSWORD || "",
//             database: process.env.DATABASE_NAME || "",
//         });

//         // Race the timeout against the connection attempt
//         const connection = await Promise.race([connectionPromise, timeoutPromise]);
//         return connection as mysql.Connection;
//     } catch (error) {
//         console.error((error as Error).message); // Log the error for debugging
//         return null; // Return null if the connection fails or times out
//     }
// };

export const createConnectionCentral = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });
    return connection;
};


export const createConnection2 = async () => {
    const connection = await mysql.createConnection({
        host: "database-2.chyki6ikuodh.ap-southeast-2.rds.amazonaws.com",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });
    return connection;
};


export const createConnection3 = async () => {
    const connection = await mysql.createConnection({
        host: "database-3.chyki6ikuodh.ap-southeast-2.rds.amazonaws.com",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });
    return connection;
};
