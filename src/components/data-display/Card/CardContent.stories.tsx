import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Input } from '../../forms/Input/Input';

/**
 * CardContent is a subcomponent designed for compound use within the Card component.
 * It provides a styled container for the card's main content area with consistent 16px padding.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Card>` component.
 * It should be used as `<Card.Content>` to maintain consistent styling and spacing.
 * 
 * @see Use the main Card component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Card/Subcomponents/CardContent',
  component: Card.Content,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The CardContent component is a compound subcomponent designed for use within Card.
It provides consistent padding (16px inline/block) for card content areas.

### Compound Usage Pattern

\`\`\`tsx
<Card variant="outlined">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>Your main content goes here</p>
  </Card.Content>
  <Card.Footer>
    <button>Action</button>
  </Card.Footer>
</Card>
\`\`\`

### Features
- Consistent 16px padding (via CSS variables)
- Flex-1 layout for flexible content areas
- Optimized rendering with useMemo
- Responsive design
- Supports any content type (text, forms, lists, etc.)
- Works with all Card variants

### Usage Notes
- Main content container for Card
- Flexible height with flex-1
- Can contain any content structure
- Automatically styled to match Card theme
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Main content area, can contain any valid React nodes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Card.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default content with text.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content>
        <p className="text-sm">
          This is the default card content area. It provides consistent padding
          and can contain any type of content including text, images, forms, or
          custom components.
        </p>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic content area with text content. The content area has 16px padding on all sides.',
      },
    },
  },
};

/**
 * Content with multiple paragraphs.
 */
export const WithMultipleParagraphs: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content>
        <p className="text-sm mb-[var(--semantic-space-compact)]">
          This is the first paragraph with some introductory text about the card content.
        </p>
        <p className="text-sm mb-[var(--semantic-space-compact)]">
          Here's a second paragraph providing additional details and information.
        </p>
        <p className="text-sm">
          And a final paragraph to wrap up the content section.
        </p>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with multiple paragraphs demonstrating proper text spacing.',
      },
    },
  },
};

/**
 * Content with a form.
 */
export const WithForm: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content>
        <div className="space-y-[var(--semantic-space-default)]">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-[var(--semantic-space-tight)]">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-[var(--semantic-space-tight)]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content containing a form with input fields.',
      },
    },
  },
};

/**
 * Content with a list.
 */
export const WithList: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content>
        <ul className="space-y-[var(--semantic-space-compact)]">
          <li className="flex items-center gap-[var(--semantic-space-compact)]">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Feature one enabled</span>
          </li>
          <li className="flex items-center gap-[var(--semantic-space-compact)]">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Feature two enabled</span>
          </li>
          <li className="flex items-center gap-[var(--semantic-space-compact)]">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Feature three enabled</span>
          </li>
        </ul>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with a list of items, each with an icon.',
      },
    },
  },
};

/**
 * Scrollable content area.
 */
export const ScrollableContent: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content className="max-h-48 overflow-y-auto">
        <p className="text-sm mb-[var(--semantic-space-compact)]">
          This content area has a maximum height and will scroll when content overflows.
        </p>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i} className="text-sm mb-[var(--semantic-space-compact)]">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with maximum height and scrollable overflow for long content.',
      },
    },
  },
};

/**
 * Empty state content.
 */
export const EmptyState: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content>
        <div className="flex flex-col items-center justify-center py-[var(--semantic-space-comfortable)] text-center">
          <svg className="w-12 h-12 text-gray-400 mb-[var(--semantic-space-compact)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-[var(--semantic-space-tight)]">
            No items yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get started by creating your first item
          </p>
        </div>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content area displaying an empty state with icon and message.',
      },
    },
  },
};

/**
 * Content with image.
 */
export const WithImage: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content>
        <img
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=250&fit=crop"
          alt="Placeholder"
          className="w-full h-48 object-cover rounded mb-[var(--semantic-space-compact)]"
        />
        <p className="text-sm">
          Content can include images alongside text and other elements.
        </p>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with an image and descriptive text.',
      },
    },
  },
};

/**
 * Custom padded content.
 */
export const CustomPadding: Story = {
  render: () => (
    <div className="w-96">
      <Card.Content 
        className="p-[var(--semantic-space-comfortable)]"
        style={{ paddingInline: 'var(--semantic-space-comfortable)', paddingBlock: 'var(--semantic-space-comfortable)' }}
      >
        <p className="text-sm">
          This content area has custom padding (24px) instead of the default 16px.
          You can override the padding using className or inline styles.
        </p>
      </Card.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with customized padding using inline styles to override defaults.',
      },
    },
  },
};

/**
 * Content in different card variants.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-[var(--semantic-space-default)]">
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Default Variant</h3>
        <Card variant="default">
          <Card.Content>
            <p className="text-sm">Standard card content with default styling</p>
          </Card.Content>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Elevated Variant</h3>
        <Card variant="elevated">
          <Card.Content>
            <p className="text-sm">Elevated card content with shadow</p>
          </Card.Content>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Outlined Variant</h3>
        <Card variant="outlined">
          <Card.Content>
            <p className="text-sm">Outlined card content with prominent border</p>
          </Card.Content>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Interactive Variant</h3>
        <Card variant="interactive">
          <Card.Content>
            <p className="text-sm">Interactive card content with hover effects</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CardContent displayed across all card variants showing consistent styling.',
      },
    },
  },
};
