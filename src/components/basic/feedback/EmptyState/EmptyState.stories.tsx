import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import {
  BiBox,
  BiSearchAlt,
  BiFolder,
  BiFileBlank,
  BiCart,
  BiCloudUpload,
  BiBookmark,
} from 'react-icons/bi';
import { Button } from '../../forms/Button';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'EmptyState component for displaying empty state placeholders with optional icon, title, description, and action buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional title text for the empty state',
    },
    description: {
      control: 'text',
      description: 'Optional description text providing more context',
    },
    icon: {
      control: false,
      description: 'Optional icon or illustration to display',
    },
    action: {
      control: false,
      description: 'Optional action element (button, link, etc.)',
    },
    iconSize: {
      control: 'number',
      description: 'Icon size in pixels',
      table: {
        defaultValue: { summary: '48' },
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <BiBox />,
    title: 'No items found',
    description: 'Get started by creating your first item.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default empty state with icon, title, and description.',
      },
    },
  },
};

export const WithAction: Story = {
  args: {
    icon: <BiFolder />,
    title: 'No projects yet',
    description: "You haven't created any projects. Start by creating your first project.",
    action: <Button variant="primary">Create Project</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with an action button.',
      },
    },
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: <BiSearchAlt />,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for search with no results.',
      },
    },
  },
};

export const EmptyCart: Story = {
  args: {
    icon: <BiCart />,
    title: 'Your cart is empty',
    description: 'Add items to your cart to get started.',
    action: (
      <Button variant="primary" size="large">
        Start Shopping
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty cart state with call-to-action button.',
      },
    },
  },
};

export const NoDocuments: Story = {
  args: {
    icon: <BiFileBlank />,
    title: 'No documents',
    description: 'Upload your first document to get started.',
    action: (
      <div className="flex gap-2">
        <Button variant="primary">
          <BiCloudUpload className="mr-2" />
          Upload Document
        </Button>
        <Button variant="secondary">Learn More</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with multiple action buttons.',
      },
    },
  },
};

export const NoSavedItems: Story = {
  args: {
    icon: <BiBookmark />,
    title: 'No saved items',
    description: 'Items you bookmark will appear here for easy access later.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state without an action button.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    icon: <BiBox />,
    title: 'Nothing here yet',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with only icon and title.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'No data available',
    description: 'There is currently no data to display.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state without an icon.',
      },
    },
  },
};

export const CustomIconSize: Story = {
  args: {
    icon: <BiBox />,
    title: 'Large Icon',
    description: 'Empty state with a larger icon size.',
    iconSize: 80,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom icon size (80px).',
      },
    },
  },
};

export const SmallIconSize: Story = {
  args: {
    icon: <BiBox />,
    title: 'Small Icon',
    description: 'Empty state with a smaller icon size.',
    iconSize: 32,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom icon size (32px).',
      },
    },
  },
};

export const WithCustomChildren: Story = {
  render: () => (
    <EmptyState icon={<BiBox />}>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-[var(--semantic-text-primary)]">
          Custom Content
        </h3>
        <p className="text-sm text-[var(--semantic-text-secondary)] mb-4">
          You can use custom children instead of the title and description props.
        </p>
        <Button variant="primary">Take Action</Button>
      </div>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom children content.',
      },
    },
  },
};

export const LongDescription: Story = {
  args: {
    icon: <BiFolder />,
    title: 'No projects available',
    description:
      'It looks like you don\'t have any projects yet. Projects help you organize your work and collaborate with your team. Get started by creating your first project and inviting team members to join. You can create multiple projects to keep different initiatives separate and organized.',
    action: <Button variant="primary">Create Your First Project</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with longer description text.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    icon: <BiBox />,
    title: 'Custom Styled',
    description: 'This empty state has custom background and border styling.',
    className: 'bg-blue-50 border-2 border-blue-200 rounded-lg',
    action: <Button variant="primary">Get Started</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom className styling.',
      },
    },
  },
};

export const InContainer: Story = {
  render: () => (
    <div className="border border-gray-200 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
      <EmptyState
        icon={<BiBox />}
        title="No messages"
        description="You don't have any messages yet. Check back later."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state displayed inside a container with minimum height.',
      },
    },
  },
};

export const CompactLayout: Story = {
  render: () => (
    <div className="max-w-md">
      <EmptyState
        icon={<BiSearchAlt />}
        iconSize={32}
        title="No matches"
        description="Try different search terms."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact empty state layout for smaller spaces.',
      },
    },
  },
};
