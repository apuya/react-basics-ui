import type { Meta, StoryObj } from '@storybook/react';
import { BiGroup, BiSmile } from 'react-icons/bi';
import { Avatar } from './Avatar';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An avatar component for displaying user profile images, initials, or fallback icons. Supports multiple sizes and shapes (circular, square).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circular', 'square'],
      description: 'Shape of the avatar',
    },
    children: {
      description: 'Avatar content (Image, Fallback, or both)',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <Avatar.Fallback />
    </Avatar>
  ),
};

export const WithImage: Story = {
  args: {},
  render: () => (
    <Avatar>
      <Avatar.Image
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="User Avatar"
      />
    </Avatar>
  ),
};

export const WithInitials: Story = {
  args: {},
  render: () => (
    <Avatar>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  ),
};

export const WithCustomIcon: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar>
        <Avatar.Fallback icon={BiGroup} />
      </Avatar>
      <Avatar>
        <Avatar.Fallback icon={BiSmile} />
      </Avatar>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4 items-end">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="xs">
          <Avatar.Fallback size="xs">XS</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="sm">
          <Avatar.Fallback size="sm">SM</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="md">
          <Avatar.Fallback size="md">MD</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <Avatar.Fallback size="lg">LG</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="xl">
          <Avatar.Fallback size="xl">XL</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="2xl">
          <Avatar.Fallback size="2xl">2XL</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">2xl</span>
      </div>
    </div>
  ),
};

export const AllShapes: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="circular">
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Circular"
          />
        </Avatar>
        <span className="text-xs text-gray-600">circular</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="square">
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Square"
          />
        </Avatar>
        <span className="text-xs text-gray-600">square</span>
      </div>
    </div>
  ),
};

export const SizesWithIcons: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4 items-end">
      <Avatar size="xs">
        <Avatar.Fallback size="xs" />
      </Avatar>
      <Avatar size="sm">
        <Avatar.Fallback size="sm" />
      </Avatar>
      <Avatar size="md">
        <Avatar.Fallback size="md" />
      </Avatar>
      <Avatar size="lg">
        <Avatar.Fallback size="lg" />
      </Avatar>
      <Avatar size="xl">
        <Avatar.Fallback size="xl" />
      </Avatar>
      <Avatar size="2xl">
        <Avatar.Fallback size="2xl" />
      </Avatar>
    </div>
  ),
};

export const ImageAndFallback: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User with fallback"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image src="invalid-url.jpg" alt="Broken image" />
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

export const UserList: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="John Doe"
          />
        </Avatar>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-gray-600">john@example.com</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Fallback>AM</Avatar.Fallback>
        </Avatar>
        <div>
          <div className="font-medium">Alice Miller</div>
          <div className="text-sm text-gray-600">alice@example.com</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Fallback icon={BiGroup} />
        </Avatar>
        <div>
          <div className="font-medium">Team Account</div>
          <div className="text-sm text-gray-600">team@example.com</div>
        </div>
      </div>
    </div>
  ),
};
