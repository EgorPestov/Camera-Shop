import { render, screen } from '@testing-library/react';
import { ModalBasketFail } from './modal-basket-fail';
import { withHistory, withStore } from '../../../mocks/mock-component';

describe('Component: Modal basket Fail', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalBasketFail />, {
      MODALS: {
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
        isModalBasketFailOpen: true,
        isModalBasketSuccessOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-basket-fail')).toBeInTheDocument();
  });
});
