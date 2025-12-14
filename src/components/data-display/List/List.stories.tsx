import type { Meta, StoryObj } from '@storybook/react';
import { BiCheck, BiStar, BiUser, BiCog, BiLock } from 'react-icons/bi';
import { Box } from '@/components/layout/Box/Box';
import { Flex } from '@/components/layout/Flex/Flex';
import { Grid } from '@/components/layout/Grid/Grid';
import { Stack } from '@/components/layout/Stack/Stack';
import { Heading } from '@/components/typography/Heading/Heading';
import { Text } from '@/components/typography/Text/Text';
import { Icon } from '@/components/utility/Icon/Icon';
import { List } from './List';
import type { ListVariant } from './List.types';

const meta = {
  title: 'Basic/Data Display/List',
  component: List,
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
      description: 'List items (List.Item components)',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for reuse
const sampleItems = ['First item', 'Second item', 'Third item'];
const variants: ListVariant[] = ['default', 'divided', 'bordered', 'interactive'];

export const Default: Story = {
  render: () => (
    <List>
      {sampleItems.map((item) => (
        <List.Item key={item}><Text>{item}</Text></List.Item>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List ordered>
      {['Step one', 'Step two', 'Step three'].map((step) => (
        <List.Item key={step}><Text>{step}</Text></List.Item>
      ))}
    </List>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Grid columns={2} spacing="loose">
      {variants.map((variant) => (
        <Stack key={variant} spacing="compact">
          <Heading as="h3" level="h6" className="capitalize">{variant}</Heading>
          <List variant={variant}>
            {sampleItems.map((item, i) => (
              <List.Item key={i}>
                <Text>{variant === 'interactive' ? `Hover me ${i + 1}` : `Item ${i + 1}`}</Text>
              </List.Item>
            ))}
          </List>
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
      <List variant="divided">
        {tasks.map((task) => (
          <List.Item key={task}>
            <Icon icon={BiCheck} color="success" />
            <Text>{task}</Text>
          </List.Item>
        ))}
      </List>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'List items with icons using the Icon component.',
      },
    },
  },
};

export const FeatureList: Story = {
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
          <List variant="divided">
            {features.map(({ title, description }) => (
              <List.Item key={title}>
                <Icon icon={BiStar} color="warning" />
                <Stack spacing="none">
                  <Text weight="medium">{title}</Text>
                  <Text size="small" color="secondary">{description}</Text>
                </Stack>
              </List.Item>
            ))}
          </List>
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
        <List variant="interactive">
          {menuItems.map(({ icon, label }) => (
            <List.Item key={label}>
              <Icon icon={icon} />
              <Text>{label}</Text>
            </List.Item>
          ))}
        </List>
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

export const NestedList: Story = {
  render: () => {
    const items = [
      { main: 'Main item one', sub: ['Sub-item 1a', 'Sub-item 1b'] },
      { main: 'Main item two', sub: ['Sub-item 2a', 'Sub-item 2b'] },
    ];

    return (
      <List ordered>
        {items.map(({ main, sub }) => (
          <List.Item key={main}>
            <Stack spacing="compact">
              <Text>{main}</Text>
              <List>
                {sub.map((subItem) => (
                  <List.Item key={subItem}><Text>{subItem}</Text></List.Item>
                ))}
              </List>
            </Stack>
          </List.Item>
        ))}
      </List>
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

export const TaskList: Story = {
  render: () => {
    const tasks = [
      { name: 'Task item', status: 'Due today', statusColor: 'secondary' as const },
      { name: 'Another task', status: 'Due tomorrow', statusColor: 'secondary' as const },
      { name: 'Final task', status: 'Completed', statusColor: 'success' as const },
    ];

    return (
      <Box maxWidth="md">
        <List variant="bordered">
          {tasks.map(({ name, status, statusColor }) => (
            <List.Item key={name}>
              <Flex justify="between" align="center" className="w-full">
                <Text>{name}</Text>
                <Text size="small" color={statusColor}>{status}</Text>
              </Flex>
            </List.Item>
          ))}
        </List>
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
