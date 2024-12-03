import mysql from 'mysql2/promise';

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
