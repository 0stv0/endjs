import mysql, { RowDataPacket } from 'mysql2/promise';

class MySQL
{
    private pool: mysql.Pool;

    constructor(host: string, port: number, data: string, user: string, pass: string)
    {
        this.pool = mysql.createPool({
            host: host,
            port: port,
            user: user,
            database: data,
            password: pass,
            enableKeepAlive: true
        });
    };
    public query = async(sql: string, keys: any[]): Promise<RowDataPacket[]> =>
    {
        let [results, fields] = await this.pool.query(sql, keys);
        return results as RowDataPacket[];
    };
};
export { MySQL };