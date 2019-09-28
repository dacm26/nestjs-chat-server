import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class FindAllOptionsDto {
    @IsOptional()
    @IsNumber()
    @ApiModelProperty({ example: 1 })
    public page: number;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty({ example: 10 })
    public pageSize: number;

    @IsOptional()
    @IsArray()
    @ApiModelProperty({ example: ['name', 'description'] })
    public select: Array<string>;

    @IsOptional()
    @IsArray()
    @ApiModelProperty({ example: [['name', 1], ['description', -1]] })
    public sort: Array<[string, number]>;

    @IsOptional()
    @ApiModelProperty({ example: { name: 'Teste', description: 'Use any mongoose find options' } })
    public where: any;
}
