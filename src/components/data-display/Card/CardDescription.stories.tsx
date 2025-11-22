import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

/**
 * CardDescription is a subcomponent designed for compound use within the Card component.
 * It provides a styled paragraph element for the card's description or subtitle text.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Card>` component.
 * It should be used as `<Card.Description>` to maintain consistent styling and typography.
 * 
 * @see Use the main Card component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Card/Subcomponents/CardDescription',
  component: Card.Description,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The CardDescription component is a compound subcomponent designed for use within Card.
It renders as a paragraph element with secondary text styling and consistent typography.

### Compound Usage Pattern

\`\`\`tsx
<Card variant="outlined">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>
      This is a description providing additional context
    </Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
</Card>
\`\`\`

### Features
- Semantic paragraph element
- Secondary text color for hierarchy
- Consistent font size and weight (via CSS variables)
- Top margin spacing from title (via CSS variable)
- Responsive typography
- Works with all Card variants

### Usage Notes
- Typically used below Card.Title in Card.Header
- Secondary text color for visual hierarchy
- Font size and weight controlled by CSS tokens
- Spacing from title uses CSS variable
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Description text content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Card.Description>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default description.
 */
export const Default: Story = {
  args: {
    children: 'This is a card description providing additional context.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic card description with default styling and secondary text color.',
      },
    },
  },
};

/**
 * Description with title.
 */
export const WithTitle: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>Settings</Card.Title>
      <Card.Description>
        Manage your account preferences and configuration
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description displayed below a title, showing proper spacing and hierarchy.',
      },
    },
  },
};

/**
 * Long description that wraps.
 */
export const LongDescription: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Description>
        This is an example of a longer description text that will wrap to multiple lines when displayed.
        It demonstrates how the component handles extended content while maintaining readability and proper line height.
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card description with longer text demonstrating wrapping behavior.',
      },
    },
  },
};

/**
 * Multiple paragraphs.
 */
export const MultipleParagraphs: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>About This Feature</Card.Title>
      <Card.Description>
        This is the first paragraph of the description.
      </Card.Description>
      <Card.Description className="mt-[var(--semantic-space-compact)]">
        This is a second paragraph providing additional information.
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple description paragraphs with appropriate spacing between them.',
      },
    },
  },
};

/**
 * Description with formatting.
 */
export const WithFormatting: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>Premium Plan</Card.Title>
      <Card.Description>
        Get access to <strong className="font-semibold text-gray-900 dark:text-gray-100">unlimited features</strong> and{' '}
        <em className="italic">priority support</em> for your team.
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description with inline formatting like bold and italic text.',
      },
    },
  },
};

/**
 * Custom colored description.
 */
export const CustomColor: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>Alert</Card.Title>
      <Card.Description className="text-red-600 dark:text-red-400">
        This action cannot be undone. Please proceed with caution.
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description with custom text color for emphasis or warnings.',
      },
    },
  },
};

/**
 * Truncated description.
 */
export const Truncated: Story = {
  args: { children: null },
  render: () => (
    <div className="w-64">
      <Card.Title>Product Name</Card.Title>
      <Card.Description className="truncate">
        This is a very long product description that will be truncated with an ellipsis when it overflows the container width
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description truncated with ellipsis when it overflows its container.',
      },
    },
  },
};

/**
 * Line clamping (2 lines max).
 */
export const LineClamped: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>Article Preview</Card.Title>
      <Card.Description className="line-clamp-2">
        This is a longer description that demonstrates the line-clamp utility.
        When the text exceeds two lines, it will be truncated with an ellipsis.
        Any additional content beyond the second line will not be visible to the user,
        maintaining a consistent card height.
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description clamped to 2 lines maximum using line-clamp utility.',
      },
    },
  },
};

/**
 * Small description text.
 */
export const SmallText: Story = {
  args: { children: null },
  render: () => (
    <div className="w-96">
      <Card.Title>Quick Note</Card.Title>
      <Card.Description className="text-xs">
        Additional information in smaller text
      </Card.Description>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description with smaller text size for secondary information.',
      },
    },
  },
};

/**
 * Description in different card variants.
 */
export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-[var(--semantic-space-default)]">
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Default Variant</h3>
        <Card variant="default">
          <Card.Header>
            <Card.Title>Default Card</Card.Title>
            <Card.Description>Description text in default card variant</Card.Description>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Elevated Variant</h3>
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Elevated Card</Card.Title>
            <Card.Description>Description text in elevated card variant</Card.Description>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Outlined Variant</h3>
        <Card variant="outlined">
          <Card.Header>
            <Card.Title>Outlined Card</Card.Title>
            <Card.Description>Description text in outlined card variant</Card.Description>
          </Card.Header>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Interactive Variant</h3>
        <Card variant="interactive">
          <Card.Header>
            <Card.Title>Interactive Card</Card.Title>
            <Card.Description>Description text in interactive card variant</Card.Description>
          </Card.Header>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CardDescription displayed across all card variants showing consistent typography.',
      },
    },
  },
};
