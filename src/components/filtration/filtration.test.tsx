import { render, screen } from '@testing-library/react';
import { Filtration } from './filtration';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockStore } from '../../mocks/mock-store';

describe('Component: Filtration', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Filtration />, mockStore());

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('filtration')).toBeInTheDocument();
  });
});
