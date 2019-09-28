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
        // @Inject('SequelizeInstance') private readonly sequelizeInstance,
        // @Inject('AccountRepository') private readonly accountRepository: typeof Account,
    ) { }

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign(@Body() credentialsDTO: CredentialsDTO): Promise<string> {
        // let where: any = {
        //     password: crypto.createHmac('sha256', credentialsDTO.password).digest('hex')
        // };
        // if (!isNil(credentialsDTO.id)) {
        //     where.id = credentialsDTO.id;
        // } else {
        //     where.email = credentialsDTO.email;
        // }
        // const user = await Account.findOne<Account>({
        //     where,
        //     include: [{
        //         model: Payment,
        //         as: 'payment',
        //         required: false,
        //         attributes: ['id', 'accountId', 'status']
        //     }]
        // });
        // if (!user) throw new MessageCodeError('account:notFound');
        // if (user.accountStatus !== 'Y') throw new MessageCodeError('account:notEnabled');

        // // Saving the lastLogin and lastLogout fields
        // await this.sequelizeInstance.transaction(async transaction => {
        //     let account: Account = await this.accountRepository.findById<Account>(user.id);
        //     if (isNil(account)) throw new MessageCodeError('account:notFound');
        //     account = assign(account, {
        //         lastLogin: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        //         isLoggedIn: '1'
        //     });
        //     await account.save({ returning: false, transaction });
        // });
        // let hasApplication = false;
        // if (user.role === 'activist') {
        //     const activist = await this.accountRepository.findOne<Account>({
        //         include: [{
        //             model: ActivistProfile,
        //             as: 'activistProfile',
        //             attributes: ['id', 'accountId', 'activistApplicationId']
        //         }],
        //         attributes: ['id'],
        //         where: {
        //             id: user.id
        //         }
        //     });
        //     hasApplication = isNil(activist.activistProfile) ? false : isInteger(activist.activistProfile.activistApplicationId);
        // }
        // const payload = {
        //     id: user.id,
        //     role: user.role,
        //     approvalStatus: user.approvalStatus,
        //     accountStatus: user.accountStatus,
        //     payment: user.payment,
        //     hasApplication
        // };

        // return await jwt.sign(payload, env.string('JWT_KEY', 'secretKey') || '', this._options);
        return null;
    }

    public async logout(accountId: number): Promise<string> {
        // return await this.sequelizeInstance.transaction(async transaction => {
        //     let account: Account = await this.accountRepository.findById<Account>(accountId);
        //     if (isNil(account)) throw new MessageCodeError('account:notFound');
        //     account.isLoggedIn = '0';
        //     await account.save({ returning: false, transaction });
        // });
        return null;
    }
}
