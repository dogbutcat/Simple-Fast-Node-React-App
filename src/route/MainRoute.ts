import * as express from 'express';
import { TokenRoute } from './TokenRoute';

export class MainRoute{
    get route() {
        var app = express();
        // TODO: different route use here
        app.use('/OAuth2', new TokenRoute().route);
        return app;
    }
}