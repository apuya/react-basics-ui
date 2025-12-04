import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover, type PopoverSide, type PopoverAlign } from './Popover';
import { Button } from '../../../basic/forms/Button/Button';
import { Badge } from '../../../basic/feedback/Badge/Badge';
import { Avatar } from '../../../basic/data-display/Avatar/Avatar';
import { Box } from '../../../basic/layout/Box/Box';
import { VStack } from '../../../basic/layout/Stack/Stack';
import { Flex } from '../../../basic/layout/Flex/Flex';
import { Grid } from '../../../basic/layout/Grid/Grid';
import { Divider } from '../../../basic/layout/Divider/Divider';
import { Text } from '../../../basic/typography/Text/Text';
import {
  BASE_CLASSES as BUTTON_BASE,
  SIZE_STYLES as BUTTON_SIZE,
  VARIANT_STYLES as BUTTON_VARIANT,
} from '../../../basic/forms/Button/Button.styles';
import { cn } from '@/lib/cn';

// ============================================================================
// SHARED DATA & STYLES
// ============================================================================

/** Button-like trigger styling using Button component styles */
const TRIGGER_CLASSES = cn(
  BUTTON_BASE,
  BUTTON_SIZE.default,
  BUTTON_VARIANT.primary,
  'px-[length:var(--component-button-padding-x-default)]'
);

const SMALL_TRIGGER_CLASSES = cn(
  BUTTON_BASE,
  BUTTON_SIZE.small,
  BUTTON_VARIANT.primary,
  'px-[length:var(--component-button-padding-x-small)]'
);

/** Position grid data for AllPositions story */
const POSITION_DATA: Array<{ side: PopoverSide; align: PopoverAlign; label: string } | null> = [
  { side: 'top', align: 'start', label: 'Top-Start' },
  { side: 'top', align: 'center', label: 'Top-Center' },
  { side: 'top', align: 'end', label: 'Top-End' },
  { side: 'left', align: 'center', label: 'Left' },
  null,
  { side: 'right', align: 'center', label: 'Right' },
  { side: 'bottom', align: 'start', label: 'Bottom-Start' },
  { side: 'bottom', align: 'center', label: 'Bottom-Center' },
  { side: 'bottom', align: 'end', label: 'Bottom-End' },
];

/** User profile data */
const USER_PROFILE = {
  name: 'John Doe',
  role: 'Senior Developer',
  skills: ['React', 'TypeScript'],
};

// ============================================================================
// META
// ============================================================================

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A floating overlay component that displays rich content. Supports 4 sides (top, right, bottom, left) and 3 alignments (start, center, end) for flexible positioning.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box minH={300} display="flex">
        <Flex align="center" justify="center" style={{ flex: 1 }}>
          <Story />
        </Flex>
      </Box>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ============================================================================
// BASIC USAGE
// ============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic popover with title, description, and close button. Hover or focus the trigger to open.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger className={TRIGGER_CLASSES}>Open Popover</Popover.Trigger>
      <Popover.Content>
        <Popover.Close />
        <Popover.Title>Default Popover</Popover.Title>
        <Popover.Description>
          This is a basic popover with default positioning (bottom-center).
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

// ============================================================================
// POSITIONING
// ============================================================================

export const AllPositions: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'All 12 position combinations (4 sides × 3 alignments). The `side` prop controls the edge, `align` controls alignment along that edge.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box minH={600} p="8rem 4rem" display="flex">
        <Flex align="center" justify="center" style={{ flex: 1 }}>
          <Story />
        </Flex>
      </Box>
    ),
  ],
  render: () => (
    <Grid cols={3} gap="lg">
      {POSITION_DATA.map((item, index) =>
        item ? (
          <Popover key={item.label}>
            <Popover.Trigger className={SMALL_TRIGGER_CLASSES}>{item.label}</Popover.Trigger>
            <Popover.Content side={item.side} align={item.align}>
              <Popover.Description>
                side="{item.side}" align="{item.align}"
              </Popover.Description>
            </Popover.Content>
          </Popover>
        ) : (
          <Box key={`empty-${index}`} />
        )
      )}
    </Grid>
  ),
};

// ============================================================================
// RICH CONTENT EXAMPLES
// ============================================================================

export const RichContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples of popovers with rich content: user profile cards and forms.',
      },
    },
  },
  render: () => (
    <Flex gap="lg">
      {/* User Profile Example */}
      <Popover>
        <Popover.Trigger className={TRIGGER_CLASSES}>View Profile</Popover.Trigger>
        <Popover.Content>
          <Flex gap="md">
            <Avatar name={USER_PROFILE.name} size="lg" />
            <VStack spacing="xs" align="start">
              <Popover.Title>{USER_PROFILE.name}</Popover.Title>
              <Popover.Description>{USER_PROFILE.role}</Popover.Description>
              <Flex gap="xs">
                {USER_PROFILE.skills.map((skill) => (
                  <Badge key={skill} variant="primary">{skill}</Badge>
                ))}
              </Flex>
            </VStack>
          </Flex>
          <Divider spacing="none" />
          <Button size="small" fullWidth>View Full Profile</Button>
        </Popover.Content>
      </Popover>

      {/* Form Example */}
      <Popover>
        <Popover.Trigger className={TRIGGER_CLASSES}>Add Comment</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Leave a Comment</Popover.Title>
          <textarea
            placeholder="Type your comment here..."
            className="w-full min-h-20 p-2 rounded-[length:var(--semantic-radius-sm)] border border-[color:var(--semantic-border-default)] text-sm resize-y"
          />
          <Divider spacing="none" />
          <Flex justify="end" gap="sm">
            <Button variant="secondary" size="small">Cancel</Button>
            <Button size="small">Submit</Button>
          </Flex>
        </Popover.Content>
      </Popover>
    </Flex>
  ),
};

// ============================================================================
// CONTROLLED STATE
// ============================================================================

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Programmatically control the popover open state using the `open` and `onOpenChange` props. Useful when you need to close the popover from within its content or based on external events.',
      },
    },
  },
  render: function ControlledStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <VStack spacing="md" align="center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger className={TRIGGER_CLASSES}>Controlled Popover</Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Controlled State</Popover.Title>
            <Popover.Description>
              Click the button below to close programmatically.
            </Popover.Description>
            <Divider spacing="none" />
            <Button size="small" onClick={() => setIsOpen(false)}>
              Close Popover
            </Button>
          </Popover.Content>
        </Popover>
        <Text size="small" color="secondary">
          State: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
        </Text>
      </VStack>
    );
  },
};
