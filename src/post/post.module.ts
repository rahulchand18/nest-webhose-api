import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { WebzApiProvider } from 'src/providers/webz-api.provider';
@Module({
  controllers: [PostController],
  providers: [PostService, WebzApiProvider],
})
export class PostModule {}
