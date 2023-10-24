import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { withHistory, withStore } from '../../mocks/mock-component';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Header />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
