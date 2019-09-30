import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';

import { SharedModule } from '../../shared/shared.module';

import { Post } from './posts.schema';
import { PostService } from './posts.service';
import { CreatePostDto, FindAllPostsDto } from './dtos';

const PostModel = {
    provide: getModelToken('Post'),
    useValue: Post,
};

describe('PostsService', () => {
    let postService: PostService;
    let instances;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [SharedModule],
            controllers: [],
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
    });

    describe('findAll', () => {
        it('should return an object with all the post Data', async () => {
            const findAllOptions: any = {};
            const result: FindAllPostsDto = {
                data: instances,
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(postService, 'findAll').mockImplementation(async () => result);
            expect(await postService.findAll(findAllOptions)).toBe(result);
        });

        it('should return an object with all the post Data', async () => {
            const findAllOptions: any = null;
            const result: FindAllPostsDto = {
                data: instances,
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(postService, 'findAll').mockImplementation(async () => result);
            expect(await postService.findAll(findAllOptions)).toBe(result);
        });

        it('should return an object with an empty post Data', async () => {
            const findAllOptions: any = {
                where: {
                    code: 'TEST2',
                },
            };
            const result: FindAllPostsDto = {
                data: [],
                currentPage: 1,
                totalPages: 1,
                pageSize: 25,
            };
            jest.spyOn(postService, 'findAll').mockImplementation(async () => result);
            expect(await postService.findAll(findAllOptions)).toBe(result);
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
            expect(await postService.create(instanceToCreate)).toBe(instance);
            expect(instances.length).toEqual(2);
        });

        it('should not create the instance because is missing the code', async () => {
            const instanceToCreate: any = {
                name: 'test post',
                description: 'test post description',
            };
            jest.spyOn(postService, 'create').mockImplementation(async () => null);
            expect(await postService.create(instanceToCreate)).toBe(null);
            expect(instances.length).toEqual(1);
        });

        it('should not create the instance because is a null object', async () => {
            const instanceToCreate: any = null;
            jest.spyOn(postService, 'create').mockImplementation(async () => null);
            expect(await postService.create(instanceToCreate)).toBe(null);
            expect(instances.length).toEqual(1);
        });
    });
});
