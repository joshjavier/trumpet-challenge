/** @jest-environment node */

import {
  createWidget,
  deleteWidget,
  getWidgets,
  updateWidget,
} from '@/lib/api';

global.fetch = jest.fn();

describe('api.ts', () => {
  const mockWidget = { id: '123', text: 'Hello' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getWidgets', () => {
    it('returns a list of widgets on success', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ widgets: [mockWidget] }),
      });

      const widgets = await getWidgets();
      expect(fetch).toHaveBeenCalledWith('/api/widgets', expect.any(Object));
      expect(widgets).toEqual([mockWidget]);
    });

    it('throws an error on failed response', async () => {
      (fetch as jest.Mock).mockReturnValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Server error',
      });

      await expect(getWidgets()).rejects.toThrow(/500/);
    });
  });

  describe('createWidget', () => {
    it('creates and returns a new widget', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWidget,
      });

      const result = await createWidget();
      expect(fetch).toHaveBeenCalledWith(
        '/api/widgets',
        expect.objectContaining({ method: 'POST' }),
      );
      expect(result).toEqual(mockWidget);
    });
  });

  describe('updateWidget', () => {
    it('updates and returns a widget', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWidget,
      });

      const result = await updateWidget('123', 'Hello');
      expect(fetch).toHaveBeenCalledWith(
        '/api/widgets/123',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ text: 'Hello' }),
        }),
      );
      expect(result).toEqual(mockWidget);
    });
  });

  describe('deleteWidget', () => {
    it('returns true when successful', async () => {
      (fetch as jest.Mock).mockReturnValueOnce({
        ok: true,
        json: () => ({ success: true }),
      });

      const success = await deleteWidget('123');
      expect(fetch).toHaveBeenCalledWith(
        '/api/widgets/123',
        expect.objectContaining({ method: 'DELETE' }),
      );
      expect(success).toBe(true);
    });
  });

  describe('network failures', () => {
    it('propagates fetch rejection errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network down'));

      await expect(getWidgets()).rejects.toThrow('Network down');
      expect(fetch).toHaveBeenCalledWith('/api/widgets', expect.any(Object));
    });
  });
});
