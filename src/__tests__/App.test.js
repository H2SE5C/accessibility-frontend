import { render, screen } from '@testing-library/react';
test('just testing', () => {
  render(<h1>hallo</h1>);
  const linkElement = screen.getByText("hallo");
  expect(linkElement).toBeInTheDocument();
});
