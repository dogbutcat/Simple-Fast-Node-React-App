import { StatusDoc } from '../../modules/db/StatusDoc';

export const TweetAction = {
    RECEIVE_PAGE: 'RECEIVE_PAGE',
    RECEIVE_TWEET: 'RECEIVE_TWEET',
    RECEIVE_NOTIFICATION: 'RECEIVE_NOTIFICATION',
    NOTIFICATION_COUNTER:'NOTIFICATION_COUNTER',
    HANDLE_SCROLL: 'HANDLE_SCROLL'
}

export const MainState = {
    TweetShower: 'TweetShower',
}

export type MainState = {
    TweetShower: PostsState
}

export type PostsState = {
    Posts: StatusDoc[],
    isComplete: boolean,
    isLoaded: boolean,
    count: number,
    objectId: string,
    pageNum: number,
    isActiveBackTop: boolean,
}