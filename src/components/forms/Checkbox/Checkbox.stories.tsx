import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';

// =============================================================================
// Meta
// =============================================================================

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Checkbox component for binary choices and multiple selections from a set of options.

## Features
- Three size variants (small, default, large)
- Indeterminate state for "select all" patterns
- Error state for validation
- Custom label content (text or JSX)
- Full keyboard navigation support
- Semantic HTML with proper ARIA attributes

## When to Use
- Allow users to select multiple options from a list
- Single binary choices (accept terms, remember me, etc.)
- Toggle settings or preferences
- Bulk selection with "select all" functionality

## Accessibility
- Always provide a \`label\` prop or \`aria-label\` for screen readers
- Use \`error\` prop with validation messages for accessible error handling
- Keyboard navigation fully supported (Space to toggle)
- Proper focus indicators included

## Related Components
- **FormGroup** - Use to group related checkboxes with shared label/legend
- **Radio** - Use for mutually exclusive single selections
- **Switch** - Use for instant on/off actions (no form submission)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Visual size of the checkbox',
      table: { defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Label content (text or JSX)',
    },
    error: {
      control: 'boolean',
      description: 'Whether checkbox is in error state',
      table: { defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state for partial selections',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Playground (for argTypes controls)
// =============================================================================

export const Playground: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'default',
    error: false,
    indeterminate: false,
    disabled: false,
  },
};

// =============================================================================
// Use Cases
// =============================================================================

/**
 * Simple checkbox for binary consent or acceptance.
 */
export const BasicUsage: Story = {
  render: () => <Checkbox label="I agree to the terms and conditions" />,
};

/**
 * Checkbox without visible label. Always provide `aria-label` for accessibility.
 */
export const WithoutLabel: Story = {
  render: () => <Checkbox aria-label="Accept terms" />,
};

/**
 * Checkbox with rich JSX label containing links or formatted text.
 */
export const WithRichLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Checkbox
        label={
          <span>
            I agree to the{' '}
            <a href="#" className="text-blue-600 underline hover:text-blue-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 underline hover:text-blue-700">
              Privacy Policy
            </a>
          </span>
        }
      />
    </div>
  ),
};

/**
 * Required checkbox for mandatory form fields.
 */
export const Required: Story = {
  render: () => <Checkbox label="I agree to the terms and conditions" required />,
};

/**
 * Checkbox showing validation error state.
 */
export const WithError: Story = {
  render: () => (
    <Stack spacing="sm">
      <Checkbox label="Accept terms to continue" error />
      <Text size="caption" color="error" className="ml-6">
        You must accept the terms to proceed
      </Text>
    </Stack>
  ),
};

/**
 * Group of related checkboxes for multiple selections.
 */
export const CheckboxGroup: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text weight="medium" className="mb-2">
        Select your interests
      </Text>
      <Checkbox label="Technology" defaultChecked />
      <Checkbox label="Design" defaultChecked />
      <Checkbox label="Business" />
      <Checkbox label="Marketing" />
      <Checkbox label="Finance" />
    </Stack>
  ),
};

/**
 * Checkboxes arranged horizontally for compact layouts.
 */
export const HorizontalLayout: Story = {
  render: () => (
    <div>
      <Text weight="medium" className="mb-2">
        Notification preferences
      </Text>
      <Flex className="gap-6">
        <Checkbox label="Email" defaultChecked />
        <Checkbox label="SMS" />
        <Checkbox label="Push" defaultChecked />
      </Flex>
    </div>
  ),
};

// =============================================================================
// Interactive Examples
// =============================================================================

/**
 * Interactive "Select All" pattern with indeterminate state.
 * Parent checkbox controls all child checkboxes.
 */
export const SelectAllPattern: Story = {
  render: function SelectAllExample() {
    const [items, setItems] = useState([
      { id: 1, label: 'Task 1', checked: true },
      { id: 2, label: 'Task 2', checked: true },
      { id: 3, label: 'Task 3', checked: false },
      { id: 4, label: 'Task 4', checked: false },
    ]);

    const checkedCount = items.filter((item) => item.checked).length;
    const allChecked = checkedCount === items.length;
    const someChecked = checkedCount > 0 && checkedCount < items.length;

    const handleSelectAll = () => {
      setItems(items.map((item) => ({ ...item, checked: !allChecked })));
    };

    const handleItemToggle = (id: number) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    };

    return (
      <Stack spacing="sm">
        <Checkbox
          label="Select all tasks"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleSelectAll}
        />
        <Stack spacing="sm" className="ml-6">
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemToggle(item.id)}
            />
          ))}
        </Stack>
      </Stack>
    );
  },
};

/**
 * Form with live validation demonstrating dynamic error states.
 */
export const FormWithValidation: Story = {
  render: function FormValidationExample() {
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const hasError = submitted && !agreed;

    return (
      <Stack spacing="md" className="w-80">
        <Heading level="h4">Create Account</Heading>
        <Stack spacing="sm">
          <Checkbox label="Remember me" defaultChecked />
          <Checkbox label="Email notifications" />
          <Checkbox
            label="I agree to the terms and conditions"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            error={hasError}
            required
          />
          {hasError && (
            <Text size="caption" color="error" className="ml-6">
              You must accept the terms to continue
            </Text>
          )}
        </Stack>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          style={{
            padding: '8px 16px',
            background: 'var(--semantic-status-info-default)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </Stack>
    );
  },
};

/**
 * Settings panel with grouped preferences and sections.
 */
export const SettingsPanel: Story = {
  render: () => (
    <Stack spacing="lg" className="w-96">
      <div>
        <Heading level="h4" className="mb-1">
          Notifications
        </Heading>
        <Text size="body" color="secondary" className="mb-3">
          Choose how you want to receive updates
        </Text>
        <Stack spacing="sm">
          <Checkbox label="Email notifications" defaultChecked />
          <Checkbox label="Push notifications" defaultChecked />
          <Checkbox label="SMS notifications" />
        </Stack>
      </div>
      <div>
        <Heading level="h4" className="mb-1">
          Privacy
        </Heading>
        <Text size="body" color="secondary" className="mb-3">
          Control your privacy settings
        </Text>
        <Stack spacing="sm">
          <Checkbox label="Make profile public" />
          <Checkbox label="Show email address" />
          <Checkbox label="Allow search engines to index profile" defaultChecked />
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * Bulk actions interface with mixed states showing file selection.
 */
export const BulkActions: Story = {
  render: function BulkActionsExample() {
    const [files, setFiles] = useState([
      { id: 1, name: 'Document.pdf', selected: true, readonly: false },
      { id: 2, name: 'Image.png', selected: true, readonly: false },
      { id: 3, name: 'Video.mp4', selected: false, readonly: false },
      { id: 4, name: 'Archive.zip', selected: false, readonly: true },
    ]);

    const selectedCount = files.filter((f) => f.selected && !f.readonly).length;
    const selectableCount = files.filter((f) => !f.readonly).length;

    return (
      <Stack spacing="sm">
        <Text weight="medium" className="mb-2">
          {selectedCount > 0 ? `${selectedCount} file(s) selected` : 'Select files to delete'}
        </Text>
        {files.map((file) => (
          <Checkbox
            key={file.id}
            label={file.readonly ? `${file.name} (read-only)` : file.name}
            checked={file.selected}
            disabled={file.readonly}
            onChange={() =>
              setFiles(
                files.map((f) => (f.id === file.id ? { ...f, selected: !f.selected } : f))
              )
            }
          />
        ))}
      </Stack>
    );
  },
};

// =============================================================================
// States Overview
// =============================================================================

/**
 * All available size variants for comparison.
 */
export const Sizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="large" label="Large checkbox" />
    </Stack>
  ),
};

/**
 * All possible checkbox states for visual comparison.
 */
export const AllStates: Story = {
  render: () => (
    <Stack spacing="md">
      <Stack spacing="sm">
        <Text weight="medium">Interactive States</Text>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
      </Stack>

      <Stack spacing="sm">
        <Text weight="medium">Validation States</Text>
        <Checkbox label="Error" error />
        <Checkbox label="Required" required />
      </Stack>

      <Stack spacing="sm">
        <Text weight="medium">Disabled States</Text>
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled + Checked" disabled defaultChecked />
      </Stack>
    </Stack>
  ),
};
