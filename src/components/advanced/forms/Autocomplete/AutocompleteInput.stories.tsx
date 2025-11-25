import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import { AutocompleteInput } from './AutocompleteInput';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof AutocompleteInput> = {
  title: 'Forms/Autocomplete/Input',
  component: AutocompleteInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The input field for the autocomplete component. Handles user input and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AutocompleteInput>;

export const Default: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} className="w-64">
      <Autocomplete.Input />
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
        story: 'Default input with standard placeholder.',
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} className="w-64">
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
        story: 'Input with a custom placeholder text.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} disabled className="w-64">
      <Autocomplete.Input disabled placeholder="Disabled..." />
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
        story: 'Disabled input state.',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultValue="cherry" className="w-64">
      <Autocomplete.Input />
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
        story: 'Input with a pre-selected default value.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} className="w-64">
      <Autocomplete.Input
        className="border-2 border-purple-500 focus:border-purple-700 rounded-lg"
        placeholder="Custom styled..."
      />
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
        story: 'Input with custom className styling.',
      },
    },
  },
};

export const WithEmptyState: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} className="w-64">
      <Autocomplete.Input placeholder="Type 'xyz' to see empty state..." />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
        <Autocomplete.Empty>No fruits found</Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with empty state message when no results match.',
      },
    },
  },
};
