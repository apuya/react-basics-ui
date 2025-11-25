import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider component for selecting numeric values within a range. Commonly used for volume controls, price ranges, filters, and settings. Provides intuitive interaction and visual feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the slider',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    value: {
      control: 'number',
      description: 'Current value (controlled)',
    },
    defaultValue: {
      control: 'number',
      description: 'Default value (uncontrolled)',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the current value',
    },
    showMinMax: {
      control: 'boolean',
      description: 'Whether to show min/max labels',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic slider with default settings (0-100 range).',
      },
    },
  },
  args: {
    label: 'Volume',
    defaultValue: 50,
  },
};

export const WithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider displaying the current value above the control.',
      },
    },
  },
  args: {
    label: 'Brightness',
    defaultValue: 75,
    showValue: true,
  },
};

export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider showing minimum and maximum values for context.',
      },
    },
  },
  args: {
    label: 'Temperature',
    min: 60,
    max: 80,
    defaultValue: 72,
    showMinMax: true,
  },
};

export const WithValueAndMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider displaying both current value and min/max range.',
      },
    },
  },
  args: {
    label: 'Price Range',
    min: 0,
    max: 1000,
    defaultValue: 500,
    showValue: true,
    showMinMax: true,
  },
};

export const CustomRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with custom min/max range and step value.',
      },
    },
  },
  args: {
    label: 'Font Size',
    min: 12,
    max: 48,
    step: 2,
    defaultValue: 16,
    showValue: true,
    formatValue: (val) => `${val}px`,
  },
};

export const SmallSteps: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider with fine-grained control using decimal steps.',
      },
    },
  },
  args: {
    label: 'Opacity',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.5,
    showValue: true,
    formatValue: (val) => `${(val * 100).toFixed(0)}%`,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled slider that cannot be interacted with.',
      },
    },
  },
  args: {
    label: 'Disabled Setting',
    defaultValue: 30,
    disabled: true,
    showValue: true,
  },
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider without visible label. Ensure accessible name is provided via aria-label.',
      },
    },
  },
  args: {
    'aria-label': 'Adjust volume',
    defaultValue: 50,
    showMinMax: true,
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled slider with external state management.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="w-80 space-y-4">
        <Slider
          label="Controlled Slider"
          value={value}
          onValueChange={setValue}
          showValue
        />
        <div className="flex gap-2">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            onClick={() => setValue(100)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

export const VolumeControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a volume control with percentage display.',
      },
    },
  },
  render: () => {
    const [volume, setVolume] = useState(65);
    
    return (
      <div className="w-80">
        <Slider
          label="Volume"
          value={volume}
          onValueChange={setVolume}
          showValue
          formatValue={(val) => `${val}%`}
        />
      </div>
    );
  },
};

export const PriceFilter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a price filter slider with currency formatting.',
      },
    },
  },
  render: () => {
    const [price, setPrice] = useState(5000);
    
    return (
      <div className="w-80">
        <Slider
          label="Maximum Price"
          min={0}
          max={10000}
          step={100}
          value={price}
          onValueChange={setPrice}
          showValue
          showMinMax
          formatValue={(val) => `$${val.toLocaleString()}`}
        />
      </div>
    );
  },
};

export const MultipleSliders: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple sliders in a settings panel layout.',
      },
    },
  },
  render: () => {
    const [settings, setSettings] = useState({
      volume: 70,
      brightness: 80,
      contrast: 50,
    });
    
    return (
      <div className="w-80 space-y-6">
        <Slider
          label="Volume"
          value={settings.volume}
          onValueChange={(val) => setSettings({ ...settings, volume: val })}
          showValue
          formatValue={(val) => `${val}%`}
        />
        <Slider
          label="Brightness"
          value={settings.brightness}
          onValueChange={(val) => setSettings({ ...settings, brightness: val })}
          showValue
          formatValue={(val) => `${val}%`}
        />
        <Slider
          label="Contrast"
          value={settings.contrast}
          onValueChange={(val) => setSettings({ ...settings, contrast: val })}
          showValue
          formatValue={(val) => `${val}%`}
        />
      </div>
    );
  },
};

export const TemperatureControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Temperature control slider with Fahrenheit display.',
      },
    },
  },
  render: () => {
    const [temp, setTemp] = useState(72);
    
    return (
      <div className="w-80">
        <Slider
          label="Room Temperature"
          min={60}
          max={85}
          value={temp}
          onValueChange={setTemp}
          showValue
          showMinMax
          formatValue={(val) => `${val}°F`}
        />
      </div>
    );
  },
};
