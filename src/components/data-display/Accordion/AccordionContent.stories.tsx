import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Button } from '../../forms/Button/Button';
import { Input } from '../../forms/Input/Input';
import { Checkbox } from '../../forms/Checkbox/Checkbox';
import { Badge } from '../../feedback/Badge/Badge';
import { Text } from '../../typography/Text/Text';
import { Heading } from '../../typography/Heading/Heading';

/**
 * AccordionContent is a subcomponent designed for compound use within the Accordion component.
 * It provides a styled container for the accordion's collapsible content area.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within an `<Accordion>` component.
 * It should be used as `<Accordion.Content>` to maintain consistent styling and behavior.
 * 
 * @see Use the main Accordion component stories for complete usage examples
 */
const meta = {
  title: 'Data Display/Accordion/Subcomponents/AccordionContent',
  component: Accordion.Content,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AccordionContent component is a compound subcomponent designed for use within Accordion.
It provides consistent padding and smooth animations for content expansion/collapse.

### Compound Usage Pattern

\`\`\`tsx
<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Trigger text</Accordion.Trigger>
    <Accordion.Content>
      Your content here
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
\`\`\`

### Features
- Smooth CSS Grid-based animations
- Consistent padding (via CSS variables)
- ARIA region for accessibility
- Automatic state management
- Supports any content type
- Works with all Accordion variants

### Usage Notes
- Must be used within Accordion.Item
- Content is hidden/shown based on item state
- Animated expand/collapse transitions
- Properly labeled for screen readers
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content to display when accordion item is expanded',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Accordion.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default content with text.
 */
export const Default: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Simple Content</Accordion.Trigger>
          <Accordion.Content>
            This is the default accordion content area. It provides consistent padding
            and can contain any type of content including text, images, forms, or
            custom components.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic content area with text. The content expands smoothly with CSS Grid animations.',
      },
    },
  },
};

/**
 * Content with structured paragraphs using Text component.
 */
export const WithParagraphs: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Article Content</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <Text size="body">
                This is the first paragraph using the Text component for consistent typography.
                It demonstrates how to structure multiple paragraphs within accordion content.
              </Text>
              <Text size="body">
                Here's a second paragraph providing additional details and information.
                The Text component ensures consistent styling across the application.
              </Text>
              <Text size="body" color="secondary">
                And a final paragraph in secondary color to show text hierarchy.
              </Text>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with multiple paragraphs using the Text component for consistent typography.',
      },
    },
  },
};

/**
 * Content with a list.
 */
export const WithList: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Features List</Accordion.Trigger>
          <Accordion.Content>
            <ul className="space-y-[var(--semantic-space-compact)]">
              <li className="flex items-start gap-[var(--semantic-space-compact)]">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <Text size="small">Fully accessible with ARIA attributes and keyboard navigation</Text>
              </li>
              <li className="flex items-start gap-[var(--semantic-space-compact)]">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <Text size="small">Smooth animations using CSS Grid transitions</Text>
              </li>
              <li className="flex items-start gap-[var(--semantic-space-compact)]">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <Text size="small">Flexible content support with any React components</Text>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with a list of items, each with an icon and Text component.',
      },
    },
  },
};

/**
 * Content with form elements.
 */
export const WithForm: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Contact Form</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <div>
                <Text as="label" weight="medium" className="block mb-[var(--semantic-space-tight)]">
                  Full Name
                </Text>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  size="default"
                />
              </div>
              <div>
                <Text as="label" weight="medium" className="block mb-[var(--semantic-space-tight)]">
                  Email Address
                </Text>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  size="default"
                />
              </div>
              <div className="flex items-center gap-[var(--semantic-space-compact)]">
                <Checkbox id="newsletter" />
                <Text as="label" htmlFor="newsletter" size="small">
                  Subscribe to newsletter
                </Text>
              </div>
              <div className="flex gap-[var(--semantic-space-compact)] pt-[var(--semantic-space-compact)]">
                <Button variant="secondary" size="default">
                  Cancel
                </Button>
                <Button variant="primary" size="default">
                  Submit
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
        story: 'Content with a complete form using Input, Checkbox, and Button components.',
      },
    },
  },
};

/**
 * Content with important information callouts.
 */
export const WithCallouts: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Important Information</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <div className="p-[var(--semantic-space-default)] bg-blue-50 border border-blue-200 rounded">
                <Text size="small">
                  This feature is currently in beta. Some functionality may change in future updates.
                </Text>
              </div>
              <Text size="body">
                Please review the information above before proceeding. Make sure you understand
                the current limitations and how they might affect your workflow.
              </Text>
              <div className="p-[var(--semantic-space-default)] bg-yellow-50 border border-yellow-200 rounded">
                <Text size="small" weight="medium">
                  Remember to save your work frequently to avoid data loss.
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
        story: 'Content with styled callout boxes for displaying important notifications and warnings.',
      },
    },
  },
};

/**
 * Content with action buttons.
 */
export const WithButtons: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Quick Actions</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <Text size="body">
                Choose an action to perform on your account:
              </Text>
              <div className="flex flex-wrap gap-[var(--semantic-space-compact)]">
                <Button variant="primary" size="default">
                  Update Profile
                </Button>
                <Button variant="secondary" size="default">
                  Change Password
                </Button>
                <Button variant="tertiary" size="default">
                  View History
                </Button>
                <Button variant="destructive" size="default">
                  Delete Account
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
        story: 'Content with multiple Button components showing different variants and actions.',
      },
    },
  },
};

/**
 * Content with badges for status indicators.
 */
export const WithBadges: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Feature Status</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-default)]">
              <div className="flex items-center justify-between">
                <Text size="body">User Authentication</Text>
                <Badge variant="success" size="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text size="body">Email Notifications</Text>
                <Badge variant="success" size="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text size="body">Two-Factor Auth</Text>
                <Badge variant="warning" size="default">Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text size="body">API Access</Text>
                <Badge variant="error" size="default">Disabled</Badge>
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
        story: 'Content with Badge components to show status indicators for different features.',
      },
    },
  },
};

/**
 * Scrollable content area.
 */
export const ScrollableContent: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Terms and Conditions</Accordion.Trigger>
          <Accordion.Content className="max-h-[300px] overflow-y-auto">
            <div className="space-y-[var(--semantic-space-default)]">
              <Heading level="h6">1. Introduction</Heading>
              <Text size="small">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Heading level="h6">2. Terms of Service</Heading>
              <Text size="small">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Heading level="h6">3. Privacy Policy</Heading>
              <Text size="small">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </Text>
              <Heading level="h6">4. Data Collection</Heading>
              <Text size="small">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </Text>
              <Heading level="h6">5. User Rights</Heading>
              <Text size="small">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                dolore magnam aliquam quaerat voluptatem.
              </Text>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with maximum height and scrollable overflow for lengthy content using Heading and Text components.',
      },
    },
  },
};

/**
 * Mixed content combining multiple components.
 */
export const MixedContent: Story = {
  args: { children: null },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Account Settings</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-[var(--semantic-space-comfortable)]">
              <div>
                <Heading level="h6" className="mb-[var(--semantic-space-compact)]">
                  Profile Information
                </Heading>
                <div className="space-y-[var(--semantic-space-default)]">
                  <div>
                    <Text as="label" weight="medium" className="block mb-[var(--semantic-space-tight)]">
                      Display Name
                    </Text>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      size="default"
                    />
                  </div>
                  <div>
                    <Text as="label" weight="medium" className="block mb-[var(--semantic-space-tight)]">
                      Email
                    </Text>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      size="default"
                    />
                  </div>
                </div>
              </div>

              <div className="p-[var(--semantic-space-default)] bg-blue-50 border border-blue-200 rounded">
                <Text size="small">
                  Changes to your email address will require verification.
                </Text>
              </div>

              <div>
                <Heading level="h6" className="mb-[var(--semantic-space-compact)]">
                  Preferences
                </Heading>
                <div className="space-y-[var(--semantic-space-compact)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[var(--semantic-space-compact)]">
                      <Checkbox id="email-notif" defaultChecked />
                      <Text as="label" htmlFor="email-notif" size="small">
                        Email notifications
                      </Text>
                    </div>
                    <Badge variant="success" size="small">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[var(--semantic-space-compact)]">
                      <Checkbox id="marketing" />
                      <Text as="label" htmlFor="marketing" size="small">
                        Marketing emails
                      </Text>
                    </div>
                    <Badge variant="neutral" size="small">Inactive</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-[var(--semantic-space-compact)] pt-[var(--semantic-space-default)] border-t">
                <Button variant="secondary" size="default">
                  Cancel
                </Button>
                <Button variant="primary" size="default">
                  Save Changes
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
        story: 'Complex content combining Heading, Text, Input, Checkbox, Alert, Badge, and Button components to create a complete settings panel.',
      },
    },
  },
};
