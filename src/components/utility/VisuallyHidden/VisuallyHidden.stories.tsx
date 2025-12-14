import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiHeart, BiTrash, BiShare } from 'react-icons/bi';
import { VisuallyHidden } from './VisuallyHidden';
import { Icon } from '@/components/utility/Icon';
import { Button } from '@/components/forms/Button';
import { Input } from '@/components/forms/Input';
import { Label } from '@/components/typography/Label';
import { Text } from '@/components/typography/Text';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { Card } from '@/components/data-display/Card';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Utility/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Hides content visually while keeping it accessible to screen readers. Useful for icon-only buttons, form labels, and providing additional context for assistive technology users.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'div'],
      description: 'HTML element to render',
    },
    children: {
      control: 'text',
      description: 'Hidden content (accessible to screen readers)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  args: {
    children: 'This text is visually hidden but accessible to screen readers',
  },
  render: (args) => (
    <Card>
      <Card.Content>
        <Stack spacing="sm">
          <Text size="small" color="secondary">
            The hidden content is inside this card:
          </Text>
          <VisuallyHidden {...args} />
          <Text size="small" color="tertiary">
            (Inspect the DOM to see the hidden element)
          </Text>
        </Stack>
      </Card.Content>
    </Card>
  ),
};

export const IconOnlyButtons: Story = {
  render: () => (
    <Flex gap="sm">
      <Button variant="ghost" size="small">
        <Icon icon={BiHeart} size="md" />
        <VisuallyHidden>Like</VisuallyHidden>
      </Button>
      <Button variant="ghost" size="small">
        <Icon icon={BiShare} size="md" />
        <VisuallyHidden>Share</VisuallyHidden>
      </Button>
      <Button variant="ghost" size="small">
        <Icon icon={BiTrash} size="md" />
        <VisuallyHidden>Delete</VisuallyHidden>
      </Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only buttons need hidden labels for screen reader users to understand their purpose.',
      },
    },
  },
};

export const HiddenFormLabel: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <Label htmlFor="search-input">
        <VisuallyHidden>Search</VisuallyHidden>
        <Icon icon={BiSearch} size="sm" color="secondary" />
      </Label>
      <Input id="search-input" placeholder="Search..." size="small" />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'When a form field has an icon instead of visible label text, use VisuallyHidden to provide an accessible label.',
      },
    },
  },
};

export const DecorativeVsAccessible: Story = {
  render: () => (
    <Stack spacing="md">
      <Stack spacing="xs">
        <Text size="small" weight="medium">
          Decorative icon (hidden from assistive tech):
        </Text>
        <Button variant="primary">
          <Icon icon={BiHeart} size="sm" color="inherit" aria-hidden />
          Like
        </Button>
      </Stack>
      <Stack spacing="xs">
        <Text size="small" weight="medium">
          Icon-only button (needs hidden label):
        </Text>
        <Button variant="primary">
          <Icon icon={BiHeart} size="sm" color="inherit" aria-hidden />
          <VisuallyHidden>Like this post</VisuallyHidden>
        </Button>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'When an icon accompanies visible text, mark it as decorative with aria-hidden. When a button has only an icon, add a VisuallyHidden label.',
      },
    },
  },
};
