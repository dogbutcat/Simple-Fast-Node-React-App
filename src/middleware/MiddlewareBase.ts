import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MainRoute } from '../route/MainRoute';

export class MiddlewareBase {
    static get configureation() {
        var app = express();
        app.use(bodyParser.json());
        app.use(new MainRoute().route);
        return app;
    }
}