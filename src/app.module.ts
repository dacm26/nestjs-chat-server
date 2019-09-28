import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import {
  GatewayService,
  RoomModule,
  UserModule,
} from './api';
import { EnvironmentConfigUtils as env, TransformInterceptor, SharedModule } from './shared';

@Module({
  imports: [
    MongooseModule.forRoot(env.string('MONGODB_URI'), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }),
    RoomModule,
    SharedModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    GatewayService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule { }