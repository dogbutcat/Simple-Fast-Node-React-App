import { TokenController } from '../controller/TokenController';
import * as express from 'express';
import { BaseRoute } from './BaseRoute';

export class TokenRoute extends BaseRoute<TokenController>{
    constructor() {
        super(new TokenController());
    }
    get route() {
        let route = express.Router();
        let controller = this._controller;
        route.post('/callback', controller.create);
        route.get('/tokeninfo', controller.getToken);
        return route;
    }
}