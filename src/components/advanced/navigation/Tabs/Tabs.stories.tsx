import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiHome, BiChat, BiCog, BiBell } from 'react-icons/bi';
import { Tabs } from './Tabs';
import { VStack } from '@/components/basic/layout/Stack/Stack';
import { Flex } from '@/components/basic/layout/Flex/Flex';
import { Box } from '@/components/basic/layout/Box/Box';
import { Text } from '@/components/basic/typography/Text/Text';
import { Heading } from '@/components/basic/typography/Heading/Heading';
import { Button } from '@/components/basic/forms/Button/Button';
import { Badge } from '@/components/basic/feedback/Badge/Badge';
import { Icon } from '@/components/basic/utility/Icon/Icon';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabs organize content into multiple sections and allow users to navigate between them. Supports sizes (sm, md, lg) and horizontal/vertical orientations. Use Arrow keys to navigate, Home/End for first/last tab.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic tabs with default styling using uncontrolled mode. */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="password">Password</Tabs.Tab>
        <Tabs.Tab value="team">Team</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="account">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Account Settings</Heading>
            <Text size="small" color="secondary">
              Manage your account settings and preferences.
            </Text>
          </VStack>
        </Tabs.Panel>
        <Tabs.Panel value="password">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Password Settings</Heading>
            <Text size="small" color="secondary">
              Change your password and security settings.
            </Text>
          </VStack>
        </Tabs.Panel>
        <Tabs.Panel value="team">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Team Settings</Heading>
            <Text size="small" color="secondary">
              Manage team members and permissions.
            </Text>
          </VStack>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

/** Vertical orientation for sidebar-style navigation. */
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" orientation="vertical">
      <Tabs.List>
        <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
        <Tabs.Tab value="projects">Projects</Tabs.Tab>
        <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
        <Tabs.Tab value="calendar">Calendar</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="dashboard">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Dashboard</Heading>
            <Text color="secondary">Your main dashboard overview.</Text>
          </VStack>
        </Tabs.Panel>
        <Tabs.Panel value="projects">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Projects</Heading>
            <Text color="secondary">View and manage your projects.</Text>
          </VStack>
        </Tabs.Panel>
        <Tabs.Panel value="tasks">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Tasks</Heading>
            <Text color="secondary">Track and complete your tasks.</Text>
          </VStack>
        </Tabs.Panel>
        <Tabs.Panel value="calendar">
          <VStack spacing="xs" align="start">
            <Heading level="h4">Calendar</Heading>
            <Text color="secondary">View your schedule and events.</Text>
          </VStack>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

/** Comparison of all tab sizes: small, medium, and large. */
export const Sizes: Story = {
  render: () => (
    <VStack spacing="xl" align="stretch">
      <VStack spacing="xs" align="start">
        <Text size="small" weight="medium">Small</Text>
        <Tabs defaultValue="tab1" size="sm">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </VStack>
      <VStack spacing="xs" align="start">
        <Text size="small" weight="medium">Medium (default)</Text>
        <Tabs defaultValue="tab1" size="md">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </VStack>
      <VStack spacing="xs" align="start">
        <Text size="small" weight="medium">Large</Text>
        <Tabs defaultValue="tab1" size="lg">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </VStack>
    </VStack>
  ),
};

/** Tabs with leading icons and trailing badges. */
export const WithIcons: Story = {
  render: () => (
    <VStack spacing="lg" align="stretch">
      <Tabs defaultValue="home">
        <Tabs.List>
          <Tabs.Tab value="home" leadingIcon={<Icon icon={BiHome} size="sm" />}>
            Home
          </Tabs.Tab>
          <Tabs.Tab value="messages" leadingIcon={<Icon icon={BiChat} size="sm" />}>
            Messages
          </Tabs.Tab>
          <Tabs.Tab value="settings" leadingIcon={<Icon icon={BiCog} size="sm" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="home">
            <Text color="secondary">Home content</Text>
          </Tabs.Panel>
          <Tabs.Panel value="messages">
            <Text color="secondary">Messages content</Text>
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <Text color="secondary">Settings content</Text>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>

      <Tabs defaultValue="inbox">
        <Tabs.List>
          <Tabs.Tab value="inbox" trailingIcon={<Badge variant="primary" size="small">5</Badge>}>
            Inbox
          </Tabs.Tab>
          <Tabs.Tab
            value="alerts"
            leadingIcon={<Icon icon={BiBell} size="sm" />}
            trailingIcon={<Badge variant="error" size="small">!</Badge>}
          >
            Alerts
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="inbox">
            <Text color="secondary">5 new messages in your inbox</Text>
          </Tabs.Panel>
          <Tabs.Panel value="alerts">
            <Text color="secondary">Important alerts requiring attention</Text>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </VStack>
  ),
};

/** Disabled tabs cannot be selected. */
export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <Tabs.List>
        <Tabs.Tab value="active">Active Tab</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          Disabled Tab
        </Tabs.Tab>
        <Tabs.Tab value="another">Another Tab</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="active">
          <Text color="secondary">This tab is active</Text>
        </Tabs.Panel>
        <Tabs.Panel value="disabled">
          <Text color="secondary">This content is inaccessible</Text>
        </Tabs.Panel>
        <Tabs.Panel value="another">
          <Text color="secondary">Another active tab</Text>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

/** Controlled mode with external state management. */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
      <VStack spacing="md" align="stretch">
        <Box
          p="var(--semantic-space-compact)"
          bg="var(--semantic-surface-alt)"
          borderRadius="var(--semantic-radius-md)"
        >
          <Text size="small">
            Current tab: <Text as="span" weight="semibold">{activeTab}</Text>
          </Text>
        </Box>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
            <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="profile">
              <VStack spacing="xs" align="start">
                <Heading level="h4">Profile</Heading>
                <Text size="small" color="secondary">
                  Your profile information and public details.
                </Text>
              </VStack>
            </Tabs.Panel>
            <Tabs.Panel value="settings">
              <VStack spacing="xs" align="start">
                <Heading level="h4">Settings</Heading>
                <Text size="small" color="secondary">
                  Customize your application preferences.
                </Text>
              </VStack>
            </Tabs.Panel>
            <Tabs.Panel value="notifications">
              <VStack spacing="xs" align="start">
                <Heading level="h4">Notifications</Heading>
                <Text size="small" color="secondary">
                  Manage your notification preferences.
                </Text>
              </VStack>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>

        <Flex gap="xs">
          <Button size="small" onClick={() => setActiveTab('profile')}>
            Go to Profile
          </Button>
          <Button size="small" onClick={() => setActiveTab('settings')}>
            Go to Settings
          </Button>
        </Flex>
      </VStack>
    );
  },
};
