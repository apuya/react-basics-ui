import type { Meta, StoryObj } from '@storybook/react';
import { BaseCardContainer } from './BaseCardContainer';
import { Card } from '@/components/data-display/Card/Card';
import { Button } from '@/components/actions/Button/Button';
import { Text } from '@/components/typography/Text/Text';
import { Heading } from '@/components/typography/Heading/Heading';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { Grid } from '@/components/layout/Grid';

/**
 * `BaseCardContainer` is a foundational layout component for building card-like containers.
 * 
 * Provides structural layout with built-in defaults for padding, gap, border, and border-radius.
 * Consuming components (Card, Modal, Popover, Drawer) can override these defaults.
 * 
 * ## Features
 * - Default padding via `--component-base-card-padding-*` tokens
 * - Built-in outer border and border-radius
 * - Flexible sub-component composition
 * 
 * ## Sub-components
 * | Component | Purpose |
 * |-----------|---------|
 * | `BaseCardContainer.Header` | Top section |
 * | `BaseCardContainer.Content` | Main content area |
 * | `BaseCardContainer.Footer` | Bottom section |
 * | `BaseCardContainer.Title` | Heading element |
 * | `BaseCardContainer.Description` | Secondary text |
 * 
 * ## Usage
 * ```tsx
 * <BaseCardContainer baseClasses="bg-white shadow-md">
 *   <BaseCardContainer.Header>
 *     <BaseCardContainer.Title>Title</BaseCardContainer.Title>
 *   </BaseCardContainer.Header>
 *   <BaseCardContainer.Content>
 *     Content here
 *   </BaseCardContainer.Content>
 *   <BaseCardContainer.Footer>
 *     <Button>Action</Button>
 *   </BaseCardContainer.Footer>
 * </BaseCardContainer>
 * ```
 */
const meta: Meta<typeof BaseCardContainer> = {
  title: 'Layout/BaseCardContainer',
  component: BaseCardContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof BaseCardContainer>;

// =============================================================================
// CORE CONCEPT DEMONSTRATIONS
// =============================================================================

/**
 * BaseCardContainer with built-in defaults: padding, border, and border-radius.
 */
export const Default: Story = {
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
  render: () => (
    <BaseCardContainer baseClasses="bg-[var(--color-surface-elevated)] shadow-md">
      <BaseCardContainer.Header>
        <BaseCardContainer.Title>Built-in Styling</BaseCardContainer.Title>
        <BaseCardContainer.Description>Outer border and radius included by default</BaseCardContainer.Description>
      </BaseCardContainer.Header>
      <BaseCardContainer.Content>
        <Text>Content area with default padding. Border wraps the entire container.</Text>
      </BaseCardContainer.Content>
      <BaseCardContainer.Footer>
        <Button size="small">Action</Button>
      </BaseCardContainer.Footer>
    </BaseCardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BaseCardContainer includes default padding, outer border, and border-radius.',
      },
    },
  },
};

/**
 * Compare: BaseCardContainer (with defaults) vs Card (with full styling).
 */
export const CompareWithCard: Story = {
  decorators: [(Story) => <div style={{ width: '600px' }}><Story /></div>],
  render: () => (
    <Grid cols={2} spacing="lg">
      {/* BaseCardContainer with minimal styling */}
      <Stack spacing="sm">
        <Heading as="h4" size="sm">BaseCardContainer</Heading>
        <BaseCardContainer baseClasses="bg-[var(--color-surface-elevated)]">
          <BaseCardContainer.Header>
            <BaseCardContainer.Title>Title</BaseCardContainer.Title>
          </BaseCardContainer.Header>
          <BaseCardContainer.Content>
            <Text>Default padding and border applied</Text>
          </BaseCardContainer.Content>
          <BaseCardContainer.Footer>
            <Button size="small">Action</Button>
          </BaseCardContainer.Footer>
        </BaseCardContainer>
      </Stack>

      {/* Styled Card */}
      <Stack spacing="sm">
        <Heading as="h4" size="sm">Card (full styling)</Heading>
        <Card>
          <Card.Header>
            <Card.Title>Title</Card.Title>
          </Card.Header>
          <Card.Content>
            <Text>Token-based styling applied</Text>
          </Card.Content>
          <Card.Footer>
            <Button size="small">Action</Button>
          </Card.Footer>
        </Card>
      </Stack>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'BaseCardContainer provides structure with default padding and outer border. Card adds full visual styling (background, shadows, custom tokens).',
      },
    },
  },
};

