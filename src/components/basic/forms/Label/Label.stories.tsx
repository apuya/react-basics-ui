import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input/Input';
import { Checkbox } from '../Checkbox/Checkbox';

const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label component for form inputs, providing accessible labels with customizable sizing, weight, colors, and required indicators. Use with form controls to ensure proper accessibility and user guidance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'The size of the label text',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold'],
      description: 'The font weight of the label',
    },
    color: {
      control: 'select',
      options: ['default', 'secondary', 'error', 'disabled'],
      description: 'The color variant of the label',
    },
    required: {
      control: 'boolean',
      description: 'Shows a required asterisk indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Shows the label in disabled state',
    },
    htmlFor: {
      control: 'text',
      description: 'The id of the form element this label is for',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// Basic Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default label with standard styling.',
      },
    },
  },
  args: {
    children: 'Email Address',
    htmlFor: 'email',
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Label with required indicator (asterisk) for mandatory fields.',
      },
    },
  },
  args: {
    children: 'Full Name',
    htmlFor: 'fullname',
    required: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled label for fields that are not currently editable.',
      },
    },
  },
  args: {
    children: 'Account Type',
    htmlFor: 'account',
    disabled: true,
  },
};

// Size Variants
export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small label for compact form layouts.',
      },
    },
  },
  args: {
    children: 'Small Label',
    size: 'small',
  },
};

export const DefaultSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size for most use cases.',
      },
    },
  },
  args: {
    children: 'Default Size Label',
    size: 'default',
  },
};

export const Large: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large label for prominent form fields or headings.',
      },
    },
  },
  args: {
    children: 'Large Label',
    size: 'large',
  },
};

// Weight Variants
export const Normal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal font weight for subtle labels.',
      },
    },
  },
  args: {
    children: 'Normal Weight',
    weight: 'normal',
  },
};

export const Medium: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium font weight (default) for standard emphasis.',
      },
    },
  },
  args: {
    children: 'Medium Weight',
    weight: 'medium',
  },
};

export const Semibold: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Semibold weight for strong emphasis.',
      },
    },
  },
  args: {
    children: 'Semibold Weight',
    weight: 'semibold',
  },
};

// Color Variants
export const DefaultColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default color for standard labels.',
      },
    },
  },
  args: {
    children: 'Default Color',
    color: 'default',
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Secondary color for less prominent labels.',
      },
    },
  },
  args: {
    children: 'Secondary Color',
    color: 'secondary',
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error color for labels on fields with validation errors.',
      },
    },
  },
  args: {
    children: 'Error Color',
    color: 'error',
  },
};

// Practical Examples
export const WithInput: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Label paired with an Input component.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '300px' }}>
      <Label htmlFor="username" required>
        Username
      </Label>
      <Input id="username" placeholder="Enter your username" />
    </div>
  ),
};

export const WithInputError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Label with error color for an invalid input.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '300px' }}>
      <Label htmlFor="email-error" color="error" required>
        Email Address
      </Label>
      <Input id="email-error" error value="invalid-email" />
      <span style={{ fontSize: '0.875rem', color: 'var(--semantic-text-error)' }}>
        Please enter a valid email address
      </span>
    </div>
  ),
};

export const WithCheckbox: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Label used with a checkbox (note: Checkbox component has its own label prop).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Label weight="semibold">Notification Preferences</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '0.5rem' }}>
        <Checkbox id="email-notif" label="Email notifications" />
        <Checkbox id="push-notif" label="Push notifications" defaultChecked />
        <Checkbox id="sms-notif" label="SMS notifications" />
      </div>
    </div>
  ),
};

export const FormSection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using larger, semibold labels as section headers in forms.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '400px' }}>
      <div>
        <Label size="large" weight="semibold">
          Personal Information
        </Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="first-name" required>
              First Name
            </Label>
            <Input id="first-name" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="last-name" required>
              Last Name
            </Label>
            <Input id="last-name" />
          </div>
        </div>
      </div>

      <div>
        <Label size="large" weight="semibold">
          Contact Details
        </Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="email-contact" required>
              Email
            </Label>
            <Input id="email-contact" type="email" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input id="phone" type="tel" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InlineLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Labels in an inline/horizontal form layout.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '500px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Label htmlFor="inline-name" style={{ minWidth: '120px' }}>
          Name
        </Label>
        <Input id="inline-name" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Label htmlFor="inline-email" style={{ minWidth: '120px' }} required>
          Email
        </Label>
        <Input id="inline-email" type="email" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Label htmlFor="inline-company" style={{ minWidth: '120px' }} color="secondary">
          Company
        </Label>
        <Input id="inline-company" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all label sizes.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Label size="small">Small Label</Label>
      <Label size="default">Default Label</Label>
      <Label size="large">Large Label</Label>
    </div>
  ),
};

export const AllWeights: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all label font weights.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Label weight="normal">Normal Weight</Label>
      <Label weight="medium">Medium Weight</Label>
      <Label weight="semibold">Semibold Weight</Label>
    </div>
  ),
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all label states and variants.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <Label>Default</Label>
      </div>
      <div>
        <Label required>Required</Label>
      </div>
      <div>
        <Label color="secondary">Secondary</Label>
      </div>
      <div>
        <Label color="error">Error</Label>
      </div>
      <div>
        <Label disabled>Disabled</Label>
      </div>
      <div>
        <Label disabled required>
          Disabled + Required
        </Label>
      </div>
    </div>
  ),
};
