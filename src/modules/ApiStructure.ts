export interface WeiboApi {
    OAuth2: OAuth2;
    WeiboApp: WeiboApp,
    Addresses: Addresses,
    Statuses: Statuses
}

interface OAuth2 {
    authorize: string;
    accessToken: string;
    getTokenInfo: string;
}

interface WeiboApp{
    client_id:string,
    client_secret:string
}

interface Addresses{
    OAuth2Addr:string;
    commonAddr:string;
    weiboMain:string;
    redirectUri:string;
}

interface Statuses{
    publicTimeline:string;
}