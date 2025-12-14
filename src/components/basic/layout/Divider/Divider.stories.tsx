import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Box } from '../Box';
import { VStack, HStack } from '../Stack';
import { Flex } from '../Flex';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Button } from '../../forms/Button';
import { Input } from '../../forms/Input';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Divider component for visually separating content. Supports horizontal and vertical orientations, multiple visual styles (solid, dashed, dotted), configurable spacing, and optional labels for semantic sectioning.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'The visual style of the divider',
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The spacing around the divider',
    },
    label: {
      control: 'text',
      description: 'Optional label text for the divider',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position of the label (only for horizontal dividers)',
    },
  },
  decorators: [
    (Story) => (
      <Box maxW={500}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal divider with solid style and medium spacing.',
      },
    },
  },
  render: () => (
    <VStack spacing="none">
      <Text>Content above the divider</Text>
      <Divider />
      <Text>Content below the divider</Text>
    </VStack>
  ),
};

export const Orientations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal (default) and vertical orientations for different layouts.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      <VStack spacing="xs">
        <Text weight="semibold" size="small">Horizontal (default)</Text>
        <VStack spacing="none">
          <Text>First section</Text>
          <Divider />
          <Text>Second section</Text>
        </VStack>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">Vertical</Text>
        <HStack align="center" spacing="md">
          <Text>Left content</Text>
          <Divider orientation="vertical" spacing="none" className="h-12" />
          <Text>Right content</Text>
        </HStack>
      </VStack>
    </VStack>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three visual styles: solid (default), dashed, and dotted.',
      },
    },
  },
  render: () => (
    <VStack spacing="lg">
      {(['solid', 'dashed', 'dotted'] as const).map((variant) => (
        <VStack key={variant} spacing="xs">
          <Text weight="semibold" size="small">variant="{variant}"</Text>
          <Divider variant={variant} />
        </VStack>
      ))}
    </VStack>
  ),
};

export const SpacingSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Configurable spacing around the divider: none, xs, sm, md, lg, xl.',
      },
    },
  },
  render: () => (
    <VStack spacing="lg">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((spacing) => (
        <Box key={spacing} borderWidth={1} borderColor="var(--semantic-border-default)" borderRadius={4} p={8}>
          <Text weight="semibold" size="small">spacing="{spacing}"</Text>
          <Divider spacing={spacing} />
          <Text size="small" color="secondary">Content below</Text>
        </Box>
      ))}
    </VStack>
  ),
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with a label for semantic sectioning. Label position can be left, center, or right.',
      },
    },
  },
  render: () => (
    <VStack spacing="lg">
      <VStack spacing="xs">
        <Text weight="semibold" size="small">labelPosition="left"</Text>
        <Divider label="Section Title" labelPosition="left" />
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">labelPosition="center" (default)</Text>
        <Divider label="OR" labelPosition="center" />
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">labelPosition="right"</Text>
        <Divider label="End of Section" labelPosition="right" />
      </VStack>
    </VStack>
  ),
};

export const LoginForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: divider separating authentication methods in a login form.',
      },
    },
  },
  render: () => (
    <Box
      maxW={400}
      p={24}
      borderWidth={1}
      borderColor="var(--semantic-border-default)"
      borderRadius={12}
    >
      <VStack spacing="md">
        <Heading as="h3" align="center">Sign In</Heading>
        
        <VStack spacing="sm">
          <Button variant="secondary" className="w-full">Sign in with Google</Button>
          <Button variant="secondary" className="w-full">Sign in with GitHub</Button>
        </VStack>
        
        <Divider label="OR" spacing="md" />
        
        <VStack spacing="sm">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Sign In</Button>
        </VStack>
      </VStack>
    </Box>
  ),
};

export const ContentSections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using dividers with labels to organize content sections.',
      },
    },
  },
  render: () => (
    <Box maxW={600}>
      <VStack spacing="none">
        <Box py={12}>
          <Heading as="h4">Introduction</Heading>
          <Text color="secondary">
            This is the introduction section with some content about the topic.
          </Text>
        </Box>
        
        <Divider label="Main Content" labelPosition="left" spacing="md" />
        
        <Box py={12}>
          <Text color="secondary">
            Main content goes here with detailed information and explanations.
          </Text>
        </Box>
        
        <Divider label="Related Information" labelPosition="left" spacing="md" />
        
        <Box py={12}>
          <Text color="secondary">
            Additional related information and resources.
          </Text>
        </Box>
      </VStack>
    </Box>
  ),
};

export const NavigationWithVertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical dividers separating navigation items.',
      },
    },
  },
  render: () => (
    <Flex
      align="center"
      gap="lg"
      className="p-4 bg-[color:var(--semantic-bg-secondary)] rounded-lg"
    >
      <Text color="primary">Home</Text>
      <Divider orientation="vertical" spacing="none" className="h-5" />
      <Text color="primary">Products</Text>
      <Divider orientation="vertical" spacing="none" className="h-5" />
      <Text color="primary">About</Text>
      <Divider orientation="vertical" spacing="none" className="h-5" />
      <Text color="primary">Contact</Text>
    </Flex>
  ),
};
