import { BaseController } from './BaseController';
import { Request,Response } from 'express';
import { TokenDoc } from '../modules/db/TokenDoc';
import { TokenBusiness } from '../business/TokenBusiness';
import { AuthorizeParamObj, AuthorizeToken } from '../modules/authorize';
import { config } from '../resources/config';
import { getAuthorizeAddr } from '../resources/GetAddr';
import { httpRequest, readFile } from '../utils/promisified-io';

export class TokenController implements BaseController{
    async create(req: Request, res: Response) {
        try {
            let _doc = <TokenDoc>req.body;
            let tokenBusiness = new TokenBusiness();
            if (!req.query.code) {
                let params = new AuthorizeParamObj(_doc.client_id);
                params.InterfaceType.redirect_uri = config.Addresses.redirectUri;
                let cb = getAuthorizeAddr('authorize', params);
                let result = await tokenBusiness.create(_doc);
                res.redirect(cb);
            } else {
                let result = await tokenBusiness.getClientId()
                let params = new AuthorizeToken(result.client_id);
                params.InterfaceType.client_secret = result.client_secret;
                params.InterfaceType.grant_type = 'authorization_code';
                params.InterfaceType.code = req.query.code;
                params.InterfaceType.redirect_uri = config.Addresses.redirectUri;
                let uri = getAuthorizeAddr('accessToken', params);
                let cbJSON = await httpRequest(uri, 'POST');
                let cb = JSON.parse(cbJSON) as TokenDoc;
                // let cb = JSON.parse(await readFile('token.json')) as TokenDoc; // Test token request back
                let ret = await tokenBusiness.update(result.client_id, cb);
                // res.send({ "result": "success" });
                res.send(JSON.stringify(ret));
            }
        } catch (e) {
            console.error(e);
            res.send(e);
        }
    }
    async getToken(req: Request, res: Response) {
        try {
            // TODO: retrieve Token info
            let tokenBusiness = new TokenBusiness();
            let result = await tokenBusiness.getClientId();
            res.header("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        } catch (e) {
            console.error(e);
            res.send(e)
        }
    }
}