import { render, screen } from '@testing-library/react';
import { Filtration } from './filtration';
import { withHistory, withStore } from '../../mocks/mock-component';

describe('Component: Filtration', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Filtration />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('filtration')).toBeInTheDocument();
  });
});
