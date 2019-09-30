import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { PostsController } from './posts.controller';
import { Post } from './posts.schema';
import { PostService } from './posts.service';
import { CreatePostDto, FindAllPostsDto } from './dtos';

const PostModel = {
    provide: getModelToken('Post'),
    useValue: Post,
};

describe('PostsController', () => {
    let postController: PostsController;
    let postService: PostService;
    let instances;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [SharedModule],
            controllers: [PostsController],
            providers: [PostService, PostModel],
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
        postService = module.get<PostService>(PostService);
        postController = module.get<PostsController>(PostsController);
    });

    describe('findAll', () => {
        it('should return an object with the lookUp Data', async () => {
            const req = {};
            const result: FindAllPostsDto = {
                data: instances,
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(postService, 'findAll').mockImplementation(async () => result);
            expect(await postController.findAll(req)).toBe(result);
        });
    });

    describe('create', () => {
        it('should create the instance', async () => {
            const instanceToCreate: CreatePostDto = {
                content: 'testing 1234',
                userId: '123123123',
                roomId: '123123123',
            };
            const instance: any = {
                _id: Types.ObjectId('123412341234'),
                ...instanceToCreate,
                isDeleted: false,
                createdAt: 'Thu Apr 25 2019 09:41:51 GMT-0600 (Central Standard Time)',
                updatedAt: 'Thu Apr 26 2019 09:41:51 GMT-0600 (Central Standard Time)',
            };
            instances.push(instance);
            jest.spyOn(postService, 'create').mockImplementation(async () => instance);
            expect(await postController.create(instanceToCreate)).toBe(instance);
            expect(instances.length).toEqual(2);
        });
    });
});
