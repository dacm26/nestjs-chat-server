import { Body, Controller, Get, Inject, Post, Request, ValidationPipe } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUseTags,
} from '@nestjs/swagger';

import { RoomService } from './rooms.service';
import { RoomOkResponse, CreateRoomDto, FindAllRoomsDto } from './dtos';
import { IRoom } from './interfaces';

// Room's CRUD Controller v1.0
@Controller('rooms')
@ApiUseTags('Rooms v1.0')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiForbiddenResponse({ description: 'Invalid API key' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class RoomsController {
    constructor(
        @Inject('FindAllService') private readonly findAllService,
        private readonly roomService: RoomService,
    ) { }

    @Get()
    @ApiOkResponse({ type: FindAllRoomsDto })
    @ApiOperation({
        title: 'RoomsController.findAll',
        description: 'Returns all the documents that matched the req.query criteria.',
    })
    public async findAll(@Request() req): Promise<FindAllRoomsDto> {
        let options = { ...req.query };
        options = this.findAllService.parseFindAllOptions(options);
        return await this.roomService.findAll(options);
    }

    @Post()
    @ApiOkResponse({ type: RoomOkResponse })
    @ApiOperation({
        title: 'RoomsController.create',
        description: 'Creates the document in the collection (if it\'s valid)',
    })
    public async create(@Body(new ValidationPipe()) createRoomDto: CreateRoomDto): Promise<IRoom> {
        return await this.roomService.create(createRoomDto);
    }
}
