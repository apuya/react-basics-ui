import type { Meta, StoryObj } from '@storybook/react';
import { HStack, Stack, VStack } from './Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    inline: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, color = 'bg-blue-500' }: { children: React.ReactNode; color?: string }) => (
  <div className={`${color} text-white px-4 py-3 rounded font-semibold`}>{children}</div>
);

export const Default: Story = {
  args: {
    spacing: 'md',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
};

export const SpacingSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold">Spacing: xs</p>
        <Stack direction="vertical" spacing="xs">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Stack>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Spacing: sm</p>
        <Stack direction="vertical" spacing="sm">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Stack>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Spacing: md</p>
        <Stack direction="vertical" spacing="md">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Stack>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Spacing: lg</p>
        <Stack direction="vertical" spacing="lg">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Stack>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Spacing: xl</p>
        <Stack direction="vertical" spacing="xl">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Stack>
      </div>
    </div>
  ),
};

export const AlignStart: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    align: 'start',
    children: (
      <>
        <Box>Short</Box>
        <Box>Medium length item</Box>
        <Box>Very long content item here</Box>
      </>
    ),
  },
};

export const AlignCenter: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    align: 'center',
    children: (
      <>
        <Box>Short</Box>
        <Box>Medium length item</Box>
        <Box>Very long content item here</Box>
      </>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    align: 'end',
    children: (
      <>
        <Box>Short</Box>
        <Box>Medium length item</Box>
        <Box>Very long content item here</Box>
      </>
    ),
  },
};

export const AlignStretch: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
    children: (
      <>
        <Box>Stretched</Box>
        <Box>Stretched</Box>
        <Box>Stretched</Box>
      </>
    ),
  },
};

export const JustifyCenter: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    justify: 'center',
    style: { minHeight: '200px', border: '2px dashed #ccc' },
    children: (
      <>
        <Box>A</Box>
        <Box>B</Box>
        <Box>C</Box>
      </>
    ),
  },
};

export const JustifyBetween: Story = {
  args: {
    direction: 'horizontal',
    justify: 'between',
    children: (
      <>
        <Box>Left</Box>
        <Box>Center</Box>
        <Box>Right</Box>
      </>
    ),
  },
};

export const WithDivider: Story = {
  args: {
    direction: 'vertical',
    divider: <hr className="border-gray-300" />,
    children: (
      <>
        <div className="p-4">Section 1</div>
        <div className="p-4">Section 2</div>
        <div className="p-4">Section 3</div>
      </>
    ),
  },
};

export const WithVerticalDivider: Story = {
  args: {
    direction: 'horizontal',
    align: 'center',
    divider: <div className="w-px h-8 bg-gray-300" />,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Wrap: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    wrap: 'wrap',
    children: (
      <>
        {Array.from({ length: 15 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const CustomSpacing: Story = {
  args: {
    direction: 'vertical',
    spacing: '2rem',
    children: (
      <>
        <Box color="bg-green-500">Custom</Box>
        <Box color="bg-green-500">2rem</Box>
        <Box color="bg-green-500">Spacing</Box>
      </>
    ),
  },
};

// HStack Stories
export const HStackDefault: Story = {
  render: () => (
    <HStack spacing="md">
      <Box color="bg-orange-500">H1</Box>
      <Box color="bg-orange-500">H2</Box>
      <Box color="bg-orange-500">H3</Box>
    </HStack>
  ),
};

export const HStackWithJustify: Story = {
  render: () => (
    <HStack spacing="md" justify="between">
      <Box color="bg-orange-500">Left</Box>
      <Box color="bg-orange-500">Middle</Box>
      <Box color="bg-orange-500">Right</Box>
    </HStack>
  ),
};

// VStack Stories
export const VStackDefault: Story = {
  render: () => (
    <VStack spacing="md">
      <Box color="bg-teal-500">V1</Box>
      <Box color="bg-teal-500">V2</Box>
      <Box color="bg-teal-500">V3</Box>
    </VStack>
  ),
};

export const VStackWithAlign: Story = {
  render: () => (
    <VStack spacing="md" align="center">
      <Box color="bg-teal-500">Short</Box>
      <Box color="bg-teal-500">Medium length</Box>
      <Box color="bg-teal-500">Very long item here</Box>
    </VStack>
  ),
};

// Real-world examples
export const Card: Story = {
  render: () => (
    <VStack spacing="lg" className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <div>
        <h2 className="text-2xl font-bold mb-2">Card Title</h2>
        <p className="text-gray-600">This is a card layout built with VStack component.</p>
      </div>
      <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded" />
      <p className="text-gray-700">
        VStack makes it easy to create vertical layouts with consistent spacing between elements.
      </p>
      <HStack spacing="sm" justify="end" className="w-full">
        <button className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Confirm
        </button>
      </HStack>
    </VStack>
  ),
};

export const Navigation: Story = {
  render: () => (
    <HStack
      spacing="md"
      justify="between"
      align="center"
      className="bg-gray-800 text-white p-4 rounded-lg"
    >
      <div className="text-xl font-bold">Logo</div>
      <HStack spacing="md">
        <a href="#" className="hover:text-blue-300">
          Home
        </a>
        <a href="#" className="hover:text-blue-300">
          About
        </a>
        <a href="#" className="hover:text-blue-300">
          Services
        </a>
        <a href="#" className="hover:text-blue-300">
          Contact
        </a>
      </HStack>
      <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Sign In</button>
    </HStack>
  ),
};

export const Form: Story = {
  render: () => (
    <VStack spacing="lg" className="bg-white p-6 rounded-lg shadow max-w-md">
      <h2 className="text-2xl font-bold">Contact Form</h2>
      <VStack spacing="md" className="w-full">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Your message..."
          />
        </div>
      </VStack>
      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Send Message
      </button>
    </VStack>
  ),
};

export const InlineStack: Story = {
  args: {
    inline: true,
    direction: 'horizontal',
    spacing: 'sm',
    children: (
      <>
        <Box color="bg-red-500">Inline</Box>
        <Box color="bg-red-500">Stack</Box>
        <Box color="bg-red-500">Items</Box>
      </>
    ),
  },
};
