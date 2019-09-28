import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { SharedModule } from '../../shared';

import { UserModule } from '../';

import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';

@Module({
    imports: [
        SharedModule,
        forwardRef(() => UserModule),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthMiddleware,
    ],
    exports: [
        AuthService,
        AuthMiddleware,
    ],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/logout', method: RequestMethod.POST },
            );
    }
}
