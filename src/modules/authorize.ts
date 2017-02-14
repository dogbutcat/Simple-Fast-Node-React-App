import { ParamFormatGeneric } from '../utils/paramsformat';

export interface IAuthorizeBaseParams {
    client_id?: string;
    redirect_uri?: string;
    scope?: string;
    state?: string;
    display?: AuthorizeDisplay;
    forcelogin?: boolean;
    language?: string;

    client_secret?: string;
    grant_type?: string;
    code?: string;

    access_token?:string;

    getLength?: () => number;
    toString?: () => string;
}

/**
 * Callback Json Format
 */
export interface IToken {
    access_token: string;
    expires_in: number;
    remind_in: string;
    create_at:string;
    uid: string;
    appkey:string;
    scope:string;
}

export class AuthorizeBaseParams implements IAuthorizeBaseParams {
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
    display: AuthorizeDisplay;
    forcelogin: boolean;
    language: string;
}

export class AuthorizeBaseTokenParams implements IAuthorizeBaseParams {
    client_id: string;
    client_secret: string;
    grant_type: string;
    code: string;
    redirect_uri: string;
}

export class Token implements IAuthorizeBaseParams{
    access_token:string;
}

export enum AuthorizeDisplay {
    default, mobile, wap, client, apponweibo
}

/**
 * AuthorizeParamObj
 */
export class AuthorizeParamObj extends ParamFormatGeneric<AuthorizeBaseParams>{
    constructor(appid) {
        super(new AuthorizeBaseParams().client_id = appid);
    }
}
// Refined
// export class AuthorizeParamObj{
//     public params:ParamFormatGeneric<AuthorizeBaseParams>;
//     constructor(appid) {
//         var temp = new AuthorizeBaseParams();
//         temp.client_id=appid;
//         this.params = new ParamFormatGeneric<AuthorizeBaseParams>(temp);
//     }
// }

/**
 * AuthorizeToken
 */
export class AuthorizeToken extends ParamFormatGeneric<AuthorizeBaseTokenParams>{
    constructor(appid) {
        super(new AuthorizeBaseTokenParams().client_id = appid);
    }
}
// export class AuthorizeToken{
//     public params: ParamFormatGeneric<AuthorizeBaseTokenParams>;
//     constructor(appid) {
//         var temp = new AuthorizeBaseTokenParams();
//         temp.client_id = appid;
//         this.params = new ParamFormatGeneric<AuthorizeBaseTokenParams>(temp);
//     }
// }

export class TokenInfo extends ParamFormatGeneric<Token>{
    constructor(accessToken) {
        super(new Token().access_token = accessToken);
    }
}

// export class TokenInfo{
//     public params:ParamFormatGeneric<Token>;
// 	constructor(accessToken:string) {
//         let token = new Token();
//         token.access_token = accessToken;
//         this.params = new ParamFormatGeneric<Token>(token);
// 	}
// }