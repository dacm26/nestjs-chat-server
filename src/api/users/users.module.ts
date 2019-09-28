import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared';

import { UsersController } from './users.controller';
import { User } from './users.schema';
import { UserService } from './users.service';

export const UserModel = MongooseModule.forFeature([{
  name: 'User',
  schema: User,
}]);

@Module({
  imports: [
    UserModel,
    forwardRef(() => SharedModule),
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
