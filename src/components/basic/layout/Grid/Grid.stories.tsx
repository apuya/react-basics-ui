import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    rows: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    gapX: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    gapY: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    flow: {
      control: 'select',
      options: ['row', 'col', 'dense', 'row-dense', 'col-dense'],
    },
    inline: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '900px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, color = 'bg-blue-500' }: { children: React.ReactNode; color?: string }) => (
  <div className={`${color} text-white px-4 py-3 rounded text-center font-semibold`}>
    {children}
  </div>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 'md',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const SixColumns: Story = {
  args: {
    cols: 6,
    gap: 'sm',
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <Box key={i}>{i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const WithRows: Story = {
  args: {
    cols: 3,
    rows: 2,
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: xs</p>
        <Grid cols={3} gap="xs">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: sm</p>
        <Grid cols={3} gap="sm">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: md</p>
        <Grid cols={3} gap="md">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: lg</p>
        <Grid cols={3} gap="lg">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Grid>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Gap: xl</p>
        <Grid cols={3} gap="xl">
          <Box color="bg-purple-500">A</Box>
          <Box color="bg-purple-500">B</Box>
          <Box color="bg-purple-500">C</Box>
        </Grid>
      </div>
    </div>
  ),
};

export const DifferentGapXY: Story = {
  args: {
    cols: 3,
    gapX: 'lg',
    gapY: 'sm',
    children: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <Box key={i} color="bg-green-500">
            Item {i + 1}
          </Box>
        ))}
      </>
    ),
  },
};

export const AlignStart: Story = {
  args: {
    cols: 3,
    gap: 'md',
    align: 'start',
    style: { minHeight: '300px' },
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
    cols: 3,
    gap: 'md',
    align: 'center',
    style: { minHeight: '300px' },
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
    cols: 3,
    gap: 'md',
    align: 'end',
    style: { minHeight: '300px' },
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

export const JustifyCenter: Story = {
  args: {
    cols: 3,
    gap: 'md',
    justify: 'center',
    children: (
      <>
        <Box>A</Box>
        <Box>B</Box>
        <Box>C</Box>
      </>
    ),
  },
};

export const JustifyEnd: Story = {
  args: {
    cols: 3,
    gap: 'md',
    justify: 'end',
    children: (
      <>
        <Box>A</Box>
        <Box>B</Box>
        <Box>C</Box>
      </>
    ),
  },
};

export const FlowColumn: Story = {
  args: {
    cols: 3,
    rows: 2,
    gap: 'md',
    flow: 'col',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} color="bg-orange-500">
            {i + 1}
          </Box>
        ))}
      </>
    ),
  },
};

export const ProductGrid: Story = {
  render: () => (
    <Grid cols={4} gap="lg">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-40" />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Product {i + 1}</h3>
            <p className="text-gray-600 text-sm mb-3">Product description goes here</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">${(i + 1) * 10}</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </Grid>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="aspect-square bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
        >
          {i + 1}
        </div>
      ))}
    </Grid>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Grid cols={4} gap="md">
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Main Chart</h3>
        <p>Large featured content</p>
      </div>
      <div className="col-span-2 bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Stats</h3>
        <p>Statistics widget</p>
      </div>
      <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Users</h3>
        <p className="text-3xl font-bold">1,234</p>
      </div>
      <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Revenue</h3>
        <p className="text-3xl font-bold">$56K</p>
      </div>
      <div className="col-span-2 bg-gradient-to-br from-pink-400 to-pink-600 text-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Activity</h3>
        <p>Recent activity feed</p>
      </div>
      <div className="col-span-2 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Tasks</h3>
        <p>Task list widget</p>
      </div>
    </Grid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i} color="bg-teal-500">
          Item {i + 1}
        </Box>
      ))}
    </div>
  ),
};

export const InlineGrid: Story = {
  args: {
    inline: true,
    cols: 2,
    gap: 'sm',
    children: (
      <>
        <Box color="bg-red-500">A</Box>
        <Box color="bg-red-500">B</Box>
        <Box color="bg-red-500">C</Box>
        <Box color="bg-red-500">D</Box>
      </>
    ),
  },
};
