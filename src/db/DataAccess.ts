import { Connection, MongooseThenable, connection, connect } from 'mongoose';
import { config } from '../resources/config';

let TEST = process.env.ENV || "MAIN";

export class DataAccess{
    static mongooseInstance: MongooseThenable;
    static mongooseConnection: Connection;

    static Connect() {
        if (this.mongooseInstance) return this.mongooseInstance;
        this.mongooseConnection = connection;
        this.mongooseConnection.once('open', () => {
            console.log('Successful Connect to Mongodb!');
        })
        this.mongooseConnection.on('error', () => {
            console.error;
        })
        this.mongooseInstance = connect(TEST == "MAIN" ? config.Db.DbConnection : config.Db.TestDb);
        this.mongooseInstance.Promise = global.Promise; // Mongoose Promise is Deprecated
        return this.mongooseInstance;
    }
}

DataAccess.Connect();
