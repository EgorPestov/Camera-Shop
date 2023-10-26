import { render, screen } from '@testing-library/react';
import { NotFound } from './404';
import { withHistory, withStore } from '../../mocks/mock-component';

describe('Page: 404', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<NotFound />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
