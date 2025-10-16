/** @jest-environment node */

import { GET, POST } from '@/app/api/widgets/route';
import { addWidget, getWidgets } from '@/lib/db';

jest.mock('@/lib/db');

describe('/api/widgets route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('returns all widgets', async () => {
      const widgets = [
        { id: '1', text: 'Hello' },
        { id: '2', text: 'World' },
      ];
      (getWidgets as jest.Mock).mockReturnValue(widgets);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(widgets);
      expect(getWidgets).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST', () => {
    it('creates a new widget with empty text', async () => {
      const widget = { id: '1', text: '' };
      (addWidget as jest.Mock).mockReturnValue(widget);

      const response = await POST();
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(widget);
      expect(addWidget).toHaveBeenCalledTimes(1);
    });
  });
});
