import { ApiModelProperty } from '@nestjs/swagger';

import { IRoom } from '../interfaces';

export class RoomOkResponse {
    @ApiModelProperty({
        example: {
            _id: '5cc1d53f0cb74d0e6ce61fba',
            name: 'general',
            description: 'test',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        },
    })
    public data: IRoom;
}
