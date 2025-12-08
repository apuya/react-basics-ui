import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';
import { Box } from '../Box';
import { VStack, HStack } from '../Stack';
import { Grid } from '../Grid';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive container component that centers content and constrains width. Provides consistent padding and max-width across different breakpoints.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full', 'prose'],
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal padding of the container',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const DemoContent = ({ label = 'Container Content' }: { label?: string }) => (
  <Box
    p={24}
    borderRadius={8}
    bg="var(--semantic-surface-elevated)"
    borderWidth={1}
    borderColor="var(--semantic-border-default)"
  >
    <VStack spacing="sm">
      <Heading as="h3">{label}</Heading>
      <Text color="secondary">
        This is demo content to show the container boundaries. The container constrains the maximum
        width while maintaining consistent padding on the sides.
      </Text>
    </VStack>
  </Box>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default container with XL max-width (1280px) and medium padding.',
      },
    },
  },
  render: () => (
    <Box py={24} bg="var(--semantic-surface-base)">
      <Container>
        <DemoContent />
      </Container>
    </Box>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available container sizes from sm (640px) to full width.',
      },
    },
  },
  render: () => (
    <Box py={24} bg="var(--semantic-surface-base)">
      <VStack spacing="lg">
        {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
          <Container key={size} size={size}>
            <Box
              p={16}
              borderRadius={8}
              bg="var(--semantic-brand-primary-default)"
              className="text-center"
            >
              <Text color="inverse" weight="semibold">
                size="{size}"
              </Text>
            </Box>
          </Container>
        ))}
      </VStack>
    </Box>
  ),
};

export const SizeProse: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Prose container (65 characters) - optimized for reading long-form text.',
      },
    },
  },
  render: () => (
    <Box py={24} bg="var(--semantic-surface-base)">
      <Container size="prose">
        <VStack spacing="md">
          <Heading as="h1">Article Title</Heading>
          <Text color="secondary" lineHeight="relaxed">
            This prose container is optimized for readability with a maximum width of approximately
            65 characters. This width is considered ideal for reading comfort and comprehension.
          </Text>
          <Text color="secondary" lineHeight="relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </VStack>
      </Container>
    </Box>
  ),
};

export const PaddingSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different padding options for the container.',
      },
    },
  },
  render: () => (
    <Box py={24} bg="var(--semantic-surface-base)">
      <VStack spacing="lg">
        {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
          <Container key={padding} padding={padding} size="lg">
            <Box
              p={16}
              borderRadius={8}
              bg="var(--semantic-bg-secondary)"
              borderWidth={1}
              borderColor="var(--semantic-border-default)"
            >
              <Text weight="semibold">padding="{padding}"</Text>
            </Box>
          </Container>
        ))}
      </VStack>
    </Box>
  ),
};

export const NotCentered: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container without automatic centering - aligned to the left.',
      },
    },
  },
  render: () => (
    <Box py={24} bg="var(--semantic-surface-base)">
      <Container centered={false} size="md">
        <DemoContent label="Not Centered" />
      </Container>
    </Box>
  ),
};

export const PageLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example of using Container for a typical page layout.',
      },
    },
  },
  render: () => (
    <Box bg="var(--semantic-surface-base)">
      {/* Header */}
      <Box
        py={16}
        bg="var(--semantic-surface-elevated)"
        borderWidth={1}
        borderColor="var(--semantic-border-subtle)"
        style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
      >
        <Container>
          <HStack justify="between" align="center">
            <Heading as="h2">My Website</Heading>
            <HStack spacing="lg">
              <Text color="secondary">Home</Text>
              <Text color="secondary">About</Text>
              <Text color="secondary">Contact</Text>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container size="lg">
        <Box py={32}>
          <VStack spacing="xl">
            <VStack spacing="sm">
              <Heading as="h1">Welcome</Heading>
              <Text color="secondary" lineHeight="relaxed">
                This is an example of how to use the Container component to create a consistent
                page layout. The container ensures content stays within comfortable reading widths
                and maintains proper spacing.
              </Text>
            </VStack>

            <Grid cols={3} gap="lg">
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  p={24}
                  bg="var(--semantic-surface-elevated)"
                  borderRadius={12}
                  borderWidth={1}
                  borderColor="var(--semantic-border-default)"
                >
                  <VStack spacing="sm">
                    <Heading as="h4">Feature {i}</Heading>
                    <Text color="secondary" size="small">
                      Description of feature {i} with some example content.
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        py={24}
        bg="var(--semantic-surface-elevated)"
        borderWidth={1}
        borderColor="var(--semantic-border-subtle)"
        style={{ borderBottom: 'none', borderLeft: 'none', borderRight: 'none' }}
      >
        <Container>
          <Text color="secondary" align="center">
            © 2024 My Website. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  ),
};
