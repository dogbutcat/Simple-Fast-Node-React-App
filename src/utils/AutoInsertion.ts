import { PubTimelineReq, PublicTimeline } from '../modules/Status';
import { TokenBusiness } from '../business/TokenBusiness';
import { getStatusesAddr } from '../resources/GetAddr';
import { httpRequest } from './promisified-io';
import { StatuseBusiness } from '../business/StatuseBusiness';
import { config } from '../resources/config';

let isComplete = true;
let UpdateCount = 0;
let _interval;

async function getAPIRequest() {
    try {
        let tokenBusiness = new TokenBusiness();
        let token = await tokenBusiness.getToken();
        let params = new PubTimelineReq(token);
        let uri = getStatusesAddr('publicTimeline', params);
        let result = await httpRequest(uri);
        let ret = JSON.parse(result) as PublicTimeline;
        return ret;
    } catch (error) {
        console.log(error);
    }
}

export async function Insertion(notifier:string) {
    try {
        if (config.Db.AutoUpdate) {
            isComplete = false;
            let apiResult = await getAPIRequest();
            let statuseBusiness = new StatuseBusiness();
            let result = await statuseBusiness.create(apiResult.statuses);
            return Array.isArray(result) ? result.length : 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log(new Date().toString() + notifier);
        isComplete = true;
    }
}

export function IntervalAct(cb, socketIo: SocketIO.Server, intervalTime: number = config.Db.UpdateInterval) {
    setInterval(async () => {
        isComplete ? (UpdateCount = await cb('From Static Updater')) : void 0;
        UpdateCount > 0 ? socketIo.of('/').emit('newTweet', { count: UpdateCount }) : void 0;
    }, intervalTime * 1000);
}

export function UpdaterAct(cb, IoSocket: SocketIO.Server, intervalTime: number = config.Db.LiveUpdateInterval) {
    IoSocket.of('/').on('connection', async (socket) => {
        _interval = setInterval(async () => {
            isComplete ? (UpdateCount = await cb('From Session Updater')) : void 0;
            UpdateCount > 0 ? IoSocket.of('/').emit('newTweet', { count: UpdateCount }) : void 0;
        }, intervalTime * 1000);
        socket.on('disconnect', () => {
            clearInterval(_interval);
        })
    })
}