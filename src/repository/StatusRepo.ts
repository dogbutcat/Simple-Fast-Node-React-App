import { BaseRepo } from './BaseRepo';
import { StatusDoc } from '../modules/db/StatusDoc';
import { StatusDal } from '../dal/StatusDal';
import { StatusModel } from '../db/schema/StatusSchema';

@Object.seal
export class StatusRepo extends BaseRepo<StatusDoc> implements StatusDal {
    constructor() {
        super(StatusModel)
    }
    getPaging(id?: string, pageNumber: number = 1, numPerPage: number = 10) {
        let query = id ? this._model.find({ _id: { $lte: this.toObjectId(id) } }) : this._model.find({});
        return query.select(projection).sort({ _id: -1 }).skip((pageNumber - 1) * numPerPage).limit(numPerPage).exec() as Promise<StatusDoc[]>;
    }
    getTotalCount() {
        let query = this._model.find({}, { _id: 1 }).count();
        return query.exec();
    }
}

var projection = {
    created_at: 1,
    text: 1,
    'user.name': 1,
    'user.screen_name': 1,
    'user.avatar_large': 1
}