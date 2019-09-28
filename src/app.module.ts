import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GatewayService } from './api';
import { TransformInterceptor } from './shared';

@Module({
  imports: [],
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