import { describe, expect } from 'vitest';
import { LoadingScreen } from './loading-screen.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: Loading screen', () => {
  it('should render correct', () => {
    render(<LoadingScreen />);
    const loadingScreen = screen.getByTestId('loading-screen');

    expect(loadingScreen).toBeInTheDocument();
  });
});
