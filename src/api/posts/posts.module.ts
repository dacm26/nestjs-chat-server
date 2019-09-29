import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared';

import { AuthMiddleware, UserModule } from '../';

import { PostsController } from './posts.controller';
import { Post } from './posts.schema';
import { PostService } from './posts.service';

const PostModel = MongooseModule.forFeature([{
  name: 'Post',
  schema: Post,
}]);

@Module({
  imports: [
    forwardRef(() => UserModule),
    PostModel,
    SharedModule,
  ],
  controllers: [PostsController],
  providers: [
    PostService,
  ],
  exports: [
    PostModel,
    PostService,
  ],
})
export class PostModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PostsController);
  }
}
