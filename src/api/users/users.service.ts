import { HttpException, HttpStatus, Inject, Injectable  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';

import { CreateUserDto } from './dtos';
import { IUser } from './interfaces';

@Injectable()
export class UserService {

    constructor(
        @Inject('UtilService') private readonly utilService,
        @InjectModel('User') private readonly UserModel: Model<IUser>,
    ) {
    }
    public async create(data: CreateUserDto) {
        try {
            data.password = crypto.createHmac('sha256', data.password).digest('hex');
            const user = new this.UserModel({
                ...data,
            });
            const createdUser = (await user.save()).toJSON();
            delete createdUser.password;
            return createdUser;
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: `Username "${data.username}" is already taken.`,
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw e;
            }
        }
    }
}
