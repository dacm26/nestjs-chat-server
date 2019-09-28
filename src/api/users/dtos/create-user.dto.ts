import { ApiModelProperty } from '@nestjs/swagger';
import {
    MinLength,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'Daniel' })
    public firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'Coello' })
    public lastName: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty({ example: 'dacm26@gmail.com' })
    public username: string;

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    @ApiModelProperty({ example: 'test', minLength: 6 })
    public password: string;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty({ example: 16, required: false })
    public age: number;
}
