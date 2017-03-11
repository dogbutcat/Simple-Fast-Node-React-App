import { BaseBusiness } from './BaseBusiness';
import { TokenDoc } from '../modules/db/TokenDoc';
import { TokenRepo } from '../repository/TokenRepo';
import { TokenDal } from '../dal/TokenDal';

/**
 * Do with Data
 */
export class TokenBusiness implements BaseBusiness<TokenDoc>, TokenDal {
    private _token: TokenRepo;
    constructor() {
        this._token = new TokenRepo();
    }
    async create(item: TokenDoc) {
        let result = await this._token.create(item)
        return result;
    }
    async update(client_id: string, item: TokenDoc) {
        let result = await this._token.update(client_id, item);
        return result;
    }
    async delete(client_id: string) {
        let result = await this._token.delete(client_id);
        return result;
    }
    async retrieve() {
        let result = await this._token.retrieve();
        return result;
    }
    async findById(_id: string) {
        let result = await this._token.findById(_id);
        return result;
    }
    async getClientId() {
        let result = await this._token.getClientId();
        return result;
    }
    async getToken() {
        let result = await this._token.getToken();
        return result.access_token;
    }
    async restore(client_id:string) {
        let result = await this._token.restore(client_id);
        return result;
    }
}