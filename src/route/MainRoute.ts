import * as express from 'express';
import { TokenRoute } from './TokenRoute';
import { IndexRoute } from './IndexRoute';

export class MainRoute{
    get route() {
        var app = express();
        // TODO: different route use here
        app.use('/OAuth2', new TokenRoute().route);
        app.use('/', new IndexRoute().route);
        return app;
    }
}