import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Button } from '../Button';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider component for selecting numeric values within a range. Commonly used for volume controls, price ranges, filters, and settings.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showValue: { control: 'boolean' },
    showMinMax: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    label: 'Volume',
    defaultValue: 50,
  },
};

export const WithValueDisplay: Story = {
  args: {
    label: 'Brightness',
    defaultValue: 75,
    showValue: true,
    showMinMax: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Setting',
    defaultValue: 30,
    disabled: true,
    showValue: true,
  },
};

// ============================================================================
// Configurations
// ============================================================================

export const CustomFormats: Story = {
  render: () => (
    <Stack spacing="lg">
      <Slider
        label="Opacity"
        min={0}
        max={1}
        step={0.1}
        defaultValue={0.5}
        showValue
        formatValue={(val) => `${(val * 100).toFixed(0)}%`}
      />
      <Slider
        label="Font Size"
        min={12}
        max={48}
        step={2}
        defaultValue={16}
        showValue
        formatValue={(val) => `${val}px`}
      />
      <Slider
        label="Price"
        min={0}
        max={1000}
        step={50}
        defaultValue={500}
        showValue
        showMinMax
        formatValue={(val) => `$${val}`}
      />
    </Stack>
  ),
};

// ============================================================================
// Interactive Examples
// ============================================================================

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <Stack spacing="md">
        <Slider
          label="Controlled Slider"
          value={value}
          onValueChange={setValue}
          showValue
        />
        <Stack spacing="sm" direction="horizontal">
          <Button variant="secondary" size="small" onClick={() => setValue(0)}>
            Min
          </Button>
          <Button variant="secondary" size="small" onClick={() => setValue(50)}>
            Reset
          </Button>
          <Button variant="secondary" size="small" onClick={() => setValue(100)}>
            Max
          </Button>
        </Stack>
      </Stack>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      volume: 70,
      brightness: 80,
      contrast: 50,
    });
    
    const updateSetting = (key: keyof typeof settings) => (val: number) => {
      setSettings((prev) => ({ ...prev, [key]: val }));
    };
    
    return (
      <Stack spacing="lg">
        <Heading level="h4">Display Settings</Heading>
        <Slider
          label="Volume"
          value={settings.volume}
          onValueChange={updateSetting('volume')}
          showValue
          formatValue={(val) => `${val}%`}
        />
        <Slider
          label="Brightness"
          value={settings.brightness}
          onValueChange={updateSetting('brightness')}
          showValue
          formatValue={(val) => `${val}%`}
        />
        <Slider
          label="Contrast"
          value={settings.contrast}
          onValueChange={updateSetting('contrast')}
          showValue
          formatValue={(val) => `${val}%`}
        />
        <Text size="caption" color="secondary">
          Current: Volume {settings.volume}%, Brightness {settings.brightness}%, Contrast {settings.contrast}%
        </Text>
      </Stack>
    );
  },
};
