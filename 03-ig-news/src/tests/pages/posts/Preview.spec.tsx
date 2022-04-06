import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Post, { getStaticProps } from '../../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../../services/prismic';

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../../services/prismic');

const post = {
	slug: 'my-new-post',
	title: 'My New Post',
	content: '<p>Post excerpt</p>',
	updatedAt: '10 de outubro',
};

describe('Post preview page', () => {
	it('renders correctly', () => {
		const mockedUseSession = mocked(useSession);

		mockedUseSession.mockReturnValueOnce({
			data: null,
			status: 'unauthenticated',
		});

		render(<Post post={post} />);

		expect(screen.getByText('My New Post')).toBeInTheDocument();
		expect(screen.getByText('Post excerpt')).toBeInTheDocument();
		expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
	});

	it('redirects sub user to full post', async () => {
		const mockedUseSession = mocked(useSession);
		const mockedUseRouter = mocked(useRouter);
		const mockedPush = jest.fn();

		mockedUseSession.mockReturnValueOnce({
			data: {
				user: {
					name: 'John Doe',
					email: 'john@email.com',
				},
				expires: 'fake-expires',
				activeSubscription: 'fake-subscription',
			},
			status: 'authenticated',
		});

		mockedUseRouter.mockReturnValueOnce({
			push: mockedPush,
		} as any);

		render(<Post post={post} />);

		expect(mockedPush).toHaveBeenCalledWith('/posts/my-new-post');
	});

	it('loads initial data', async () => {
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

		const response = await getStaticProps({
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
