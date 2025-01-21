import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/interfaces/ApiResponse';
@Injectable()
export class WebzApiService {
  private readonly API_URL = process.env.API_URL;
  private readonly API_KEY = process.env.API_KEY;

  async fetchAllPosts(searchTerm: string, searchCount = 200): Promise<Post[]> {
    const allItems: Post[] = [];
    let nextUrl: string | undefined = this.API_URL;
    try {
      do {
        const response: AxiosResponse<ApiResponse> = await axios.get(nextUrl, {
          params: {
            token: this.API_KEY,
            q: searchTerm,
            format: 'json',
          },
        });
        const { posts, next } = response.data;
        WebzApiService.pushElements(
          allItems,
          posts,
          WebzApiService.minOf(searchCount, posts.length),
        );
        nextUrl = next;
        searchCount = searchCount - 100;
      } while (nextUrl && searchCount > 0);
      return allItems;
    } catch (error) {
      console.error('Error fetching items: ', error);
      throw new Error('Failed to fetch items');
    }
  }
  static pushElements(dest: Array<Post>, src: Array<Post>, n: number) {
    src.slice(0, n);
    dest.push(...src);
    return dest;
  }
  static minOf(a: number, b: number) {
    return a > b ? b : a;
  }
}
