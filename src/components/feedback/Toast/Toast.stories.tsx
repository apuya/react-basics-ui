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
          'A toast notification component for displaying temporary messages to users. Supports five variants (success, error, warning, info, default) with automatic icon selection and optional close functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'default'],
      description: 'Visual variant of the toast',
    },
    title: {
      control: 'text',
      description: 'Title text of the toast notification',
    },
    description: {
      control: 'text',
      description: 'Description text of the toast notification',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'This is a default toast notification.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default toast notification with neutral styling.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success toast for positive feedback on completed actions.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error toast for displaying error messages and failures.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action cannot be undone. Please proceed with caution.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning toast for cautionary messages requiring attention.',
      },
    },
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'New updates are available for your account.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Info toast for informational messages and tips.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Profile updated',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with only a title, no description.',
      },
    },
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'You have 3 new messages waiting for you.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with only a description, no title.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    description: 'Your preferences have been updated.',
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast without an icon for a more minimal appearance.',
      },
    },
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: 'info',
    title: 'Cookie Policy',
    description: 'We use cookies to improve your experience.',
    onClose: () => alert('Toast closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with a close button that triggers a callback when clicked.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Storage Almost Full',
    description:
      'You are using 95% of your available storage. Please delete some files or upgrade your plan to continue uploading.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with longer description text that wraps to multiple lines.',
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
  parameters: {
    docs: {
      description: {
        story: 'Toast with custom JSX content instead of title and description props.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 min-w-[400px]">
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
        story: 'Comparison of all five toast variants.',
      },
    },
  },
};

export const ToastStack: Story = {
  render: () => (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 w-96">
      <Toast
        variant="success"
        title="File uploaded"
        description="document.pdf has been uploaded."
        onClose={() => console.log('Close 1')}
      />
      <Toast
        variant="info"
        title="New comment"
        description="John commented on your post."
        onClose={() => console.log('Close 2')}
      />
      <Toast
        variant="warning"
        title="Low storage"
        description="You have less than 10% storage remaining."
        onClose={() => console.log('Close 3')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple toasts stacked together, typically positioned at bottom-right.',
      },
    },
  },
};
