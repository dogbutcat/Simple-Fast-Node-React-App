import { Status } from './BasicTypes';
import { ParamFormatGeneric } from '../utils/paramsformat';

// Callback json structure
export interface PublicTimeline{
    statuses:Status[];
    hasvisible:boolean;
    previous_cursor:number;
    next_cursor:number;
    total_number:number;
    interval:number;
}

export interface StatusesBaseParam{
    access_token?:string;
    count?:number; // default 50
    page?:number; // default 0
    base_app?:number; // 0:all, 1:currentApp,
}

export class PubTimelineParams implements StatusesBaseParam{
    access_token:string;
    count:number; // default 50
    page:number; // default 0
    base_app:number; // 0:all, 1:currentApp,
    constructor(access_token){
        this.access_token = access_token;
    }
}

export class PubTimeline{
    public params:ParamFormatGeneric<PubTimelineParams>;
	constructor(accessToken:string) {
        var temp = new PubTimelineParams(accessToken);
        this.params = new ParamFormatGeneric<PubTimelineParams>(temp);
	}
}