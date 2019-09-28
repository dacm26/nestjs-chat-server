import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'general' })
    public name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'You can post anything!' })
    public description: string;
}
