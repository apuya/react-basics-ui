import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
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
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    inline: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, color = 'bg-blue-500' }: { children: React.ReactNode; color?: string }) => (
  <div className={`${color} text-white px-4 py-2 rounded`}>{children}</div>
);

export const Default: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 'md',
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'md',
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
};

export const RowReverse: Story = {
  args: {
    direction: 'row-reverse',
    gap: 'md',
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
};

export const ColumnReverse: Story = {
  args: {
    direction: 'column-reverse',
    gap: 'md',
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
};

export const AlignStart: Story = {
  args: {
    align: 'start',
    gap: 'md',
    style: { height: '200px' },
    children: (
      <>
        <Box>Short</Box>
        <Box>
          Tall
          <br />
          Item
        </Box>
        <Box>Short</Box>
      </>
    ),
  },
};

export const AlignCenter: Story = {
  args: {
    align: 'center',
    gap: 'md',
    style: { height: '200px' },
    children: (
      <>
        <Box>Short</Box>
        <Box>
          Tall
          <br />
          Item
        </Box>
        <Box>Short</Box>
      </>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    align: 'end',
    gap: 'md',
    style: { height: '200px' },
    children: (
      <>
        <Box>Short</Box>
        <Box>
          Tall
          <br />
          Item
        </Box>
        <Box>Short</Box>
      </>
    ),
  },
};

export const AlignStretch: Story = {
  args: {
    align: 'stretch',
    gap: 'md',
    style: { height: '200px' },
    children: (
      <>
        <Box>Stretched</Box>
        <Box>Stretched</Box>
        <Box>Stretched</Box>
      </>
    ),
  },
};

export const JustifyStart: Story = {
  args: {
    justify: 'start',
    gap: 'md',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const JustifyCenter: Story = {
  args: {
    justify: 'center',
    gap: 'md',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const JustifyEnd: Story = {
  args: {
    justify: 'end',
    gap: 'md',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const JustifyBetween: Story = {
  args: {
    justify: 'between',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const JustifyAround: Story = {
  args: {
    justify: 'around',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const JustifyEvenly: Story = {
  args: {
    justify: 'evenly',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const Wrap: Story = {
  args: {
    wrap: 'wrap',
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const WrapReverse: Story = {
  args: {
    wrap: 'wrap-reverse',
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const GapSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: xs</p>
        <Flex gap="xs">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Flex>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: sm</p>
        <Flex gap="sm">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Flex>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: md</p>
        <Flex gap="md">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Flex>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: lg</p>
        <Flex gap="lg">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Flex>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: xl</p>
        <Flex gap="xl">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Flex>
      </div>
    </div>
  ),
};

export const CustomGap: Story = {
  args: {
    gap: '3rem',
    children: (
      <>
        <Box>Custom</Box>
        <Box>Gap</Box>
        <Box>3rem</Box>
      </>
    ),
  },
};

export const CenteredLayout: Story = {
  args: {
    justify: 'center',
    align: 'center',
    style: { height: '300px', border: '2px dashed #ccc' },
    children: (
      <Box color="bg-green-500">
        Perfectly
        <br />
        Centered
      </Box>
    ),
  },
};

export const ResponsiveCard: Story = {
  render: () => (
    <Flex direction="column" gap="lg" className="p-6 bg-white rounded-lg shadow-lg max-w-md">
      <Flex justify="between" align="center">
        <h2 className="text-2xl font-bold">Card Title</h2>
        <Box color="bg-indigo-500">Badge</Box>
      </Flex>
      <p className="text-gray-600">
        This is a responsive card layout built with the Flex component. It demonstrates how to combine
        different flex properties.
      </p>
      <Flex gap="sm" justify="end">
        <button className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Confirm
        </button>
      </Flex>
    </Flex>
  ),
};

export const InlineFlex: Story = {
  args: {
    inline: true,
    gap: 'sm',
    children: (
      <>
        <Box color="bg-red-500">Inline</Box>
        <Box color="bg-red-500">Flex</Box>
        <Box color="bg-red-500">Items</Box>
      </>
    ),
  },
};

export const Navigation: Story = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      className="bg-gray-800 text-white p-4 rounded-lg"
    >
      <div className="text-xl font-bold">Logo</div>
      <Flex gap="md">
        <a href="#" className="hover:text-blue-300">Home</a>
        <a href="#" className="hover:text-blue-300">About</a>
        <a href="#" className="hover:text-blue-300">Services</a>
        <a href="#" className="hover:text-blue-300">Contact</a>
      </Flex>
      <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
        Sign In
      </button>
    </Flex>
  ),
};
