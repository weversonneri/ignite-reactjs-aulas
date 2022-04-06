import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';

import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');
jest.mock('next-auth/react', () => {
	return {
		useSession: () => [null, false],
	};
});
jest.mock('../../services/stripe.ts');

describe('Home page', () => {
	it('renders correctly', () => {
		render(<Home product={{ priceId: 'fake-price', amount: 10 }} />);

		expect(screen.getByText('for 10 month')).toBeInTheDocument();
	});

	it('loads initial data', async () => {
		const mockedStripePrices = mocked(stripe.prices.retrieve);

		mockedStripePrices.mockResolvedValueOnce({
			id: 'mock-price-id',
			unit_amount: 1000,
		} as any);

		const response = await getStaticProps({});

		expect(response).toEqual(
			expect.objectContaining({
				props: {
					product: {
						priceId: 'mock-price-id',
						amount: '$10.00',
					},
				},
			})
		);
	});
});
