import mongodb from 'mongodb';

class Mongo
{
    private client: mongodb.MongoClient;
    private db: mongodb.Db;

    constructor(url: string, database: string)
    {
        this.client = new mongodb.MongoClient(url);
        this.db     = this.client.db(database);
    }
    public getCollection = (name: string): mongodb.Collection => this.db.collection(name);
};
export { Mongo };