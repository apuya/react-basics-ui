import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion } from './Accordion';

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accordion displays collapsible content panels for organizing and hiding complex information. Supports single or multiple expanded items, three visual variants (default, bordered, separated), and controlled/uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether single or multiple items can be opened at once',
    },
    defaultValue: {
      control: 'text',
      description: 'Default expanded item(s) for uncontrolled mode',
    },
    value: {
      control: 'text',
      description: 'Controlled value of expanded item(s)',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
      description: 'Visual style variant of the accordion',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether all items can be collapsed (single type only)',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Callback when expanded items change',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion with single type and collapsible items. Only one item can be open at a time.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern with full keyboard navigation support.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it styled?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It comes with default styles that can be easily customized to match your design system.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is it animated?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It features smooth animations using CSS grid for content expansion and collapse.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const SingleType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single type accordion where opening one item closes others. Ideal for FAQs.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible>
      <Accordion.Item value="faq1">
        <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
        <Accordion.Content>
          We offer a 30-day money-back guarantee for all purchases. If you're not satisfied with
          your purchase, you can return it within 30 days for a full refund.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq2">
        <Accordion.Trigger>How long does shipping take?</Accordion.Trigger>
        <Accordion.Content>
          Standard shipping typically takes 5-7 business days. Express shipping is available for
          1-2 business days delivery.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq3">
        <Accordion.Trigger>Do you ship internationally?</Accordion.Trigger>
        <Accordion.Content>
          Yes, we ship to most countries worldwide. International shipping costs and delivery times
          vary by location.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultipleType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple type allows several items to be expanded simultaneously. Good for comparison views.',
      },
    },
  },
  render: () => (
    <Accordion type="multiple" defaultValue={['tech1', 'tech2']}>
      <Accordion.Item value="tech1">
        <Accordion.Trigger>Frontend Technologies</Accordion.Trigger>
        <Accordion.Content>
          <ul className="list-disc pl-5 space-y-1">
            <li>React - UI library</li>
            <li>TypeScript - Type safety</li>
            <li>Tailwind CSS - Styling</li>
            <li>Storybook - Component documentation</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="tech2">
        <Accordion.Trigger>Development Tools</Accordion.Trigger>
        <Accordion.Content>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vite - Build tool</li>
            <li>ESLint - Code linting</li>
            <li>Prettier - Code formatting</li>
            <li>Vitest - Unit testing</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="tech3">
        <Accordion.Trigger>Deployment</Accordion.Trigger>
        <Accordion.Content>
          <ul className="list-disc pl-5 space-y-1">
            <li>GitHub Pages - Static hosting</li>
            <li>Vercel - Modern deployment</li>
            <li>Netlify - Continuous deployment</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const BorderedVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bordered variant with visible borders around each item. Provides clear visual separation.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible variant="bordered">
      <Accordion.Item value="step1">
        <Accordion.Trigger>Step 1: Create Account</Accordion.Trigger>
        <Accordion.Content>
          Sign up for a new account by providing your email address and creating a secure password.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="step2">
        <Accordion.Trigger>Step 2: Verify Email</Accordion.Trigger>
        <Accordion.Content>
          Check your inbox for a verification email and click the confirmation link.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="step3">
        <Accordion.Trigger>Step 3: Complete Profile</Accordion.Trigger>
        <Accordion.Content>
          Fill in your profile information to personalize your experience.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const SeparatedVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Separated variant with distinct cards for each item. Creates a modern, spaced-out look.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible variant="separated">
      <Accordion.Item value="feature1">
        <Accordion.Trigger>🎨 Customizable Design</Accordion.Trigger>
        <Accordion.Content>
          Fully customizable components that match your brand's design system and color palette.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="feature2">
        <Accordion.Trigger>♿ Accessibility First</Accordion.Trigger>
        <Accordion.Content>
          Built with accessibility in mind, following WAI-ARIA standards for screen reader support.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="feature3">
        <Accordion.Trigger>🚀 Performance Optimized</Accordion.Trigger>
        <Accordion.Content>
          Optimized for performance with React.memo, useMemo, and efficient re-rendering strategies.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const ComplexContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Accordion with rich content including cards, lists, and tables. Shows flexibility for complex layouts.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible>
      <Accordion.Item value="pricing">
        <Accordion.Trigger>Pricing Plans</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Basic Plan - $9/month</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>✓ Up to 5 projects</li>
                <li>✓ 10GB storage</li>
                <li>✓ Email support</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold mb-2">Pro Plan - $29/month</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>✓ Unlimited projects</li>
                <li>✓ 100GB storage</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="features">
        <Accordion.Trigger>Feature Comparison</Accordion.Trigger>
        <Accordion.Content>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Feature</th>
                <th className="text-center py-2">Basic</th>
                <th className="text-center py-2">Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Projects</td>
                <td className="text-center">5</td>
                <td className="text-center">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Storage</td>
                <td className="text-center">10GB</td>
                <td className="text-center">100GB</td>
              </tr>
              <tr>
                <td className="py-2">Support</td>
                <td className="text-center">Email</td>
                <td className="text-center">Priority</td>
              </tr>
            </tbody>
          </table>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/**
 * Controlled mode example with external state management.
 * The accordion value is controlled via React state, allowing you to programmatically
 * control which items are expanded.
 */
export const ControlledMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled accordion where the expanded state is managed externally. This allows programmatic control and synchronization with other UI elements.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string>('item-1');
    
    const handleChange = (newValue: string | string[]) => {
      setValue(typeof newValue === 'string' ? newValue : newValue[0] || '');
    };
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setValue('item-1')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Item 1
          </button>
          <button
            onClick={() => setValue('item-2')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Item 2
          </button>
          <button
            onClick={() => setValue('item-3')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Item 3
          </button>
          <button
            onClick={() => setValue('')}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close All
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Current value: <code className="bg-gray-100 px-2 py-1 rounded">{value || '(none)'}</code>
        </div>
        <Accordion type="single" collapsible value={value} onChange={handleChange}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Controlled Item 1</Accordion.Trigger>
            <Accordion.Content>
              This accordion is in controlled mode. The buttons above can programmatically
              open and close items.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Controlled Item 2</Accordion.Trigger>
            <Accordion.Content>
              Click the buttons above or use the triggers to control which item is expanded.
              The current value is displayed above.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger>Controlled Item 3</Accordion.Trigger>
            <Accordion.Content>
              Controlled mode is useful when you need to sync the accordion state with
              other parts of your application.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};

/**
 * Example showing disabled accordion items.
 * Disabled items cannot be clicked and are visually dimmed.
 */
export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Accordion items can be disabled individually, preventing user interaction.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Active Item</Accordion.Trigger>
        <Accordion.Content>
          This item is active and can be clicked normally.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger>Disabled Item</Accordion.Trigger>
        <Accordion.Content>
          This content cannot be accessed because the item is disabled.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Another Active Item</Accordion.Trigger>
        <Accordion.Content>
          This item is also active and clickable.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-4" disabled>
        <Accordion.Trigger>Another Disabled Item</Accordion.Trigger>
        <Accordion.Content>
          This is also disabled.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/**
 * Example showing custom typography sizes and weights on triggers.
 * Use textSize and textWeight props to customize the trigger appearance.
 */
export const CustomTypography: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Customize trigger text size and weight using textSize and textWeight props.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger textSize="caption" textWeight="regular">
          Small Caption Text
        </Accordion.Trigger>
        <Accordion.Content>
          This trigger uses caption size with regular weight for a subtle appearance.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger textSize="small" textWeight="medium">
          Small Medium Text (Compact)
        </Accordion.Trigger>
        <Accordion.Content>
          Small size with medium weight - good for compact interfaces.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger textSize="body" textWeight="medium">
          Body Medium Text (Default)
        </Accordion.Trigger>
        <Accordion.Content>
          This is the default styling - body size with medium weight.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-4">
        <Accordion.Trigger textSize="subtitle" textWeight="semibold">
          Subtitle Semibold Text (Emphasized)
        </Accordion.Trigger>
        <Accordion.Content>
          Larger subtitle size with semibold weight for emphasis.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-5">
        <Accordion.Trigger textSize="subtitle" textWeight="bold">
          Subtitle Bold Text (Strong)
        </Accordion.Trigger>
        <Accordion.Content>
          Subtitle size with bold weight for maximum impact.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/**
 * Example using Accordion.Title for semantic content structure.
 * The Title component uses the Heading component for consistent typography.
 */
export const WithSemanticTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use Accordion.Title for semantic headings within accordion content. Provides proper document outline and consistent typography.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="feature-1">
      <Accordion.Item value="feature-1">
        <Accordion.Trigger>Advanced Features</Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Title level="h5">Typography System</Accordion.Title>
          <p className="mb-4">
            Our design system includes a comprehensive typography scale with semantic heading
            levels and consistent text styling across all components.
          </p>
          
          <Accordion.Title level="h6">Key Benefits</Accordion.Title>
          <ul className="list-disc pl-5 space-y-1">
            <li>Consistent visual hierarchy</li>
            <li>Accessible document structure</li>
            <li>Easy customization</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="feature-2">
        <Accordion.Trigger>Design Tokens</Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Title level="h5" color="primary">
            CSS Variable-Based Theming
          </Accordion.Title>
          <p className="mb-4">
            All styling uses CSS custom properties (design tokens) for easy theming and
            consistent design language.
          </p>
          
          <Accordion.Title level="h6">Categories</Accordion.Title>
          <p>Colors, spacing, typography, borders, and shadows are all tokenized.</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/**
 * Example using Accordion.Description for supporting text.
 * The Description component uses the Text component with sensible defaults.
 */
export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use Accordion.Description for secondary information with consistent styling. Automatically uses small size and secondary color.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="plan-1">
      <Accordion.Item value="plan-1">
        <Accordion.Trigger>Free Plan</Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Title level="h5">Starter Features</Accordion.Title>
          <Accordion.Description>
            Perfect for individuals and small teams just getting started. Includes all
            essential features you need to begin your journey.
          </Accordion.Description>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Users</span>
              <strong>Up to 5</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage</span>
              <strong>1GB</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Support</span>
              <strong>Community</strong>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="plan-2">
        <Accordion.Trigger>Pro Plan</Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Title level="h5">Professional Features</Accordion.Title>
          <Accordion.Description>
            For growing teams and businesses that need advanced capabilities and
            priority support. Unlock powerful features and integrations.
          </Accordion.Description>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Users</span>
              <strong>Up to 50</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage</span>
              <strong>100GB</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Support</span>
              <strong>Priority Email</strong>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="plan-3">
        <Accordion.Trigger>Enterprise Plan</Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Title level="h5">Enterprise Features</Accordion.Title>
          <Accordion.Description>
            Designed for large organizations with custom requirements. Includes
            dedicated support, advanced security, and custom integrations.
          </Accordion.Description>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Users</span>
              <strong>Unlimited</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage</span>
              <strong>Unlimited</strong>
            </div>
            <div className="flex justify-between items-center">
              <span>Support</span>
              <strong>24/7 Dedicated</strong>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/**
 * Example combining all semantic typography components.
 * Shows how Title and Description work together for rich content.
 */
export const CompleteSemanticStructure: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete example combining Accordion.Title and Accordion.Description for well-structured, semantic content with proper typography hierarchy.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="guide-1">
      <Accordion.Item value="guide-1">
        <Accordion.Trigger textSize="subtitle" textWeight="semibold">
          Getting Started Guide
        </Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Title level="h4">Welcome to the Platform</Accordion.Title>
          <Accordion.Description>
            This comprehensive guide will walk you through the essential steps to get
            your account set up and ready to use. Follow along at your own pace.
          </Accordion.Description>
          
          <div className="mt-6 space-y-4">
            <div>
              <Accordion.Title level="h5">Step 1: Create Your Profile</Accordion.Title>
              <Accordion.Description>
                Add your personal information and customize your account settings.
              </Accordion.Description>
              <p className="mt-2">
                Navigate to Settings → Profile to update your details.
              </p>
            </div>
            
            <div>
              <Accordion.Title level="h5">Step 2: Configure Preferences</Accordion.Title>
              <Accordion.Description>
                Set up your notifications, privacy settings, and appearance preferences.
              </Accordion.Description>
              <p className="mt-2">
                Visit Settings → Preferences for customization options.
              </p>
            </div>
            
            <div>
              <Accordion.Title level="h5">Step 3: Invite Your Team</Accordion.Title>
              <Accordion.Description size="small" color="tertiary">
                Optional: Collaborate with others by inviting team members to your workspace.
              </Accordion.Description>
              <p className="mt-2">
                Go to Team → Invite Members to send invitations.
              </p>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
