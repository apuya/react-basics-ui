import type { Meta, StoryObj } from '@storybook/react';
import { BiInfoCircle, BiEdit, BiTrash, BiShare } from 'react-icons/bi';
import { Tooltip } from './Tooltip';
import { Button } from '../../forms/Button';
import { Input } from '../../forms/Input';
import { Label } from '../../forms/Label';
import { Text } from '../../typography/Text';
import { Icon } from '../../utility/Icon';
import { Stack } from '../../layout/Stack';
import { Grid } from '../../layout/Grid';

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component that displays contextual information on hover or focus. Supports four positioning options and automatically handles visibility states with smooth transitions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger',
    },
    offset: {
      control: 'number',
      description: 'Offset from the trigger element in pixels',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const AllPositions: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all four tooltip positions.',
      },
    },
  },
};

export const OnIcon: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Tooltips attached to information icons.',
      },
    },
  },
};

export const OnText: Story = {
  args: {
    content: 'This is a helpful explanation',
    children: (
      <Text as="span" size="body" className="underline decoration-dotted cursor-help">
        Hover for info
      </Text>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip attached to text with dotted underline styling.',
      },
    },
  },
};

export const OnDisabledButton: Story = {
  args: {
    content: 'This feature is currently unavailable',
    children: <Button disabled>Disabled</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip explaining why a button is disabled.',
      },
    },
  },
};

export const FormFieldHelp: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Tooltip used to provide help text for a form field.',
      },
    },
  },
};

export const InlineHelp: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Tooltip providing inline contextual help within a paragraph.',
      },
    },
  },
};

export const ActionButtons: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Tooltips on icon-only action buttons to describe their function.',
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    content: (
      <div>
        <strong>Pro Tip:</strong> Use keyboard shortcuts for faster navigation
      </div>
    ),
    children: <Button>Tips</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with complex JSX content including formatting.',
      },
    },
  },
};

export const CustomOffset: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Custom offset distance from the trigger element.',
      },
    },
  },
};
