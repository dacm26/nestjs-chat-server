
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    age: number;
    username: string;
    password: string;
    isLoggedIn: boolean;
    isDeleted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}
