import { ApiModelProperty } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';

import { IPost } from './interfaces';

const PostSchema = new Schema({
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
    roomId: { type: Schema.Types.ObjectId, required: true, ref: 'Room', index: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, collection: 'posts', toJSON: { virtuals: true } });

PostSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.virtual('room', {
    ref: 'Room',
    localField: 'roomId',
    foreignField: '_id',
    justOne: true,
});

export const Post = PostSchema;

export class PostData {
    @ApiModelProperty({ type: Post })
    public data: IPost;
}
