import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import { BiCheck, BiStar, BiUser } from 'react-icons/bi';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof Autocomplete.Option> = {
  title: 'Forms/Autocomplete/Option',
  component: Autocomplete.Option,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual selectable option within the autocomplete list. Supports custom content and styling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete.Option>;

export const Default: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
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
        story: 'Default option styling.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input placeholder="Select user..." />
      <Autocomplete.List>
        <Autocomplete.Option value="user1">
          <span className="flex items-center gap-2">
            <BiUser className="w-4 h-4" />
            John Doe
          </span>
        </Autocomplete.Option>
        <Autocomplete.Option value="user2">
          <span className="flex items-center gap-2">
            <BiUser className="w-4 h-4" />
            Jane Smith
          </span>
        </Autocomplete.Option>
        <Autocomplete.Option value="user3">
          <span className="flex items-center gap-2">
            <BiUser className="w-4 h-4" />
            Bob Johnson
          </span>
        </Autocomplete.Option>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with leading icons.',
      },
    },
  },
};

export const WithCheckmark: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen defaultValue="banana" className="w-64">
      <Autocomplete.Input />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option key={option.value} value={option.value}>
            <span className="flex items-center justify-between w-full">
              {option.label}
              {option.value === 'banana' && <BiCheck className="w-4 h-4 text-green-500" />}
            </span>
          </Autocomplete.Option>
        ))}
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Selected option with checkmark indicator.',
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-72">
      <Autocomplete.Input placeholder="Select plan..." />
      <Autocomplete.List>
        <Autocomplete.Option value="basic">
          <div className="flex flex-col">
            <span className="font-medium">Basic</span>
            <span className="text-xs text-gray-500">Up to 5 users</span>
          </div>
        </Autocomplete.Option>
        <Autocomplete.Option value="pro">
          <div className="flex flex-col">
            <span className="font-medium flex items-center gap-1">
              Pro <BiStar className="w-3 h-3 text-yellow-500" />
            </span>
            <span className="text-xs text-gray-500">Up to 25 users</span>
          </div>
        </Autocomplete.Option>
        <Autocomplete.Option value="enterprise">
          <div className="flex flex-col">
            <span className="font-medium">Enterprise</span>
            <span className="text-xs text-gray-500">Unlimited users</span>
          </div>
        </Autocomplete.Option>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with title and description text.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input />
      <Autocomplete.List>
        <Autocomplete.Option value="apple">Apple</Autocomplete.Option>
        <Autocomplete.Option value="banana" disabled>
          Banana (Out of stock)
        </Autocomplete.Option>
        <Autocomplete.Option value="cherry">Cherry</Autocomplete.Option>
        <Autocomplete.Option value="date" disabled>
          Date (Out of stock)
        </Autocomplete.Option>
        <Autocomplete.Option value="elderberry">Elderberry</Autocomplete.Option>
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Some options disabled and not selectable.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Autocomplete options={sampleOptions} defaultOpen className="w-64">
      <Autocomplete.Input />
      <Autocomplete.List>
        {sampleOptions.map((option) => (
          <Autocomplete.Option
            key={option.value}
            value={option.value}
            className="hover:bg-purple-100 focus:bg-purple-100"
          >
            {option.label}
          </Autocomplete.Option>
        ))}
      </Autocomplete.List>
    </Autocomplete>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with custom hover/focus styling.',
      },
    },
  },
};
