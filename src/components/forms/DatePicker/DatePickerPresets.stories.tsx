import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePickerPresets, DEFAULT_PRESETS } from './DatePickerPresets';
import type { DateRange } from './DatePicker.types';

const meta: Meta<typeof DatePickerPresets> = {
  title: 'Forms/DatePicker/DatePickerPresets',
  component: DatePickerPresets,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePickerPresets>;

export const Default: Story = {
  render: () => {
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);
    
    const handlePresetSelect = (range: DateRange) => {
      const preset = DEFAULT_PRESETS.find(p => {
        const r = p.getValue();
        return r.start?.getTime() === range.start?.getTime() && r.end?.getTime() === range.end?.getTime();
      });
      setSelectedPreset(preset?.label);
      console.log('Selected range:', range);
    };
    
    return (
      <DatePickerPresets
        presets={DEFAULT_PRESETS}
        onPresetSelect={handlePresetSelect}
        selectedPreset={selectedPreset}
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>('Last 7 days');
    
    const handlePresetSelect = (range: DateRange) => {
      const preset = DEFAULT_PRESETS.find(p => {
        const r = p.getValue();
        return r.start?.getTime() === range.start?.getTime() && r.end?.getTime() === range.end?.getTime();
      });
      setSelectedPreset(preset?.label);
    };
    
    return (
      <DatePickerPresets
        presets={DEFAULT_PRESETS}
        onPresetSelect={handlePresetSelect}
        selectedPreset={selectedPreset}
      />
    );
  },
};
