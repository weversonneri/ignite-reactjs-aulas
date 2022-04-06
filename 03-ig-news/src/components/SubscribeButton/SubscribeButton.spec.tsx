import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { SubscribeButton } from '.';

jest.mock('next-auth/react');

jest.mock('next/router');

describe('SubscribeButton component', () => {
	it('renders correctly', () => {
		const mockedUseSession = mocked(useSession);
		mockedUseSession.mockReturnValueOnce({
			data: null,
			status: 'unauthenticated',
		});

		render(<SubscribeButton />);

		expect(screen.getByText('Subscribe now')).toBeInTheDocument();
	});

	it('Redirects user if not authenticated', () => {
		const mockedSingIn = mocked(signIn);
		const mockedUseSession = mocked(useSession);
		mockedUseSession.mockReturnValueOnce({
			data: null,
			status: 'unauthenticated',
		});

		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Subscribe now');
		fireEvent.click(subscribeButton);

		expect(mockedSingIn).toHaveBeenCalled();
	});

	it('Redirect to posts when has sub', () => {
		const mockedUseSession = mocked(useSession);
		const mockedUserRouter = mocked(useRouter);
		const mockedPush = jest.fn();

		mockedUserRouter.mockReturnValueOnce({
			push: mockedPush,
		} as any);

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

		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Subscribe now');
		fireEvent.click(subscribeButton);

		// expect(mockedPush).toHaveBeenCalled();
		expect(mockedPush).toHaveBeenCalledWith('/posts');
	});
});
