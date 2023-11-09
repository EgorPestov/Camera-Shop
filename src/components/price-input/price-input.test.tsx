import { render, screen } from '@testing-library/react';
import { PriceInput } from './price-input';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockStore } from '../../mocks/mock-store';

describe('Component: Price Input', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PriceInput />, mockStore());

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('price-input')).toBeInTheDocument();
  });
});
