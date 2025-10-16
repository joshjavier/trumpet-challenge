'use client';

import { useEffect, useState } from 'react';
import { updateWidget } from '@/lib/api';

type WidgetProps = {
  id: string;
  initialText?: string;
  onDelete?: (id: string) => void;
};

export default function Widget({
  id,
  initialText = '',
  onDelete,
}: WidgetProps) {
  const [text, setText] = useState(initialText);
  const [isSaving, setSaving] = useState(false);

  // Debounced save
  useEffect(() => {
    if (text === initialText) return;

    const handler = setTimeout(async () => {
      try {
        setSaving(true);
        await updateWidget(id, text);
      } finally {
        setSaving(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  return (
    <div>
      <textarea
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>{isSaving ? 'Saving...' : 'Saved'}</div>
      {onDelete && <button onClick={() => onDelete(id)}>Delete</button>}
    </div>
  );
}
