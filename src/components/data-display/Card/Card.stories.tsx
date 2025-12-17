import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '@/components/actions/Button/Button';
import { Badge } from '@/components/data-display/Badge/Badge';
import { Text } from '@/components/typography/Text/Text';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { Grid } from '@/components/layout/Grid';
import { Avatar } from '@/components/data-display/Avatar/Avatar';

/**
 * `Card` is a versatile container component for grouping related content.
 * 
 * ## Architecture
 * Card is a **thin wrapper** around `BaseCardContainer`. It inherits all structural
 * styling (padding, gap, border, border-radius) from the base component and only adds
 * Card-specific visual styling (background, text color, shadow variants).
 * 
 * ## Features
 * - **Compound pattern**: `Card.Header`, `Card.Content`, `Card.Footer`, `Card.Title`, `Card.Description`
 * - **Visual variants**: default, elevated, outlined, interactive
 * - **Inherits from BaseCardContainer**: Padding, gap, border, border-radius
 * - **Flexible**: Use any combination of sub-components
 * 
 * ## Sub-components
 * | Component | Purpose |
 * |-----------|---------|
 * | `Card.Header` | Top section with title and description |
 * | `Card.Content` | Main content area (scrollable if needed) |
 * | `Card.Footer` | Bottom section with actions |
 * | `Card.Title` | Heading element (h1-h6) |
 * | `Card.Description` | Secondary text below title |
 * 
 * ## Usage
 * ```tsx
 * <Card variant="elevated">
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Supporting text</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Main content here</Card.Content>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'Visual style variant of the card',
      table: {
        type: { summary: "'default' | 'elevated' | 'outlined' | 'interactive'" },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      description: 'Card sub-components (Header, Content, Footer)',
      table: { type: { summary: 'ReactNode' } },
    },
    className: {
      description: 'Additional CSS classes',
      table: { type: { summary: 'string' } },
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
// PRIMARY STORY
// =============================================================================

/**
 * Default card with all sub-components. Uses `Card.Title` and `Card.Description`
 * for semantic header content.
 */
export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>This is a supporting description</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text>Card content goes here. This is the main content area of the card.</Text>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="small">Cancel</Button>
        <Button size="small">Confirm</Button>
      </Card.Footer>
    </Card>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * All visual variants displayed together for comparison.
 * 
 * - **default**: Subtle background, minimal styling
 * - **elevated**: Prominent shadow for emphasis
 * - **outlined**: Border-based definition
 * - **interactive**: Hover effects for clickable cards
 */
export const Variants: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Grid cols={2} spacing="md">
      {(['default', 'elevated', 'outlined', 'interactive'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Header>
            <Card.Title>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Card.Title>
            <Card.Description>variant="{variant}"</Card.Description>
          </Card.Header>
          <Card.Content>
            <Text>Example content for the {variant} variant.</Text>
          </Card.Content>
        </Card>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compare all visual variants side by side. Hover over the interactive variant to see the effect.',
      },
    },
  },
};

// =============================================================================
// COMPOSITION EXAMPLES
// =============================================================================

/**
 * Cards can use any combination of sub-components.
 */
export const Compositions: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Stack spacing="md">
      {/* Content only */}
      <Card>
        <Card.Content>
          <Text weight="medium">Content Only</Text>
          <Text color="secondary">Simple card with just content, no header or footer.</Text>
        </Card.Content>
      </Card>

      {/* Header + Content */}
      <Card>
        <Card.Header>
          <Card.Title>Header + Content</Card.Title>
        </Card.Header>
        <Card.Content>
          <Text>Card without footer actions.</Text>
        </Card.Content>
      </Card>

      {/* Full card */}
      <Card>
        <Card.Header>
          <Card.Title>Full Card</Card.Title>
          <Card.Description>With all sections</Card.Description>
        </Card.Header>
        <Card.Content>
          <Text>Complete card with header, content, and footer.</Text>
        </Card.Content>
        <Card.Footer>
          <Button size="small">Action</Button>
        </Card.Footer>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards are flexible - use only the sub-components you need.',
      },
    },
  },
};

