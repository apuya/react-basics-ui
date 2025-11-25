import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text component for rendering body text and inline text elements with consistent styling. Supports multiple sizes, weights, colors, alignments, and semantic HTML elements. Use for paragraphs, labels, captions, and other text content throughout your application.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Default text component with body size and regular weight. Use for standard paragraphs and general text content.',
      },
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

// Sizes
export const SizeCaption: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Smallest text size for captions, footnotes, and supplementary information. Use for metadata and secondary details.',
      },
    },
  },
  args: {
    size: 'caption',
    children: 'Caption text - smallest size',
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small text size for helper text, labels, and hints. Use for form field descriptions and supporting content.',
      },
    },
  },
  args: {
    size: 'small',
    children: 'Small text - helper text size',
  },
};

export const SizeBody: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default body text size for paragraphs and main content. Use for most text in your application.',
      },
    },
  },
  args: {
    size: 'body',
    children: 'Body text - default paragraph size',
  },
};

export const SizeSubtitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Larger text size for subtitles and emphasized content. Use for section introductions and important text.',
      },
    },
  },
  args: {
    size: 'subtitle',
    children: 'Subtitle text - larger emphasis',
  },
};

// Weights
export const WeightLight: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Light font weight for subtle, delicate text. Use sparingly for elegant layouts and light emphasis.',
      },
    },
  },
  args: {
    weight: 'light',
    size: 'subtitle',
    children: 'Light weight text',
  },
};

export const WeightRegular: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default regular font weight for body text. Use for most paragraphs and general content.',
      },
    },
  },
  args: {
    weight: 'regular',
    size: 'subtitle',
    children: 'Regular weight text',
  },
};

export const WeightMedium: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium font weight for subtle emphasis. Use for highlighted text that needs slight prominence without being bold.',
      },
    },
  },
  args: {
    weight: 'medium',
    size: 'subtitle',
    children: 'Medium weight text',
  },
};

export const WeightSemibold: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Semibold font weight for strong emphasis. Use for labels, key information, and important text.',
      },
    },
  },
  args: {
    weight: 'semibold',
    size: 'subtitle',
    children: 'Semibold weight text',
  },
};

export const WeightBold: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bold font weight for maximum emphasis. Use for headings within text, critical information, and strong highlights.',
      },
    },
  },
  args: {
    weight: 'bold',
    size: 'subtitle',
    children: 'Bold weight text',
  },
};

// Colors
export const ColorPrimary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Primary text color for main content. Use for standard body text and primary information.',
      },
    },
  },
  args: {
    color: 'primary',
    children: 'Primary color text',
  },
};

export const ColorSecondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Secondary text color for less prominent content. Use for supporting text, descriptions, and helper content.',
      },
    },
  },
  args: {
    color: 'secondary',
    children: 'Secondary color text',
  },
};

export const ColorTertiary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tertiary text color for minimal emphasis. Use for captions, timestamps, and low-priority information.',
      },
    },
  },
  args: {
    color: 'tertiary',
    children: 'Tertiary color text',
  },
};

export const ColorLink: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Link text color for interactive elements. Use for clickable text and navigation elements.',
      },
    },
  },
  args: {
    color: 'link',
    children: 'Link color text',
  },
};

export const ColorError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error text color for validation and error messages. Use for form errors, alerts, and critical information.',
      },
    },
  },
  args: {
    color: 'error',
    children: 'Error color text',
  },
};

export const ColorWarning: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Warning text color for caution messages. Use for warnings, alerts, and important notices.',
      },
    },
  },
  args: {
    color: 'warning',
    children: 'Warning color text',
  },
};

export const ColorSuccess: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Success text color for positive confirmation. Use for success messages, confirmations, and positive feedback.',
      },
    },
  },
  args: {
    color: 'success',
    children: 'Success color text',
  },
};

export const ColorDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled text color for inactive elements. Use for disabled form fields and inactive content.',
      },
    },
  },
  args: {
    color: 'disabled',
    children: 'Disabled color text',
  },
};

