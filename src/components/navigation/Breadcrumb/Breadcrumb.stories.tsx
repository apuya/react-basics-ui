import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { ICON_SIZE_CLASSES } from './Breadcrumb.styles';
import { FiChevronRight, FiHome, FiFolder, FiFile } from 'react-icons/fi';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb navigation component that shows the current page location within a site hierarchy. Supports custom separators, icons, and collapsible paths with ellipsis.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items (string or ReactNode)',
      table: { defaultValue: { summary: '/' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic breadcrumb with default forward slash separator.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>Category</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const WithCustomSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with custom text or icon separator. Use `ICON_SIZE_CLASSES` for proper icon sizing.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Text separator */}
      <Breadcrumb separator="›">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrent>
          <Breadcrumb.Link isCurrent>Guide</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Icon separator */}
      <Breadcrumb separator={<FiChevronRight className={ICON_SIZE_CLASSES} />}>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/settings">Settings</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrent>
          <Breadcrumb.Link isCurrent>Profile</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb items with leading icons for visual context (e.g., file system navigation).',
      },
    },
  },
  render: () => (
    <Breadcrumb separator={<FiChevronRight className={ICON_SIZE_CLASSES} />}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/" className="inline-flex items-center gap-1.5">
          <FiHome className="h-4 w-4" aria-hidden="true" />
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/documents" className="inline-flex items-center gap-1.5">
          <FiFolder className="h-4 w-4" aria-hidden="true" />
          Documents
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent className="inline-flex items-center gap-1.5">
          <FiFile className="h-4 w-4" aria-hidden="true" />
          report.pdf
        </Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `Breadcrumb.Ellipsis` to collapse middle items for long paths or responsive layouts.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Ellipsis />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>Breadcrumb</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const IconOnlyHome: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Home link as icon-only for compact breadcrumbs.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/" aria-label="Home">
          <FiHome className="h-4 w-4" />
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/shop">Shop</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/shop/clothing">Clothing</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>T-Shirts</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const SingleItem: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with a single current page (no navigation).',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item isCurrent showSeparator={false}>
        <Breadcrumb.Link isCurrent>Current Page</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};
