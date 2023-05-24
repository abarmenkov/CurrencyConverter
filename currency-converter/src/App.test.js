import { render, screen } from '@testing-library/react';
import Header from './components/Header'

describe('headertest', () => {
  test('renders header', () => {
    render(<Header />);
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
  });
})

