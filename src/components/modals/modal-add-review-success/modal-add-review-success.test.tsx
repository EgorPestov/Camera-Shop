import { render, screen } from '@testing-library/react';
import { ModalReviewSuccess } from './modal-add-review-success';
import { withHistory, withStore } from '../../../mocks/mock-component';

describe('Component: Modal Add Review Success', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalReviewSuccess />, {
      MODALS: {
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: true,
        isModalBasketFailOpen: false,
        isModalBasketSuccessOpen: false,
        isModalBasketRemoveItemOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-add-review-success')).toBeInTheDocument();
  });
});
