import { render, screen } from '@testing-library/react';
import { ModalBasketSuccess } from './modal-basket-success';
import { withHistory, withStore } from '../../../mocks/mock-component';

describe('Component: Modal basket Fail', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalBasketSuccess />, {
      MODALS: {
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
        isModalBasketFailOpen: true,
        isModalBasketSuccessOpen: false,
        isModalBasketRemoveItemOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-basket-success')).toBeInTheDocument();
  });
});
