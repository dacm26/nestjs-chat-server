import { ApiModelProperty } from '@nestjs/swagger';

import { IToken } from '../interfaces';

export class LoginOkResponse {
    @ApiModelProperty({
        example: {
            token: 'Bearer test',
        },
    })
    public data: IToken;
}
