import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Badge } from '../../feedback/Badge/Badge';
import { Button } from '../../forms/Button/Button';
import { Input } from '../../forms/Input/Input';
import { Text } from '../../typography/Text/Text';

/**
 * AccordionItem is a subcomponent designed for compound use within the Accordion component.
 * It provides the wrapper for a single collapsible section, containing a trigger and content.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within an `<Accordion>` component.
 * It should be used as `<Accordion.Item>` to maintain consistent styling and behavior.
 * 
 * @see Use the main Accordion component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Accordion/Subcomponents/AccordionItem',
  component: Accordion.Item,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AccordionItem component is a compound subcomponent designed for use within Accordion.
It provides the wrapper for a complete accordion section with trigger and content.

### Compound Usage Pattern

\`\`\`tsx
<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Click me</Accordion.Trigger>
    <Accordion.Content>
      Your content here
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Another section</Accordion.Trigger>
    <Accordion.Content>
      More content
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
\`\`\`

### Features
- Provides context for trigger and content
- Manages individual item state
- Requires unique \`value\` prop for identification
- Supports all Accordion variants
- Automatically styled based on parent variant
- Proper ARIA structure for accessibility

### Required Props
- \`value\`: Unique string identifier for this item

### Usage Notes
- Must be used within Accordion
- Must contain Accordion.Trigger and Accordion.Content
- The \`value\` prop is used to track which items are expanded
- Multiple items can share the same parent but must have unique values
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Unique identifier for this accordion item (required)',
    },
    children: {
      control: false,
      description: 'Should contain Accordion.Trigger and Accordion.Content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Accordion.Item>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default accordion item with basic content.
 */
export const Default: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>What is an accordion?</Accordion.Trigger>
          <Accordion.Content>
            An accordion is a vertically stacked list of items where each item can be
            expanded or collapsed to reveal additional content. It's useful for organizing
            information in a compact, scannable format.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion item with simple text content. The item expands to show content when clicked.',
      },
    },
  },
};

/**
 * Item with icon in trigger.
 */
export const WithIcon: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center gap-[var(--semantic-space-compact)]">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Important Information</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text size="body">
              This accordion item includes an information icon in the trigger to draw attention
              to important content. Icons can help users quickly identify the type of information.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion item with an icon in the trigger to indicate content type or importance.',
      },
    },
  },
};

/**
 * Item with badge showing status.
 */
export const WithBadge: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <span>Premium Features</span>
              <Badge variant="warning" size="small">Pro</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text size="body">
              Upgrade to Pro to unlock advanced features including analytics, custom branding,
              and priority support.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
        
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <span>Free Features</span>
              <Badge variant="success" size="small">Available</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text size="body">
              These features are included in your free plan and available to all users.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion items with Badge components indicating feature availability or status.',
      },
    },
  },
};

/**
 * Item with complex trigger containing multiple elements.
 */
export const ComplexTrigger: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <div className="flex items-center gap-[var(--semantic-space-compact)]">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="text-left">
                  <div className="font-medium">Server Status</div>
                  <div className="text-sm text-gray-500">All systems operational</div>
                </div>
              </div>
              <Badge variant="success" size="small">Online</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <Text size="body">
                All services are running normally with no reported issues.
              </Text>
              <div className="grid grid-cols-2 gap-[var(--semantic-space-compact)]">
                <div className="text-sm">
                  <span className="text-gray-500">Uptime:</span> 99.9%
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Response:</span> 45ms
                </div>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion item with a complex trigger containing status indicator, title, subtitle, and badge.',
      },
    },
  },
};

/**
 * Item with rich content including form elements.
 */
