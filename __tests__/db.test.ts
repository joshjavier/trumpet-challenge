import {
  addWidget,
  deleteWidget,
  getWidgets,
  resetWidgets,
  updateWidget,
} from '@/lib/db';

describe('db.ts', () => {
  beforeEach(() => {
    resetWidgets();
  });

  it('should start with an empty widget list', () => {
    expect(getWidgets()).toEqual([]);
  });

  it('should add a new widget with empty text', () => {
    const widget = addWidget();
    expect(widget.text).toBe('');
    expect(getWidgets()).toHaveLength(1);
  });

  it('should update a widget text by id', () => {
    const widget = addWidget();
    const updated = updateWidget(widget.id, 'Hello');
    expect(updated.text).toBe('Hello');
  });

  it('should throw when updating non-existent widget', () => {
    expect(() => updateWidget('fake', 'Hello')).toThrow();
  });

  it('should delete a widget by id', () => {
    const widget = addWidget();
    deleteWidget(widget.id);
    expect(getWidgets()).toHaveLength(0);
  });
});
