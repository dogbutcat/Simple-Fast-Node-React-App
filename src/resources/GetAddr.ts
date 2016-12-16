import { WeiboApi } from '../modules/ApiStructure';
import { ParamFormatGeneric } from '../utils/paramsformat';
import { StatusesBaseParam } from '../modules/Status';
import { IAuthorizeBaseParams } from '../modules/authorize';
import { config } from './config';

export function getAuthorizeAddr(apiString: string, params: ParamFormatGeneric<IAuthorizeBaseParams>) {
    return config.Addresses.OAuth2Addr + config.OAuth2[apiString] + params.toString();
}

export function getStatusesAddr(apiString: string, params: ParamFormatGeneric<StatusesBaseParam>) {
    return config.Addresses.commonAddr + config.Statuses[apiString] + params.toString();
}