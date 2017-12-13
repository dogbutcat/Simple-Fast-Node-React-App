import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { StatuseBusiness } from '../business/StatuseBusiness';

// server side rendering
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from 'react-redux'
// import { Root } from "../client/containers/Root";
import App from '../client/containers/app';
import { requestInitData } from "../client/actions/TweetAction";
import { configureStore } from '../client/store/configureStore';

export class StatuseController implements BaseController {
    async create(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }
    async index(req: Request, res: Response) {
        try {
            let targetUrl = req.protocol + "://" + req.headers['host'];
            requestInitData(targetUrl).then(tweets => {
                let store = configureStore({
                    TweetShower: {
                    Posts: tweets.statuses,
                    objectId: tweets.first_cursor,
                    pageNum: tweets.current_page, isComplete: true, isLoaded: true
                }});
                let body = renderToString(<Provider store={store}>
                    <App></App>
                </Provider>);
                res.render('home', {
                    markup: body, data: encodeURIComponent(JSON.stringify({
                        TweetShower: {
                            Posts: tweets.statuses,
                            objectId: tweets.first_cursor,
                            pageNum: tweets.current_page, isComplete: true, isLoaded: true
                        }
                    }))
                }, (err, html) => {
                    res.send(html)
                });
            })
        } catch (error) {
            res.send(error);
        }
    }
    async getStatuse(req: Request, res: Response) {
        try {
            let statuseBusiness = new StatuseBusiness();
            let result = await statuseBusiness.getStatuses(req.params.objectId, req.params.pageNum);
            // res.setHeader('Content-Type', 'application/json');
            res.type('json');
            res.send(JSON.stringify(result));
        } catch (error) {
            res.send(error);
        }
    }
}