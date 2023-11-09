import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockStore } from '../../mocks/mock-store';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Header />, mockStore());

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
