'use client';

type AddWidgetButtonProps = {
  onAdd: () => void;
};

export default function AddWidgetButton({ onAdd }: AddWidgetButtonProps) {
  return <button onClick={onAdd}>+ Add Widget</button>;
}
