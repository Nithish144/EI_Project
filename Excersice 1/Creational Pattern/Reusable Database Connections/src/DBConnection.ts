export class DBConnection {
    private static counter = 0;
    public id: number;
    constructor() {
        DBConnection.counter += 1;
        this.id = DBConnection.counter;
    }
    query(sql: string): void {
        console.log(`Executing query on connection ${this.id}: ${sql}`);
    }
}
