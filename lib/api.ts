import {
  CreateWidgetResponse,
  DeleteWidgetResponse,
  GetWidgetsResponse,
  UpdateWidgetResponse,
  Widget,
} from './types';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Request failed (${res.status}): ${msg}`);
  }
  return res.json() as Promise<T>;
}

const API_BASE = '/api/widgets';

export async function getWidgets(): Promise<Widget[]> {
  const data = await request<GetWidgetsResponse>(API_BASE);
  return data.widgets;
}

export async function createWidget(): Promise<Widget> {
  const data = await request<CreateWidgetResponse>(API_BASE, {
    method: 'POST',
  });
  return data;
}

export async function updateWidget(id: string, text: string): Promise<Widget> {
  const data = await request<UpdateWidgetResponse>(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ text }),
  });
  return data;
}

export async function deleteWidget(id: string): Promise<boolean> {
  const data = await request<DeleteWidgetResponse>(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  return data.success;
}
