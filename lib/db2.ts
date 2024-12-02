import mysql from 'mysql2/promise';

export const createConnection2 = async () => {
    const connection = await mysql.createConnection({
        host: "database-2.chyki6ikuodh.ap-southeast-2.rds.amazonaws.com",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: "node2",
    });
    return connection;
};
