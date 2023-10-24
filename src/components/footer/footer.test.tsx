import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { withHistory, withStore } from '../../mocks/mock-component';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Footer />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
