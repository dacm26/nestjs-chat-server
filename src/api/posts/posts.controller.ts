import { Body, Controller, Get, Inject, Post, Request, ValidationPipe } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUseTags,
} from '@nestjs/swagger';
import { get } from 'lodash';

import { PostService } from './posts.service';
import { PostOkResponse, CreatePostDto, FindAllPostsDto } from './dtos';
import { IPost } from './interfaces';

// Post's CRUD Controller v1.0
@Controller('posts')
@ApiUseTags('Posts v1.0')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiForbiddenResponse({ description: 'Invalid API key' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class PostsController {
    constructor(
        @Inject('FindAllService') private readonly findAllService,
        private readonly postService: PostService,
    ) { }

    @Get()
    @ApiOkResponse({ type: FindAllPostsDto })
    @ApiOperation({
        title: 'PostsController.findAll',
        description: 'Returns all the documents that matched the req.query criteria.',
    })
    public async findAll(@Request() req): Promise<FindAllPostsDto> {
        let options = { ...req.query };
        options = this.findAllService.parseFindAllOptions(options);
        return await this.postService.findAll(options, get(req, 'query.populate') === 'true');
    }

    @Post()
    @ApiOkResponse({ type: PostOkResponse })
    @ApiOperation({
        title: 'PostsController.create',
        description: 'Creates the document in the collection (if it\'s valid)',
    })
    public async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto): Promise<IPost> {
        return await this.postService.create(createPostDto);
    }
}
