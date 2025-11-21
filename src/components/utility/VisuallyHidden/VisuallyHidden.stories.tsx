import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiHeart, BiMenu } from 'react-icons/bi';
import { VisuallyHidden } from './VisuallyHidden';
import { Icon } from '../Icon';

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
    <div className="p-4 border border-dashed border-gray-300 rounded">
      <p className="text-sm text-gray-500 mb-2">The hidden content is inside this box:</p>
      <VisuallyHidden {...args} />
      <p className="text-xs text-gray-400 mt-2">(Inspect the DOM to see the hidden element)</p>
    </div>
  ),
};

// With Icon Button
export const IconButtonWithLabel: Story = {
  render: () => (
    <button className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <Icon icon={BiSearch} size="md" color="primary" />
      <VisuallyHidden>Search</VisuallyHidden>
    </button>
  ),
};

// Multiple Icon Buttons
export const IconButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <button className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Icon icon={BiSearch} size="md" color="primary" />
        <VisuallyHidden>Search</VisuallyHidden>
      </button>
      <button className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Icon icon={BiHeart} size="md" color="primary" />
        <VisuallyHidden>Favorite</VisuallyHidden>
      </button>
      <button className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Icon icon={BiMenu} size="md" color="primary" />
        <VisuallyHidden>Menu</VisuallyHidden>
      </button>
    </div>
  ),
};

// Skip Link
export const SkipLink: Story = {
  render: () => (
    <div>
      <a
        href="#main-content"
        className="absolute left-0 top-0 -translate-y-full focus:translate-y-0 bg-blue-600 text-white px-4 py-2 transition-transform"
      >
        Skip to main content
      </a>
      <p className="text-sm text-gray-500">
        Press Tab to reveal the skip link (accessibility feature)
      </p>
    </div>
  ),
};

// Form Label
export const FormFieldLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <label htmlFor="search-input">
        <VisuallyHidden>Search query</VisuallyHidden>
        <Icon icon={BiSearch} size="sm" color="secondary" />
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search..."
        className="border rounded px-3 py-1.5 text-sm"
      />
    </div>
  ),
};

// As Div
export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'This is rendered as a div element',
  },
  render: (args) => (
    <div className="p-4 border border-dashed border-gray-300 rounded">
      <p className="text-sm text-gray-500 mb-2">Hidden div element:</p>
      <VisuallyHidden {...args} />
    </div>
  ),
};

// Decorative vs Informative
export const AccessibilityExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Decorative icon (hidden from AT):</p>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded">
          <Icon icon={BiHeart} size="sm" color="inherit" aria-hidden />
          Like
        </button>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Icon-only button (needs hidden label):</p>
        <button className="p-2 bg-blue-600 text-white rounded">
          <Icon icon={BiHeart} size="sm" color="inherit" aria-hidden />
          <VisuallyHidden>Like this post</VisuallyHidden>
        </button>
      </div>
    </div>
  ),
};
