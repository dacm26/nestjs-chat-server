import { ApiModelProperty } from '@nestjs/swagger';

import { FindAllResponseDto } from '../../../shared';

import { IPost } from '../interfaces';

export class FindAllPostsDto extends FindAllResponseDto {
    @ApiModelProperty({
        example: [{
            _id: '5cc1d53f0cb74d0e6ce61fba',
            content: 'testing 1234',
            userId: '123123123',
            roomId: '123123123',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        }],
    })
    public data: Array<IPost>;
}

export class FindAllPostsOkResponseDto {
    @ApiModelProperty({
        example: {
            data: [],
            currentPage: 1,
            totalPages: 1,
            pageSize: 1,
        },
    })
    public data: FindAllPostsDto;
}
