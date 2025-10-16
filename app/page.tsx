'use client';

import { useEffect, useState } from 'react';
import AddWidgetButton from '@/components/AddWidgetButton';
import Widget from '@/components/Widget';
import { createWidget, deleteWidget, getWidgets } from '@/lib/api';
import { Widget as WidgetType } from '@/lib/types';

export default function Home() {
  const [widgets, setWidgets] = useState<WidgetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load widgets on mount
    async function load() {
      try {
        const data = await getWidgets();
        setWidgets(data);
      } catch (err) {
        console.error('Failed to load widgets:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleAdd = async () => {
    try {
      const newWidget = await createWidget();
      setWidgets((prev) => [...prev, newWidget]);
    } catch (err) {
      console.error('Failed to create widget:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWidget(id);
      setWidgets((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error('Failed to delete widget:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-1 flex-col items-center pb-20">
      <h1 className="mt-14 mb-8 text-4xl font-bold tracking-tight text-neutral-700">
        Text Widget
      </h1>

      <AddWidgetButton onAdd={handleAdd} />

      <div className="space-y-2">
        {widgets.map((widget) => (
          <Widget
            key={widget.id}
            id={widget.id}
            initialText={widget.text}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