// Alignments
export const AlignLeft: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Left-aligned text (default). Use for most text content in left-to-right languages.',
      },
    },
  },
  args: {
    align: 'left',
    children: 'Left aligned text',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const AlignCenter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Center-aligned text. Use for headings, titles, and centered layouts.',
      },
    },
  },
  args: {
    align: 'center',
    children: 'Center aligned text',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const AlignRight: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Right-aligned text. Use for numeric data, prices, and right-to-left language support.',
      },
    },
  },
  args: {
    align: 'right',
    children: 'Right aligned text',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

// Font Families
export const FontBody: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default body font family for general text. Use for standard content and readability.',
      },
    },
  },
  args: {
    fontFamily: 'body',
    children: 'Body font family text',
  },
};

export const FontMono: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Monospace font family for code and technical content. Use for code snippets, terminal output, and data tables.',
      },
    },
  },
  args: {
    fontFamily: 'mono',
    children: 'const code = "monospace font";',
  },
};

// Line Heights
export const LineHeightTight: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tight line height for compact layouts. Use for headings and UI elements where space efficiency is important.',
      },
    },
  },
  args: {
    lineHeight: 'tight',
    children: 'Tight line height text. This is useful for headings and compact layouts where you want minimal spacing between lines.',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const LineHeightNormal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal line height for balanced readability. Use for most body text and general content.',
      },
    },
  },
  args: {
    lineHeight: 'normal',
    children: 'Normal line height text. This is the default and works well for most body copy and general text content.',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

export const LineHeightRelaxed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Relaxed line height for improved readability. Use for long-form content, articles, and accessibility.',
      },
    },
  },
  args: {
    lineHeight: 'relaxed',
    children: 'Relaxed line height text. This provides more breathing room and is great for long-form content and accessibility.',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}><Story /></div>],
};

// Elements
export const AsParagraph: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Renders as a paragraph element for semantic HTML. Use for standalone paragraphs and text blocks.',
      },
    },
  },
  args: {
    as: 'p',
    children: 'This is rendered as a paragraph element',
  },
};

export const AsLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Renders as a label element for form associations. Use for form field labels and input descriptions.',
      },
    },
  },
  args: {
    as: 'label',
    children: 'This is rendered as a label element',
  },
};

export const AsStrong: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Renders as a strong element for semantic importance. Use for critical text that needs bold emphasis and semantic weight.',
      },
    },
  },
  args: {
    as: 'strong',
    weight: 'bold',
    children: 'This is rendered as a strong element',
  },
};

export const AsEmphasis: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Renders as an em element for semantic emphasis. Use for italicized text and stressed content.',
      },
    },
  },
  args: {
    as: 'em',
    children: 'This is rendered as an em element',
  },
};

// Truncate
export const Truncated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Truncates overflowing text with ellipsis. Use for single-line text in cards, tables, and constrained layouts.',
      },
    },
  },
  args: {
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it overflows its container',
  },
  decorators: [(Story) => <div style={{ width: '200px' }}><Story /></div>],
};

// Combinations
export const SubtitleSemibold: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combines subtitle size with semibold weight for section headers. Use for prominent subsections and emphasized content.',
      },
    },
  },
  args: {
    size: 'subtitle',
    weight: 'semibold',
    children: 'Subtitle with semibold weight',
  },
};

export const CaptionSecondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combines caption size with secondary color for subtle metadata. Use for timestamps, bylines, and supplementary information.',
      },
    },
  },
  args: {
    size: 'caption',
    color: 'secondary',
    children: 'Small secondary caption text',
  },
};

export const ErrorMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combines small size with error color for validation feedback. Use for form error messages and input validation.',
      },
    },
  },
  args: {
    size: 'small',
    color: 'error',
    children: 'This field is required',
  },
};

export const CodeBlock: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combines monospace font with small size for inline code. Use for command snippets, package names, and technical references.',
      },
    },
  },
  args: {
    fontFamily: 'mono',
    size: 'small',
    color: 'secondary',
    children: 'npm install react-basics-ui',
  },
};

// All Sizes Grid
export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all available text sizes. Use this as a reference for choosing the right size for your content.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all available font weights. Use this as a reference for choosing the right emphasis level.',
      },
    },
  },
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
