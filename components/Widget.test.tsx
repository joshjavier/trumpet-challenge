import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { updateWidget } from '@/lib/api';
import Widget from './Widget';

jest.mock('@/lib/api');

describe('Widget', () => {
  const mockUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (updateWidget as jest.Mock).mockImplementation(mockUpdate);
  });

  it('renders with placeholder when no initial text is provided', () => {
    render(<Widget id="1" />);
    const textarea = screen.getByPlaceholderText(/start typing/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('');
  });

  it('renders with initial text', () => {
    render(<Widget id="1" initialText="Hello" />);
    const textarea = screen.getByText('Hello');
    expect(textarea).toBeInTheDocument();
  });

  it('updates local state when typing', () => {
    render(<Widget id="1" />);
    const textarea = screen.getByPlaceholderText(/start typing/i);
    fireEvent.change(textarea, { target: { value: 'New text' } });
    expect(textarea).toHaveValue('New text');
  });

  it('calls updateWidget after debounce delay', async () => {
    render(<Widget id="1" />);
    const textarea = screen.getByPlaceholderText(/start typing/i);
    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    // wait longer than debounce (500ms)
    await waitFor(() => {
      expect(updateWidget).toHaveBeenCalledWith('1', 'Hello world');
    });
  });

  it('indicates saving status', async () => {
    mockUpdate.mockImplementation(
      () => new Promise((res) => setTimeout(res, 50)),
    );
    render(<Widget id="1" />);
    const textarea = screen.getByPlaceholderText(/start typing/i);

    fireEvent.change(textarea, { target: { value: 'Typing...' } });

    expect(await screen.findByText(/saving/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/saving/i)).toBeNull());
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<Widget id="1" onDelete={handleDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
