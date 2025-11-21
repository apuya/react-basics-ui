import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'label', 'div', 'strong', 'em', 'small'],
      description: 'HTML element to render',
    },
    size: {
      control: 'select',
      options: ['caption', 'small', 'body', 'subtitle'],
      description: 'Text size',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'disabled', 'link', 'error', 'warning', 'success', 'inherit'],
      description: 'Text color',
    },
    lineHeight: {
      control: 'select',
      options: ['tight', 'normal', 'relaxed'],
      description: 'Line height',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    fontFamily: {
      control: 'select',
      options: ['body', 'mono'],
      description: 'Font family',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

// Sizes
export const SizeCaption: Story = {
  args: {
    size: 'caption',
    children: 'Caption text - smallest size',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
    children: 'Small text - helper text size',
  },
};

export const SizeBody: Story = {
  args: {
    size: 'body',
    children: 'Body text - default paragraph size',
  },
};

export const SizeSubtitle: Story = {
  args: {
    size: 'subtitle',
    children: 'Subtitle text - larger emphasis',
  },
};

// Weights
export const WeightLight: Story = {
  args: {
    weight: 'light',
    size: 'subtitle',
    children: 'Light weight text',
  },
};

export const WeightRegular: Story = {
  args: {
    weight: 'regular',
    size: 'subtitle',
    children: 'Regular weight text',
  },
};

export const WeightMedium: Story = {
  args: {
    weight: 'medium',
    size: 'subtitle',
    children: 'Medium weight text',
  },
};

export const WeightSemibold: Story = {
  args: {
    weight: 'semibold',
    size: 'subtitle',
    children: 'Semibold weight text',
  },
};

export const WeightBold: Story = {
  args: {
    weight: 'bold',
    size: 'subtitle',
    children: 'Bold weight text',
  },
};

// Colors
export const ColorPrimary: Story = {
  args: {
    color: 'primary',
    children: 'Primary color text',
  },
};

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary color text',
  },
};

export const ColorTertiary: Story = {
  args: {
    color: 'tertiary',
    children: 'Tertiary color text',
  },
};

export const ColorLink: Story = {
  args: {
    color: 'link',
    children: 'Link color text',
  },
};

export const ColorError: Story = {
  args: {
    color: 'error',
    children: 'Error color text',
  },
};

export const ColorWarning: Story = {
  args: {
    color: 'warning',
    children: 'Warning color text',
  },
};

export const ColorSuccess: Story = {
  args: {
    color: 'success',
    children: 'Success color text',
  },
};

export const ColorDisabled: Story = {
  args: {
    color: 'disabled',
    children: 'Disabled color text',
  },
};

// Alignments
export const AlignLeft: Story = {
  args: {
    align: 'left',
    children: 'Left aligned text',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const AlignCenter: Story = {
  args: {
    align: 'center',
    children: 'Center aligned text',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const AlignRight: Story = {
  args: {
    align: 'right',
    children: 'Right aligned text',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

// Font Families
export const FontBody: Story = {
  args: {
    fontFamily: 'body',
    children: 'Body font family text',
  },
};

export const FontMono: Story = {
  args: {
    fontFamily: 'mono',
    children: 'const code = "monospace font";',
  },
};

// Line Heights
export const LineHeightTight: Story = {
  args: {
    lineHeight: 'tight',
    children: 'Tight line height text. This is useful for headings and compact layouts where you want minimal spacing between lines.',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const LineHeightNormal: Story = {
  args: {
    lineHeight: 'normal',
    children: 'Normal line height text. This is the default and works well for most body copy and general text content.',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const LineHeightRelaxed: Story = {
  args: {
    lineHeight: 'relaxed',
    children: 'Relaxed line height text. This provides more breathing room and is great for long-form content and accessibility.',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

// Elements
export const AsParagraph: Story = {
  args: {
    as: 'p',
    children: 'This is rendered as a paragraph element',
  },
};

export const AsLabel: Story = {
  args: {
    as: 'label',
    children: 'This is rendered as a label element',
  },
};

export const AsStrong: Story = {
  args: {
    as: 'strong',
    weight: 'bold',
    children: 'This is rendered as a strong element',
  },
};

export const AsEmphasis: Story = {
  args: {
    as: 'em',
    children: 'This is rendered as an em element',
  },
};

// Truncate
export const Truncated: Story = {
  args: {
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it overflows its container',
  },
  decorators: [(Story) => <div style={{ width: '200px' }}><Story /></div>],
};

// Combinations
export const SubtitleSemibold: Story = {
  args: {
    size: 'subtitle',
    weight: 'semibold',
    children: 'Subtitle with semibold weight',
  },
};

export const CaptionSecondary: Story = {
  args: {
    size: 'caption',
    color: 'secondary',
    children: 'Small secondary caption text',
  },
};

export const ErrorMessage: Story = {
  args: {
    size: 'small',
    color: 'error',
    children: 'This field is required',
  },
};

export const CodeBlock: Story = {
  args: {
    fontFamily: 'mono',
    size: 'small',
    color: 'secondary',
    children: 'npm install react-basics-ui',
  },
};

// All Sizes Grid
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text size="caption">Caption - The quick brown fox</Text>
      <Text size="small">Small - The quick brown fox</Text>
      <Text size="body">Body - The quick brown fox</Text>
      <Text size="subtitle">Subtitle - The quick brown fox</Text>
    </div>
  ),
};

// All Weights Grid
export const AllWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="light" size="subtitle">Light weight</Text>
      <Text weight="regular" size="subtitle">Regular weight</Text>
      <Text weight="medium" size="subtitle">Medium weight</Text>
      <Text weight="semibold" size="subtitle">Semibold weight</Text>
      <Text weight="bold" size="subtitle">Bold weight</Text>
    </div>
  ),
};
