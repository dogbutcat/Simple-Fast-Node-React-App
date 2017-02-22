import { BaseRoute } from './BaseRoute';
import { StatuseController } from '../controller/StatuseController';
import * as express from 'express';
// TODO: Index Route
export class IndexRoute extends BaseRoute<StatuseController>{
    constructor() {
        super(new StatuseController());
    }
    get route() {
        let route = express.Router();
        let controller = this._controller;
        route.get('/', controller.index);
        route.get('/json/:objectId?/:pageNum?', controller.getStatuse);
        return route;
    }
}