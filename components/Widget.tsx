'use client';

import { useEffect, useState } from 'react';
import { Asterisk, Trash2Icon } from 'lucide-react';
import { updateWidget } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Textarea } from './ui/textarea';

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
  const [isFocused, setFocused] = useState(false);

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
    <div className="group flex gap-2">
      <div className="flex-1">
        <Textarea
          placeholder="Start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <div
          className={cn(
            'mt-1.5 ml-1.5 flex items-center gap-1 text-xs text-neutral-400 opacity-100 transition-opacity',
            !isFocused && 'opacity-0',
          )}
        >
          {isSaving ? (
            <>
              <Spinner aria-hidden="true" className="size-3" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Asterisk aria-hidden="true" className="size-3" />
              <span>Changes will be automatically saved</span>
            </>
          )}
        </div>
      </div>

      {onDelete && (
        <Button
          onClick={() => onDelete(id)}
          variant="ghost"
          size="icon"
          aria-label="Delete"
          className="shrink-0 text-neutral-400 opacity-0 transition-opacity duration-75 group-focus-within:opacity-100 group-hover:opacity-100 hover:bg-red-200"
        >
          <Trash2Icon />
        </Button>
      )}
    </div>
  );
}
