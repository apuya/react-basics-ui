import type { Meta, StoryObj } from '@storybook/react';
import { BiCheck, BiStar, BiUser, BiCog, BiLock } from 'react-icons/bi';
import { Box } from '@/components/layout/Box/Box';
import { Flex } from '@/components/layout/Flex/Flex';
import { Grid } from '@/components/layout/Grid/Grid';
import { Stack } from '@/components/layout/Stack/Stack';
import { Heading } from '@/components/typography/Heading/Heading';
import { Text } from '@/components/typography/Text/Text';
import { Icon } from '@/components/utility/Icon/Icon';
import { TextList } from './TextList';
import type { TextListVariant } from './TextList.types';

const meta = {
  title: 'Typography/TextList',
  component: TextList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A list component for displaying structured lists of items. Supports ordered/unordered lists with multiple visual variants (default, divided, bordered, interactive).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'divided', 'bordered', 'interactive'],
      description: 'Visual variant of the list',
    },
    ordered: {
      control: 'boolean',
      description: 'Render as ordered list (ol) instead of unordered (ul)',
    },
    children: {
      description: 'TextList items (TextList.Item components)',
    },
  },
} satisfies Meta<typeof TextList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for reuse
const sampleItems = ['First item', 'Second item', 'Third item'];
const variants: TextListVariant[] = ['default', 'divided', 'bordered', 'interactive'];

export const Default: Story = {
  render: () => (
    <TextList>
      {sampleItems.map((item) => (
        <TextList.Item key={item}><Text>{item}</Text></TextList.Item>
      ))}
    </TextList>
  ),
};

export const Ordered: Story = {
  render: () => (
    <TextList ordered>
      {['Step one', 'Step two', 'Step three'].map((step) => (
        <TextList.Item key={step}><Text>{step}</Text></TextList.Item>
      ))}
    </TextList>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Grid columns={2} spacing="loose">
      {variants.map((variant) => (
        <Stack key={variant} spacing="compact">
          <Heading as="h3" level="h6" className="capitalize">{variant}</Heading>
          <TextList variant={variant}>
            {sampleItems.map((item, i) => (
              <TextList.Item key={i}>
                <Text>{variant === 'interactive' ? `Hover me ${i + 1}` : `Item ${i + 1}`}</Text>
              </TextList.Item>
            ))}
          </TextList>
        </Stack>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All visual variants: default, divided (with separators), bordered (with outline), and interactive (with hover states).',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const tasks = ['Task completed', 'Tests passing', 'Documentation updated'];
    
    return (
      <TextList variant="divided">
        {tasks.map((task) => (
          <TextList.Item key={task}>
            <Icon icon={BiCheck} color="success" />
            <Text>{task}</Text>
          </TextList.Item>
        ))}
      </TextList>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'TextList items with icons using the Icon component.',
      },
    },
  },
};

export const FeatureTextList: Story = {
  render: () => {
    const features = [
      { title: 'Unlimited projects', description: 'Create as many as you need' },
      { title: 'Priority support', description: 'Get help when you need it' },
      { title: 'Advanced analytics', description: 'Track your performance' },
    ];

    return (
      <Box maxWidth="md">
        <Stack spacing="compact">
          <Heading as="h2" level="h5">Premium Features</Heading>
          <TextList variant="divided">
            {features.map(({ title, description }) => (
              <TextList.Item key={title}>
                <Icon icon={BiStar} color="warning" />
                <Stack spacing="none">
                  <Text weight="medium">{title}</Text>
                  <Text size="small" color="secondary">{description}</Text>
                </Stack>
              </TextList.Item>
            ))}
          </TextList>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Feature list with icons and multi-line content.',
      },
    },
  },
};

export const InteractiveMenu: Story = {
  render: () => {
    const menuItems = [
      { icon: BiUser, label: 'Profile Settings' },
      { icon: BiCog, label: 'Account Preferences' },
      { icon: BiLock, label: 'Privacy & Security' },
    ];

    return (
      <Box maxWidth="xs">
        <TextList variant="interactive">
          {menuItems.map(({ icon, label }) => (
            <TextList.Item key={label}>
              <Icon icon={icon} />
              <Text>{label}</Text>
            </TextList.Item>
          ))}
        </TextList>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive list with hover states, suitable for navigation menus.',
      },
    },
  },
};

export const NestedTextList: Story = {
  render: () => {
    const items = [
      { main: 'Main item one', sub: ['Sub-item 1a', 'Sub-item 1b'] },
      { main: 'Main item two', sub: ['Sub-item 2a', 'Sub-item 2b'] },
    ];

    return (
      <TextList ordered>
        {items.map(({ main, sub }) => (
          <TextList.Item key={main}>
            <Stack spacing="compact">
              <Text>{main}</Text>
              <TextList>
                {sub.map((subItem) => (
                  <TextList.Item key={subItem}><Text>{subItem}</Text></TextList.Item>
                ))}
              </TextList>
            </Stack>
          </TextList.Item>
        ))}
      </TextList>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Nested list structure with ordered parent and unordered children.',
      },
    },
  },
};

export const TaskTextList: Story = {
  render: () => {
    const tasks = [
      { name: 'Task item', status: 'Due today', statusColor: 'secondary' as const },
      { name: 'Another task', status: 'Due tomorrow', statusColor: 'secondary' as const },
      { name: 'Final task', status: 'Completed', statusColor: 'success' as const },
    ];

    return (
      <Box maxWidth="md">
        <TextList variant="bordered">
          {tasks.map(({ name, status, statusColor }) => (
            <TextList.Item key={name}>
              <Flex justify="between" align="center" className="w-full">
                <Text>{name}</Text>
                <Text size="small" color={statusColor}>{status}</Text>
              </Flex>
            </TextList.Item>
          ))}
        </TextList>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Task list with status indicators using Flex for layout.',
      },
    },
  },
};
