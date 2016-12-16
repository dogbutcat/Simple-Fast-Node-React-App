import { AuthorizeParamObj, AuthorizeToken, IAuthorizeBaseParams, TokenInfo, IToken } from './modules/authorize';
import { WeiboApi } from './modules/ApiStructure';
import { httpRequest, writeFile, readFile } from './utils/promisified-io';
import { ParamFormatGeneric } from './utils/paramsformat';
import { StatusesBaseParam } from './modules/Status';
import { getAuthorizeAddr } from './resources/GetAddr';
import { config } from './resources/config';


async function getTokenFromFile(filename: string) {
    let tokenJson = await readFile(filename);
    let token = JSON.parse(tokenJson) as IToken;
    return token.access_token;
}

export default class Route {
    static getToken = async (req, res) => {
        try {
            if (!req.query.code) {
                let paras = new AuthorizeParamObj(config.WeiboApp.client_id);
                paras.params.InterfaceType.redirect_uri = config.Addresses.redirectUri;
                let cb = getAuthorizeAddr('authorize', paras.params);
                res.redirect(cb);
            } else {
                let paras = new AuthorizeToken(config.WeiboApp.client_id)
                paras.params.InterfaceType.client_secret = config.WeiboApp.client_secret;
                paras.params.InterfaceType.grant_type = 'authorization_code';
                paras.params.InterfaceType.code = req.param('code');
                paras.params.InterfaceType.redirect_uri = config.Addresses.redirectUri;
                let uri = getAuthorizeAddr('accessToken', paras.params);
                let cbJSON = await httpRequest(uri, 'POST');
                let cb = writeFile('./token.json', cbJSON);
                res.redirect('/OAuth2/tokeninfo');
            }
        } catch (err) {
            console.error(err);
        }
    }
    static tokenInfo = async (req, res) => {
        try {
            let token = await getTokenFromFile("./token.json"); // Get token json file from 
            let paras = new TokenInfo(token);
            let uri = getAuthorizeAddr('getTokenInfo', paras.params)
            let cb = await httpRequest(uri, 'POST');
            res.header("Content-Type", "application/json");
            res.send(cb);
        } catch (error) {
            console.error(error);
        }
    }
}