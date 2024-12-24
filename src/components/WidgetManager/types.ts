import type { ReactNode } from 'react';

export interface Widget {
  id: string;
  type: string;
  title: string;
  position: number;
  config: Record<string, any>;
  visible: boolean;
}

export interface WidgetDefinition {
  type: string;
  title: string;
  icon: ReactNode;
  defaultConfig: Record<string, any>;
  component: React.ComponentType<any>;
}