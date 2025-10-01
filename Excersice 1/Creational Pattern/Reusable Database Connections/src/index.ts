import * as readlineSync from 'readline-sync';
import { ConnectionPool } from './ConnectionPool';
const poolSize = parseInt(readlineSync.question('Enter max DB connections for pool: '), 10);
const pool = new ConnectionPool(poolSize);
const queryCount = parseInt(readlineSync.question('How many queries to run? '), 10);
const activeConnections: any[] = [];
for (let i = 0; i < queryCount; i++) {
    const sql = readlineSync.question(`Enter SQL query ${i + 1}: `);
    const conn = pool.acquire();
    if (conn) {
        conn.query(sql);
        activeConnections.push(conn);
    }
}
activeConnections.forEach(conn => pool.release(conn));
pool.available();
