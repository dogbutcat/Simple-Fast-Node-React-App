import { BaseController } from '../controller/BaseController';
export class BaseRoute<T extends BaseController>{
    protected _controller: T
    constructor(param:T) {
        this._controller = param;
    }
}