import { DBConnection } from './DBConnection';
export class ConnectionPool {
    private pool: DBConnection[] = [];
    private maxConnections: number;
    constructor(maxConnections: number) {
        this.maxConnections = maxConnections;
        for (let i = 0; i < maxConnections; i++) {
            this.pool.push(new DBConnection());
        }
    }
    acquire(): DBConnection | null {
        if (this.pool.length > 0) {
            const conn = this.pool.pop()!;
            console.log(`Acquired connection ${conn.id}`);
            return conn;
        } else {
            console.log('No available connections!');
            return null;
        }
    }
    release(conn: DBConnection): void {
        this.pool.push(conn);
        console.log(`Released connection ${conn.id}`);
    }
    available(): void {
        console.log(`Available connections: ${this.pool.length}`);
    }
}
