import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

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
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Basic Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal divider with solid style and medium spacing.',
      },
    },
  },
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <p>Content above the divider</p>
        <Story />
        <p>Content below the divider</p>
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal divider for separating vertically stacked content.',
      },
    },
  },
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <p>First section</p>
        <Story />
        <p>Second section</p>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical divider for separating horizontally arranged content.',
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: '1rem' }}>
        <span>Left content</span>
        <Story />
        <span>Right content</span>
      </div>
    ),
  ],
};

// Variant Styles
export const Solid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Solid divider line (default style).',
      },
    },
  },
  args: {
    variant: 'solid',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Dashed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dashed divider line for a softer visual separation.',
      },
    },
  },
  args: {
    variant: 'dashed',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Dotted: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dotted divider line for the most subtle separation.',
      },
    },
  },
  args: {
    variant: 'dotted',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Spacing Examples
export const NoSpacing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with no margin spacing.',
      },
    },
  },
  args: {
    spacing: 'none',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <p>Content directly adjacent</p>
        <Story />
        <p>No spacing around divider</p>
      </div>
    ),
  ],
};

export const SmallSpacing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with small spacing for compact layouts.',
      },
    },
  },
  args: {
    spacing: 'sm',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>
    ),
  ],
};

export const LargeSpacing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with large spacing for more visual separation.',
      },
    },
  },
  args: {
    spacing: 'lg',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>
    ),
  ],
};

// Label Examples
export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with a centered label for semantic sectioning.',
      },
    },
  },
  args: {
    label: 'OR',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelLeft: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with label positioned on the left.',
      },
    },
  },
  args: {
    label: 'Section Title',
    labelPosition: 'left',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelCenter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with label centered (default position).',
      },
    },
  },
  args: {
    label: 'Centered Label',
    labelPosition: 'center',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LabelRight: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Divider with label positioned on the right.',
      },
    },
  },
  args: {
    label: 'End of Section',
    labelPosition: 'right',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

// Practical Examples
export const LoginForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example using divider in a login form to separate authentication methods.',
      },
    },
  },
  render: () => (
    <div style={{ width: '400px', padding: '2rem', border: '1px solid var(--semantic-border-default)', borderRadius: 'var(--semantic-radius-md)' }}>
      <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h3>
      
      <button style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--semantic-border-default)', borderRadius: 'var(--semantic-radius-sm)', marginBottom: '0.5rem', cursor: 'pointer' }}>
        Sign in with Google
      </button>
      <button style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--semantic-border-default)', borderRadius: 'var(--semantic-radius-sm)', cursor: 'pointer' }}>
        Sign in with GitHub
      </button>
      
      <Divider label="OR" spacing="lg" />
      
      <input type="email" placeholder="Email" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--semantic-border-default)', borderRadius: 'var(--semantic-radius-sm)', marginBottom: '0.5rem' }} />
      <input type="password" placeholder="Password" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--semantic-border-default)', borderRadius: 'var(--semantic-radius-sm)', marginBottom: '1rem' }} />
      <button style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--semantic-bg-brand)', color: 'white', border: 'none', borderRadius: 'var(--semantic-radius-sm)', cursor: 'pointer' }}>
        Sign In
      </button>
    </div>
  ),
};

export const ContentSections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example using dividers to separate content sections with labels.',
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h4>Introduction</h4>
        <p style={{ color: 'var(--semantic-text-secondary)' }}>
          This is the introduction section with some content about the topic.
        </p>
      </div>
      
      <Divider label="Main Content" labelPosition="left" spacing="lg" />
      
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: 'var(--semantic-text-secondary)' }}>
          Main content goes here with detailed information and explanations.
        </p>
      </div>
      
      <Divider label="Related Information" labelPosition="left" spacing="lg" />
      
      <div>
        <p style={{ color: 'var(--semantic-text-secondary)' }}>
          Additional related information and resources.
        </p>
      </div>
    </div>
  ),
};

export const NavigationWithVertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example using vertical dividers in a navigation bar.',
      },
    },
  },
  render: () => (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1.5rem',
      padding: '1rem',
      backgroundColor: 'var(--semantic-bg-secondary)',
      borderRadius: 'var(--semantic-radius-md)',
    }}>
      <a href="#" style={{ color: 'var(--semantic-text-primary)', textDecoration: 'none' }}>Home</a>
      <Divider orientation="vertical" spacing="none" />
      <a href="#" style={{ color: 'var(--semantic-text-primary)', textDecoration: 'none' }}>Products</a>
      <Divider orientation="vertical" spacing="none" />
      <a href="#" style={{ color: 'var(--semantic-text-primary)', textDecoration: 'none' }}>About</a>
      <Divider orientation="vertical" spacing="none" />
      <a href="#" style={{ color: 'var(--semantic-text-primary)', textDecoration: 'none' }}>Contact</a>
    </nav>
  ),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all divider variants side by side.',
      },
    },
  },
  render: () => (
    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Solid</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Dotted</p>
        <Divider variant="dotted" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>With Label</p>
        <Divider label="Label Text" />
      </div>
    </div>
  ),
};
