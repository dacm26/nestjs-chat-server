import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from './dtos';
import { IUser } from './interfaces';
import { isNil } from 'lodash';

@Injectable()
export class UserService {

    constructor(
        @Inject('UtilService') private readonly utilService,
        @InjectModel('User') private readonly UserModel: Model<IUser>,
    ) {
    }
    public async findById(id: string) {
        let user: IUser = null;
        if (Types.ObjectId.isValid(id)) {
            user = await this.UserModel.findById(this.utilService.convertMongoIdToObjectId([id])[0]).lean().exec();
        }
        return user;
    }

    public async findUser(username: string, password: string) {
        return this.UserModel.findOne({
            password,
            username,
        }).select('-password').lean().exec();
    }

    public async updateLoggedInStatus(userId: string, isLoggedIn: boolean) {
        let user: IUser = null;
        if (Types.ObjectId.isValid(userId)) {
            user = await this.UserModel.findById(this.utilService.convertMongoIdToObjectId([userId])[0]).exec();
            if (!isNil(user)) {
                user.isLoggedIn = isLoggedIn;
                user = (await user.save()).toJSON();
            }
        }
        return user;
    }

    public async create(data: CreateUserDto) {
        try {
            data.password = this.utilService.hashPassword(data.password);
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
