import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CredentialsDTO {
  @IsOptional()
  @IsString()
  @ApiModelProperty({ example: 'username' })
  public readonly username: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'test123.', minLength: 6 })
  public readonly password: string;
}
