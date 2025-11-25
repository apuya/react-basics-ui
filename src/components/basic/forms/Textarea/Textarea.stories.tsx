import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
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
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    placeholder: 'Provide a detailed description...',
    helperText: 'Please be as detailed as possible.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    helperText: 'This field is required.',
    error: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 200,
    showCharCount: true,
    defaultValue: 'I am a software developer passionate about creating great user experiences.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    defaultValue: 'This content cannot be edited.',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Textarea',
    placeholder: 'Small size...',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Textarea',
    placeholder: 'Large size...',
    size: 'large',
  },
};

export const ResizeNone: Story = {
  args: {
    label: 'Fixed Size',
    placeholder: 'This textarea cannot be resized',
    resize: 'none',
  },
};

export const ResizeHorizontal: Story = {
  args: {
    label: 'Horizontal Resize',
    placeholder: 'This textarea can only be resized horizontally',
    resize: 'horizontal',
  },
};

export const ResizeBoth: Story = {
  args: {
    label: 'Free Resize',
    placeholder: 'This textarea can be resized in both directions',
    resize: 'both',
  },
};

export const FullExample: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your thoughts with us...',
    helperText: 'Your feedback helps us improve our services.',
    maxLength: 500,
    showCharCount: true,
    rows: 6,
  },
};
