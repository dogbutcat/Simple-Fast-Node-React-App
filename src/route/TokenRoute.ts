import { TokenController } from '../controller/TokenController';
import * as express from 'express';

export class TokenRoute{
    private _controller: TokenController;
    constructor() {
        this._controller = new TokenController();
    }
    get route() {
        let route = express.Router();
        let controller = this._controller;
        route.post('/callback', controller.create);
        route.get('/tokeninfo', controller.getToken);
        return route;
    }
}