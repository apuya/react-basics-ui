import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { FiHome, FiChevronRight, FiFolder, FiFile } from 'react-icons/fi';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb navigation component that shows the current page location within a site hierarchy. Helps users understand where they are and navigate back through parent pages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
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
        story: 'Breadcrumb with custom separator character.',
      },
    },
  },
  render: () => (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/docs">Documentation</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>Getting Started</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const WithIconSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb using an icon as separator.',
      },
    },
  },
  render: () => (
    <Breadcrumb separator={<FiChevronRight className="h-4 w-4" />}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/settings">Settings</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/settings/account">Account</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>Profile</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb items with leading icons for better visual hierarchy.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/" className="inline-flex items-center gap-1">
          <FiHome className="h-4 w-4" />
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/documents" className="inline-flex items-center gap-1">
          <FiFolder className="h-4 w-4" />
          Documents
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent className="inline-flex items-center gap-1">
          <FiFile className="h-4 w-4" />
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
        story: 'Breadcrumb with collapsed middle items using ellipsis for long paths.',
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
        <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>Breadcrumb</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const SingleLevel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with only one level (current page).',
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

export const DeepHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb showing a deep navigation hierarchy.',
      },
    },
  },
  render: () => (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/products/electronics">Electronics</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/products/electronics/computers">
          Computers
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/products/electronics/computers/laptops">
          Laptops
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>Gaming Laptops</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const FileSystemExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File system navigation example with folder icons.',
      },
    },
  },
  render: () => (
    <Breadcrumb separator={<FiChevronRight className="h-3 w-3" />}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/" className="inline-flex items-center gap-1.5">
          <FiHome className="h-4 w-4" />
          Root
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/users" className="inline-flex items-center gap-1.5">
          <FiFolder className="h-4 w-4" />
          Users
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link
          href="/users/documents"
          className="inline-flex items-center gap-1.5"
        >
          <FiFolder className="h-4 w-4" />
          Documents
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent className="inline-flex items-center gap-1.5">
          <FiFile className="h-4 w-4" />
          readme.md
        </Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const EcommercePath: Story = {
  parameters: {
    docs: {
      description: {
        story: 'E-commerce product category navigation example.',
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">
          <FiHome className="h-4 w-4" />
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/shop">Shop</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/shop/clothing">Clothing</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/shop/clothing/mens">Men's</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent>
        <Breadcrumb.Link isCurrent>T-Shirts</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const WithDropdown: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with ellipsis that could expand to show more items.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Collapsed view (for mobile or long paths):
      </p>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Ellipsis />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/current-parent">Parent</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isCurrent>
          <Breadcrumb.Link isCurrent>Current</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb that adapts to different screen sizes (demonstrates responsive pattern).',
      },
    },
  },
  render: () => (
    <div className="w-full max-w-2xl">
      {/* Desktop view */}
      <div className="hidden md:block">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/category">Category</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/category/subcategory">Subcategory</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/category/subcategory/products">
              Products
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Product Details</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Item isCurrent>
            <Breadcrumb.Link isCurrent>Product Details</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  ),
};
