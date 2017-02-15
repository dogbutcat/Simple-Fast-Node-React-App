import { TokenDoc } from '../modules/db/TokenDoc';

export interface TokenDal {
    getClientId: () => Promise<TokenDoc>;
    getToken: () => Promise<TokenDoc>;
}