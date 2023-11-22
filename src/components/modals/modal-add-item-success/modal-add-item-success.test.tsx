import { render, screen } from '@testing-library/react';
import { ModalAddItemSuccess } from './modal-add-item-success';
import { withHistory, withStore } from '../../../mocks/mock-component';

describe('Component: Modal Add Item Success', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalAddItemSuccess />, {
      MODALS: {
        isModalAddItemOpen: false,
        isModalAddItemSuccessOpen: true,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
        isModalBasketFailOpen: false,
        isModalBasketSuccessOpen: false,
        isModalBasketRemoveItemOpen: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('modal-add-item-success')).toBeInTheDocument();
  });
});
