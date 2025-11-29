import type { Meta, StoryObj } from '@storybook/react';
import { BiCheck, BiStar, BiUser } from 'react-icons/bi';
import { Heading } from '../../typography/Heading/Heading';
import { Text } from '../../typography/Text/Text';
import { List } from './List';

const meta = {
  title: 'Basic/Data Display/List',
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
      <List.Item><Text>First item</Text></List.Item>
      <List.Item><Text>Second item</Text></List.Item>
      <List.Item><Text>Third item</Text></List.Item>
    </List>
  ),
};

export const Ordered: Story = {
  args: {},
  render: () => (
    <List ordered>
      <List.Item><Text>Step one</Text></List.Item>
      <List.Item><Text>Step two</Text></List.Item>
      <List.Item><Text>Step three</Text></List.Item>
    </List>
  ),
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <Heading as="h3" level="h6">Default</Heading>
        <List>
          <List.Item><Text>Item one</Text></List.Item>
          <List.Item><Text>Item two</Text></List.Item>
          <List.Item><Text>Item three</Text></List.Item>
        </List>
      </div>
      <div>
        <Heading as="h3" level="h6">Divided</Heading>
        <List variant="divided">
          <List.Item><Text>Item one</Text></List.Item>
          <List.Item><Text>Item two</Text></List.Item>
          <List.Item><Text>Item three</Text></List.Item>
        </List>
      </div>
      <div>
        <Heading as="h3" level="h6">Bordered</Heading>
        <List variant="bordered">
          <List.Item><Text>Item one</Text></List.Item>
          <List.Item><Text>Item two</Text></List.Item>
          <List.Item><Text>Item three</Text></List.Item>
        </List>
      </div>
      <div>
        <Heading as="h3" level="h6">Interactive</Heading>
        <List variant="interactive">
          <List.Item><Text>Hover me</Text></List.Item>
          <List.Item><Text>And me</Text></List.Item>
          <List.Item><Text>Me too!</Text></List.Item>
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
        <Text>Task completed</Text>
      </List.Item>
      <List.Item>
        <BiCheck className="text-green-600" />
        <Text>Tests passing</Text>
      </List.Item>
      <List.Item>
        <BiCheck className="text-green-600" />
        <Text>Documentation updated</Text>
      </List.Item>
    </List>
  ),
};

export const FeatureList: Story = {
  args: {},
  render: () => (
    <div className="max-w-md">
      <Heading as="h2" level="h5">Premium Features</Heading>
      <List variant="divided">
        <List.Item>
          <BiStar className="text-yellow-500" />
          <div className="flex flex-col">
            <Text weight="medium">Unlimited projects</Text>
            <Text size="small" color="secondary">Create as many as you need</Text>
          </div>
        </List.Item>
        <List.Item>
          <BiStar className="text-yellow-500" />
          <div className="flex flex-col">
            <Text weight="medium">Priority support</Text>
            <Text size="small" color="secondary">Get help when you need it</Text>
          </div>
        </List.Item>
        <List.Item>
          <BiStar className="text-yellow-500" />
          <div className="flex flex-col">
            <Text weight="medium">Advanced analytics</Text>
            <Text size="small" color="secondary">Track your performance</Text>
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
          <Text>Profile Settings</Text>
        </List.Item>
        <List.Item>
          <BiUser />
          <Text>Account Preferences</Text>
        </List.Item>
        <List.Item>
          <BiUser />
          <Text>Privacy & Security</Text>
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
          <Text>Main item one</Text>
          <List>
            <List.Item><Text>Sub-item 1a</Text></List.Item>
            <List.Item><Text>Sub-item 1b</Text></List.Item>
          </List>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex flex-col gap-2">
          <Text>Main item two</Text>
          <List>
            <List.Item><Text>Sub-item 2a</Text></List.Item>
            <List.Item><Text>Sub-item 2b</Text></List.Item>
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
            <Text>Task item</Text>
            <Text size="small" color="secondary">Due today</Text>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex items-center justify-between w-full">
            <Text>Another task</Text>
            <Text size="small" color="secondary">Due tomorrow</Text>
          </div>
        </List.Item>
        <List.Item>
          <div className="flex items-center justify-between w-full">
            <Text>Final task</Text>
            <Text size="small" color="success">Completed</Text>
          </div>
        </List.Item>
      </List>
    </div>
  ),
};
