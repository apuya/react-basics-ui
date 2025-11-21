import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Heading component for page and section titles. Supports all HTML heading levels (h1-h6) with customizable styling. The `as` prop controls the rendered HTML element, while `level` controls the visual styling, allowing semantic HTML structure independent of visual hierarchy.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The HTML element to render (for semantic structure)',
    },
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The visual style level (can differ from the HTML element)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'inherit'],
      description: 'The text color variant',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    fontFamily: {
      control: 'select',
      options: ['heading', 'body', 'mono'],
      description: 'Font family to use',
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to truncate long text with ellipsis',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// Level Examples
export const H1: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Largest heading level for page titles and primary headers. Use sparingly - typically one per page.',
      },
    },
  },
  args: {
    as: 'h1',
    children: 'Main Page Title',
  },
};

export const H2: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Second level heading for major sections. Common for dividing page content into primary areas.',
      },
    },
  },
  args: {
    as: 'h2',
    children: 'Section Heading',
  },
};

export const H3: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Third level heading for subsections within major sections.',
      },
    },
  },
  args: {
    as: 'h3',
    children: 'Subsection Heading',
  },
};

export const H4: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fourth level heading for smaller divisions and card titles.',
      },
    },
  },
  args: {
    as: 'h4',
    children: 'Minor Section Heading',
  },
};

export const H5: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fifth level heading for fine-grained content organization.',
      },
    },
  },
  args: {
    as: 'h5',
    children: 'Small Heading',
  },
};

export const H6: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Smallest heading level for the most granular content divisions.',
      },
    },
  },
  args: {
    as: 'h6',
    children: 'Smallest Heading',
  },
};

// Color Variants
export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Primary color for standard headings.',
      },
    },
  },
  args: {
    as: 'h2',
    color: 'primary',
    children: 'Primary Heading',
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Secondary color for less prominent headings.',
      },
    },
  },
  args: {
    as: 'h2',
    color: 'secondary',
    children: 'Secondary Heading',
  },
};

export const Tertiary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tertiary color for the most subtle headings.',
      },
    },
  },
  args: {
    as: 'h2',
    color: 'tertiary',
    children: 'Tertiary Heading',
  },
};

// Alignment Examples
export const LeftAligned: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Left-aligned heading (default alignment).',
      },
    },
  },
  args: {
    as: 'h2',
    align: 'left',
    children: 'Left Aligned Heading',
  },
};

export const CenterAligned: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Center-aligned heading for hero sections or centered content.',
      },
    },
  },
  args: {
    as: 'h2',
    align: 'center',
    children: 'Center Aligned Heading',
  },
};

export const RightAligned: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Right-aligned heading for specialized layouts.',
      },
    },
  },
  args: {
    as: 'h2',
    align: 'right',
    children: 'Right Aligned Heading',
  },
};

// Utility Features
export const Truncated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Truncated heading with ellipsis for long text that needs to fit on one line.',
      },
    },
  },
  args: {
    as: 'h2',
    truncate: true,
    children: 'This is a very long heading that will be truncated with an ellipsis when it exceeds the available width',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Semantic vs Visual Example
export const SemanticVsVisual: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `as` to set the semantic HTML element and `level` to control visual styling. This example renders an h3 but styles it like an h1.',
      },
    },
  },
  args: {
    as: 'h3',
    level: 'h1',
    children: 'Visually H1, Semantically H3',
  },
};

// Font Family Variants
export const WithBodyFont: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Heading using the body font family instead of the default heading font.',
      },
    },
  },
  args: {
    as: 'h2',
    fontFamily: 'body',
    children: 'Heading with Body Font',
  },
};

export const WithMonoFont: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Heading using monospace font for technical or code-related content.',
      },
    },
  },
  args: {
    as: 'h2',
    fontFamily: 'mono',
    children: 'Heading with Mono Font',
  },
};

// Practical Examples
export const PageHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a typical page header with h1 styling.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Heading as="h1" align="center">
        Welcome to Our Platform
      </Heading>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--semantic-text-secondary)' }}>
        Build amazing applications with our comprehensive component library
      </p>
    </div>
  ),
};

export const SectionHeaders: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing hierarchical heading structure.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Heading as="h2">Getting Started</Heading>
        <p style={{ marginTop: '0.5rem', color: 'var(--semantic-text-secondary)' }}>
          Learn the basics of our component library
        </p>
      </div>
      
      <div>
        <Heading as="h3">Installation</Heading>
        <p style={{ marginTop: '0.5rem', color: 'var(--semantic-text-secondary)' }}>
          Install the package using npm or yarn
        </p>
      </div>
      
      <div>
        <Heading as="h4">Using npm</Heading>
        <code style={{ 
          display: 'block', 
          marginTop: '0.5rem', 
          padding: '0.5rem',
          backgroundColor: 'var(--semantic-bg-secondary)',
          borderRadius: 'var(--semantic-radius-sm)',
          fontFamily: 'monospace',
        }}>
          npm install react-basics-ui
        </code>
      </div>
    </div>
  ),
};

export const CardTitles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example using headings as card titles.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {['Feature One', 'Feature Two', 'Feature Three'].map((title) => (
        <div
          key={title}
          style={{
            padding: '1.5rem',
            border: '1px solid var(--semantic-border-default)',
            borderRadius: 'var(--semantic-radius-md)',
          }}
        >
          <Heading as="h4">{title}</Heading>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--semantic-text-secondary)' }}>
            Description of this feature and its benefits
          </p>
        </div>
      ))}
    </div>
  ),
};

export const AllLevels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all heading levels side by side for comparison.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Heading as="h1">Heading Level 1</Heading>
      <Heading as="h2">Heading Level 2</Heading>
      <Heading as="h3">Heading Level 3</Heading>
      <Heading as="h4">Heading Level 4</Heading>
      <Heading as="h5">Heading Level 5</Heading>
      <Heading as="h6">Heading Level 6</Heading>
    </div>
  ),
};
