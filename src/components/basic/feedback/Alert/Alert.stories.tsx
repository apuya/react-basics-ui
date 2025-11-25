import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alert component for displaying important messages to users with support for different severity levels, optional icons, titles, descriptions, and dismissible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual variant of the alert',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    description: {
      control: 'text',
      description: 'Optional description text for the alert',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
      table: {
        defaultValue: { summary: true },
      },
    },
    onClose: {
      action: 'closed',
      description:
        'Optional callback when the alert is dismissed. If provided, a close button will be rendered.',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'You can add components to your app using the cli.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default alert with title and description.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Alert variant="info" title="Information" description="This is an informational alert." />
      <Alert variant="success" title="Success!" description="Your changes have been saved successfully." />
      <Alert variant="warning" title="Warning" description="This action cannot be undone." />
      <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available alert variants: info, success, warning, and error.',
      },
    },
  },
};

export const WithTitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Successfully saved!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with only a title, no description.',
      },
    },
  },
};

export const WithDescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'This alert only has a description without a title.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with only a description, no title.',
      },
    },
  },
};

export const WithChildren: Story = {
  render: () => (
    <Alert variant="warning">
      <strong>Warning:</strong> This is a custom alert using children instead of title/description props.
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with custom children content instead of using title/description props.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon',
    description: 'This alert is displayed without an icon.',
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert without the variant icon by setting showIcon to false.',
      },
    },
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'success',
    title: 'Dismissible Alert',
    description: 'Click the close button to dismiss this alert.',
    onClose: () => console.log('Alert dismissed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with a close button. Provide an onClose callback to handle dismissal.',
      },
    },
  },
};

export const DismissibleAllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Alert
        variant="info"
        title="Info Alert"
        description="Dismissible information alert."
        onClose={() => console.log('Info dismissed')}
      />
      <Alert
        variant="success"
        title="Success Alert"
        description="Dismissible success alert."
        onClose={() => console.log('Success dismissed')}
      />
      <Alert
        variant="warning"
        title="Warning Alert"
        description="Dismissible warning alert."
        onClose={() => console.log('Warning dismissed')}
      />
      <Alert
        variant="error"
        title="Error Alert"
        description="Dismissible error alert."
        onClose={() => console.log('Error dismissed')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All variants with close buttons.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Long Content Alert',
    description:
      'This is an alert with a very long description to demonstrate how the component handles text wrapping and layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with long text content to demonstrate text wrapping.',
      },
    },
  },
};

export const LongContentDismissible: Story = {
  args: {
    variant: 'error',
    title: 'Long Content with Close Button',
    description:
      'This is a dismissible alert with very long content to test the layout when both long text and a close button are present. The close button should remain aligned to the top-right corner while the text wraps naturally.',
    onClose: () => console.log('Long content alert dismissed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with long content and a close button to test layout handling.',
      },
    },
  },
};

export const ComplexChildren: Story = {
  render: () => (
    <Alert variant="info" onClose={() => console.log('Complex alert dismissed')}>
      <div>
        <p className="font-semibold">Update Available</p>
        <p className="mt-1">
          A new version of the application is available.{' '}
          <a href="#" className="underline hover:no-underline">
            View release notes
          </a>
          .
        </p>
      </div>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with complex children including links and formatted text.',
      },
    },
  },
};
