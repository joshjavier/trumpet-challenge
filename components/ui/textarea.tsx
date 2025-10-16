import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';

function Textarea({
  className,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'form' | 'slot' | 'style'
>) {
  return (
    <TextareaAutosize
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-25 w-full resize-none rounded-xs border border-slate-300 bg-slate-50 p-[15px] text-base transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
