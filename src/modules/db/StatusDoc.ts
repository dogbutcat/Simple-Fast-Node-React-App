import { Document, Types } from 'mongoose';

export type StatusDoc = {
    created_at: string,
    id: number,
    mid: number,
    idstr: string,
    text: string,
    source: string,
    favorited: boolean,
    truncated: boolean,
    in_reply_to_status_id: string,
    in_reply_to_user_id: string,
    in_reply_to_screen_name: string,
    thumbnail_pic: string,
    bmiddle_pic: string,
    original_pic: string,
    geo: GeoInfo,
    user: UserInfo
    reposts_count: number,
    comments_count: number,
    attitudes_count: number,
    mlevel: number, // not supported
    visible: VisibleType,
    pic_urls: Thumbnails[],
} & Document;

interface UserInfo{
    id: number,
    idstr: string,
    class: number,
    screen_name: string, // user name
    name: string, // friendly name
    province: number,
    city: number,
    location: string,
    description: string,
    url: string,
    profile_image_url: string,
    cover_image: string,
    cover_image_phone: string,
    profile_url: string,
    domain: string,
    weihao: string,
    gender: string,
    followers_count: number,
    friends_count: number,
    pagefriends_count: number,
    statuses_count: number,
    favourites_count: number,
    created_at: string,
    following: boolean,
    geo_enabled: boolean,
    verified: boolean,
    verified_type: number, // unsupported
    remark: string,
    ptype: number,
    allow_all_comment: boolean,
    avatar_large: string, // big avatar in 180*180
    avatar_hd: string,
    follow_me: boolean,
    online_status: boolean,
    bi_followers_count: number,
    lang: string,
    urank: number
} 

interface GeoInfo {
    type: string,
    coordinates: number[],
}

interface VisibleType {
    type: number,
    list_id: number,
}

interface Thumbnails {
    thumbnail_pic: string,
}