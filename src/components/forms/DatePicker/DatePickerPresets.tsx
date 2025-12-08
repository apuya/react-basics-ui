import { cn } from '@/lib/cn';
import { forwardRef, memo, useCallback, useMemo, Fragment } from 'react';
import type { DatePickerPresetsProps, PresetDateRange } from './DatePicker.types';
import {
  PRESETS_BASE_CLASSES,
  PRESETS_BASE_STYLE,
  PRESETS_STATIC_CLASSES,
  PRESETS_STATIC_STYLE,
  PRESETS_DIVIDER_CLASSES,
  PRESETS_DIVIDER_STYLE,
  PRESETS_ITEM_CLASSES,
  PRESETS_ITEM_STYLE,
  PRESETS_ITEM_ACTIVE_CLASSES,
} from './DatePicker.styles';

/**
 * Generate dynamic quarter presets for the last N quarters
 */
export function generateQuarterPresets(count: number = 8): PresetDateRange[] {
  const presets: PresetDateRange[] = [];
  const now = new Date();
  const currentQuarter = Math.floor(now.getMonth() / 3);
  const currentYear = now.getFullYear();

  for (let i = 0; i < count; i++) {
    // Calculate quarter and year going backwards
    let quarter = currentQuarter - i;
    let year = currentYear;
    
    while (quarter < 0) {
      quarter += 4;
      year -= 1;
    }

    const quarterNum = quarter + 1; // 1-indexed for display
    const startMonth = quarter * 3;
    
    // Calculate end of quarter (last day of the 3rd month)
    const endMonth = startMonth + 2;
    const endDay = new Date(year, endMonth + 1, 0).getDate();

    presets.push({
      label: `${year} Q${quarterNum}`,
      dividerBefore: i === 0,
      getValue: () => {
        const start = new Date(year, startMonth, 1);
        const end = new Date(year, endMonth, endDay);
        return { start, end };
      },
    });
  }

  return presets;
}

/**
 * Default preset date ranges
 */
export const DEFAULT_PRESETS: PresetDateRange[] = [
  // Quick picks
  {
    label: 'Today',
    getValue: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return { start: today, end: today };
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      return { start: yesterday, end: yesterday };
    },
  },
  // To-date presets
  {
    label: 'Week to date',
    dividerBefore: true,
    getValue: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dayOfWeek = now.getDay();
      const start = new Date(now);
      start.setDate(now.getDate() - dayOfWeek); // Sunday of this week
      return { start, end: now };
    },
  },
  {
    label: 'Month to date',
    getValue: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { start, end: now };
    },
  },
  {
    label: 'Quarter to date',
    getValue: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), currentQuarter * 3, 1);
      return { start, end: now };
    },
  },
  {
    label: 'Year to date',
    getValue: () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const start = new Date(now.getFullYear(), 0, 1);
      return { start, end: now };
    },
  },
  // Days-based presets
  {
    label: 'Last 7 days',
    dividerBefore: true,
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: 'Last 14 days',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 13);
      return { start, end };
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  {
    label: 'Last 60 days',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 59);
      return { start, end };
    },
  },
  {
    label: 'Last 3 months',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setMonth(start.getMonth() - 3);
      return { start, end };
    },
  },
  {
    label: 'Last 6 months',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setMonth(start.getMonth() - 6);
      return { start, end };
    },
  },
  {
    label: 'Last 12 months',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setMonth(start.getMonth() - 12);
      return { start, end };
    },
  },
  // Period-based presets
  {
    label: 'Last week',
    dividerBefore: true,
    getValue: () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const end = new Date(now);
      end.setDate(now.getDate() - dayOfWeek - 1); // Last Saturday
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(end.getDate() - 6); // Previous Sunday
      return { start, end };
    },
  },
  {
    label: 'Last month',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start, end };
    },
  },
  {
    label: 'Last quarter',
    getValue: () => {
      const now = new Date();
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const lastQuarterStart = currentQuarter === 0 ? 9 : (currentQuarter - 1) * 3;
      const year = currentQuarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const start = new Date(year, lastQuarterStart, 1);
      const end = new Date(year, lastQuarterStart + 3, 0);
      return { start, end };
    },
  },
  {
    label: 'Last year',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear() - 1, 11, 31);
      return { start, end };
    },
  },
  // Dynamic quarterly presets (last 8 quarters)
  ...generateQuarterPresets(8),
];

/**
 * DatePickerPresets - List of preset date range options
 * 
 * Displays a vertical list of preset date ranges that users
 * can click to quickly select common date ranges.
 */
export const DatePickerPresets = memo(
  forwardRef<HTMLDivElement, DatePickerPresetsProps>(
    (
      {
        presets = DEFAULT_PRESETS,
        onPresetSelect,
        selectedPreset,
        variant = 'static',
        className,
        ...props
      },
      ref
    ) => {
      const handlePresetClick = useCallback(
        (preset: PresetDateRange) => {
          const range = preset.getValue();
          onPresetSelect?.(range);
        },
        [onPresetSelect]
      );

      const isPositioned = variant === 'positioned';

      const presetsClasses = useMemo(
        () => cn(isPositioned ? PRESETS_BASE_CLASSES : PRESETS_STATIC_CLASSES, className),
        [isPositioned, className]
      );

      const presetsStyle = useMemo(
        () => (isPositioned ? PRESETS_BASE_STYLE : PRESETS_STATIC_STYLE),
        [isPositioned]
      );

      return (
        <div ref={ref} className={presetsClasses} style={presetsStyle} {...props}>
          {presets.map((preset, index) => (
            <Fragment key={preset.label}>
              {/* Add divider before items that start a new category */}
              {preset.dividerBefore && index > 0 && (
                <div className={PRESETS_DIVIDER_CLASSES} style={PRESETS_DIVIDER_STYLE} role="separator" />
              )}
              <button
                type="button"
                className={cn(
                  PRESETS_ITEM_CLASSES,
                  selectedPreset === preset.label && PRESETS_ITEM_ACTIVE_CLASSES
                )}
                style={PRESETS_ITEM_STYLE}
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </button>
            </Fragment>
          ))}
        </div>
      );
    }
  )
);

DatePickerPresets.displayName = 'DatePicker.Presets';