// =============================================================================
// USE CASES
// =============================================================================

/**
 * Dashboard metric cards display key performance indicators prominently.
 */
export const UseCaseStats: Story = {
  name: 'Use Case: Stats Dashboard',
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Card.Title>Monthly Revenue</Card.Title>
      </Card.Header>
      <Card.Content>
        <Stack spacing="sm" align="center">
          <Text size="3xl" weight="bold">$45,231</Text>
          <Flex align="center" justify="center" spacing="xs">
            <Text color="success" weight="medium">↑ 12.5%</Text>
            <Text color="secondary">from last month</Text>
          </Flex>
        </Stack>
      </Card.Content>
    </Card>
  ),
};

/**
 * User profile cards combine avatar, text content, and actions.
 */
export const UseCaseProfile: Story = {
  name: 'Use Case: Profile Card',
  render: () => (
    <Card variant="outlined">
      <Card.Content>
        <Flex spacing="md" align="start">
          <Avatar size="lg">
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Stack spacing="xs" className="flex-1 min-w-0">
            <Card.Title as="h4">John Doe</Card.Title>
            <Text color="secondary">Senior Software Engineer</Text>
            <Text>Passionate about building scalable web applications.</Text>
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
 * Project cards display status, metrics, and available actions.
 */
export const UseCaseProject: Story = {
  name: 'Use Case: Project Card',
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Flex justify="between" align="start" className="w-full">
          <Stack spacing="xs">
            <Card.Title>Project Dashboard</Card.Title>
            <Card.Description>Overview of project metrics</Card.Description>
          </Stack>
          <Badge variant="success">Active</Badge>
        </Flex>
      </Card.Header>
      <Card.Content>
        <Stack spacing="sm">
          <Flex justify="between">
            <Text weight="medium">Tasks Completed:</Text>
            <Text>24/30</Text>
          </Flex>
          <Flex justify="between">
            <Text weight="medium">Team Members:</Text>
            <Text>8</Text>
          </Flex>
          <Flex justify="between">
            <Text weight="medium">Deadline:</Text>
            <Text>Dec 31, 2025</Text>
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
 * Pricing cards in a grid layout for comparing options.
 */
export const UseCaseProductGrid: Story = {
  name: 'Use Case: Product Grid',
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '800px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Grid cols={3} spacing="md">
      {[
        { name: 'Basic Plan', price: '$9', features: '5 projects' },
        { name: 'Pro Plan', price: '$29', features: 'Unlimited projects' },
        { name: 'Enterprise', price: '$99', features: 'Custom solutions' },
      ].map((plan) => (
        <Card key={plan.name} variant="outlined">
          <Card.Header>
            <Card.Title as="h4">{plan.name}</Card.Title>
          </Card.Header>
          <Card.Content>
            <Stack spacing="sm" align="center">
              <Text size="3xl" weight="bold">{plan.price}</Text>
              <Text color="secondary">/month</Text>
              <Text>{plan.features}</Text>
            </Stack>
          </Card.Content>
          <Card.Footer>
            <Button size="small" block>Choose Plan</Button>
          </Card.Footer>
        </Card>
      ))}
    </Grid>
  ),
};

/**
 * Interactive cards function as clickable list items or navigation links.
 */
export const UseCaseInteractiveList: Story = {
  name: 'Use Case: Clickable Cards',
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Stack spacing="sm">
      {['Getting Started', 'Advanced Topics', 'API Reference'].map((title) => (
        <Card 
          key={title} 
          variant="interactive"
          onClick={() => console.log(`Clicked: ${title}`)}
          role="button"
          tabIndex={0}
        >
          <Card.Content>
            <Flex justify="between" align="center">
              <Stack spacing="xs">
                <Card.Title as="h4">{title}</Card.Title>
                <Card.Description>Learn more about {title.toLowerCase()}</Card.Description>
              </Stack>
              <Text color="secondary">→</Text>
            </Flex>
          </Card.Content>
        </Card>
      ))}
    </Stack>
  ),
};
