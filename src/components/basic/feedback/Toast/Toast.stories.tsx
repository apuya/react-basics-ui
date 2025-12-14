import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast notification component for displaying temporary messages. Supports five variants with automatic icon selection and optional close functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'default'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'default' } },
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show variant icon',
      table: { defaultValue: { summary: 'true' } },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'This is a default toast notification.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: StoryWithRender = {
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Toast variant="success" title="Success" description="Operation completed successfully." />
      <Toast variant="error" title="Error" description="An error occurred during processing." />
      <Toast variant="warning" title="Warning" description="Please review before proceeding." />
      <Toast variant="info" title="Info" description="Here's some useful information." />
      <Toast variant="default" title="Notification" description="This is a notification." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five toast variants.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Profile updated',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'You have 3 new messages waiting for you.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    description: 'Your preferences have been updated.',
    showIcon: false,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Dismissible: StoryWithRender = {
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Toast
        variant="success"
        title="File uploaded"
        description="document.pdf has been uploaded."
        onClose={() => console.log('Dismissed')}
      />
      <Toast
        variant="info"
        title="Cookie Policy"
        description="We use cookies to improve your experience."
        onClose={() => console.log('Dismissed')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toasts with close button.',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    variant: 'success',
    children: (
      <div>
        <div className="font-semibold mb-1">Payment Successful</div>
        <div className="text-sm opacity-90">
          Your order <strong>#12345</strong> has been confirmed.
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Toast with custom JSX content.',
      },
    },
  },
};

export const ToastStack: StoryWithRender = {
  render: () => (
    <div className="flex flex-col gap-2 w-96">
      <Toast
        variant="success"
        title="File uploaded"
        description="document.pdf has been uploaded."
        onClose={() => {}}
      />
      <Toast
        variant="info"
        title="New comment"
        description="John commented on your post."
        onClose={() => {}}
      />
      <Toast
        variant="warning"
        title="Low storage"
        description="You have less than 10% storage remaining."
        onClose={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple toasts stacked together.',
      },
    },
  },
};
