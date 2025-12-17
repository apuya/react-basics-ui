import { createComponentContext } from '@/lib/createComponentContext';

export type TimelinePosition = 'left' | 'right' | 'alternate';
export type TimelineVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TimelineSize = 'sm' | 'md' | 'lg';

export interface TimelineContextValue {
  position: TimelinePosition;
  size: TimelineSize;
  itemIndex: number;
}

const {
  Context: TimelineContext,
  useOptionalContext: useTimelineContext,
} = createComponentContext<TimelineContextValue>('Timeline');

export { TimelineContext, useTimelineContext };
