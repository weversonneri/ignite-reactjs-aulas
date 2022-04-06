import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/react';

import Post, { getServerSideProps } from '../../../pages/posts/[slug]';
import { getPrismicClient } from '../../../services/prismic';

jest.mock('../../../services/prismic.ts');

jest.mock('next-auth/react');
jest.mock('../../../services/prismic.ts');

const post = {
	slug: 'ny-new-post',
	title: 'My New Post',
	content: '<p>Post excerpt</p>',
	updatedAt: '10 de outubro',
};

describe('Post page', () => {
	it('renders correctly', () => {
		render(<Post post={post} />);

		expect(screen.getByText('My New Post')).toBeInTheDocument();
		expect(screen.getByText('Post excerpt')).toBeInTheDocument();
	});

	it('redirects user if not subscribed', async () => {
		const response = await getServerSideProps({
			params: {
				slug: 'my-new-post',
			},
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				redirect: expect.objectContaining({
					destination: '/',
				}),
			})
		);
	});

	it('loads initial data', async () => {
		const mockedGetSession = mocked(getSession);
		const mockedGetPrismicClient = mocked(getPrismicClient);

		mockedGetPrismicClient.mockReturnValueOnce({
			getByUID: jest.fn().mockReturnValueOnce({
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
			}),
		} as any);

		mockedGetSession.mockResolvedValueOnce({
			activeSubscription: 'fake-active-subscription',
		} as any);

		const response = await getServerSideProps({
			params: {
				slug: 'my-new-post',
			},
		} as any);

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					post: {
						slug: 'my-new-post',
						title: 'My New Post',
						content: '<p>Post excerpt</p>',
						updatedAt: 'September 03, 2021',
					},
				},
			})
		);
	});
});
