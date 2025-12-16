import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiUser, BiFolder, BiStar, BiCreditCard, BiShield, BiRocket } from 'react-icons/bi';
import { Select } from './Select';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';
import { Icon } from '@/components/utility/Icon';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  subcomponents: {
    'Select.Trigger': Select.Trigger as React.ComponentType<unknown>,
    'Select.Menu': Select.Menu as React.ComponentType<unknown>,
    'Select.Option': Select.Option as React.ComponentType<unknown>,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A compound select component for dropdown selection with full keyboard navigation and accessibility.

## Features
- **Compound Pattern**: \`Select.Trigger\`, \`Select.Menu\`, \`Select.Option\`
- **Controlled/Uncontrolled**: Works both ways with \`value\`/\`onChange\` or \`defaultValue\`
- **Sizes**: \`small\`, \`default\`, \`large\`
- **States**: Normal, disabled, error
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Home/End
- **Accessibility**: ARIA combobox pattern with proper roles

## Compound Components
| Component | Description |
|-----------|-------------|
| \`Select\` | Root wrapper managing state and context |
| \`Select.Trigger\` | Button that opens the dropdown |
| \`Select.Menu\` | Container for options (renders when open) |
| \`Select.Option\` | Individual selectable option |

## Usage
\`\`\`tsx
<Select value={value} onChange={setValue}>
  <Select.Trigger placeholder="Select..." />
  <Select.Menu>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
  </Select.Menu>
</Select>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'Controlled value (string)',
      table: { category: 'State' },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled mode',
      table: { category: 'State' },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
      table: { category: 'Events' },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size variant',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire select',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'Show error state styling',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Base ID for ARIA relationships',
      table: { category: 'Accessibility' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: { category: 'Styling' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

// =============================================================================
// PLAYGROUND (for autodocs controls)
// =============================================================================

export const Playground: Story = {
  args: {
    size: 'default',
    disabled: false,
    error: false,
  },
  render: (args) => (
    <Select {...args}>
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
        <Select.Option value="grape">Grape</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select comes in three sizes: `small`, `default`, and `large`.',
      },
    },
  },
  render: () => (
    <Stack direction="vertical" spacing="md">
      <Stack direction="vertical" spacing="xs">
        <Text size="small" weight="medium" color="secondary">Small</Text>
        <Select size="small">
          <Select.Trigger placeholder="Small select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
      <Stack direction="vertical" spacing="xs">
        <Text size="small" weight="medium" color="secondary">Default</Text>
        <Select size="default">
          <Select.Trigger placeholder="Default select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
      <Stack direction="vertical" spacing="xs">
        <Text size="small" weight="medium" color="secondary">Large</Text>
        <Select size="large">
          <Select.Trigger placeholder="Large select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select supports `disabled` and `error` states.',
      },
    },
  },
  render: () => (
    <Stack direction="vertical" spacing="md">
      <Stack direction="vertical" spacing="xs">
        <Text size="small" weight="medium" color="secondary">Normal</Text>
        <Select>
          <Select.Trigger placeholder="Select option..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
      <Stack direction="vertical" spacing="xs">
        <Text size="small" weight="medium" color="secondary">Disabled</Text>
        <Select disabled>
          <Select.Trigger placeholder="Disabled select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
      <Stack direction="vertical" spacing="xs">
        <Text size="small" weight="medium" color="secondary">Error</Text>
        <Select error>
          <Select.Trigger placeholder="Error state..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
        <Text size="small" color="error">This field is required</Text>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// CONTROLLED
// =============================================================================

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `value` and `onChange` for controlled mode. The parent component manages the state.',
      },
    },
  },
  render: function ControlledStory() {
    const [value, setValue] = useState('');
    return (
      <Stack direction="vertical" spacing="sm">
        <Select value={value} onChange={setValue}>
          <Select.Trigger placeholder="Select a fruit..." />
          <Select.Menu>
            <Select.Option value="apple">Apple</Select.Option>
            <Select.Option value="banana">Banana</Select.Option>
            <Select.Option value="cherry">Cherry</Select.Option>
          </Select.Menu>
        </Select>
        <Text size="small" color="secondary">
          Selected: <Text as="span" weight="semibold">{value || 'none'}</Text>
        </Text>
        <button 
          onClick={() => setValue('')}
          style={{ 
            padding: '4px 8px', 
            fontSize: '12px',
            cursor: 'pointer',
            width: 'fit-content'
          }}
        >
          Clear
        </button>
      </Stack>
    );
  },
};

// =============================================================================
// DISABLED OPTIONS
// =============================================================================

export const DisabledOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Individual options can be disabled using the `disabled` prop on `Select.Option`.',
      },
    },
  },
  decorators: [(Story) => <div style={{ width: '320px', minHeight: '350px' }}><Story /></div>],
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select status..." />
      <Select.Menu>
        <Select.Option value="active">Active</Select.Option>
        <Select.Option value="pending" disabled>Pending (unavailable)</Select.Option>
        <Select.Option value="inactive">Inactive</Select.Option>
        <Select.Option value="archived" disabled>Archived (unavailable)</Select.Option>
        <Select.Option value="deleted">Deleted</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// WITH DEFAULT VALUE
// =============================================================================

export const WithDefaultValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `defaultValue` for uncontrolled mode with an initial selection.',
      },
    },
  },
  render: () => (
    <Select defaultValue="pro">
      <Select.Trigger placeholder="Select plan..." />
      <Select.Menu>
        <Select.Option value="free">Free</Select.Option>
        <Select.Option value="pro">Pro</Select.Option>
        <Select.Option value="enterprise">Enterprise</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// SCROLLABLE MENU
// =============================================================================

export const ScrollableMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'For long lists, add scroll styling to `Select.Menu` via className.',
      },
    },
  },
  decorators: [(Story) => <div style={{ width: '320px', minHeight: '400px' }}><Story /></div>],
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select a month..." />
      <Select.Menu className="max-h-48 overflow-y-auto">
        <Select.Option value="jan">January</Select.Option>
        <Select.Option value="feb">February</Select.Option>
        <Select.Option value="mar">March</Select.Option>
        <Select.Option value="apr">April</Select.Option>
        <Select.Option value="may">May</Select.Option>
        <Select.Option value="jun">June</Select.Option>
        <Select.Option value="jul">July</Select.Option>
        <Select.Option value="aug">August</Select.Option>
        <Select.Option value="sep">September</Select.Option>
        <Select.Option value="oct">October</Select.Option>
        <Select.Option value="nov">November</Select.Option>
        <Select.Option value="dec">December</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// USE CASE: CUSTOM OPTION CONTENT (ICONS)
// =============================================================================

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Options can contain custom content like icons. Use a flex container for layout.',
      },
    },
  },
  decorators: [(Story) => <div style={{ width: '320px', minHeight: '350px' }}><Story /></div>],
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select category..." />
      <Select.Menu>
        <Select.Option value="users">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon={BiUser} size="sm" />
            <span>Users</span>
          </span>
        </Select.Option>
        <Select.Option value="documents">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon={BiFolder} size="sm" />
            <span>Documents</span>
          </span>
        </Select.Option>
        <Select.Option value="favorites">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon={BiStar} size="sm" />
            <span>Favorites</span>
          </span>
        </Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// USE CASE: OPTIONS WITH DESCRIPTIONS
// =============================================================================

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Options can include secondary description text for more context.',
      },
    },
  },
  decorators: [(Story) => <div style={{ width: '360px', minHeight: '400px' }}><Story /></div>],
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select a plan..." />
      <Select.Menu>
        <Select.Option value="free">
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon icon={BiCreditCard} size="sm" />
              <Text weight="medium">Free</Text>
            </span>
            <Text size="small" color="secondary">Up to 3 projects</Text>
          </span>
        </Select.Option>
        <Select.Option value="pro">
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon icon={BiShield} size="sm" />
              <Text weight="medium">Pro</Text>
            </span>
            <Text size="small" color="secondary">Unlimited projects + analytics</Text>
          </span>
        </Select.Option>
        <Select.Option value="enterprise">
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon icon={BiRocket} size="sm" />
              <Text weight="medium">Enterprise</Text>
            </span>
            <Text size="small" color="secondary">Custom limits + dedicated support</Text>
          </span>
        </Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// USE CASE: FORM INTEGRATION
// =============================================================================

export const FormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Select integrates with forms using controlled state. Combine with other form components for complete forms.

**Tips:**
- Use \`value\` and \`onChange\` for form state management
- Add \`error\` prop when validation fails
- Pair with labels and error messages for accessibility
        `,
      },
    },
  },
  render: function FormStory() {
    const [formData, setFormData] = useState({
      country: '',
      role: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit}>
        <Stack direction="vertical" spacing="md">
          <Stack direction="vertical" spacing="xs">
            <Text as="label" size="small" weight="medium">Country *</Text>
            <Select 
              value={formData.country} 
              onChange={(v) => setFormData(prev => ({ ...prev, country: v }))}
              error={submitted && !formData.country}
            >
              <Select.Trigger placeholder="Select country..." />
              <Select.Menu>
                <Select.Option value="us">United States</Select.Option>
                <Select.Option value="ca">Canada</Select.Option>
                <Select.Option value="uk">United Kingdom</Select.Option>
                <Select.Option value="de">Germany</Select.Option>
              </Select.Menu>
            </Select>
            {submitted && !formData.country && (
              <Text size="small" color="error">Country is required</Text>
            )}
          </Stack>

          <Stack direction="vertical" spacing="xs">
            <Text as="label" size="small" weight="medium">Role</Text>
            <Select 
              value={formData.role} 
              onChange={(v) => setFormData(prev => ({ ...prev, role: v }))}
            >
              <Select.Trigger placeholder="Select role..." />
              <Select.Menu>
                <Select.Option value="developer">Developer</Select.Option>
                <Select.Option value="designer">Designer</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
              </Select.Menu>
            </Select>
          </Stack>

          <button 
            type="submit"
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Submit
          </button>
        </Stack>
      </form>
    );
  },
};

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Select supports full keyboard navigation:

| Key | Action |
|-----|--------|
| \`Enter\` / \`Space\` | Open menu / Select option |
| \`Arrow Down\` | Move to next option |
| \`Arrow Up\` | Move to previous option |
| \`Home\` | Move to first option |
| \`End\` | Move to last option |
| \`Escape\` | Close menu |

Try navigating with your keyboard!
        `,
      },
    },
  },
  decorators: [(Story) => <div style={{ width: '320px', minHeight: '350px' }}><Story /></div>],
  render: () => (
    <Select>
      <Select.Trigger placeholder="Use keyboard to navigate..." />
      <Select.Menu>
        <Select.Option value="first">First Option</Select.Option>
        <Select.Option value="second">Second Option</Select.Option>
        <Select.Option value="third">Third Option</Select.Option>
        <Select.Option value="fourth">Fourth Option</Select.Option>
        <Select.Option value="fifth">Fifth Option</Select.Option>
      </Select.Menu>
    </Select>
  ),
};
