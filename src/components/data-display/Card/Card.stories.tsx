import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../../forms/Button/Button';
import { Badge } from '../../feedback/Badge/Badge';
import { Text } from '../../typography/Text/Text';
import { Heading } from '../../typography/Heading/Heading';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Grid } from '../../layout/Grid';
import { Avatar } from '../Avatar/Avatar';

const meta: Meta<typeof Card> = {
  title: 'Basic/Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile container component for grouping related content. Built using the compound component pattern with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, and `Card.Footer` subcomponents.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'Visual style variant',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '24rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

// =============================================================================
// SHARED DATA
// =============================================================================

const CARD_VARIANTS = ['default', 'elevated', 'outlined', 'interactive'] as const;

// =============================================================================
// BASIC USAGE
// =============================================================================

/**
 * Default card with header, content, and footer.
 */
export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>This is a card description</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="body">Card content goes here. This is the main content area of the card.</Text>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="small">Cancel</Button>
        <Button size="small">Confirm</Button>
      </Card.Footer>
    </Card>
  ),
};

/**
 * Card without header - content only.
 */
export const ContentOnly: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <Text size="body">Simple card with only content, no header or footer.</Text>
      </Card.Content>
    </Card>
  ),
};

/**
 * Card with header and content, no footer.
 */
export const NoFooter: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Information Card</Card.Title>
        <Card.Description>Additional context</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="body">Card without footer actions.</Text>
      </Card.Content>
    </Card>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Elevated variant with prominent shadow.
 */
export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Card.Title>Elevated Card</Card.Title>
        <Card.Description>Prominent shadow effect</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="body">The elevated variant makes the card appear lifted from the page.</Text>
      </Card.Content>
    </Card>
  ),
};

/**
 * Outlined variant with border instead of shadow.
 */
export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <Card.Header>
        <Card.Title>Outlined Card</Card.Title>
        <Card.Description>Border-based definition</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="body">The outlined variant uses a border for definition rather than shadows.</Text>
      </Card.Content>
    </Card>
  ),
};

/**
 * Interactive variant with hover states.
 */
export const Interactive: Story = {
  render: () => (
    <Card variant="interactive">
      <Card.Header>
        <Card.Title>Interactive Card</Card.Title>
        <Card.Description>Hover to see effect</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="body">Interactive cards respond to hover and are clickable.</Text>
      </Card.Content>
    </Card>
  ),
};

/**
 * All variant styles in a grid for comparison.
 */
export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Grid cols={2} gap="md">
      {CARD_VARIANTS.map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Header>
            <Card.Title>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Card.Title>
            <Card.Description>variant=&quot;{variant}&quot;</Card.Description>
          </Card.Header>
          <Card.Content>
            <Text size="body">Card content for the {variant} variant.</Text>
          </Card.Content>
        </Card>
      ))}
    </Grid>
  ),
};

// =============================================================================
// REAL-WORLD EXAMPLES
// =============================================================================

/**
 * Dashboard metrics card.
 */
export const StatsCard: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Card.Title>Monthly Revenue</Card.Title>
      </Card.Header>
      <Card.Content>
        <Stack gap="sm" align="center">
          <Heading as="h2" level="h2">$45,231</Heading>
          <Flex align="center" justify="center" gap="xs">
            <Text size="body" color="success" weight="medium">↑ 12.5%</Text>
            <Text size="body" color="secondary">from last month</Text>
          </Flex>
        </Stack>
      </Card.Content>
    </Card>
  ),
};

/**
 * User profile card.
 */
export const ProfileCard: Story = {
  render: () => (
    <Card variant="outlined">
      <Card.Content>
        <Flex gap="md" align="start">
          <Avatar size="lg">
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Stack gap="xs" className="flex-1 min-w-0">
            <Heading as="h3" level="h4">John Doe</Heading>
            <Text size="body" color="secondary">Senior Software Engineer</Text>
            <Text as="p" size="body">
              Passionate about building scalable web applications and mentoring junior developers.
            </Text>
          </Stack>
        </Flex>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="small">Message</Button>
        <Button size="small">View Profile</Button>
      </Card.Footer>
    </Card>
  ),
};

/**
 * Project dashboard card with badge.
 */
export const ProjectCard: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Flex justify="between" align="start">
          <Stack gap="xs">
            <Card.Title>Project Dashboard</Card.Title>
            <Card.Description>Overview of project metrics</Card.Description>
          </Stack>
          <Badge variant="success">Active</Badge>
        </Flex>
      </Card.Header>
      <Card.Content>
        <Stack gap="sm">
          <Flex justify="between">
            <Text size="body" weight="medium">Tasks Completed:</Text>
            <Text size="body">24/30</Text>
          </Flex>
          <Flex justify="between">
            <Text size="body" weight="medium">Team Members:</Text>
            <Text size="body">8</Text>
          </Flex>
          <Flex justify="between">
            <Text size="body" weight="medium">Deadline:</Text>
            <Text size="body">Dec 31, 2025</Text>
          </Flex>
        </Stack>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="small">View Details</Button>
        <Button size="small">Edit Project</Button>
      </Card.Footer>
    </Card>
  ),
};

/**
 * Multiple cards in a grid layout.
 */
export const CardGrid: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '800px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Grid cols={3} gap="md">
      {(['default', 'elevated', 'outlined'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Header>
            <Card.Title>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Card.Title>
          </Card.Header>
          <Card.Content>
            <Text size="body">Card {variant === 'default' ? 'first' : variant === 'elevated' ? 'second' : 'third'} in grid.</Text>
          </Card.Content>
        </Card>
      ))}
    </Grid>
  ),
};
