/** @jest-environment node */

import { NextRequest } from 'next/server';
import { DELETE, PUT } from '@/app/api/widgets/[id]/route';
import { deleteWidget, updateWidget } from '@/lib/db';

jest.mock('@/lib/db');

describe('/api/widgets/[id] route', () => {
  const params = Promise.resolve({ id: 'abc123' });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PUT', () => {
    it('updates a widget successfully', async () => {
      (updateWidget as jest.Mock).mockReturnValue({
        id: 'abc123',
        text: 'Updated',
      });

      const req = new Request('http://localhost', {
        method: 'PUT',
        body: JSON.stringify({ text: 'Updated' }),
      }) as NextRequest;

      const res = await PUT(req, { params });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({ id: 'abc123', text: 'Updated' });
      expect(updateWidget).toHaveBeenCalledTimes(1);
    });

    it('returns 400 if text is missing', async () => {
      const req = new Request('http://localhost', {
        method: 'PUT',
        body: JSON.stringify({}),
      }) as NextRequest;

      const res = await PUT(req, { params });
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toMatch(/Missing or invalid/);
      expect(updateWidget).not.toHaveBeenCalled();
    });

    it('returns 404 if widget not found', async () => {
      (updateWidget as jest.Mock).mockImplementation(() => {
        throw new Error('widget not found');
      });

      const req = new Request('http://localhost', {
        method: 'PUT',
        body: JSON.stringify({ text: 'Hello' }),
      }) as NextRequest;

      const res = await PUT(req, { params });
      const data = await res.json();

      expect(res.status).toBe(404);
      expect(data.error).toMatch(/not found/);
    });
  });

  describe('DELETE (idempotent)', () => {
    it('returns 200 when widget is successfully deleted', async () => {
      const req = new Request('http://localhost', { method: 'DELETE' });
      const res = await DELETE(req, { params });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(deleteWidget).toHaveBeenCalledWith('abc123');
    });

    it('returns 200 even if widget does not exist (idempotent)', async () => {
      (deleteWidget as jest.Mock).mockImplementation(() => {
        throw new Error('widget not found');
      });

      const req = new Request('http://localhost', { method: 'DELETE' });
      const res = await DELETE(req, { params });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({ success: true });
      expect(deleteWidget).toHaveBeenCalledWith('abc123');
    });

    it('returns 500 for unexpected internal errors', async () => {
      (deleteWidget as jest.Mock).mockImplementation(() => {
        throw new Error('database connection failed');
      });

      const req = new Request('http://localhost', { method: 'DELETE' });
      const res = await DELETE(req, { params });
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toMatch(/internal/i);
    });
  });
});
