import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A polymorphic primitive component that serves as a building block for layouts. Provides convenient props for spacing, sizing, colors, and common CSS properties.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render as',
    },
    p: {
      control: 'text',
      description: 'Padding (all sides)',
    },
    m: {
      control: 'text',
      description: 'Margin (all sides)',
    },
    bg: {
      control: 'color',
      description: 'Background color',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius',
    },
    display: {
      control: 'select',
      options: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
      description: 'Display property',
    },
    position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'Position property',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic Box component with default styles.',
      },
    },
  },
  args: {
    children: 'Default Box',
    p: 16,
  },
};

export const WithPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with padding on all sides.',
      },
    },
  },
  args: {
    children: 'Box with padding',
    p: 24,
    bg: '#f3f4f6',
  },
};

export const WithMargin: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with margin on all sides.',
      },
    },
  },
  render: () => (
    <div style={{ border: '2px dashed #e5e7eb', padding: '8px' }}>
      <Box m={16} p={16} bg="#dbeafe">
        Box with margin
      </Box>
    </div>
  ),
};

export const WithDirectionalPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with different padding values for each side.',
      },
    },
  },
  args: {
    children: 'Directional padding',
    pt: 8,
    pr: 24,
    pb: 16,
    pl: 32,
    bg: '#fef3c7',
  },
};

export const WithHorizontalAndVerticalPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with horizontal and vertical padding using px and py props.',
      },
    },
  },
  args: {
    children: 'Horizontal and vertical padding',
    px: 32,
    py: 16,
    bg: '#ddd6fe',
  },
};

export const WithBackgroundAndColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with custom background and text color.',
      },
    },
  },
  args: {
    children: 'Styled Box',
    p: 24,
    bg: '#3b82f6',
    color: '#ffffff',
    borderRadius: 8,
  },
};

export const WithBorder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with border and border radius.',
      },
    },
  },
  args: {
    children: 'Box with border',
    p: 24,
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 12,
  },
};

export const WithSizing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with explicit width and height.',
      },
    },
  },
  args: {
    children: 'Fixed size box',
    w: 200,
    h: 150,
    p: 16,
    bg: '#fecaca',
    display: 'flex',
  },
  render: (args) => (
    <Box {...args} style={{ alignItems: 'center', justifyContent: 'center' }}>
      {args.children}
    </Box>
  ),
};

export const WithMinMaxSizing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with minimum and maximum width constraints.',
      },
    },
  },
  args: {
    children: 'This box has a minimum width of 200px and maximum width of 400px',
    p: 16,
    minW: 200,
    maxW: 400,
    bg: '#e9d5ff',
    borderRadius: 8,
  },
};

export const AsSection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box rendered as a section element using the polymorphic `as` prop.',
      },
    },
  },
  args: {
    as: 'section',
    children: 'This is a <section> element',
    p: 24,
    bg: '#f0fdf4',
    borderRadius: 8,
  },
};

export const AsArticle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box rendered as an article element.',
      },
    },
  },
  args: {
    as: 'article',
    children: 'This is an <article> element',
    p: 24,
    bg: '#fef2f2',
    borderRadius: 8,
  },
};

export const FlexContainer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box used as a flex container.',
      },
    },
  },
  render: () => (
    <Box display="flex" p={16} bg="#f3f4f6" borderRadius={8}>
      <Box p={12} m={4} bg="#dbeafe" borderRadius={4}>
        Item 1
      </Box>
      <Box p={12} m={4} bg="#dbeafe" borderRadius={4}>
        Item 2
      </Box>
      <Box p={12} m={4} bg="#dbeafe" borderRadius={4}>
        Item 3
      </Box>
    </Box>
  ),
};

export const GridContainer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box used as a grid container.',
      },
    },
  },
  render: () => (
    <Box
      display="grid"
      p={16}
      bg="#f3f4f6"
      borderRadius={8}
      style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
    >
      <Box p={12} bg="#fecaca" borderRadius={4}>
        Grid 1
      </Box>
      <Box p={12} bg="#fecaca" borderRadius={4}>
        Grid 2
      </Box>
      <Box p={12} bg="#fecaca" borderRadius={4}>
        Grid 3
      </Box>
      <Box p={12} bg="#fecaca" borderRadius={4}>
        Grid 4
      </Box>
      <Box p={12} bg="#fecaca" borderRadius={4}>
        Grid 5
      </Box>
      <Box p={12} bg="#fecaca" borderRadius={4}>
        Grid 6
      </Box>
    </Box>
  ),
};

export const CenteredContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with centered content using flexbox.',
      },
    },
  },
  render: () => (
    <Box
      display="flex"
      w={300}
      h={200}
      bg="#e0e7ff"
      borderRadius={12}
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Box p={16} bg="white" borderRadius={8}>
        Centered content
      </Box>
    </Box>
  ),
};

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box component used to create a card-like component.',
      },
    },
  },
  render: () => (
    <Box
      w={320}
      p={24}
      bg="white"
      borderWidth={1}
      borderColor="#e5e7eb"
      borderRadius={12}
      style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
    >
      <Box as="h3" mb={8} style={{ fontSize: '18px', fontWeight: 600 }}>
        Card Title
      </Box>
      <Box color="#6b7280" mb={16}>
        This is a card built using the Box component with various styling props.
      </Box>
      <Box display="flex" style={{ gap: '8px' }}>
        <Box
          as="button"
          px={16}
          py={8}
          bg="#3b82f6"
          color="white"
          borderRadius={6}
          style={{ cursor: 'pointer', border: 'none', fontSize: '14px', fontWeight: 500 }}
        >
          Action
        </Box>
        <Box
          as="button"
          px={16}
          py={8}
          borderWidth={1}
          borderColor="#e5e7eb"
          borderRadius={6}
          style={{ cursor: 'pointer', backgroundColor: 'white', fontSize: '14px', fontWeight: 500 }}
        >
          Cancel
        </Box>
      </Box>
    </Box>
  ),
};

export const ResponsiveBox: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with responsive behavior using className for Tailwind classes.',
      },
    },
  },
  args: {
    children: 'Resize the window to see responsive padding',
    className: 'p-4 md:p-8 lg:p-12',
    bg: '#bfdbfe',
    borderRadius: 8,
  },
};

export const NestedBoxes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Nested Box components for complex layouts.',
      },
    },
  },
  render: () => (
    <Box p={24} bg="#f9fafb" borderRadius={12}>
      <Box mb={16} p={16} bg="#dbeafe" borderRadius={8}>
        <Box as="h4" mb={8} style={{ fontSize: '16px', fontWeight: 600 }}>
          Header
        </Box>
        <Box color="#1e40af">This is the header section</Box>
      </Box>
      <Box mb={16} p={16} bg="#fef3c7" borderRadius={8}>
        <Box as="h4" mb={8} style={{ fontSize: '16px', fontWeight: 600 }}>
          Content
        </Box>
        <Box color="#92400e">This is the main content section</Box>
      </Box>
      <Box p={16} bg="#d1fae5" borderRadius={8}>
        <Box as="h4" mb={8} style={{ fontSize: '16px', fontWeight: 600 }}>
          Footer
        </Box>
        <Box color="#065f46">This is the footer section</Box>
      </Box>
    </Box>
  ),
};
