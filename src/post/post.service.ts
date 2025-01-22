import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Post } from '@prisma/client';
@Injectable()
export class PostService {
    private readonly API_URL = `${process.env.API_URL}/filterWebContent`;
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

    async handler(queryString: string): Promise<any> {
        if (!queryString) {
            throw new Error('queryString is required');
        }

        try {
            const response = await axios.get(this.API_URL, {
                params: {
                    token: this.API_KEY,
                    q: encodeURIComponent(queryString),
                    format: 'json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching posts from Webhose.io:', error);
            throw new Error('Error fetching posts from Webhose.io');
        }
    }

    async fetchAndSavePosts(searchTerm: string): Promise<boolean> {
        try {
            let moreResultsAvailable = true;

            const response = await this.handler(searchTerm);
            const posts = response.posts;

            moreResultsAvailable = response.moreResultsAvailable;

            for (const post of posts.slice(0, 200)) {
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
        return this.prisma.post.findMany();
    }
}
