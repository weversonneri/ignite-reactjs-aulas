import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';

import Posts, { getStaticProps } from '../../../pages/posts';
import { getPrismicClient } from '../../../services/prismic';

jest.mock('next/router');
jest.mock('next-auth/react', () => {
	return {
		useSession: () => [null, false],
	};
});

jest.mock('../../../services/prismic.ts');

const posts = [
	{
		slug: 'ny-new-post',
		title: 'My New Post',
		excerpt: 'Post excerpt',
		updatedAt: '10 de outubro',
	},
];

describe('Posts page', () => {
	it('renders correctly', () => {
		render(<Posts posts={posts} />);

		expect(screen.getByText('My New Post')).toBeInTheDocument();
	});

	it('loads initial data', async () => {
		const mockedPrismicClient = mocked(getPrismicClient);

		mockedPrismicClient.mockReturnValueOnce({
			query: jest.fn().mockResolvedValueOnce({
				results: [
					{
						uid: 'my-new-post',
						data: {
							title: [
								{
									type: 'heading',
									text: 'My New Post',
								},
							],
							content: [
								{
									type: 'paragraph',
									text: 'Post excerpt',
								},
							],
						},
						last_publication_date: '09-03-2021',
					},
				],
			}),
		} as any);

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					posts: [
						{
							slug: 'my-new-post',
							title: 'My New Post',
							excerpt: 'Post excerpt',
							updatedAt: 'September 03, 2021',
						},
					],
				},
			})
		);
	});
});
