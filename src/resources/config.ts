export const config = {
    OAuth2: {
        authorize: "oauth2/authorize",
        accessToken: "oauth2/access_token",
        getTokenInfo: "oauth2/get_token_info"
    },
    Users: {
        show_rank: 'users/show_rank.json'
    },
    Statuses: {
        publicTimeline: 'statuses/public_timeline.json'
    },
    Addresses: {
        OAuth2Addr: "https://api.weibo.com/",
        commonAddr: "https://api.weibo.com/2/",
        weiboMain: "http://weibo.com",
        redirectUri: "Your callback Uri"
    },
    Db: {
        NumPerPage: 10, // Number of Every Page
        AutoUpdate: true, // Allow update /** support hot reload */
        UpdateInterval: 2700, // Interval of update from API seconds
        LiveUpdateInterval: 20, // seconds
        DbConnection: "Your Production MongoDB Connection, eg. mongodb://user:password@127.0.0.1:27017/database",
        TestDb: "Your Tests MongoDB Connection, eg. mongodb://user:password@127.0.0.1:27017/tests"
    }
}