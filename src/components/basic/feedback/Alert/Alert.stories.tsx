import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Stack } from '../../layout/Stack';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { BiStar, BiHeart, BiRocket } from 'react-icons/bi';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alert component for displaying important messages. Supports info, success, warning, and error variants with optional icons, titles, descriptions, and dismissible functionality. Icons can be customized using leadingIcon and trailingIcon props.',
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
    leadingIcon: {
      control: false,
      description: 'Optional icon at the start. Pass null to hide default icon.',
    },
    trailingIcon: {
      control: false,
      description: 'Optional icon at the end (before close button)',
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
      <Box style={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
    ),
  ],
};

export const AllVariants: StoryWithRender = {
  render: () => (
    <Box style={{ maxWidth: '32rem' }}>
      <Stack spacing="md">
        <Alert variant="info" title="Information" description="This is an informational alert." />
        <Alert variant="success" title="Success!" description="Your changes have been saved successfully." />
        <Alert variant="warning" title="Warning" description="This action cannot be undone." />
        <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
      </Stack>
    </Box>
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
      <Box style={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
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
      <Box style={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon',
    description: 'This alert is displayed without an icon.',
    leadingIcon: null,
  },
  decorators: [
    (Story) => (
      <Box style={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Alert with leadingIcon set to null to hide the default variant icon.',
      },
    },
  },
};

export const Dismissible: StoryWithRender = {
  render: () => (
    <Box style={{ maxWidth: '32rem' }}>
      <Stack spacing="md">
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
      </Stack>
    </Box>
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
    <Box style={{ maxWidth: '32rem' }}>
      <Alert variant="info" onClose={() => console.log('Dismissed')}>
        <Stack spacing="xs">
          <Text weight="semibold">Update Available</Text>
          <Text size="small">
            A new version is available.{' '}
            <a href="#" style={{ textDecoration: 'underline' }}>
              View release notes
            </a>
            .
          </Text>
        </Stack>
      </Alert>
    </Box>
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
      <Box style={{ maxWidth: '32rem' }}>
        <Story />
      </Box>
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

export const CustomLeadingIcon: StoryWithRender = {
  render: () => (
    <Box style={{ maxWidth: '32rem' }}>
      <Stack spacing="md">
        <Alert
          variant="info"
          title="Custom Icon"
          description="This alert uses a custom leading icon."
          leadingIcon={<BiStar />}
        />
        <Alert
          variant="success"
          title="Favorite"
          description="This alert uses a heart icon."
          leadingIcon={<BiHeart />}
        />
        <Alert
          variant="warning"
          title="Launch Ready"
          description="This alert uses a rocket icon."
          leadingIcon={<BiRocket />}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with custom leading icons instead of default variant icons.',
      },
    },
  },
};

export const TrailingIcon: StoryWithRender = {
  render: () => (
    <Box style={{ maxWidth: '32rem' }}>
      <Stack spacing="md">
        <Alert
          variant="info"
          title="Trailing Icon"
          description="This alert has a trailing icon."
          trailingIcon={<BiStar />}
        />
        <Alert
          variant="success"
          title="Both Icons"
          description="This alert has both leading and trailing icons."
          leadingIcon={<BiHeart />}
          trailingIcon={<BiRocket />}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with trailing icons, demonstrating the flexibility of the icon slots.',
      },
    },
  },
};
