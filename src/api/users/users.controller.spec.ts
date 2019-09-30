import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { UsersController } from './users.controller';
import { User } from './users.schema';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos';

const UserModel = {
    provide: getModelToken('User'),
    useValue: User,
};

describe('UsersController', () => {
    let userController: UsersController;
    let userService: UserService;
    let instances;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [SharedModule],
            controllers: [UsersController],
            providers: [UserService, UserModel],
        }).compile();
        instances = [{
            _id: '5cc1d53f0cb74d0e6ce61fba',
            content: 'testing 1234',
            userId: '123123123',
            roomId: '123123123',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        }];
        userService = module.get<UserService>(UserService);
        userController = module.get<UsersController>(UsersController);
    });

    describe('create', () => {
        it('should create the instance', async () => {
            const instanceToCreate: CreateUserDto = {
                firstName: 'Daniel',
                lastName: 'Coello',
                age: 19,
                username: 'dacm26@gmail.com',
                password: 'test',
            };
            const instance: any = {
                _id: Types.ObjectId('123412341234'),
                ...instanceToCreate,
                isDeleted: false,
                createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
                updatedAt: 'Thu Apr 26 2019 09:41:51 GMT-0600 (Central Standard Time)',
            };
            instances.push(instance);
            jest.spyOn(userService, 'create').mockImplementation(async () => instance);
            expect(await userController.create(instanceToCreate)).toBe(instance);
            expect(instances.length).toEqual(2);
        });
    });
});
