import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindAllOptionsDto } from '../../shared';

import { CreatePostDto, FindAllPostsDto } from './dtos';
import { IPost } from './interfaces';

@Injectable()
export class PostService {

    constructor(
        @Inject('FindAllService') private readonly findAllService,
        @Inject('UtilService') private readonly utilService,
        @InjectModel('Post') private readonly PostModel: Model<IPost>,
    ) {
    }
    public async findAll(options: FindAllOptionsDto, addPopulate: boolean = false) {
        const retVal: FindAllPostsDto = {
            data: [],
            currentPage: null,
            totalPages: null,
            pageSize: null,
        };
        const query = this.findAllService.getFindAllQuery(options);
        const count = await this.PostModel.countDocuments(query);
        const pageSize = options.pageSize || this.utilService.environmentConfigUtils.number('DEFAULT_PAGE_SIZE', 25);
        const pages = Math.ceil(count / pageSize);
        if (options.page <= pages) {
            query.skip((options.page - 1) * pageSize).limit(pageSize);
            if (addPopulate) {
                retVal.data = await this.PostModel.find(query).populate([{
                    path: 'user',
                    select: '-password',
                }, {
                    path: 'room',
                }]).lean().exec();
            } else {
                retVal.data = await this.PostModel.find(query).lean().exec();
            }
        }
        retVal.currentPage = options.page;
        retVal.totalPages = pages;
        retVal.pageSize = pageSize;
        return retVal;
    }

    public async create(data: CreatePostDto) {
        data.userId = this.utilService.convertMongoIdToObjectId([data.userId])[0];
        data.roomId = this.utilService.convertMongoIdToObjectId([data.roomId])[0];
        const post = new this.PostModel({
            ...data,
        });
        return post.save();
    }
}
