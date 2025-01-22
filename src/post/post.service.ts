import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Post } from '@prisma/client';
@Injectable()
export class PostService {
    private readonly API_URL = `${process.env.API_URL}`;
    private readonly API_KEY = process.env.API_KEY;
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async savePosts(posts: Post[]) {
        await Promise.all(
            posts.map((post) => {
                return this.savePost(post);
            })
        );
    }

    async savePost(post: Post) {
        this.prisma.post.upsert({
            where: { uuid: post.uuid },
            update: {},
            create: {
                ...post
            }
        });
    }

    async getResponseFromAPI(url: string): Promise<any> {
        try {
            const response = await axios.get(url);

            return response.data;
        } catch (error) {
            console.error('Error fetching posts from Webhose.io:', error);
            throw new Error('Error fetching posts from Webhose.io');
        }
    }

    async fetchAndSavePosts(searchTerm: string): Promise<boolean> {
        try {
            let moreResultsAvailable = true;
            let url = `${this.API_URL}/filterWebContent?token=${this.API_KEY}&format=json&q=${searchTerm}`;
            let allPosts = [];
            do {
                const response = await this.getResponseFromAPI(url);
                const posts = response.posts;
                posts.forEach((post: any) => {
                    if (post.uuid) {
                        allPosts.push(post);
                    }
                });
                moreResultsAvailable = response.moreResultsAvailable;
                if (moreResultsAvailable) {
                    url = `${this.API_URL}${response.next}`;
                }
            } while (moreResultsAvailable && allPosts.length <= 200);

            for (const post of allPosts.slice(0, 200)) {
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
                    mainImage
                } = post;
                const updatedPost = {
                    query: searchTerm,
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
                    mainImage
                };

                await this.prisma.post.upsert({
                    where: { uuid: post.uuid },
                    update: {},
                    create: updatedPost
                });
            }

            console.log(`${moreResultsAvailable ? 'More available' : ''}`);

            return true;
        } catch (error) {
            console.error('Error fetching or saving posts: ', error);
            return false;
        }
    }

    async getPosts() {
        const total = await this.prisma.post.count();
        const posts = await this.prisma.post.findMany({
            select: {
                id: true,
                uuid: true,
                url: true,
                query: true
            }
        });
        return { posts, total };
    }
}
