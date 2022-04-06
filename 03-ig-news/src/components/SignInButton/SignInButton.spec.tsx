import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('Header component', () => {
	it('renders correctly when not authenticated', () => {
		const mockedUseSession = mocked(useSession);

		mockedUseSession.mockReturnValueOnce({
			data: null,
			status: 'unauthenticated',
		});

		const { debug } = render(<SignInButton />);
		debug();
		expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
	});

	it('renders correctly when is authenticated', () => {
		const mockedUseSession = mocked(useSession);

		mockedUseSession.mockReturnValueOnce({
			data: {
				user: {
					name: 'John Doe',
					email: 'john@email.com',
				},
				expires: 'fake-expires',
			},
			status: 'authenticated',
		});

		render(<SignInButton />);
		expect(screen.getByText('John Doe')).toBeInTheDocument();
	});
});
