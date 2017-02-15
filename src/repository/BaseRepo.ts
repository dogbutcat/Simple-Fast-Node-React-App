import { Write, Read } from '../dal/Common';
import { Document, Model } from 'mongoose';
import { RetType } from '../modules/db/UpdateResult';

export abstract class BaseRepo<T extends Document> implements Write<T>, Read<T>{
    protected _model: Model<Document>;
    constructor(param: Model<Document>) {
        this._model = param;
    }
    create(item: T) {
        return this._model.create(item);
    }
    update(id: string, item: T) {
        return new Promise<RetType>((resolve, reject) => {
            this._model.update({ _id: id }, item, (err, result:RetType) => {
                err ? reject(err) : resolve(result);
            });
        })
    }
    delete(_id: string) {
        return new Promise<string>((resolve, reject) => {
            this._model.remove({ _id: _id }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve("success");
                }
            });
        })
    }
    retrieve() {
        return new Promise<Document[]>((resolve, reject) => {
            this._model.find({}, (err, docs) => {
                err ? reject(err) : resolve(docs);
            });
        })
    }
    findById(_id: string) {
        return this._model.findById(_id).exec();
    }
}