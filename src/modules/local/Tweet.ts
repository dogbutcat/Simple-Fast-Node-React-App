import { StatusDoc } from '../db/StatusDoc';
export type Tweet = {
    statuses: StatusDoc[],
    first_cursor: any,
    total_page: number,
    current_page: number
}