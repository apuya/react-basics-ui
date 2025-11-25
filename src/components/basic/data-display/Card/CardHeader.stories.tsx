import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from '../../feedback/Badge/Badge';

/**
 * CardHeader is a subcomponent designed for compound use within the Card component.
 * It provides a styled container for the card's header section, typically containing the title and description.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Card>` component.
 * It should be used as `<Card.Header>` to maintain consistent styling and spacing.
 * 
 * @see Use the main Card component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Card/Subcomponents/CardHeader',
  component: Card.Header,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The CardHeader component is a compound subcomponent designed for use within Card.
It provides consistent padding (16px inline/block) and styling for card headers.

### Compound Usage Pattern

\`\`\`tsx
<Card variant="outlined">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description text</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
</Card>
\`\`\`

### Features
- Consistent 16px padding (via CSS variables)
- Theme-aware border styling
- Optimized rendering with useMemo
- Responsive design
- Flexible content composition
- Works with all Card variants (default, elevated, outlined, interactive)

### Usage Notes
- Typically contains Card.Title and Card.Description
- Can include additional header elements (badges, icons, actions)
- Automatically styled to match Card theme
- Bottom border for visual separation
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Header content, typically Card.Title and Card.Description',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Card.Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header with title and description.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header>
        <Card.Title>Default Header</Card.Title>
        <Card.Description>This is the standard card header layout</Card.Description>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic header with Card.Title and Card.Description. The header provides visual separation from the content with a bottom border.',
      },
    },
  },
};

/**
 * Header with title only (no description).
 */
export const TitleOnly: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header>
        <Card.Title>Title Only</Card.Title>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with only a title, useful for simpler cards that don\'t need descriptions.',
      },
    },
  },
};

/**
 * Header with icon and title.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header>
        <div className="flex items-center gap-[var(--semantic-space-compact)]">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <Card.Title>Information Card</Card.Title>
            <Card.Description>Additional context with icon</Card.Description>
          </div>
        </div>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with icon element alongside the title for enhanced visual communication.',
      },
    },
  },
};

/**
 * Header with badge.
 */
export const WithBadge: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <Card.Title>Premium Feature</Card.Title>
            <Card.Description>Exclusive content for members</Card.Description>
          </div>
          <Badge variant="info" size="small">New</Badge>
        </div>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with status badge to indicate feature state or importance.',
      },
    },
  },
};

/**
 * Header with action buttons.
 */
export const WithActions: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header>
        <div className="flex items-start justify-between">
          <div>
            <Card.Title>Project Settings</Card.Title>
            <Card.Description>Configure your project preferences</Card.Description>
          </div>
          <button 
            className="p-[var(--semantic-space-tight)] hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            aria-label="More options"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with action button (e.g., menu, settings) aligned to the right.',
      },
    },
  },
};

/**
 * Header with long title text.
 */
export const LongTitle: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header>
        <Card.Title>
          This is an Example of a Very Long Card Title That Might Wrap to Multiple Lines
        </Card.Title>
        <Card.Description>
          Long titles should wrap gracefully and maintain proper spacing
        </Card.Description>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with long title demonstrating text wrapping behavior.',
      },
    },
  },
};

/**
 * Custom styled header.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="w-96">
      <Card.Header className="bg-gradient-to-r from-purple-500 to-pink-500 border-transparent">
        <Card.Title className="text-white">Custom Header Style</Card.Title>
        <Card.Description className="text-white/90">
          Headers can be customized with gradient backgrounds and custom colors
        </Card.Description>
      </Card.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with custom styling using className prop for unique visual designs.',
      },
    },
  },
};

/**
 * Header in different card variants.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-[var(--semantic-space-default)]">
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Default Variant</h3>
        <Card variant="default">
          <Card.Header>
            <Card.Title>Default Card</Card.Title>
            <Card.Description>Standard card appearance</Card.Description>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Elevated Variant</h3>
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Elevated Card</Card.Title>
            <Card.Description>Card with shadow elevation</Card.Description>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Outlined Variant</h3>
        <Card variant="outlined">
          <Card.Header>
            <Card.Title>Outlined Card</Card.Title>
            <Card.Description>Card with prominent border</Card.Description>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Interactive Variant</h3>
        <Card variant="interactive">
          <Card.Header>
            <Card.Title>Interactive Card</Card.Title>
            <Card.Description>Clickable card with hover effects</Card.Description>
          </Card.Header>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CardHeader displayed across all card variants showing consistent styling.',
      },
    },
  },
};
