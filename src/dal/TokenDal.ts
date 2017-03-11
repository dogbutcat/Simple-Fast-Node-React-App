export interface TokenDal {
    getClientId: () => any;
    getToken: () => any;
    restore: (client_id: string) => any;
}