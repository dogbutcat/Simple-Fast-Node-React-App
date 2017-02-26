import { BaseBusiness } from './BaseBusiness';
import { StatusDoc } from '../modules/db/StatusDoc';
import { StatusDal } from '../dal/StatusDal';
import { StatusRepo } from '../repository/StatusRepo';
import { PublicTimeline } from '../modules/Status';
import { Tweet } from '../modules/local/Tweet';
import { config } from '../resources/config';
import { ExchangeGeo } from '../utils/ExchangeGeo';
export class StatuseBusiness implements BaseBusiness<StatusDoc>, StatusDal {
    private _status: StatusRepo;
    constructor() {
        this._status = new StatusRepo();
    }
    async create(item) {
        let changed = [];
        if (Array.isArray(item))
            item.forEach((val) => {
                let temp = val;
                if (val.geo)
                    temp.geo = ExchangeGeo(val.geo);
                changed.push(temp);
            });
        else {
            let temp = item;
            temp.geo = ExchangeGeo(temp.geo);
            changed.push(temp);
        }
        let result = await this._status.create(changed);
        return result;
    }
    async update(id, item) {
        let result = await this._status.update(id, item);
        return result;
    }
    async delete(id: string) {
        let result = await this._status.delete(id);
        return result;
    }
    async retrieve() {
        let result = await this._status.retrieve();
        return result;
    }
    async findById(id) {
        let result = await this._status.findById(id);
        return result;
    }
    async getStatuses(id?: string, pageNum?: number) {
        let _id = id ? id : undefined;
        let _pageNum = pageNum ? pageNum : 1;
        let _numPerPage = config.Db.NumPerPage;
        let pagedStatuses = await this._status.getPaging(_id, _pageNum, _numPerPage);
        let totalPage = Math.ceil((await this._status.getTotalCount()) / config.Db.NumPerPage);
        let result: Tweet = {
            statuses: pagedStatuses,
            first_cursor: _id ? _id : pagedStatuses[0]._id,
            current_page: _pageNum,
            total_page: totalPage
        };
        return _pageNum > totalPage ? { error: 'out range' } : result;
    }
}