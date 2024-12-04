import mysql from 'mysql2/promise';

export const createConnectionCentral = async (
    timeoutMs: number = 5000
): Promise<mysql.Connection | null> => {
    const timeoutPromise: Promise<never> = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timed out")), timeoutMs)
    );

    try {
        const connectionPromise: Promise<mysql.Connection> = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        const connection = await Promise.race([connectionPromise, timeoutPromise]);
        return connection as mysql.Connection;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
};

export const createConnection2 = async (
    timeoutMs: number = 5000
): Promise<mysql.Connection | null> => {
    const timeoutPromise: Promise<never> = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timed out")), timeoutMs)
    );

    try {
        const connectionPromise: Promise<mysql.Connection> = mysql.createConnection({
            host: "database-2.chyki6ikuodh.ap-southeast-2.rds.amazonaws.com",
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        const connection = await Promise.race([connectionPromise, timeoutPromise]);
        return connection as mysql.Connection;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
};


export const createConnection3 = async (
    timeoutMs: number = 5000
): Promise<mysql.Connection | null> => {
    const timeoutPromise: Promise<never> = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timed out")), timeoutMs)
    );

    try {
        const connectionPromise: Promise<mysql.Connection> = mysql.createConnection({
            host: "database-3.chyki6ikuodh.ap-southeast-2.rds.amazonaws.com",
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        const connection = await Promise.race([connectionPromise, timeoutPromise]);
        return connection as mysql.Connection;
    } catch (error) {
        console.error((error as Error).message);
        return null;
    }
};