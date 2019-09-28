import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindAllOptionsDto } from '../../shared';

import { CreateRoomDto, FindAllRoomsDto } from './dtos';
import { IRoom } from './interfaces';

@Injectable()
export class RoomService {

    constructor(
        @Inject('FindAllService') private readonly findAllService,
        @Inject('UtilService') private readonly utilService,
        @InjectModel('Room') private readonly RoomModel: Model<IRoom>,
    ) {
    }
    public async findAll(options: FindAllOptionsDto) {
        const retVal: FindAllRoomsDto = {
            data: [],
            currentPage: null,
            totalPages: null,
            pageSize: null,
        };
        const query = this.findAllService.getFindAllQuery(options);
        const count = await this.RoomModel.countDocuments(query);
        const pageSize = options.pageSize || this.utilService.environmentConfigUtils.number('DEFAULT_PAGE_SIZE', 25);
        const pages = Math.ceil(count / pageSize);
        if (options.page <= pages) {
            query.skip((options.page - 1) * pageSize).limit(pageSize);
            retVal.data = await this.RoomModel.find(query).lean();
        }
        retVal.currentPage = options.page;
        retVal.totalPages = pages;
        retVal.pageSize = pageSize;
        return retVal;
    }

    public async create(data: CreateRoomDto) {
        try {
            const room = new this.RoomModel({
                ...data,
            });
            const roomCreated = await room.save();
            return roomCreated;
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: `Room name "${data.name}" is already taken.`,
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw e;
            }
        }
    }
}
