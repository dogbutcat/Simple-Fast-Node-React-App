import { Document } from 'mongoose';

export type TokenDoc = {
    client_id: string,
    client_secret: string,
    access_token: string,
    remind_in: string,
    expires_in: number,
    uid: string,
} & Document;
// export interface TokenDoc extends Document {
//     client_id: string,
//     client_secret: string,
//     access_token: string,
//     remind_in: string,
//     expires_in: number,
//     uid: string
// }