export const config = {
    OAuth2: {
        authorize: "oauth2/authorize",
        accessToken: "oauth2/access_token",
        getTokenInfo: "oauth2/get_token_info"
    },
    WeiboApp: {
        client_id: 'APP_KEY',
        client_secret: 'APP_SECRET'
    },
    Users:{
        show_rank:'users/show_rank.json'
    },
    Statuses:{
        publicTimeline:'statuses/public_timeline.json'
    },
    Addresses: {
        OAuth2Addr: "https://api.weibo.com/",
        commonAddr: "https://api.weibo.com/2/",
        weiboMain: "http://weibo.com",
        redirectUri: "http://www.raiyku.com/OAuth2/callback"
    }
}