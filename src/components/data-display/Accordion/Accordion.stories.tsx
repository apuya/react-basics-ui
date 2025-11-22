import type { Meta, StoryObj } from '@storybook/react';
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
