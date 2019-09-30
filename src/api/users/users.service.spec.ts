import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { User } from './users.schema';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos';

const UserModel = {
    provide: getModelToken('User'),
    useValue: User,
};

describe('UsersService', () => {
    let userService: UserService;
    let instances;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [SharedModule],
            controllers: [],
            providers: [UserService, UserModel],
        }).compile();
        instances = [{
            _id: '5cc1d53f0cb74d0e6ce61fba',
            firstName: 'Daniel',
            lastName: 'Coello',
            age: 19,
            username: 'dacm26@gmail.com',
            password: 'test',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
        }];
        userService = module.get<UserService>(UserService);
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
            expect(await userService.create(instanceToCreate)).toBe(instance);
            expect(instances.length).toEqual(2);
        });

        it('should not create the instance because is missing the code', async () => {
            const instanceToCreate: any = {
                name: 'test user',
                description: 'test user description',
            };
            jest.spyOn(userService, 'create').mockImplementation(async () => null);
            expect(await userService.create(instanceToCreate)).toBe(null);
            expect(instances.length).toEqual(1);
        });

        it('should not create the instance because is a null object', async () => {
            const instanceToCreate: any = null;
            jest.spyOn(userService, 'create').mockImplementation(async () => null);
            expect(await userService.create(instanceToCreate)).toBe(null);
            expect(instances.length).toEqual(1);
        });
    });
});
