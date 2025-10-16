import { fireEvent, render, screen } from '@testing-library/react';
import AddWidgetButton from './AddWidgetButton';

describe('AddWidgetButton', () => {
  it('renders correctly', () => {
    render(<AddWidgetButton onAdd={() => {}} />);
    expect(screen.getByText(/add widget/i)).toBeInTheDocument();
  });

  it('calls onAdd when clicked', () => {
    const handleAdd = jest.fn();
    render(<AddWidgetButton onAdd={handleAdd} />);

    fireEvent.click(screen.getByText(/add widget/i));
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
