import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared';

import { RoomsController } from './rooms.controller';
import { Room } from './rooms.schema';
import { RoomService } from './rooms.service';

const RoomModel = MongooseModule.forFeature([{
  name: 'Room',
  schema: Room,
}]);

@Module({
  imports: [
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
export class RoomModule { }
