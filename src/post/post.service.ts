import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { WebzApiService } from 'src/services/webz-api.service';
import { Post } from '@prisma/client';
@Injectable()

export class PostService {
  private readonly API_URL = `${process.env.API_URL}/filterWebContent`;
  private readonly API_KEY = process.env.API_KEY;
  private prisma: PrismaClient;
  constructor(private apiService: WebzApiService) {
    this.prisma = new PrismaClient();
  }


  async savePosts(posts: Post[]) {
    await Promise.all(
      posts.map((post) => {
        return this.savePost(post);
      }),
    );
  }


  async savePost(post: Post) {
    this.prisma.post.upsert({
      where: { uuid: post.uuid },
      update: {},
      create: {
        ...post,
      },
    });
  }


  async fetchAndSavePostsV2(searchTerm: string, searchCount = 200) {
    try {
      const posts = await this.apiService.fetchAllPosts(
        searchTerm,
        searchCount,
      );
      for (const post of posts) {
        this.savePost(post);
      }
    } catch (error) {
      console.error(error);
      throw new Error('error fetching and saving data: ' + error);
    }
  }


  async fetchAndSavePosts(searchTerm: string): Promise<boolean> {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          token: this.API_KEY,
          q: searchTerm,
          format: 'json',
        },
      });
      const posts = response.data.posts;
      for (const post of posts) {
        const {
          id,
          uuid,
          url,
          siteFull,
          site,
          siteSection,
          title,
          author,
          language,
          text,
          country,
          mainImage,
        } = post;
        const updatedPost = {
          id,
          uuid,
          url,
          siteFull,
          site,
          siteSection,
          title,
          author,
          language,
          text,
          country,
          mainImage,
        }

        await this.prisma.post.upsert({
          where: { uuid: post.uuid },
          update: {},
          create: {
            ...updatedPost,
          },
        });
      }
      return true
    } catch (error) {
      console.error('Error fetching or saving posts: ');
      return false;
    }
  }


  async getPosts() {
    return this.prisma.post.findMany();
  }
}
