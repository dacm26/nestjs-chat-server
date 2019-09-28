import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { Body, Inject, Injectable } from '@nestjs/common';
import { isNil, assign, isInteger } from 'lodash';

import { IJwtOptions } from './interfaces';
import { CredentialsDTO } from './dtos';
import { EnvironmentConfigUtils as env } from '../../shared';

@Injectable()
export class AuthService {
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: env.string('JWT_ID', 'jsonwebtoken'),
    };

    constructor(
    ) { }

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign(@Body() credentialsDTO: CredentialsDTO): Promise<string> {
        return null;
    }

    public async logout(accountId: number): Promise<string> {
        return null;
    }
}
