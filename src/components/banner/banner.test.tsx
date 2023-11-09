import { render, screen } from '@testing-library/react';
import { Banner } from './banner';
import { withHistory, withStore } from '../../mocks/mock-component';
import { mockStore } from '../../mocks/mock-store';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Banner />, mockStore());

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });
});
