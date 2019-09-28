import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CredentialsDTO {
  @IsOptional()
  @IsString()
  @ApiModelProperty({ example: 'test@gmail.com' })
  public readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'test123.' })
  public readonly password: string;
}
