import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Body, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { isNil, assign, isInteger } from 'lodash';

import { IUser } from '../';

import { IJwtOptions } from './interfaces';
import { CredentialsDTO } from './dtos';

@Injectable()
export class AuthService {
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '1 day',
        jwtid: this.utilService.environmentConfigUtils.string('JWT_ID', ''),
    };

    constructor(
        @Inject('UtilService') private readonly utilService,
        @Inject('UserService') private readonly userService,
    ) { }

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async getUserService() {
        return this.userService;
    }

    public async sign(@Body() credentialsDTO: CredentialsDTO): Promise<string> {
        let user: IUser = await this.userService.findUser(credentialsDTO.username, this.utilService.hashPassword(credentialsDTO.password));
        if (isNil(user)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Wrong password or username`,
            }, HttpStatus.BAD_REQUEST);
        }
        if (user.isLoggedIn) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: `User already logged in`,
            }, HttpStatus.CONFLICT);
        }
        user = await this.userService.updateLoggedInStatus(user._id, true);
        const payload = {
            ...user,
        };
        delete payload.isLoggedIn;
        const token = await jwt.sign(payload, this.utilService.environmentConfigUtils.string('JWT_KEY', ''), this._options);
        return 'Bearer ' + token;
    }

    public async logout(id: string): Promise<string> {
        let user: IUser = await this.userService.findById(id);
        if (!user.isLoggedIn) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: `User is not logged in`,
            }, HttpStatus.CONFLICT);
        }
        user = await this.userService.updateLoggedInStatus(user._id, false);
        return null;
    }
}
