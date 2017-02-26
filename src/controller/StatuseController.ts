import { BaseController } from './BaseController';
import { Request, Response } from 'express';
import { StatuseBusiness } from '../business/StatuseBusiness';
export class StatuseController implements BaseController {
    async create(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }
    async index(req: Request, res: Response) {
        try {
            res.render('home', { markup: 'body' }, (err, html) => {
                res.send(html)
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