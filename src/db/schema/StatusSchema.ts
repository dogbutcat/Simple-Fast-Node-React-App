import { DataAccess } from '../DataAccess';
import { StatusDoc } from '../../modules/db/StatusDoc';
// import { Point } from '../../utils/GeoSchema';
import { Schema, Types } from 'mongoose';


let mongooseInstance = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class StatusSchema {
    get schema() {
        let schema = new mongooseInstance.Schema({
            created_at: Date,
            id: Number,
            mid: Number,
            idstr: String,
            text: String,
            source: String,
            favorited: Boolean,
            truncated: Boolean,
            in_reply_to_status_id: String,
            in_reply_to_user_id: String,
            in_reply_to_screen_name: String,
            thumbnail_pic: String,
            bmiddle_pic: String,
            original_pic: String,
            geo: Schema.Types.Mixed,
            user: {
                id: Number,
                idstr: String,
                class: Number,
                screen_name: String, // user name
                name: String, // friendly name
                province: Number,
                city: Number,
                location: String,
                description: String,
                url: String,
                profile_image_url: String,
                cover_image: String,
                cover_image_phone: String,
                profile_url: String,
                domain: String,
                weihao: String,
                gender: String,
                followers_count: Number,
                friends_count: Number,
                pagefriends_count: Number,
                statuses_count: Number,
                favourites_count: Number,
                created_at: Date,
                following: Boolean,
                geo_enabled: Boolean,
                verified: Boolean,
                verified_type: Number, // unsupported
                remark: String,
                ptype: Number,
                allow_all_comment: Boolean,
                avatar_large: String, // big avatar in 180*180
                avatar_hd: String,
                follow_me: Boolean,
                online_status: Boolean,
                bi_followers_count: Number,
                lang: String,
                urank: Number
            },
            reposts_count: Number,
            comments_count: Number,
            attitudes_count: Number,
            mlevel: Number, // not supported
            visible: Schema.Types.Mixed,
            pic_urls: [{
                thumbnail_pic: String
            }],
        }, {
                versionKey: false
            });
        // schema.add({ geo: { type: String, coordinates: [Number] } });
        return schema;
    }
}

export const StatusModel = mongooseInstance.model<StatusDoc>('status', new StatusSchema().schema, 'statuses');