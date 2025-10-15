import { Widget } from './types';

let widgets: Widget[] = [];

export function getWidgets() {
  return widgets;
}

export function addWidget(text: string = '') {
  const id = crypto.randomUUID();
  const widget = { id, text };
  widgets.push(widget);
  return widget;
}

export function updateWidget(id: string, text: string) {
  const widget = widgets.find((widget) => widget.id === id);
  if (!widget) {
    throw new Error('widget not found');
  }
  widget.text = text;
  return widget;
}

export function deleteWidget(id: string) {
  widgets = widgets.filter((widget) => widget.id !== id);
}

export function resetWidgets() {
  widgets = [];
}
