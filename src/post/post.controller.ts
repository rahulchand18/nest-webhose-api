import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')

export class PostController {

  constructor(private readonly postService: PostService) { }

  @Get('fetch')
  async fetchAndSavePosts(@Query('q') query: string = 'ipad',): Promise<{ message: string }> {
    try {
      const resp: boolean = await this.postService.fetchAndSavePosts(query);
      return resp ? { message: 'post fetched and saved for query: ' + query } : { message: 'Error' };
    } catch (error) {
      console.log('Error while fetching posts: ', error);
      throw error;
    }
  }


  @Get()
  async getPosts() {
    try {
      const posts = await this.postService.getPosts();
      return { success: true, data: posts };
    } catch (error) {
      return error

    }
  }
}
