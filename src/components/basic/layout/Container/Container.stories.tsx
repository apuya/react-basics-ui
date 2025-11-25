import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive container component that centers content and constrains width. Provides consistent padding and max-width across different breakpoints. Useful for creating consistent page layouts and constraining content width for better readability.',
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
  <div className="bg-[color:var(--semantic-surface-elevated)] p-8 rounded-md border border-[color:var(--semantic-border-default)]">
    <h2 className="text-2xl font-bold text-[color:var(--semantic-text-primary)] mb-4">{label}</h2>
    <p className="text-[color:var(--semantic-text-secondary)] leading-relaxed">
      This is demo content to show the container boundaries. The container constrains the maximum
      width while maintaining consistent padding on the sides.
    </p>
  </div>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default container with XL max-width (1280px) and medium padding. Suitable for most page layouts.',
      },
    },
  },
  args: {},
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small container (640px) - ideal for narrow forms, login pages, or focused content.',
      },
    },
  },
  args: {
    size: 'sm',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Small Container (640px)" />
      </Container>
    </div>
  ),
};

export const SizeMedium: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium container (768px) - good for content-focused pages and articles.',
      },
    },
  },
  args: {
    size: 'md',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Medium Container (768px)" />
      </Container>
    </div>
  ),
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large container (1024px) - suitable for dashboards and content-rich layouts.',
      },
    },
  },
  args: {
    size: 'lg',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Large Container (1024px)" />
      </Container>
    </div>
  ),
};

export const SizeExtraLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Extra large container (1280px) - default size, great for most page layouts.',
      },
    },
  },
  args: {
    size: 'xl',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Extra Large Container (1280px)" />
      </Container>
    </div>
  ),
};

export const Size2XL: Story = {
  parameters: {
    docs: {
      description: {
        story: '2XL container (1536px) - for wide screens and spacious layouts.',
      },
    },
  },
  args: {
    size: '2xl',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="2XL Container (1536px)" />
      </Container>
    </div>
  ),
};

export const SizeFull: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full width container - takes up the entire available width while maintaining padding.',
      },
    },
  },
  args: {
    size: 'full',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Full Width Container" />
      </Container>
    </div>
  ),
};

export const SizeProse: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Prose container (65 characters) - optimized for reading long-form text content.',
      },
    },
  },
  args: {
    size: 'prose',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[color:var(--semantic-text-primary)]">Article Title</h1>
          <p className="text-[color:var(--semantic-text-secondary)] leading-relaxed">
            This prose container is optimized for readability with a maximum width of approximately 65 characters.
            This width is considered ideal for reading comfort and comprehension.
          </p>
          <p className="text-[color:var(--semantic-text-secondary)] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </Container>
    </div>
  ),
};

export const PaddingNone: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container with no padding - useful when you need edge-to-edge content.',
      },
    },
  },
  args: {
    padding: 'none',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="No Padding" />
      </Container>
    </div>
  ),
};

export const PaddingSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container with small padding - minimal side spacing.',
      },
    },
  },
  args: {
    padding: 'sm',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Small Padding" />
      </Container>
    </div>
  ),
};

export const PaddingLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container with large padding - generous side spacing.',
      },
    },
  },
  args: {
    padding: 'lg',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Large Padding" />
      </Container>
    </div>
  ),
};

export const PaddingExtraLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container with extra large padding - maximum side spacing.',
      },
    },
  },
  args: {
    padding: 'xl',
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Extra Large Padding" />
      </Container>
    </div>
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
  args: {
    centered: false,
  },
  render: (args) => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container {...args}>
        <DemoContent label="Not Centered" />
      </Container>
    </div>
  ),
};

export const NestedContainers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing nested containers with different sizes for complex layouts.',
      },
    },
  },
  render: () => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8">
      <Container size="2xl">
        <div className="bg-[color:var(--semantic-surface-elevated)] p-8 rounded-md mb-6">
          <h2 className="text-2xl font-bold mb-4 text-[color:var(--semantic-text-primary)]">Outer Container (2XL)</h2>
          <Container size="md" padding="lg">
            <div className="bg-[color:var(--semantic-brand-primary-default)] bg-opacity-10 p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-2 text-[color:var(--semantic-text-primary)]">Inner Container (MD)</h3>
              <p className="text-[color:var(--semantic-text-secondary)]">
                Nested containers can be useful for creating focused sections within a larger layout.
              </p>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  ),
};

export const PageLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example of using Container for a typical page layout with header, content, and footer.',
      },
    },
  },
  render: () => (
    <div className="bg-[color:var(--semantic-surface-base)]">
      {/* Header */}
      <div className="bg-[color:var(--semantic-surface-elevated)] border-b border-[color:var(--semantic-border-subtle)] py-4">
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[color:var(--semantic-text-primary)]">My Website</h1>
            <nav className="flex gap-6">
              <a href="#" className="text-[color:var(--semantic-text-secondary)] hover:text-[color:var(--semantic-text-primary)]">
                Home
              </a>
              <a href="#" className="text-[color:var(--semantic-text-secondary)] hover:text-[color:var(--semantic-text-primary)]">
                About
              </a>
              <a href="#" className="text-[color:var(--semantic-text-secondary)] hover:text-[color:var(--semantic-text-primary)]">
                Contact
              </a>
            </nav>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container size="lg">
        <div className="py-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-[color:var(--semantic-text-primary)] mb-4">Welcome</h2>
            <p className="text-[color:var(--semantic-text-secondary)] leading-relaxed">
              This is an example of how to use the Container component to create a consistent page layout.
              The container ensures content stays within comfortable reading widths and maintains proper spacing.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[color:var(--semantic-surface-elevated)] p-6 rounded-lg border border-[color:var(--semantic-border-default)]">
                <h3 className="text-xl font-semibold mb-2 text-[color:var(--semantic-text-primary)]">Feature {i}</h3>
                <p className="text-[color:var(--semantic-text-secondary)]">
                  Description of feature {i} with some example content.
                </p>
              </div>
            ))}
          </section>
        </div>
      </Container>

      {/* Footer */}
      <div className="bg-[color:var(--semantic-surface-elevated)] border-t border-[color:var(--semantic-border-subtle)] py-8 mt-12">
        <Container>
          <p className="text-center text-[color:var(--semantic-text-secondary)]">
            © 2024 My Website. All rights reserved.
          </p>
        </Container>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available container sizes stacked vertically.',
      },
    },
  },
  render: () => (
    <div className="bg-[color:var(--semantic-surface-base)] py-8 space-y-6">
      <Container size="sm">
        <div className="bg-[color:var(--semantic-status-info-alpha)] p-4 rounded text-center">
          <strong>SM</strong> - 640px
        </div>
      </Container>
      <Container size="md">
        <div className="bg-[color:var(--semantic-status-success-alpha)] p-4 rounded text-center">
          <strong>MD</strong> - 768px
        </div>
      </Container>
      <Container size="lg">
        <div className="bg-[color:var(--semantic-status-warning-alpha)] p-4 rounded text-center">
          <strong>LG</strong> - 1024px
        </div>
      </Container>
      <Container size="xl">
        <div className="bg-[color:var(--semantic-brand-primary-default)] bg-opacity-20 p-4 rounded text-center">
          <strong>XL</strong> - 1280px (default)
        </div>
      </Container>
      <Container size="2xl">
        <div className="bg-[color:var(--semantic-status-error-alpha)] p-4 rounded text-center">
          <strong>2XL</strong> - 1536px
        </div>
      </Container>
    </div>
  ),
};
