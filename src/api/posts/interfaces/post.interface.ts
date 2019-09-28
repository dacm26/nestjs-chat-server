
import { Document, Types } from 'mongoose';

import { IUser, IRoom } from '../../';

export interface IPost extends Document {
    _id: Types.ObjectId;
    content: string;
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    user?: IUser;
    room?: IRoom;
    isDeleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}
