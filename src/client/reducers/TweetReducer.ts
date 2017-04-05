import { combineReducers } from "redux";
import { BaseAction } from '../actions/BaseActions';
import { RECEIVE_TWEET, RECEIVE_PAGE, HANDLE_SCROLL, RECEIVE_NOTIFICATION, NOTIFICATION_COUNTER } from '../actions/TweetAction';
import { MainState } from '../constants/Tweet';
function MainPosts(state = {
    Posts: [],
    count: 0,
    isActiveBackTop: false,
    isComplete: false,
    isLoaded: false,
}, action: BaseAction<RECEIVE_TWEET & RECEIVE_PAGE &
    HANDLE_SCROLL & RECEIVE_NOTIFICATION & NOTIFICATION_COUNTER>) {
    switch (action.type) {
        case RECEIVE_TWEET:
        case RECEIVE_PAGE:
        case RECEIVE_NOTIFICATION:
            return Posts(state, action);
        case NOTIFICATION_COUNTER:
            return {
                ...state,
                count: action.payload.CountNum ? (state.count + action.payload.CountNum) : 0
            }    
        case HANDLE_SCROLL:
            return {
                ...state,
                isActiveBackTop: action.payload.isActiveBackTop
            }
        default:
            return state;
    }
}

function Posts(state, action: BaseAction<RECEIVE_TWEET & RECEIVE_PAGE & RECEIVE_NOTIFICATION>) {
    switch (action.type) {
        case RECEIVE_TWEET:
            return {
                ...state,
                Posts: action.payload.Posts,
                objectId: action.payload.objectId,
                pageNum: action.payload.pageNum,
                isComplete: true,
                isLoaded: true
            }
        case RECEIVE_PAGE:
            return {
                ...state,
                Posts: state.Posts.concat(action.payload.Posts),
                pageNum: action.payload.pageNum
            }
        case RECEIVE_NOTIFICATION:
            return {
                ...state,
                Posts: state.Posts.concat(action.payload.Posts).slice(0, 20),
                objectId: action.payload.objectId,
                pageNum: 2
            }
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    [MainState.TweetShower]: MainPosts
})