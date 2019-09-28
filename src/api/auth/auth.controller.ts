import { Controller, Post, Body, Response, Request, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUseTags,
} from '@nestjs/swagger';
import { isEmpty, isString } from 'lodash';

import { AuthService } from './auth.service';
import { CredentialsDTO, LoginOkResponse } from './dtos';

@Controller()
@ApiUseTags('Auth v1.0')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiForbiddenResponse({ description: 'Invalid API key' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ type: LoginOkResponse })
    @ApiOperation({
        title: 'AuthController.login',
        description: 'Login the user and returns a token',
    })
    public async login(@Body(new ValidationPipe()) credentialsDTO: CredentialsDTO) {
        return await this.authService.sign(credentialsDTO);
    }

    @Post('logout')
    @ApiOkResponse({ type: null })
    @ApiOperation({
        title: 'AuthController.logout',
        description: 'Logouts the user and invalidate the token',
    })
    public async logout(@Request() req) {
        if (!(!isEmpty(req.user) && isString(req.user.username))) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `User is not logged in`,
            }, HttpStatus.FORBIDDEN);
        }
        return await this.authService.logout(req.user._id);
    }
}
