import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { BiStar, BiUser, BiFolder } from 'react-icons/bi';

const meta: Meta<typeof Select.Option> = {
  title: 'Forms/Select/Option',
  component: Select.Option,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual selectable option within the select menu. Shows a checkmark when selected.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select.Option>;

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default option styling with text content.',
      },
    },
  },
};

export const WithSelectedState: Story = {
  render: () => (
    <Select defaultValue="2">
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2 (Selected)</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Option with selected state showing checkmark.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="1">Available Option</Select.Option>
        <Select.Option value="2" disabled>Disabled Option</Select.Option>
        <Select.Option value="3">Another Available Option</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled option that cannot be selected.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select a category..." />
      <Select.Menu>
        <Select.Option value="user">
          <span className="flex items-center gap-2">
            <BiUser className="w-4 h-4" />
            Users
          </span>
        </Select.Option>
        <Select.Option value="folder">
          <span className="flex items-center gap-2">
            <BiFolder className="w-4 h-4" />
            Documents
          </span>
        </Select.Option>
        <Select.Option value="star">
          <span className="flex items-center gap-2">
            <BiStar className="w-4 h-4" />
            Favorites
          </span>
        </Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with leading icons for visual context.',
      },
    },
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select a plan..." />
      <Select.Menu>
        <Select.Option value="free">
          <div className="flex flex-col">
            <span className="font-medium">Free</span>
            <span className="text-xs text-gray-500">Up to 5 users</span>
          </div>
        </Select.Option>
        <Select.Option value="pro">
          <div className="flex flex-col">
            <span className="font-medium">Pro</span>
            <span className="text-xs text-gray-500">Up to 25 users</span>
          </div>
        </Select.Option>
        <Select.Option value="enterprise">
          <div className="flex flex-col">
            <span className="font-medium">Enterprise</span>
            <span className="text-xs text-gray-500">Unlimited users</span>
          </div>
        </Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with title and description text.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Custom styled options..." />
      <Select.Menu>
        <Select.Option value="1" className="hover:bg-purple-100">
          Purple Hover
        </Select.Option>
        <Select.Option value="2" className="hover:bg-green-100">
          Green Hover
        </Select.Option>
        <Select.Option value="3" className="hover:bg-blue-100">
          Blue Hover
        </Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with custom hover styling via className.',
      },
    },
  },
};
