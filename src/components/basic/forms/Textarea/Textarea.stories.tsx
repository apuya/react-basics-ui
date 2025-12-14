import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A multi-line text input for longer form content with support for character counting, resize modes, and validation states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Controls the padding and min-height of the textarea',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Controls the resize behavior',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showCharCount: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic textarea with placeholder */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

/** Textarea with label, helper text, and character count */
export const WithLabelAndHelper: Story = {
  args: {
    label: 'Description',
    placeholder: 'Provide a detailed description...',
    helperText: 'Please be as detailed as possible.',
    maxLength: 200,
    showCharCount: true,
  },
};

/** All validation and interaction states */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Textarea
        label="Required"
        placeholder="This field is required..."
        required
        helperText="Indicates a mandatory field"
      />
      <Textarea
        label="Error"
        placeholder="Enter your comments..."
        error
        helperText="This field has an error."
        defaultValue="Invalid content"
      />
      <Textarea
        label="Disabled"
        disabled
        defaultValue="This content cannot be edited."
      />
    </div>
  ),
};

/** All size variants side by side */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Textarea label="Small" size="small" placeholder="Small textarea..." />
      <Textarea label="Default" size="default" placeholder="Default textarea..." />
      <Textarea label="Large" size="large" placeholder="Large textarea..." />
    </div>
  ),
};

/** All resize mode options */
export const ResizeModes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Textarea label="Vertical (default)" resize="vertical" placeholder="Resize vertically..." />
      <Textarea label="None" resize="none" placeholder="Cannot be resized..." />
      <Textarea label="Horizontal" resize="horizontal" placeholder="Resize horizontally..." />
      <Textarea label="Both" resize="both" placeholder="Resize in any direction..." />
    </div>
  ),
};

/** Character counting with max length */
export const CharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 200,
    showCharCount: true,
    helperText: 'Brief description of yourself',
    defaultValue: 'I am a software developer passionate about creating great user experiences.',
  },
};

/** Complete form field example with all features */
export const FullExample: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your thoughts with us...',
    helperText: 'Your feedback helps us improve our services.',
    maxLength: 500,
    showCharCount: true,
    required: true,
    rows: 6,
  },
};
