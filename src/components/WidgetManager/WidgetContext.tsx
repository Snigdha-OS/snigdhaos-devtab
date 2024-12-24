import { createContext, useContext, useState } from 'react';
import type { Widget, WidgetDefinition } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface WidgetContextType {
  widgets: Widget[];
  availableWidgets: WidgetDefinition[];
  addWidget: (type: string) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  deleteWidget: (id: string) => void;
  reorderWidgets: (startIndex: number, endIndex: number) => void;
}

const WidgetContext = createContext<WidgetContextType | null>(null);

export function WidgetProvider({ children, availableWidgets }: { 
  children: React.ReactNode;
  availableWidgets: WidgetDefinition[];
}) {
  const [widgets, setWidgets] = useLocalStorage<Widget[]>('widgets', []);

  const addWidget = (type: string) => {
    const definition = availableWidgets.find(w => w.type === type);
    if (!definition) return;

    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      title: definition.title,
      position: widgets.length,
      config: definition.defaultConfig,
      visible: true,
    };

    setWidgets([...widgets, newWidget]);
  };

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets(widgets.map(widget =>
      widget.id === id ? { ...widget, ...updates } : widget
    ));
  };

  const deleteWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const reorderWidgets = (startIndex: number, endIndex: number) => {
    const result = Array.from(widgets);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setWidgets(result.map((widget, index) => ({
      ...widget,
      position: index,
    })));
  };

  return (
    <WidgetContext.Provider value={{
      widgets,
      availableWidgets,
      addWidget,
      updateWidget,
      deleteWidget,
      reorderWidgets,
    }}>
      {children}
    </WidgetContext.Provider>
  );
}

export const useWidgets = () => {
  const context = useContext(WidgetContext);
  if (!context) throw new Error('useWidgets must be used within a WidgetProvider');
  return context;
};