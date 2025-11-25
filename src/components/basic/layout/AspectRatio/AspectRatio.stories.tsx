import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'select',
      options: ['square', 'video', 'widescreen', 'portrait', 'landscape', 'golden', 'ultrawide'],
      description: 'Predefined aspect ratio name or custom number',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    ratio: 'square',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold">
        1:1 Square
      </div>
    ),
  },
};

export const Video: Story = {
  args: {
    ratio: 'video',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold">
        16:9 Video
      </div>
    ),
  },
};

export const Widescreen: Story = {
  args: {
    ratio: 'widescreen',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold">
        21:9 Widescreen
      </div>
    ),
  },
};

export const Portrait: Story = {
  args: {
    ratio: 'portrait',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600 text-white font-semibold">
        3:4 Portrait
      </div>
    ),
  },
};

export const Landscape: Story = {
  args: {
    ratio: 'landscape',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
        4:3 Landscape
      </div>
    ),
  },
};

export const GoldenRatio: Story = {
  args: {
    ratio: 'golden',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-semibold">
        Golden Ratio (1.618:1)
      </div>
    ),
  },
};

export const Ultrawide: Story = {
  args: {
    ratio: 'ultrawide',
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-indigo-400 to-indigo-600 text-white font-semibold">
        32:9 Ultrawide
      </div>
    ),
  },
};

export const CustomRatio: Story = {
  args: {
    ratio: 2.5,
    children: (
      <div className="flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 text-white font-semibold">
        Custom 2.5:1 Ratio
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    ratio: 'video',
    children: (
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Mountain landscape"
        className="w-full h-full object-cover"
      />
    ),
  },
};

export const WithVideo: Story = {
  args: {
    ratio: 'video',
    children: (
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    ),
  },
};

export const WithRoundedCorners: Story = {
  args: {
    ratio: 'square',
    className: 'rounded-lg',
    children: (
      <img
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
        alt="Landscape"
        className="w-full h-full object-cover"
      />
    ),
  },
};

export const Responsive: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <AspectRatio ratio="square">
        <div className="flex items-center justify-center bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-semibold">
          Square
        </div>
      </AspectRatio>
      <AspectRatio ratio="video">
        <div className="flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 text-white font-semibold">
          Video
        </div>
      </AspectRatio>
      <AspectRatio ratio="landscape">
        <div className="flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-semibold">
          Landscape
        </div>
      </AspectRatio>
    </div>
  ),
};
