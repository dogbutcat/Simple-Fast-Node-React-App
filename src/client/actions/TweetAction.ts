import * as fetch from 'isomorphic-fetch';
import { Tweet } from '../../modules/local/Tweet';
import { BaseAction } from './BaseActions';
import { TweetAction } from '../constants/Tweet';
import { StatusDoc } from '../../modules/db/StatusDoc';

export const { RECEIVE_TWEET, RECEIVE_PAGE,
    HANDLE_SCROLL, RECEIVE_NOTIFICATION, NOTIFICATION_COUNTER } = TweetAction;

export type RECEIVE_PAGE = {
    Posts: StatusDoc[],
    pageNum: number
}

export type RECEIVE_TWEET = {
    Posts: StatusDoc[],
    objectId: string,
    pageNum: number
}

export type RECEIVE_NOTIFICATION = {
    Posts: StatusDoc[],
    objectId: string
}

export type NOTIFICATION_COUNTER = {
    CountNum: number
}

export type HANDLE_SCROLL = {
    isActiveBackTop: boolean
}

export function receivePost(tweets: Tweet): BaseAction<RECEIVE_TWEET> {
    return {
        type: RECEIVE_TWEET,
        payload: {
            Posts: tweets.statuses,
            objectId: tweets.first_cursor,
            pageNum: tweets.current_page
        }
    }
}

export function Scrolled(isScroll:boolean):BaseAction<HANDLE_SCROLL> {
    return {
        type: HANDLE_SCROLL,
        payload: {
            isActiveBackTop: isScroll
        }
    }
}

export function receivePage(data): BaseAction<RECEIVE_PAGE> {
    return {
        type: RECEIVE_PAGE,
        payload: {
            Posts: data.statuses,
            pageNum: data.pagenum
        }
    }
}

export function recvNotification(data):BaseAction<RECEIVE_NOTIFICATION> {
    return {
        type: RECEIVE_NOTIFICATION,
        payload: {
            Posts: data.statuses,
            objectId: data.objId
        }
    }
}

export function recvCount(data):BaseAction<NOTIFICATION_COUNTER> {
    return {
        type: NOTIFICATION_COUNTER,
        payload: {
            CountNum: data.count
        }
    }
}

export function fetchPosts() {
    return dispatch => {
        return this.requestInitData()
            .then(json => {
                return dispatch(receivePost(json));
            })
    }
}

export function requestInitData(url?) {
    let addr = url ? url + '/json' : '/json';
    return fetch(addr).then(response => response.json());
}