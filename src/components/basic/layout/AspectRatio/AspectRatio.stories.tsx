import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';
import { Box } from '../Box';
import { VStack } from '../Stack';
import { Grid } from '../Grid';
import { Flex } from '../Flex';
import { Text } from '../../typography/Text';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Maintains a consistent aspect ratio for its content. Useful for images, videos, and responsive embeds.',
      },
    },
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
      <Box w={400}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const RatioBox = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <Flex
    justify="center"
    align="center"
    className={`w-full h-full ${color} text-white font-semibold`}
  >
    <Text color="inverse" weight="semibold">{children}</Text>
  </Flex>
);

export const Default: Story = {
  args: {
    ratio: 'video',
    children: (
      <RatioBox color="bg-gradient-to-br from-blue-400 to-blue-600">
        16:9 Video (Default)
      </RatioBox>
    ),
  },
};

export const AllRatios: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All predefined aspect ratios: square (1:1), video (16:9), portrait (3:4), landscape (4:3), golden (1.618:1), widescreen (21:9), ultrawide (32:9).',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {[
        { ratio: 'square' as const, label: '1:1 Square', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
        { ratio: 'video' as const, label: '16:9 Video', color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
        { ratio: 'portrait' as const, label: '3:4 Portrait', color: 'bg-gradient-to-br from-pink-400 to-pink-600' },
        { ratio: 'landscape' as const, label: '4:3 Landscape', color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
        { ratio: 'golden' as const, label: '1.618:1 Golden', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600' },
        { ratio: 'widescreen' as const, label: '21:9 Widescreen', color: 'bg-gradient-to-br from-green-400 to-green-600' },
        { ratio: 'ultrawide' as const, label: '32:9 Ultrawide', color: 'bg-gradient-to-br from-indigo-400 to-indigo-600' },
      ].map(({ ratio, label, color }) => (
        <VStack key={ratio} spacing="xs">
          <Text weight="semibold" size="small">ratio="{ratio}"</Text>
          <AspectRatio ratio={ratio}>
            <RatioBox color={color}>{label}</RatioBox>
          </AspectRatio>
        </VStack>
      ))}
    </VStack>
  ),
};

export const CustomRatio: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use a numeric value for custom aspect ratios.',
      },
    },
  },
  args: {
    ratio: 2.5,
    children: (
      <RatioBox color="bg-gradient-to-br from-red-400 to-red-600">
        Custom 2.5:1 Ratio
      </RatioBox>
    ),
  },
};

export const WithImage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Perfect for maintaining image aspect ratios.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Embed responsive videos that maintain their aspect ratio.',
      },
    },
  },
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

export const ImageGallery: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: responsive image gallery with consistent aspect ratios.',
      },
    },
  },
  render: () => (
    <Grid columns={3} gap="md">
      {[
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      ].map((src, i) => (
        <AspectRatio key={i} ratio="square" className="rounded-lg overflow-hidden">
          <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      ))}
    </Grid>
  ),
};
