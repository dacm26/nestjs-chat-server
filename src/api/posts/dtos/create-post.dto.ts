import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'general' })
    public content: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: '1231231234' })
    public userId: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: '1231231234' })
    public roomId: string;
}
