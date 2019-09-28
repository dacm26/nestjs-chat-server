import { ApiModelProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

import { IRoom } from './interfaces';

const RoomSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, collection: 'rooms', toJSON: { virtuals: true } });

export const Room = RoomSchema;

export class RoomData {
    @ApiModelProperty({ type: Room })
    public data: IRoom;
}
