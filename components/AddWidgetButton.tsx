'use client';

import { Button } from './ui/button';

type AddWidgetButtonProps = {
  onAdd: () => void;
};

export default function AddWidgetButton({ onAdd }: AddWidgetButtonProps) {
  return (
    <Button onClick={onAdd}>
      <span aria-hidden="true">+</span> Add Widget
    </Button>
  );
}
