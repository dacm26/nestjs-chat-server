import { ApiModelProperty } from '@nestjs/swagger';

import { IPost } from '../interfaces';

export class PostOkResponse {
    @ApiModelProperty({
        example: {
            _id: '5cc1d53f0cb74d0e6ce61fba',
            content: 'testing 1234',
            userId: '123123123',
            roomId: '123123123',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        },
    })
    public data: IPost;
}
