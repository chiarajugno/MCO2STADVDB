import mysql from 'mysql2/promise';

export const createConnection3 = async () => {
    const connection = await mysql.createConnection({
        host: "database-3.chyki6ikuodh.ap-southeast-2.rds.amazonaws.com",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: "node3",
    });
    return connection;
};
