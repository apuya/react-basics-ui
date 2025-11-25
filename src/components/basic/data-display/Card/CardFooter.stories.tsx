import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../../forms/Button/Button';

/**
 * CardFooter is a subcomponent designed for compound use within the Card component.
 * It provides a styled container for the card's footer section, typically containing action buttons or links.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Card>` component.
 * It should be used as `<Card.Footer>` to maintain consistent styling and spacing.
 * 
 * @see Use the main Card component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Card/Subcomponents/CardFooter',
  component: Card.Footer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The CardFooter component is a compound subcomponent designed for use within Card.
It provides consistent padding (16px inline/block) and styling for card footers.

### Compound Usage Pattern

\`\`\`tsx
<Card variant="outlined">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
  <Card.Footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </Card.Footer>
</Card>
\`\`\`

### Features
- Consistent 16px padding (via CSS variables)
- Flex layout for button alignment
- Top border for visual separation
- Optimized rendering with useMemo
- Responsive design
- Works with all Card variants

### Usage Notes
- Typically contains action buttons or links
- Flex container with items-center alignment
- Top border separates from content
- Automatically styled to match Card theme
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Footer content, typically buttons or links',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Card.Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer with two buttons.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer>
        <Button variant="secondary" size="default">
          Cancel
        </Button>
        <Button variant="primary" size="default">
          Confirm
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic footer with Cancel and Confirm buttons. The footer provides visual separation from content with a top border.',
      },
    },
  },
};

/**
 * Footer with single button.
 */
export const SingleButton: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer>
        <Button variant="primary" size="default">
          Continue
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with a single action button.',
      },
    },
  },
};

/**
 * Footer with three buttons.
 */
export const ThreeButtons: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer>
        <Button variant="secondary" size="default">
          Back
        </Button>
        <Button variant="ghost" size="default">
          Skip
        </Button>
        <Button variant="primary" size="default">
          Next
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with three action buttons (Back, Skip, Next).',
      },
    },
  },
};

/**
 * Footer with justified content.
 */
export const Justified: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer className="justify-between">
        <Button variant="secondary" size="default">
          Cancel
        </Button>
        <Button variant="primary" size="default">
          Save Changes
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with buttons justified to opposite ends using justify-between.',
      },
    },
  },
};

/**
 * Footer with centered button.
 */
export const Centered: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer className="justify-center">
        <Button variant="primary" size="default">
          Get Started
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with a centered button using justify-center.',
      },
    },
  },
};

/**
 * Footer with links.
 */
export const WithLinks: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer className="gap-[var(--semantic-space-default)]">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Learn more
        </a>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          View documentation
        </a>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Get help
        </a>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with text links instead of buttons.',
      },
    },
  },
};

/**
 * Footer with mixed content.
 */
export const MixedContent: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer className="justify-between">
        <div className="flex items-center gap-[var(--semantic-space-compact)]">
          <input type="checkbox" id="terms" className="rounded" />
          <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
            I agree to terms
          </label>
        </div>
        <Button variant="primary" size="default">
          Submit
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with mixed content: checkbox with label and action button.',
      },
    },
  },
};

/**
 * Footer with icon buttons.
 */
export const WithIconButtons: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer className="gap-[var(--semantic-space-compact)]">
        <button className="p-[var(--semantic-space-compact)] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="p-[var(--semantic-space-compact)] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="p-[var(--semantic-space-compact)] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with icon-only buttons for actions like favorite, share, and bookmark.',
      },
    },
  },
};

/**
 * Custom styled footer.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="w-96">
      <Card.Footer className="bg-gray-50 dark:bg-gray-900 border-transparent justify-end">
        <Button variant="secondary" size="default">
          Cancel
        </Button>
        <Button variant="primary" size="default" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Save
        </Button>
      </Card.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with custom background and gradient button styling.',
      },
    },
  },
};

/**
 * Footer in different card variants.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-[var(--semantic-space-default)]">
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Default Variant</h3>
        <Card variant="default">
          <Card.Footer>
            <Button variant="secondary" size="default">
              Cancel
            </Button>
            <Button variant="primary" size="default">
              Confirm
            </Button>
          </Card.Footer>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Elevated Variant</h3>
        <Card variant="elevated">
          <Card.Footer>
            <Button variant="secondary" size="default">
              Cancel
            </Button>
            <Button variant="primary" size="default">
              Confirm
            </Button>
          </Card.Footer>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Outlined Variant</h3>
        <Card variant="outlined">
          <Card.Footer>
            <Button variant="secondary" size="default">
              Cancel
            </Button>
            <Button variant="primary" size="default">
              Confirm
            </Button>
          </Card.Footer>
        </Card>
      </div>
      
      <div className="w-96">
        <h3 className="mb-[var(--semantic-space-compact)] text-sm font-semibold">Interactive Variant</h3>
        <Card variant="interactive">
          <Card.Footer>
            <Button variant="secondary" size="default">
              Cancel
            </Button>
            <Button variant="primary" size="default">
              Confirm
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CardFooter displayed across all card variants showing consistent styling.',
      },
    },
  },
};
