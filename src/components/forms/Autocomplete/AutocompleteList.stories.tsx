import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof Autocomplete.List> = {
  title: 'Forms/Autocomplete/List',
  component: Autocomplete.List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The dropdown list container for autocomplete options. Displays filtered results based on user input.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete.List>;

export const Default: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input placeholder="Select a fruit..." />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default list displaying all options.',
      },
    },
  },
};

export const WithEmptyState: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input defaultValue="xyz" />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
        <Autocomplete.Empty>No results found</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List with empty state message when no options match.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input placeholder="Custom styled list..." />
      <Autocomplete.List className="border-2 border-purple-500 rounded-lg shadow-xl">
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List with custom border and shadow styling.',
      },
    },
  },
};

export const ManyOptions: Story = {
  render: () => {
    const manyOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'apricot', label: 'Apricot' },
      { value: 'banana', label: 'Banana' },
      { value: 'blackberry', label: 'Blackberry' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'coconut', label: 'Coconut' },
      { value: 'cranberry', label: 'Cranberry' },
      { value: 'date', label: 'Date' },
      { value: 'dragonfruit', label: 'Dragon Fruit' },
    ];
    return (
      <Autocomplete options={manyOptions} defaultOpen className="w-64">
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.List className="max-h-48 overflow-y-auto">
          {manyOptions.map((option) => (
            <Autocomplete.Option key={option.value} value={option.value}>
              {option.label}
            </Autocomplete.Option>
          ))}
        </Autocomplete.List>
      </Autocomplete>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Scrollable list with many options.',
      },
    },
  },
};

export const WithGroupedContent: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input placeholder="Select..." />
      <Autocomplete.List>
        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
          Fruits
        </div>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List with grouped section headers.',
      },
    },
  },
};
