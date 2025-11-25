import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { Button } from '../Button';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof Autocomplete.Empty> = {
  title: 'Forms/Autocomplete/Empty',
  component: Autocomplete.Empty,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Empty state message displayed when no options match the search query.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete.Empty>;

export const Default: Story = {
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
        story: 'Default empty state message.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input defaultValue="xyz" />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
        <Autocomplete.Empty>
          <span className="flex flex-col items-center gap-2 py-2">
            <BiSearch className="w-6 h-6 text-gray-400" />
            <span>No matches found</span>
          </span>
        </Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state with search icon.',
      },
    },
  },
};

export const WithSuggestion: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input defaultValue="mango" />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
        <Autocomplete.Empty>
          <span className="flex flex-col items-center gap-1 py-2 text-sm">
            <span>No results for "mango"</span>
            <span className="text-gray-500">Try searching for apple or banana</span>
          </span>
        </Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state with search suggestions.',
      },
    },
  },
};

export const WithAction: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input defaultValue="kiwi" />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
        <Autocomplete.Empty>
          <span className="flex flex-col items-center gap-2 py-2">
            <span>No results found</span>
            <Button size="small" variant="tertiary">
              <BiPlus className="w-4 h-4 mr-1" />
              Add "kiwi"
            </Button>
          </span>
        </Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state with action button to add new item.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input defaultValue="xyz" />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            {option.label}
          </Autocomplete.Option>
        ))}
        <Autocomplete.Empty className="text-purple-600 bg-purple-50 rounded-md">
          No matching fruits
        </Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom colors and styling.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input defaultValue="search" />
      <Autocomplete.List>
        <Autocomplete.Empty>
          <span className="flex items-center gap-2 py-2">
            <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Searching...
          </span>
        </Autocomplete.Empty>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state showing loading spinner while searching.',
      },
    },
  },
};