// =============================================================================
// CUSTOMIZATION
// =============================================================================

/**
 * Consumers can override the default padding via paddingStyles prop.
 */
export const CustomPadding: Story = {
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
  render: () => (
    <BaseCardContainer baseClasses="bg-[var(--color-surface-elevated)] shadow-md">
      <BaseCardContainer.Header
        paddingStyles={{ 
          paddingInline: 'var(--spacing-xl)', 
          paddingBlock: 'var(--spacing-lg)' 
        }}
      >
        <Heading as="h3" size="lg">Custom Padding</Heading>
        <Text color="secondary">Overridden via paddingStyles prop</Text>
      </BaseCardContainer.Header>
      <BaseCardContainer.Content
        paddingStyles={{ 
          paddingInline: 'var(--spacing-xl)', 
          paddingBlock: 'var(--spacing-lg)' 
        }}
      >
        <Text>
          Pass paddingStyles to override the default `--component-base-card-*` token values.
        </Text>
      </BaseCardContainer.Content>
      <BaseCardContainer.Footer
        baseClasses="flex items-center justify-end gap-2"
        paddingStyles={{ 
          paddingInline: 'var(--spacing-xl)', 
          paddingBlock: 'var(--spacing-lg)' 
        }}
      >
        <Button variant="secondary" size="small">Cancel</Button>
        <Button size="small">Save</Button>
      </BaseCardContainer.Footer>
    </BaseCardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Override default padding by passing custom paddingStyles to sub-components.',
      },
    },
  },
};

// =============================================================================
// SUB-COMPONENT FLEXIBILITY
// =============================================================================

/**
 * Use any combination of sub-components.
 */
export const Compositions: Story = {
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
  render: () => (
    <Stack spacing="lg">
      {/* Content only */}
      <Card>
        <Card.Content>
          <Text weight="medium">Content Only</Text>
          <Text color="secondary">Just the content section</Text>
        </Card.Content>
      </Card>

      {/* Header + Content */}
      <Card>
        <Card.Header>
          <Card.Title>Header + Content</Card.Title>
        </Card.Header>
        <Card.Content>
          <Text>No footer section</Text>
        </Card.Content>
      </Card>

      {/* Full structure */}
      <Card>
        <Card.Header>
          <Card.Title>Full Structure</Card.Title>
          <Card.Description>All sections used</Card.Description>
        </Card.Header>
        <Card.Content>
          <Text>Header, content, and footer</Text>
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
        story: 'Sub-components can be used in any combination.',
      },
    },
  },
};

// =============================================================================
// USE CASES (showing Card as the real consumer)
// =============================================================================

/**
 * Real-world use: Card component (which composes from BaseCardContainer).
 */
export const UseCaseCard: Story = {
  name: 'Use Case: Card Component',
  decorators: [(Story) => <div style={{ width: '350px' }}><Story /></div>],
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Card.Title>Project Update</Card.Title>
        <Card.Description>Latest changes</Card.Description>
      </Card.Header>
      <Card.Content>
        <Stack spacing="sm">
          <Flex justify="between">
            <Text weight="medium">Status:</Text>
            <Text color="success">Active</Text>
          </Flex>
          <Flex justify="between">
            <Text weight="medium">Progress:</Text>
            <Text>75%</Text>
          </Flex>
        </Stack>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="small">Details</Button>
        <Button size="small">Update</Button>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card component uses BaseCardContainer internally with token-based styling.',
      },
    },
  },
};

/**
 * Grid of cards demonstrating consistent structure.
 */
export const UseCaseCardGrid: Story = {
  name: 'Use Case: Card Grid',
  decorators: [(Story) => <div style={{ width: '700px' }}><Story /></div>],
  render: () => (
    <Grid cols={3} spacing="md">
      {['Basic', 'Pro', 'Enterprise'].map((plan) => (
        <Card key={plan} variant="outlined">
          <Card.Header>
            <Card.Title as="h4">{plan}</Card.Title>
          </Card.Header>
          <Card.Content>
            <Stack spacing="sm" align="center">
              <Text size="2xl" weight="bold">
                {plan === 'Basic' ? '$9' : plan === 'Pro' ? '$29' : '$99'}
              </Text>
              <Text color="secondary">/month</Text>
            </Stack>
          </Card.Content>
          <Card.Footer>
            <Button size="small" block>Select</Button>
          </Card.Footer>
        </Card>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple cards in a grid, all sharing the same structural foundation.',
      },
    },
  },
};
