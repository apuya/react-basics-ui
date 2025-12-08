import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';

const meta: Meta<typeof Autocomplete.List> = {
  title: 'Advanced/Forms/Autocomplete/List',
  component: Autocomplete.List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The dropdown list container for autocomplete options. Displays filtered results with Portal rendering, scrolling, and animations. Must be used within Autocomplete context.',
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
// LIST ISOLATION - Demonstrating List with minimal Input
// ============================================================================

export const ListAlwaysVisible: Story = {
  name: 'List Always Visible (Isolation)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        List component with defaultOpen and static positioning. Input is visually hidden to focus on List layout.
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        {/* Input required for context but visually hidden */}
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100 !pointer-events-auto">
          {sampleOptions.map((opt) => (
            <Autocomplete.Option key={opt.value} value={opt.value} />
          ))}
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Demonstrates: Padding, spacing, border, shadow, and option layout
      </div>
    </div>
  ),
};

// ============================================================================
// SCROLL BEHAVIOR
// ============================================================================

export const ScrollableList: Story = {
  name: 'Scrollable List (Many Options)',
  render: () => {
    const manyOptions: AutocompleteOptionData[] = Array.from({ length: 50 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i + 1}`,
    }));

    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          List with 50 options demonstrates scrolling behavior and max-height
        </p>
        <Autocomplete options={manyOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            {manyOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">
          max-height controlled by --component-autocomplete-max-height
        </div>
      </div>
    );
  },
};

// ============================================================================
// PORTAL & POSITIONING
// ============================================================================

export const PortalRendering: Story = {
  name: 'Portal Rendering (Default Behavior)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          By default, List renders in a Portal for proper z-index layering
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
          defaultOpen
        >
          <Autocomplete.Input placeholder="List renders in Portal..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Portal behavior:</strong> List is rendered outside the DOM hierarchy to avoid z-index conflicts
        </div>
      </div>
    );
  },
};

export const StaticPositioning: Story = {
  name: 'Static Positioning (Override)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Override Portal behavior with static positioning for specific layouts
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !relative !opacity-100">
          {sampleOptions.map((opt) => (
            <Autocomplete.Option key={opt.value} value={opt.value} />
          ))}
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Use !static and !relative to override Portal positioning
      </div>
    </div>
  ),
};

// ============================================================================
// ANIMATIONS & TRANSITIONS
// ============================================================================

export const OpenCloseAnimation: Story = {
  name: 'Open/Close Animation',
  render: () => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          List transitions with opacity animation (controlled by --component-autocomplete-transition-duration)
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle List: {isOpen ? 'Open' : 'Closed'}
        </button>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <Autocomplete.Input placeholder="Toggle to see animation..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">
          Watch opacity transition when opening/closing
        </div>
      </div>
    );
  },
};

// ============================================================================
// EMPTY STATES
// ============================================================================

export const EmptyList: Story = {
  name: 'Empty List (No Options)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        List renders empty state when no options are available
      </p>
      <Autocomplete options={[]} defaultOpen>
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Empty message="No items available" />
        </Autocomplete.List>
      </Autocomplete>
    </div>
  ),
};

export const FilteredEmpty: Story = {
  name: 'Filtered Empty State',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          Type "xyz" to see empty state when all options are filtered out
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
          defaultOpen
        >
          <Autocomplete.Input placeholder="Type 'xyz'..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM STYLING
// ============================================================================

export const CustomStyling: Story = {
  name: 'Custom List Styling',
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Custom border and shadow</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100 border-2 border-purple-500 rounded-lg shadow-xl">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Custom max-height</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100 max-h-32">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </div>
    </div>
  ),
};

// ============================================================================
// GROUPED CONTENT
// ============================================================================

export const WithGroupHeaders: Story = {
  name: 'List with Group Headers',
  render: () => {
    const groupedOptions = {
      fruits: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ],
      vegetables: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'lettuce', label: 'Lettuce' },
      ],
    };

    const allOptions = [...groupedOptions.fruits, ...groupedOptions.vegetables];

    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          Custom content can be added to List alongside Options
        </p>
        <Autocomplete options={allOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
              Fruits
            </div>
            {groupedOptions.fruits.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
              Vegetables
            </div>
            {groupedOptions.vegetables.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </div>
    );
  },
};
