import { ApiModelProperty } from '@nestjs/swagger';

import { IUser } from '../interfaces';

export class UserOkResponse {
    @ApiModelProperty({
        example: {
            _id: '5cc1d53f0cb74d0e6ce61fba',
            firstName: 'Daniel',
            lastName: 'Coello',
            age: 19,
            username: 'dacm26@gmail.com',
            password: 'test',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        },
    })
    public data: IUser;
}
