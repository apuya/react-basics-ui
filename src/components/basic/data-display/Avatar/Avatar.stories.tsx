import type { Meta, StoryObj } from '@storybook/react';
import { BiGroup, BiSmile, BiBuilding } from 'react-icons/bi';
import { Avatar } from './Avatar';
import { Flex } from '../../layout/Flex';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Card } from '../Card/Card';
import { Grid } from '../../layout/Grid';

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
// SHARED DATA
// =============================================================================

const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const AVATAR_SHAPES = ['circular', 'square'] as const;
const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';
const SAMPLE_IMAGE_ALT = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop';

const CUSTOM_ICONS = [
  { icon: BiGroup, label: 'Group' },
  { icon: BiSmile, label: 'Smile' },
  { icon: BiBuilding, label: 'Building' },
] as const;

const USER_LIST_DATA = [
  { name: 'John Doe', email: 'john@example.com', image: SAMPLE_IMAGE },
  { name: 'Alice Miller', email: 'alice@example.com', initials: 'AM' },
  { name: 'Team Account', email: 'team@example.com', icon: BiGroup },
];

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
 * All fallback content types: image, initials, and custom icons.
 */
export const FallbackTypes: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Stack align="center" gap="xs">
        <Avatar size="lg">
          <Avatar.Image src={SAMPLE_IMAGE} alt="User Avatar" />
        </Avatar>
        <Text size="xs" color="secondary">Image</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Avatar size="lg">
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Text size="xs" color="secondary">Initials</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Avatar size="lg">
          <Avatar.Fallback />
        </Avatar>
        <Text size="xs" color="secondary">Default Icon</Text>
      </Stack>
      {CUSTOM_ICONS.map(({ icon, label }) => (
        <Stack key={label} align="center" gap="xs">
          <Avatar size="lg">
            <Avatar.Fallback icon={icon} />
          </Avatar>
          <Text size="xs" color="secondary">{label}</Text>
        </Stack>
      ))}
    </Flex>
  ),
};

// =============================================================================
// SIZES & SHAPES
// =============================================================================

/**
 * All available size variants with initials and icons.
 */
export const AllSizes: Story = {
  render: () => (
    <Stack gap="md">
      <Flex gap="md" align="end">
        {AVATAR_SIZES.map((size) => (
          <Stack key={size} align="center" gap="xs">
            <Avatar size={size}>
              <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <Text size="xs" color="secondary">{size}</Text>
          </Stack>
        ))}
      </Flex>
      <Flex gap="md" align="end">
        {AVATAR_SIZES.map((size) => (
          <Avatar key={size} size={size}>
            <Avatar.Fallback />
          </Avatar>
        ))}
      </Flex>
    </Stack>
  ),
};

/**
 * All available shape variants.
 */
export const AllShapes: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      {AVATAR_SHAPES.map((shape) => (
        <Stack key={shape} align="center" gap="xs">
          <Avatar shape={shape} size="lg">
            <Avatar.Image src={SAMPLE_IMAGE} alt={`${shape} avatar`} />
          </Avatar>
          <Text size="xs" color="secondary">{shape}</Text>
        </Stack>
      ))}
    </Flex>
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
    <Flex gap="md" align="center">
      <Stack align="center" gap="xs">
        <Avatar>
          <Avatar.Image src={SAMPLE_IMAGE} alt="Valid image" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Text size="xs" color="secondary">Valid image</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Avatar>
          <Avatar.Image src="invalid-url.jpg" alt="Broken image" />
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>
        <Text size="xs" color="secondary">Broken image</Text>
      </Stack>
    </Flex>
  ),
};

// =============================================================================
// REAL-WORLD EXAMPLES
// =============================================================================

/**
 * User list pattern with avatars using data-driven approach.
 */
export const UserList: Story = {
  render: () => (
    <Card className="w-72">
      <Card.Content>
        <Stack gap="sm">
          {USER_LIST_DATA.map((user) => (
            <Flex key={user.email} align="center" gap="sm">
              <Avatar>
                {user.image ? (
                  <Avatar.Image src={user.image} alt={user.name} />
                ) : user.icon ? (
                  <Avatar.Fallback icon={user.icon} />
                ) : (
                  <Avatar.Fallback>{user.initials}</Avatar.Fallback>
                )}
              </Avatar>
              <Stack gap="none">
                <Text size="sm" weight="medium">{user.name}</Text>
                <Text size="xs" color="secondary">{user.email}</Text>
              </Stack>
            </Flex>
          ))}
        </Stack>
      </Card.Content>
    </Card>
  ),
};

/**
 * Avatar stack for displaying multiple users.
 */
export const AvatarStack: Story = {
  render: () => (
    <Flex className="-space-x-3">
      <Avatar className="ring-2 ring-white">
        <Avatar.Image src={SAMPLE_IMAGE} alt="User 1" />
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <Avatar.Image src={SAMPLE_IMAGE_ALT} alt="User 3" />
      </Avatar>
      <Avatar className="ring-2 ring-white">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar>
    </Flex>
  ),
};

/**
 * Profile card with large avatar.
 */
export const ProfileCard: Story = {
  render: () => (
    <Card variant="elevated" className="w-64">
      <Card.Content>
        <Stack align="center" gap="sm">
          <Avatar size="2xl">
            <Avatar.Image src={SAMPLE_IMAGE} alt="Profile" />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Stack align="center" gap="xs">
            <Text size="lg" weight="semibold">John Doe</Text>
            <Text size="sm" color="secondary">Software Engineer</Text>
            <Text size="xs" color="tertiary">San Francisco, CA</Text>
          </Stack>
        </Stack>
      </Card.Content>
    </Card>
  ),
};

/**
 * Team grid showing all sizes and types.
 */
export const TeamGrid: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 w-96">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Team Members</Card.Title>
        <Card.Description>6 members</Card.Description>
      </Card.Header>
      <Card.Content>
        <Grid cols={3} gap="md">
          {AVATAR_SIZES.map((size, index) => (
            <Stack key={size} align="center" gap="xs">
              <Avatar size="lg">
                {index % 3 === 0 ? (
                  <Avatar.Image src={SAMPLE_IMAGE} alt={`Member ${index + 1}`} />
                ) : index % 3 === 1 ? (
                  <Avatar.Fallback>{`M${index + 1}`}</Avatar.Fallback>
                ) : (
                  <Avatar.Fallback />
                )}
              </Avatar>
              <Text size="xs" color="secondary">Member {index + 1}</Text>
            </Stack>
          ))}
        </Grid>
      </Card.Content>
    </Card>
  ),
};
