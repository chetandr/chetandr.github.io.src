import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const renderrer = render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
