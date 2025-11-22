import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Badge } from '../../feedback/Badge/Badge';

/**
 * AccordionTrigger is a subcomponent designed for compound use within the Accordion component.
 * It provides a clickable header button for accordion items with icon support.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within an `<Accordion>` component.
 * It should be used as `<Accordion.Trigger>` to maintain consistent styling and behavior.
 * 
 * @see Use the main Accordion component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Accordion/Subcomponents/AccordionTrigger',
  component: Accordion.Trigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AccordionTrigger component is a compound subcomponent designed for use within Accordion.
It provides an accessible, interactive button for expanding/collapsing accordion items.

### Compound Usage Pattern

\`\`\`tsx
<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>
      Click to expand
    </Accordion.Trigger>
    <Accordion.Content>
      Content here
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
\`\`\`

### Features
- Accessible button with ARIA attributes
- Animated chevron icon
- Custom icon support via \`icon\` prop
- Automatic state management
- Hover and focus states
- Works with all Accordion variants
- Keyboard navigation support

### Customization
The trigger accepts an optional \`icon\` prop to replace the default chevron icon.
You can also include inline elements like badges or status indicators within the trigger text.

### Usage Notes
- Must be used within Accordion.Item
- Automatically manages expansion state
- Clicking toggles the associated content
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Trigger text or content',
    },
    icon: {
      control: false,
      description: 'Custom icon to replace the default chevron (optional)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Accordion.Trigger>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default trigger with chevron icon.
 */
export const Default: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Default Trigger</Accordion.Trigger>
          <Accordion.Content>
            This is the content that expands when you click the trigger above.
            The trigger includes a default chevron icon that rotates when expanded.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic trigger with default chevron icon. The icon rotates 180° when the item is expanded.',
      },
    },
  },
};

/**
 * Trigger with custom icon.
 */
export const WithCustomIcon: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Custom Plus Icon
          </Accordion.Trigger>
          <Accordion.Content>
            This trigger uses a custom plus icon instead of the default chevron.
            The icon prop accepts any React node.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with a custom plus icon passed via the `icon` prop.',
      },
    },
  },
};

/**
 * Trigger with badge for status or importance.
 */
export const WithBadge: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <span>Premium Features</span>
              <Badge variant="warning" size="small">Pro</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            This section contains premium features available to Pro users only.
            Upgrade your account to access these advanced capabilities.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <span>New Updates</span>
              <Badge variant="info" size="small">4</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            You have 4 new updates available. Click to review recent changes
            and improvements to your account.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with Badge components showing status or counts. Uses a flex container to position the badge.',
      },
    },
  },
};

/**
 * Trigger with status indicator.
 */
export const WithStatus: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center gap-[var(--semantic-space-compact)]">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Active Services</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            All services are operational. No issues detected in the last 24 hours.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex items-center gap-[var(--semantic-space-compact)]">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Pending Tasks</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            You have 3 pending tasks that require your attention.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>
            <div className="flex items-center gap-[var(--semantic-space-compact)]">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Error Reports</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            2 errors detected. Click to view details and resolve issues.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with colored status indicators (dot badges) showing different states.',
      },
    },
  },
};

/**
 * Trigger with long text that wraps.
 */
export const LongText: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            This is a very long trigger text that demonstrates how the component handles
            text wrapping when the content exceeds the available width
          </Accordion.Trigger>
          <Accordion.Content>
            The trigger text automatically wraps to multiple lines when needed,
            maintaining proper alignment with the chevron icon.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with long text demonstrating automatic text wrapping behavior.',
      },
    },
  },
};

/**
 * Multiple triggers showing different variants.
 */
export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px] space-y-[var(--semantic-space-default)]">
      <div>
        <h3 className="text-sm font-medium mb-[var(--semantic-space-compact)]">Default Variant</h3>
        <Accordion type="single" collapsible variant="default">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Default Accordion</Accordion.Trigger>
            <Accordion.Content>
              This is the default variant with standard styling.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-[var(--semantic-space-compact)]">Bordered Variant</h3>
        <Accordion type="single" collapsible variant="bordered">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Bordered Accordion</Accordion.Trigger>
            <Accordion.Content>
              This is the bordered variant with a border around items.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-[var(--semantic-space-compact)]">Separated Variant</h3>
        <Accordion type="single" collapsible variant="separated">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Separated Accordion</Accordion.Trigger>
            <Accordion.Content>
              This is the separated variant with spacing between items.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Triggers shown across all accordion variants (default, bordered, separated).',
      },
    },
  },
};

/**
 * Interactive triggers with complex content.
 */
export const Interactive: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="multiple" defaultValue={['item-1']}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <div className="flex items-center gap-[var(--semantic-space-compact)]">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Account Settings</span>
              </div>
              <Badge variant="success" size="small">Active</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            Configure your account preferences and privacy settings.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <div className="flex items-center gap-[var(--semantic-space-compact)]">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Notifications</span>
              </div>
              <Badge variant="info" size="small">12</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            Manage your notification preferences for email, SMS, and push notifications.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Trigger>
            <div className="flex items-center justify-between w-full pr-[var(--semantic-space-compact)]">
              <div className="flex items-center gap-[var(--semantic-space-compact)]">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Billing & Subscription</span>
              </div>
              <Badge variant="warning" size="small">Update Required</Badge>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            View your current subscription plan and update payment methods.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive triggers combining status indicators and badges in a multi-select accordion.',
      },
    },
  },
};
