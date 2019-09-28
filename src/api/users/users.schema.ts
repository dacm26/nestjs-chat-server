import { ApiModelProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

import { IUser } from './interfaces';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, collection: 'users', toJSON: { virtuals: true } });

export const User = UserSchema;

export class UserData {
    @ApiModelProperty({ type: User })
    public data: IUser;
}
