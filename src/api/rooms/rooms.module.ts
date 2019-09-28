import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared';

import { AuthMiddleware, UserModule } from '../';

import { RoomsController } from './rooms.controller';
import { Room } from './rooms.schema';
import { RoomService } from './rooms.service';

const RoomModel = MongooseModule.forFeature([{
  name: 'Room',
  schema: Room,
}]);

@Module({
  imports: [
    forwardRef(() => UserModule),
    RoomModel,
    SharedModule,
  ],
  controllers: [RoomsController],
  providers: [
    RoomService,
  ],
  exports: [
    RoomModel,
    RoomService,
  ],
})
export class RoomModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(RoomsController);
  }
}
