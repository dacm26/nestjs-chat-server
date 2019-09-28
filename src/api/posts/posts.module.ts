import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../../shared';

import { PostsController } from './posts.controller';
import { Post } from './posts.schema';
import { PostService } from './posts.service';

const PostModel = MongooseModule.forFeature([{
  name: 'Post',
  schema: Post,
}]);

@Module({
  imports: [
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
export class PostModule { }
