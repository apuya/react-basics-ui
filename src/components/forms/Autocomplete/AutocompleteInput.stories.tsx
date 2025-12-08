import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';

const meta: Meta<typeof Autocomplete.Input> = {
  title: 'Advanced/Forms/Autocomplete/Input',
  component: Autocomplete.Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The input field for Autocomplete. Handles user input, keyboard navigation, and displays selected values. Must be used within Autocomplete context.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: AutocompleteOptionData[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

// ============================================================================
// INPUT ISOLATION - Demonstrating Input without List
// ============================================================================

export const InputWithoutList: Story = {
  name: 'Input Without List (True Isolation)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          Input component renders independently. Typing updates the value, but no dropdown appears since List is not rendered.
        </p>
        <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={sampleOptions}>
          <Autocomplete.Input placeholder="Type here (no dropdown)..." />
          {/* No List component - demonstrates true isolation */}
        </Autocomplete>
        <div className="text-xs text-gray-500">Current value: {value || 'None'}</div>
      </div>
    );
  },
};

// ============================================================================
// PLACEHOLDER & VALUE DISPLAY
// ============================================================================

export const PlaceholderVariations: Story = {
  name: 'Placeholder Variations',
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Default placeholder</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input placeholder="Search..." />
        </Autocomplete>
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Custom placeholder with emoji</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input placeholder="🔍 Search fruits..." />
        </Autocomplete>
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Empty placeholder</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input placeholder="" />
        </Autocomplete>
      </div>
    </div>
  ),
};

export const ValueDisplay: Story = {
  name: 'Value Display Behavior',
  render: () => {
    const [value, setValue] = useState('banana');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          In single selection mode, Input displays the selected option's label
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
        >
          <Autocomplete.Input placeholder="Select a fruit..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">Selected value: {value}</div>
      </div>
    );
  },
};

export const MultipleValueDisplay: Story = {
  name: 'Multiple Selection (Empty Input)',
  render: () => {
    const [value, setValue] = useState<string[]>(['apple', 'cherry']);
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          In multiple mode, Input remains empty (selected values shown elsewhere)
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string[])}
          options={sampleOptions}
          multiple
        >
          <Autocomplete.Input placeholder="Select fruits..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">
          Selected: {value.length > 0 ? value.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

// ============================================================================
// INPUT STATES
// ============================================================================

export const InputStates: Story = {
  name: 'Input States (Normal, Focus, Error, Disabled)',
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <label className="text-sm font-medium mb-1 block">Normal State</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input placeholder="Normal input..." />
        </Autocomplete>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Error State (Red border)</label>
        <Autocomplete options={sampleOptions} error>
          <Autocomplete.Input placeholder="Error state..." />
        </Autocomplete>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Disabled State</label>
        <Autocomplete options={sampleOptions} disabled>
          <Autocomplete.Input placeholder="Disabled..." />
        </Autocomplete>
      </div>
    </div>
  ),
};

export const FocusRing: Story = {
  name: 'Focus Ring (Blue #93c5fd)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Click the input to see the blue focus ring (#93c5fd) with 2px width and 2px offset
      </p>
      <Autocomplete options={sampleOptions}>
        <Autocomplete.Input placeholder="Click to focus..." />
      </Autocomplete>
      <div className="p-3 bg-blue-50 rounded text-xs text-gray-600">
        <strong>Focus ring uses:</strong> var(--semantic-border-focus) = #93c5fd
      </div>
    </div>
  ),
};

// ============================================================================
// SIZE VARIATIONS
// ============================================================================

export const SizeVariations: Story = {
  name: 'Size Variations (Small, Default, Large)',
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <label className="text-sm font-medium mb-1 block">Small (h-8, text-xs)</label>
        <Autocomplete options={sampleOptions} size="small">
          <Autocomplete.Input placeholder="Small input..." />
        </Autocomplete>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Default (h-10, text-sm)</label>
        <Autocomplete options={sampleOptions} size="default">
          <Autocomplete.Input placeholder="Default input..." />
        </Autocomplete>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Large (h-12, text-sm)</label>
        <Autocomplete options={sampleOptions} size="large">
          <Autocomplete.Input placeholder="Large input..." />
        </Autocomplete>
      </div>
    </div>
  ),
};

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

export const KeyboardNavigation: Story = {
  name: 'Keyboard Navigation',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          Focus the input and use keyboard controls
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
          defaultOpen
        >
          <Autocomplete.Input placeholder="Use arrow keys..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="p-3 bg-gray-50 rounded text-xs space-y-1">
          <div><strong>Keyboard shortcuts:</strong></div>
          <div>• ↓ Arrow Down: Navigate to next option</div>
          <div>• ↑ Arrow Up: Navigate to previous option</div>
          <div>• Enter: Select highlighted option</div>
          <div>• Escape: Close list and clear query</div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM STYLING
// ============================================================================

export const CustomStyling: Story = {
  name: 'Custom Styling via className',
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Purple border and focus ring</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input
            className="border-2 border-purple-500 focus-visible:ring-purple-500"
            placeholder="Custom purple styling..."
          />
        </Autocomplete>
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Rounded with background</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input
            className="rounded-full bg-blue-50"
            placeholder="Rounded with background..."
          />
        </Autocomplete>
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Custom padding</label>
        <Autocomplete options={sampleOptions}>
          <Autocomplete.Input
            className="px-6"
            placeholder="Extra horizontal padding..."
          />
        </Autocomplete>
      </div>
    </div>
  ),
};