export const RichContent: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Update Email Preferences</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <Text size="body">
                Choose which email notifications you'd like to receive:
              </Text>
              <div>
                <Text as="label" weight="medium" className="block mb-[var(--semantic-space-tight)]">
                  Email Address
                </Text>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  size="default"
                />
              </div>
              <div className="space-y-[var(--semantic-space-compact)]">
                <label className="flex items-center gap-[var(--semantic-space-compact)]">
                  <input type="checkbox" defaultChecked />
                  <Text size="small">Product updates and announcements</Text>
                </label>
                <label className="flex items-center gap-[var(--semantic-space-compact)]">
                  <input type="checkbox" defaultChecked />
                  <Text size="small">Weekly newsletter</Text>
                </label>
                <label className="flex items-center gap-[var(--semantic-space-compact)]">
                  <input type="checkbox" />
                  <Text size="small">Marketing emails</Text>
                </label>
              </div>
              <div className="flex gap-[var(--semantic-space-compact)] pt-[var(--semantic-space-compact)]">
                <Button variant="primary" size="default">
                  Save Preferences
                </Button>
                <Button variant="secondary" size="default">
                  Cancel
                </Button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion item with rich content including Input, checkboxes, and Button components for a complete form.',
      },
    },
  },
};

/**
 * Multiple items in different variants.
 */
export const AllVariants: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px] space-y-[var(--semantic-space-comfortable)]">
      <div>
        <h3 className="text-sm font-medium mb-[var(--semantic-space-compact)]">Default Variant</h3>
        <Accordion type="single" collapsible variant="default">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Question 1</Accordion.Trigger>
            <Accordion.Content>
              <Text size="body">Answer to question 1 in the default variant.</Text>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Question 2</Accordion.Trigger>
            <Accordion.Content>
              <Text size="body">Answer to question 2 in the default variant.</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-[var(--semantic-space-compact)]">Bordered Variant</h3>
        <Accordion type="single" collapsible variant="bordered">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Question 1</Accordion.Trigger>
            <Accordion.Content>
              <Text size="body">Answer to question 1 in the bordered variant.</Text>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Question 2</Accordion.Trigger>
            <Accordion.Content>
              <Text size="body">Answer to question 2 in the bordered variant.</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-[var(--semantic-space-compact)]">Separated Variant</h3>
        <Accordion type="single" collapsible variant="separated">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Question 1</Accordion.Trigger>
            <Accordion.Content>
              <Text size="body">Answer to question 1 in the separated variant.</Text>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Question 2</Accordion.Trigger>
            <Accordion.Content>
              <Text size="body">Answer to question 2 in the separated variant.</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion items shown in all three variants (default, bordered, separated) to demonstrate visual differences.',
      },
    },
  },
};

/**
 * Multiple items demonstrating composition patterns.
 */
export const CompositionPatterns: Story = {
  args: { children: null, value: '' },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center gap-[var(--semantic-space-compact)]">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Simple Text Content</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text size="body">
              This item shows a simple pattern with an icon and text.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <span>With Badge</span>
              <Badge variant="info" size="small">New</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text size="body">
              This item demonstrates trigger composition with a badge indicator.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Trigger>With Interactive Content</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <Text size="body">
                This item contains interactive elements:
              </Text>
              <Input
                type="text"
                placeholder="Enter something..."
                size="default"
              />
              <div className="flex gap-[var(--semantic-space-compact)]">
                <Button variant="primary" size="small">
                  Submit
                </Button>
                <Button variant="secondary" size="small">
                  Cancel
                </Button>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-4">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <div className="flex items-center gap-[var(--semantic-space-compact)]">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Complex Composition</span>
              </div>
              <Badge variant="success" size="small">Active</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <Text size="body" weight="medium">
                This demonstrates the most complex composition pattern.
              </Text>
              <div className="p-[var(--semantic-space-default)] bg-gray-50 border border-gray-200 rounded">
                <Text size="small">
                  Combining status indicators, badges, and rich content creates
                  highly functional accordion items.
                </Text>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple accordion items showing various composition patterns from simple to complex, using icons, badges, forms, and status indicators.',
      },
    },
  },
};
