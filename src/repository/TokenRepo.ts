import { BaseRepo } from './BaseRepo';
import { TokenDoc } from '../modules/db/TokenDoc';
import { TokenModel } from '../db/schema/TokenSchema';
import { TokenDal } from '../dal/TokenDal';
import { Document } from 'mongoose';
import { RetType } from '../modules/db/UpdateResult';

@Object.seal
export class TokenRepo extends BaseRepo<TokenDoc> implements TokenDal {
    constructor() {
        super(TokenModel);
    }
    update(id: string, item: TokenDoc) {
        return new Promise<RetType>((resolve, reject) => {
            this._model.update({ client_id: id }, item, (err, result: RetType) => {
                err ? reject(err) : resolve(result);
            });
        })
    }
    delete(_id: string) {
        return new Promise<string>((resolve, reject) => {
            this._model.remove({ client_id: _id }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve("success");
                }
            });
        })
    }
    getClientId() {
        // return new Promise<TokenDoc>((resolve, reject) => {
        //     this._model.findOne({}, (err, result: TokenDoc) => {
        //         err ? reject(err) : resolve(result);
        //     })
        // })
        return <Promise<TokenDoc>>this._model.findOne({}).select({ _id: 0, client_id: 1, client_secret: 1 }).exec();
    }
    getToken() {
        return <Promise<TokenDoc>>this._model.findOne({}).select({ _id: 0, client_id: 0, client_secret: 0 }).exec();
        // return new Promise<Document>((resolve, reject) => {
        //     this._model.findOne({}, (err, result) => {
        //         err ? reject(err) : resolve(result);
        //     })
        // }) // Workable
    }
    restore(client_id: string) {
        return this._model.update({ client_id: client_id }, { $unset: { uid: '', expires_in: '', remind_in: '', access_token: '' } }).exec();
    }
}