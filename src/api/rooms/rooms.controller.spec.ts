import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { RoomsController } from './rooms.controller';
import { Room } from './rooms.schema';
import { RoomService } from './rooms.service';
import { CreateRoomDto, FindAllRoomsDto } from './dtos';

const RoomModel = {
    provide: getModelToken('Room'),
    useValue: Room,
};

describe('RoomsController', () => {
    let roomController: RoomsController;
    let roomService: RoomService;
    let instances;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [SharedModule],
            controllers: [RoomsController],
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
        roomController = module.get<RoomsController>(RoomsController);
    });

    describe('findAll', () => {
        it('should return an object with the lookUp Data', async () => {
            const req = {};
            const result: FindAllRoomsDto = {
                data: instances,
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(roomService, 'findAll').mockImplementation(async () => result);
            expect(await roomController.findAll(req)).toBe(result);
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
            expect(await roomController.create(instanceToCreate)).toBe(instance);
            expect(instances.length).toEqual(2);
        });
    });
});
