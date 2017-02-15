import { DataAccess } from '../DataAccess';
import { TokenDoc } from '../../modules/db/TokenDoc';

let mongooseInstance = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class TokenSchema {
    static get Schema() {
        var schema = new mongooseInstance.Schema({
            client_id: String,
            client_secret: String,
            access_token: String,
            remind_in: String,
            expires_in: Number,
            uid: String
        }, { versionKey: false });
        // }, { versionKey: '_versionKeyName' });
        // schema.set('collection','token') // set collection name here or set in model creation
        return schema;
    }
}

export const TokenModel = mongooseConnection.model<TokenDoc>('token', TokenSchema.Schema, 'token'); // if not set collection name, this collection would be tokens[False]