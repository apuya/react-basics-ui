import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from '../../feedback/Badge/Badge';

/**
 * CardTitle is a subcomponent designed for compound use within the Card component.
 * It provides a styled heading element (h3) for the card's title text.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Card>` component.
 * It should be used as `<Card.Title>` to maintain consistent styling and typography.
 * 
 * @see Use the main Card component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Card/Subcomponents/CardTitle',
  component: Card.Title,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The CardTitle component is a compound subcomponent designed for use within Card.
It renders as an h3 element with consistent typography and styling.

### Compound Usage Pattern

\`\`\`tsx
<Card variant="outlined">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
</Card>
\`\`\`

### Features
- Semantic h3 heading element
- Theme-aware text color
- Consistent font size and weight (via CSS variables)
- Responsive typography
- Works with all Card variants

### Usage Notes
- Typically used within Card.Header
- Can be combined with Card.Description
- Automatically styled to match Card theme
- Font size and weight controlled by CSS tokens
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Title text content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Card.Title>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default title.
 */
export const Default: Story = {
  args: {
    children: 'Card Title',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic card title with default styling.',
      },
    },
  },
};

/**
 * Long title that wraps.
 */
export const LongTitle: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>
        This is an Example of a Very Long Card Title That Will Wrap to Multiple Lines When Displayed
      </Card.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card title with long text demonstrating wrapping behavior.',
      },
    },
  },
};

/**
 * Title with icon.
 */
export const WithIcon: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title className="flex items-center gap-[var(--semantic-space-compact)]">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Quick Actions
      </Card.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with an icon element for visual enhancement.',
      },
    },
  },
};

/**
 * Title with badge.
 */
export const WithBadge: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title className="flex items-center gap-[var(--semantic-space-compact)]">
        Premium Features
        <Badge variant="warning" size="small">Pro</Badge>
      </Card.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with inline badge indicating special status.',
      },
    },
  },
};

/**
 * Custom colored title.
 */
export const CustomColor: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title className="text-blue-600 dark:text-blue-400">
        Styled Title
      </Card.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with custom text color using className prop.',
      },
    },
  },
};

/**
 * Title with gradient text.
 */
export const GradientText: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Gradient Title
      </Card.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with gradient text effect using Tailwind utilities.',
      },
    },
  },
};

/**
 * Truncated title.
 */
export const Truncated: Story = {
  args: { children: null },
  render: () => (
    <div className="w-64">
      <Card.Title className="truncate">
        This is a Very Long Title That Will Be Truncated with an Ellipsis When It Overflows
      </Card.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title truncated with ellipsis when it overflows its container.',
      },
    },
  },
};

/**
 * Different font weights.
 */
export const FontWeights: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96 space-y-[var(--semantic-space-default)]">
      <div>
        <p className="text-xs text-gray-500 mb-[var(--semantic-space-tight)]">Normal (default)</p>
        <Card.Title>Card Title</Card.Title>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-[var(--semantic-space-tight)]">Semibold</p>
        <Card.Title className="font-semibold">Card Title</Card.Title>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-[var(--semantic-space-tight)]">Bold</p>
        <Card.Title className="font-bold">Card Title</Card.Title>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title shown with different font weights.',
      },
    },
  },
};

/**
 * Title in different card variants.
 */
export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-[var(--semantic-space-default)]">
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Default Variant</h3>
        <Card variant="default">
          <Card.Header>
            <Card.Title>Default Card Title</Card.Title>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Elevated Variant</h3>
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Elevated Card Title</Card.Title>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Outlined Variant</h3>
        <Card variant="outlined">
          <Card.Header>
            <Card.Title>Outlined Card Title</Card.Title>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Interactive Variant</h3>
        <Card variant="interactive">
          <Card.Header>
            <Card.Title>Interactive Card Title</Card.Title>
          </Card.Header>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CardTitle displayed across all card variants showing consistent typography.',
      },
    },
  },
};
