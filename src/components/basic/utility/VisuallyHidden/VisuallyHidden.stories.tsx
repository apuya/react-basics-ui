import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiHeart, BiMenu } from 'react-icons/bi';
import { VisuallyHidden } from './VisuallyHidden';
import { Icon } from '../Icon';
import { Button } from '../../forms/Button';
import { Input } from '../../forms/Input';
import { Text } from '../../typography/Text';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Box } from '../../layout/Box';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/Utility/VisuallyHidden',
  component: VisuallyHidden,
  parameters: { layout: 'centered' },
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

// Default
export const Default: Story = {
  args: {
    children: 'This text is visually hidden but accessible to screen readers',
  },
  render: (args) => (
    <Box className="p-4 border border-dashed border-gray-300 rounded">
      <Text size="sm" color="secondary" className="mb-2">The hidden content is inside this box:</Text>
      <VisuallyHidden {...args} />
      <Text size="xs" color="tertiary" className="mt-2">(Inspect the DOM to see the hidden element)</Text>
    </Box>
  ),
};

// With Icon Button
export const IconButtonWithLabel: Story = {
  render: () => (
    <Button variant="ghost" size="small">
      <Icon icon={BiSearch} size="md" color="primary" />
      <VisuallyHidden>Search</VisuallyHidden>
    </Button>
  ),
};

// Multiple Icon Buttons
export const IconButtonGroup: Story = {
  render: () => (
    <Flex gap="sm">
      <Button variant="ghost" size="small">
        <Icon icon={BiSearch} size="md" color="primary" />
        <VisuallyHidden>Search</VisuallyHidden>
      </Button>
      <Button variant="ghost" size="small">
        <Icon icon={BiHeart} size="md" color="primary" />
        <VisuallyHidden>Favorite</VisuallyHidden>
      </Button>
      <Button variant="ghost" size="small">
        <Icon icon={BiMenu} size="md" color="primary" />
        <VisuallyHidden>Menu</VisuallyHidden>
      </Button>
    </Flex>
  ),
};

// Skip Link
export const SkipLink: Story = {
  render: () => (
    <Box>
      <a
        href="#main-content"
        className="absolute left-0 top-0 -translate-y-full focus:translate-y-0 bg-blue-600 text-white px-4 py-2 transition-transform"
      >
        Skip to main content
      </a>
      <Text size="sm" color="secondary">
        Press Tab to reveal the skip link (accessibility feature)
      </Text>
    </Box>
  ),
};

// Form Label
export const FormFieldLabel: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <label htmlFor="search-input">
        <VisuallyHidden>Search query</VisuallyHidden>
        <Icon icon={BiSearch} size="sm" color="secondary" />
      </label>
      <Input
        id="search-input"
        type="text"
        placeholder="Search..."
        size="small"
      />
    </Flex>
  ),
};

// As Div
export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'This is rendered as a div element',
  },
  render: (args) => (
    <Box className="p-4 border border-dashed border-gray-300 rounded">
      <Text size="sm" color="secondary" className="mb-2">Hidden div element:</Text>
      <VisuallyHidden {...args} />
    </Box>
  ),
};

// Decorative vs Informative
export const AccessibilityExample: Story = {
  render: () => (
    <Stack gap="md">
      <Box>
        <Text size="sm" weight="medium" className="mb-2">Decorative icon (hidden from AT):</Text>
        <Button variant="primary">
          <Icon icon={BiHeart} size="sm" color="inherit" aria-hidden />
          Like
        </Button>
      </Box>
      <Box>
        <Text size="sm" weight="medium" className="mb-2">Icon-only button (needs hidden label):</Text>
        <Button variant="primary">
          <Icon icon={BiHeart} size="sm" color="inherit" aria-hidden />
          <VisuallyHidden>Like this post</VisuallyHidden>
        </Button>
      </Box>
    </Stack>
  ),
};
