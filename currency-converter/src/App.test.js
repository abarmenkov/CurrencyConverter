import { render, screen } from '@testing-library/react';
import Converter from './components/Converter';

test('renders button', () => {
  render(<Converter />);
  const linkElement = screen.getByRole('Button');
  expect(linkElement).toBeInTheDocument();
  screen.debug()
});
