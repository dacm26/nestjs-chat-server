import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared';

import { UsersController } from './users.controller';
import { User } from './users.schema';
import { UserService } from './users.service';

const UserModel = MongooseModule.forFeature([{
  name: 'User',
  schema: User,
}]);

@Module({
  imports: [
    UserModel,
    SharedModule,
  ],
  controllers: [UsersController],
  providers: [
    UserService,
  ],
  exports: [
    UserModel,
    UserService,
  ],
})
export class UserModule { }
