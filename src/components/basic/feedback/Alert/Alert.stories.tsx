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
          'Alert component for displaying important messages. Supports info, success, warning, and error variants with optional icons, titles, descriptions, and dismissible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'info' } },
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show variant icon',
      table: { defaultValue: { summary: 'true' } },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when dismissed',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: StoryWithRender = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert variant="info" title="Information" description="This is an informational alert." />
      <Alert variant="success" title="Success!" description="Your changes have been saved successfully." />
      <Alert variant="warning" title="Warning" description="This action cannot be undone." />
      <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available alert variants.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Successfully saved!',
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'This alert only has a description without a title.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon',
    description: 'This alert is displayed without an icon.',
    showIcon: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const Dismissible: StoryWithRender = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert
        variant="info"
        title="Info Alert"
        description="Dismissible information alert."
        onClose={() => console.log('Dismissed')}
      />
      <Alert
        variant="success"
        title="Success Alert"
        description="Dismissible success alert."
        onClose={() => console.log('Dismissed')}
      />
      <Alert
        variant="warning"
        title="Warning Alert"
        description="Dismissible warning alert."
        onClose={() => console.log('Dismissed')}
      />
      <Alert
        variant="error"
        title="Error Alert"
        description="Dismissible error alert."
        onClose={() => console.log('Dismissed')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All variants with dismiss buttons.',
      },
    },
  },
};

export const WithChildren: StoryWithRender = {
  render: () => (
    <div className="max-w-lg">
      <Alert variant="info" onClose={() => console.log('Dismissed')}>
        <div>
          <p className="font-semibold">Update Available</p>
          <p className="mt-1">
            A new version is available.{' '}
            <a href="#" className="underline hover:no-underline">
              View release notes
            </a>
            .
          </p>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert with custom children content including links.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Long Content Alert',
    description:
      'This is an alert with a very long description to demonstrate how the component handles text wrapping and layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    onClose: () => console.log('Dismissed'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Alert with long text content.',
      },
    },
  },
};
