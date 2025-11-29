import type { Meta, StoryObj } from '@storybook/react';
import { BiGroup, BiSmile, BiBuilding } from 'react-icons/bi';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Basic/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An avatar component for displaying user profile images, initials, or fallback icons. Supports multiple sizes and shapes (circular, square). Uses context to automatically pass size to child components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar (automatically inherited by Fallback)',
    },
    shape: {
      control: 'select',
      options: ['circular', 'square'],
      description: 'Shape of the avatar',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// =============================================================================
// BASIC USAGE
// =============================================================================

/**
 * Default avatar with fallback icon.
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <Avatar.Fallback />
    </Avatar>
  ),
};

/**
 * Avatar with an image source.
 */
export const WithImage: Story = {
  render: () => (
    <Avatar>
      <Avatar.Image
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="User Avatar"
      />
    </Avatar>
  ),
};

/**
 * Avatar with initials as fallback content.
 */
export const WithInitials: Story = {
  render: () => (
    <Avatar>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  ),
};

/**
 * Avatar with custom icons.
 */
export const WithCustomIcon: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar>
        <Avatar.Fallback icon={BiGroup} />
      </Avatar>
      <Avatar>
        <Avatar.Fallback icon={BiSmile} />
      </Avatar>
      <Avatar>
        <Avatar.Fallback icon={BiBuilding} />
      </Avatar>
    </div>
  ),
};

// =============================================================================
// SIZES & SHAPES
// =============================================================================

/**
 * All available size variants. Size is automatically inherited by Fallback.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <span className="text-xs text-gray-600">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * All available shape variants.
 */
export const AllShapes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="circular" size="lg">
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Circular avatar"
          />
        </Avatar>
        <span className="text-xs text-gray-600">circular</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="square" size="lg">
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Square avatar"
          />
        </Avatar>
        <span className="text-xs text-gray-600">square</span>
      </div>
    </div>
  ),
};

/**
 * Different sizes with icon fallback.
 */
export const SizesWithIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Fallback />
        </Avatar>
      ))}
    </div>
  ),
};

// =============================================================================
// IMAGE FALLBACK BEHAVIOR
// =============================================================================

/**
 * Image with fallback - fallback shows when image fails to load.
 */
export const ImageWithFallback: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Valid image"
          />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">Valid image</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <Avatar.Image src="invalid-url.jpg" alt="Broken image" />
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>
        <span className="text-xs text-gray-600">Broken image</span>
      </div>
    </div>
  ),
};

// =============================================================================
// REAL-WORLD EXAMPLES
// =============================================================================

/**
 * User list pattern with avatars.
 */
export const UserList: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="John Doe"
          />
        </Avatar>
        <div>
          <div className="font-medium text-sm">John Doe</div>
          <div className="text-xs text-gray-500">john@example.com</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Fallback>AM</Avatar.Fallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">Alice Miller</div>
          <div className="text-xs text-gray-500">alice@example.com</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>
          <Avatar.Fallback icon={BiGroup} />
        </Avatar>
        <div>
          <div className="font-medium text-sm">Team Account</div>
          <div className="text-xs text-gray-500">team@example.com</div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Avatar stack for displaying multiple users.
 */
export const AvatarStack: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar className="ring-2 ring-white">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User 1"
        />
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
          alt="User 3"
        />
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

/**
 * Profile card with large avatar.
 */
export const ProfileCard: Story = {
  render: () => (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-64">
      <Avatar size="2xl">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="Profile"
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <h3 className="mt-4 font-semibold text-lg">John Doe</h3>
      <p className="text-gray-500 text-sm">Software Engineer</p>
      <p className="text-gray-400 text-xs mt-1">San Francisco, CA</p>
    </div>
  ),
};
