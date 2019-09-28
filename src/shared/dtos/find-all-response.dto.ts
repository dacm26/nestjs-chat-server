import { ApiModelProperty } from '@nestjs/swagger';

export class FindAllResponseDto {
    @ApiModelProperty({
        example: 1,
    })
    public currentPage: number;

    @ApiModelProperty({
        example: 2,
    })
    public totalPages: number;

    @ApiModelProperty({
        example: 25,
    })
    public pageSize: number;
}
