import type { Meta, StoryObj } from '@storybook/react';
import { BiInfoCircle, BiEdit, BiTrash, BiShare } from 'react-icons/bi';
import { Tooltip } from './Tooltip';
import type { TooltipPosition } from './Tooltip.types';
import { Button } from '../../forms/Button';
import { Input } from '../../forms/Input';
import { Label } from '../../forms/Label';
import { Text } from '../../typography/Text';
import { Icon } from '../../utility/Icon';
import { Stack } from '../../layout/Stack';
import { Grid } from '../../layout/Grid';

// =============================================================================
// Storybook Meta Configuration
// =============================================================================

const TOOLTIP_POSITIONS: TooltipPosition[] = ['top', 'bottom', 'left', 'right'];

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component that displays contextual information on hover or focus. Supports four positioning options and automatically handles visibility states with smooth transitions. Tooltips are accessible by default with proper ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    position: {
      control: 'select',
      options: TOOLTIP_POSITIONS,
      description: 'Position of the tooltip relative to the trigger',
    },
    offset: {
      control: 'number',
      description: 'Offset from the trigger element in pixels (default: 8)',
    },
    id: {
      control: 'text',
      description: 'Custom ID for the tooltip (auto-generated if not provided)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the tooltip',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-16">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// =============================================================================
// Default Story
// =============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default tooltip configuration. Hover or focus the button to see the tooltip appear above the trigger element.',
      },
    },
  },
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

// =============================================================================
// Position Variants
// =============================================================================

export const AllPositions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all four tooltip positions. Use the position that best fits the available space in your layout.',
      },
    },
  },
  render: () => (
    <Grid cols={2} gap="xl">
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
    </Grid>
  ),
};

// =============================================================================
// Trigger Element Examples
// =============================================================================

export const OnIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips attached to information icons. Common pattern for providing additional context without cluttering the UI.',
      },
    },
  },
  render: () => (
    <Stack direction="horizontal" spacing="lg">
      <Tooltip content="Additional information">
        <Icon icon={BiInfoCircle} size="lg" color="primary" className="cursor-help" />
      </Tooltip>
      <Tooltip content="Click for help documentation" position="right">
        <Icon icon={BiInfoCircle} size="lg" color="secondary" className="cursor-help" />
      </Tooltip>
    </Stack>
  ),
};

export const OnText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip attached to text with dotted underline styling. Use this pattern for inline definitions or term explanations.',
      },
    },
  },
  args: {
    content: 'This is a helpful explanation',
    children: (
      <Text as="span" size="body" className="underline decoration-dotted cursor-help">
        Hover for info
      </Text>
    ),
  },
};

export const OnDisabledButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip explaining why a button is disabled. Essential for accessibility - users need to understand why actions are unavailable.',
      },
    },
  },
  args: {
    content: 'This feature is currently unavailable',
    children: <Button disabled>Disabled</Button>,
  },
};

// =============================================================================
// Form Integration
// =============================================================================

export const FormFieldHelp: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip used to provide help text for a form field. Place info icons next to labels for additional context.',
      },
    },
  },
  render: () => (
    <Stack spacing="sm">
      <Label className="flex items-center gap-2">
        Email Address
        <Tooltip content="We'll never share your email" position="right">
          <Icon icon={BiInfoCircle} size="sm" color="secondary" className="cursor-help" />
        </Tooltip>
      </Label>
      <Input type="email" placeholder="you@example.com" />
    </Stack>
  ),
};

export const InlineHelp: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip providing inline contextual help within a paragraph. Use for technical terms or concepts that need explanation.',
      },
    },
  },
  render: () => (
    <Text size="small" className="max-w-md">
      This feature uses advanced{' '}
      <Tooltip content="Machine learning algorithms analyze patterns in data" position="top">
        <Text as="span" color="link" className="underline decoration-dotted cursor-help">
          AI technology
        </Text>
      </Tooltip>{' '}
      to improve accuracy and performance over time.
    </Text>
  ),
};

// =============================================================================
// Action Buttons
// =============================================================================

export const ActionButtons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips on icon-only action buttons to describe their function. Essential for accessibility when buttons have no visible text.',
      },
    },
  },
  render: () => (
    <Stack direction="horizontal" spacing="sm">
      <Tooltip content="Edit item" position="bottom">
        <Button variant="ghost" size="small">
          <Icon icon={BiEdit} size="sm" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete item" position="bottom">
        <Button variant="ghost" size="small">
          <Icon icon={BiTrash} size="sm" />
        </Button>
      </Tooltip>
      <Tooltip content="Share item" position="bottom">
        <Button variant="ghost" size="small">
          <Icon icon={BiShare} size="sm" />
        </Button>
      </Tooltip>
    </Stack>
  ),
};

// =============================================================================
// Advanced Features
// =============================================================================

export const ComplexContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip with complex JSX content including formatting. Use for rich tooltip content with emphasis or structure.',
      },
    },
  },
  args: {
    content: (
      <div>
        <strong>Pro Tip:</strong> Use keyboard shortcuts for faster navigation
      </div>
    ),
    children: <Button>Tips</Button>,
  },
};

export const CustomOffset: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Custom offset distance from the trigger element. Increase offset when triggers have visual effects that extend beyond their bounds.',
      },
    },
  },
  render: () => (
    <Stack direction="horizontal" spacing="lg">
      <Tooltip content="Default offset (8px)" position="top">
        <Button variant="secondary">Default</Button>
      </Tooltip>
      <Tooltip content="Large offset (16px)" position="top" offset={16}>
        <Button variant="secondary">Large Offset</Button>
      </Tooltip>
    </Stack>
  ),
};
