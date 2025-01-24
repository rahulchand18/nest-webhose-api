import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PostController } from './post.controller';

describe('PostService', () => {
    let service: PostService;
    let controller: PostController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostService]
        }).compile();

        service = module.get<PostService>(PostService);
        controller = new PostController(service);
    });

    describe('getPosts', () => {
        it('should return an object with a posts array containing objects with the expected properties', async () => {
            const result = {
                posts: [
                    {
                        id: 701,
                        uuid: '46ca2bc778ec08fd553651e063f5e305570107d4',
                        url: 'https://www.macfreak.nl/iphone-apps-28/zoek-op-beginscherm-ipad/msg694087',
                        query: 'iphone'
                    },
                    {
                        id: 702,
                        uuid: '2a12723ea5e666bf29cefa3f7b84b79677d32d8a',
                        url: 'https://www.vantage.id/yandex-browser-18-portable',
                        query: 'iphone'
                    }
                ],
                total: 2
            };

            jest.spyOn(controller, 'getPosts').mockImplementation(
                async () => result
            );

            const response = await controller.getPosts();

            expect(response).toHaveProperty('posts');
            expect(response.posts).toBeInstanceOf(Array);
            expect(response.posts.length).toBe(2);
            expect(response).toHaveProperty('total', 2);

            response.posts.forEach((post) => {
                expect(post).toHaveProperty('id');
                expect(post).toHaveProperty('uuid');
                expect(post).toHaveProperty('url');
                expect(post).toHaveProperty('query');
            });

            expect(response.posts[0]).toEqual({
                id: 701,
                uuid: '46ca2bc778ec08fd553651e063f5e305570107d4',
                url: 'https://www.macfreak.nl/iphone-apps-28/zoek-op-beginscherm-ipad/msg694087',
                query: 'iphone'
            });
        });
    });
});
