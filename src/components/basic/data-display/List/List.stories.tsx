import type { Meta, StoryObj } from '@storybook/react';
import { BiCheck, BiStar, BiUser } from 'react-icons/bi';
import { List } from './List';

const meta = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A list component for displaying structured lists of items. Supports ordered/unordered lists with multiple visual variants (default, divided, bordered, interactive).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'divided', 'bordered', 'interactive'],
      description: 'Visual variant of the list',
    },
    ordered: {
      control: 'boolean',
      description: 'Render as ordered list (ol) instead of unordered (ul)',
    },
    children: {
      description: 'List items (List.Item components)',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <List>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
  ),
};

export const Ordered: Story = {
  args: {},
  render: () => (
    <List ordered>
      <List.Item>Step one</List.Item>
      <List.Item>Step two</List.Item>
      <List.Item>Step three</List.Item>
    </List>
  ),
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <List>
          <List.Item>Item one</List.Item>
          <List.Item>Item two</List.Item>
          <List.Item>Item three</List.Item>
        </List>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Divided</h3>
        <List variant="divided">
          <List.Item>Item one</List.Item>
          <List.Item>Item two</List.Item>
          <List.Item>Item three</List.Item>
        </List>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Bordered</h3>
        <List variant="bordered">
          <List.Item>Item one</List.Item>
          <List.Item>Item two</List.Item>
          <List.Item>Item three</List.Item>
        </List>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Interactive</h3>
        <List variant="interactive">
          <List.Item>Hover me</List.Item>
          <List.Item>And me</List.Item>
          <List.Item>Me too!</List.Item>
        </List>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {},
  render: () => (
    <List variant="divided">
      <List.Item>
        <BiCheck className="text-green-600" />
        <span>Task completed</span>
      </List.Item>
      <List.Item>
        <BiCheck className="text-green-600" />
        <span>Tests passing</span>
      </List.Item>
      <List.Item>
        <BiCheck className="text-green-600" />
        <span>Documentation updated</span>
      </List.Item>
    </List>
  ),
};

export const FeatureList: Story = {
  args: {},
  render: () => (
    <div className="max-w-md">
      <h2 className="text-lg font-semibold mb-4">Premium Features</h2>
      <List variant="divided">
        <List.Item>
          <BiStar className="text-yellow-500" />
          <div className="flex flex-col">
            <span className="font-medium">Unlimited projects</span>
            <span className="text-sm text-gray-600">Create as many as you need</span>
          </div>
        </List.Item>
        <List.Item>
          <BiStar className="text-yellow-500" />
          <div className="flex flex-col">
            <span className="font-medium">Priority support</span>
            <span className="text-sm text-gray-600">Get help when you need it</span>
          </div>
        </List.Item>
        <List.Item>
          <BiStar className="text-yellow-500" />
          <div className="flex flex-col">
            <span className="font-medium">Advanced analytics</span>
            <span className="text-sm text-gray-600">Track your performance</span>
          </div>
        </List.Item>
      </List>
    </div>
  ),
};

export const InteractiveMenu: Story = {
  args: {},
  render: () => (
    <div className="max-w-xs">
      <List variant="interactive">
        <List.Item>
          <BiUser />
          <span>Profile Settings</span>
        </List.Item>
        <List.Item>
          <BiUser />
          <span>Account Preferences</span>
        </List.Item>
        <List.Item>
          <BiUser />
          <span>Privacy & Security</span>
        </List.Item>
      </List>
    </div>
  ),
};

export const NestedList: Story = {
  args: {},
  render: () => (
    <List ordered>
      <List.Item>
        <div className="flex flex-col gap-2">
          <span>Main item one</span>
          <List>
            <List.Item>Sub-item 1a</List.Item>
            <List.Item>Sub-item 1b</List.Item>
          </List>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex flex-col gap-2">
          <span>Main item two</span>
          <List>
            <List.Item>Sub-item 2a</List.Item>
            <List.Item>Sub-item 2b</List.Item>
          </List>
        </div>
      </List.Item>
    </List>
  ),
};

export const MixedContent: Story = {
  args: {},
  render: () => (
    <div className="max-w-md">
      <List variant="bordered">
        <List.Item>
          <div className="flex items-center justify-between w-full">
            <span>Task item</span>
            <span className="text-sm text-gray-500">Due today</span>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex items-center justify-between w-full">
            <span>Another task</span>
            <span className="text-sm text-gray-500">Due tomorrow</span>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex items-center justify-between w-full">
            <span>Final task</span>
            <span className="text-sm text-green-600">Completed</span>
          </div>
        </List.Item>
      </List>
    </div>
  ),
};
