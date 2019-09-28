
import { Document, Types } from 'mongoose';

export interface IRoom extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}
