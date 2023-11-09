import { render, screen } from '@testing-library/react';
import { Basket } from './basket';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockStore } from '../../mocks/mock-store';

describe('Page: Basket', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Basket />, mockStore());

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('basket')).toBeInTheDocument();
  });
});
