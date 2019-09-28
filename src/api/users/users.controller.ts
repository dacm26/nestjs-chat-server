import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUseTags,
} from '@nestjs/swagger';

import { UserService } from './users.service';
import { UserOkResponse, CreateUserDto } from './dtos';
import { IUser } from './interfaces';

// User's CRUD Controller v1.0
@Controller('users')
@ApiUseTags('Users v1.0')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiForbiddenResponse({ description: 'Invalid API key' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    @ApiOkResponse({ type: UserOkResponse })
    @ApiOperation({
        title: 'UsersController.create',
        description: 'Creates the document in the collection (if it\'s valid)',
    })
    public async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<IUser> {
        return await this.userService.create(createUserDto);
    }
}
