import { ApiModelProperty } from '@nestjs/swagger';

import { FindAllResponseDto } from '../../../shared';

import { IRoom } from '../interfaces';

export class FindAllRoomsDto extends FindAllResponseDto {
    @ApiModelProperty({
        example: [{
            _id: '5cc1d53f0cb74d0e6ce61fba',
            name: 'general',
            description: 'test',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        }],
    })
    public data: Array<IRoom>;
}

export class FindAllRoomsOkResponseDto {
    @ApiModelProperty({
        example: {
            data: [],
            currentPage: 1,
            totalPages: 1,
            pageSize: 1,
        },
    })
    public data: FindAllRoomsDto;
}
