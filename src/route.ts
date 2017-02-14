import { AuthorizeParamObj, AuthorizeToken, TokenInfo, IToken } from './modules/authorize';
import { httpRequest, writeFile, readFile } from './utils/promisified-io';
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
                paras.InterfaceType.redirect_uri = config.Addresses.redirectUri;
                let cb = getAuthorizeAddr('authorize', paras);
                res.redirect(cb);
            } else {
                let paras = new AuthorizeToken(config.WeiboApp.client_id)
                paras.InterfaceType.client_secret = config.WeiboApp.client_secret;
                paras.InterfaceType.grant_type = 'authorization_code';
                paras.InterfaceType.code = req.param('code');
                paras.InterfaceType.redirect_uri = config.Addresses.redirectUri;
                let uri = getAuthorizeAddr('accessToken', paras);
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
            let uri = getAuthorizeAddr('getTokenInfo', paras)
            let cb = await httpRequest(uri, 'POST');
            res.header("Content-Type", "application/json");
            res.send(cb);
        } catch (error) {
            console.error(error);
        }
    }
}