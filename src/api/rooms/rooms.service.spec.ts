import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { Room } from './rooms.schema';
import { RoomService } from './rooms.service';
import { CreateRoomDto, FindAllRoomsDto } from './dtos';

const RoomModel = {
    provide: getModelToken('Room'),
    useValue: Room,
};

describe('RoomsService', () => {
    let roomService: RoomService;
    let instances;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [SharedModule],
            controllers: [],
            providers: [RoomService, RoomModel],
        }).compile();
        instances = [{
            _id: Types.ObjectId('5cc1d53f0cb74d0e6ce61fba'),
            name: 'test room',
            description: 'test room description',
            isDeleted: false,
            createdAt: 'Thu Apr 25 2019 09:41:52 GMT-0600 (Central Standard Time)',
            updatedAt: 'Thu Apr 25 2019 09:41:52 GMT-0600 (Central Standard Time)',
            __v: 0,
        }];
        roomService = module.get<RoomService>(RoomService);
    });

    describe('findAll', () => {
        it('should return an object with all the room Data', async () => {
            const findAllOptions: any = {};
            const result: FindAllRoomsDto = {
                data: instances,
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(roomService, 'findAll').mockImplementation(async () => result);
            expect(await roomService.findAll(findAllOptions)).toBe(result);
        });

        it('should return an object with all the room Data', async () => {
            const findAllOptions: any = null;
            const result: FindAllRoomsDto = {
                data: instances,
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(roomService, 'findAll').mockImplementation(async () => result);
            expect(await roomService.findAll(findAllOptions)).toBe(result);
        });

        it('should return an object with an empty room Data', async () => {
            const findAllOptions: any = {
                where: {
                    code: 'TEST2',
                },
            };
            const result: FindAllRoomsDto = {
                data: [],
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(roomService, 'findAll').mockImplementation(async () => result);
            expect(await roomService.findAll(findAllOptions)).toBe(result);
        });
    });

    describe('create', () => {
        it('should create the instance', async () => {
            const instanceToCreate: CreateRoomDto = {
                name: 'test room',
                description: 'test room description',
            };
            const instance: any = {
                _id: Types.ObjectId('123412341234'),
                ...instanceToCreate,
                isDeleted: false,
                createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
                updatedAt: 'Thu Apr 26 2019 09:41:51 GMT-0600 (Central Standard Time)',
            };
            instances.push(instance);
            jest.spyOn(roomService, 'create').mockImplementation(async () => instance);
            expect(await roomService.create(instanceToCreate)).toBe(instance);
            expect(instances.length).toEqual(2);
        });

        it('should not create the instance because is missing the code', async () => {
            const instanceToCreate: any = {
                name: 'test room',
                description: 'test room description',
            };
            jest.spyOn(roomService, 'create').mockImplementation(async () => null);
            expect(await roomService.create(instanceToCreate)).toBe(null);
            expect(instances.length).toEqual(1);
        });

        it('should not create the instance because is a null object', async () => {
            const instanceToCreate: any = null;
            jest.spyOn(roomService, 'create').mockImplementation(async () => null);
            expect(await roomService.create(instanceToCreate)).toBe(null);
            expect(instances.length).toEqual(1);
        });
    });
});
