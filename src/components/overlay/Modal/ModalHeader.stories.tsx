import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

/**
 * ModalHeader is a subcomponent designed for compound use within the Modal component.
 * It provides a styled container for the modal's header section, typically containing the title and close button.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Modal>` component.
 * It should be used as `<Modal.Header>` to maintain consistent styling and spacing.
 * 
 * @see Use the main Modal component stories for complete usage examples
 */
const meta = {
  title: 'Overlay/Modal/Subcomponents/ModalHeader',
  component: Modal.Header,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ModalHeader component is a compound subcomponent designed for use within Modal.
It provides consistent padding and styling for modal headers.

### Compound Usage Pattern

\`\`\`tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Header>
    <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Content>
    Content here
  </Modal.Content>
</Modal>
\`\`\`

### Features
- Consistent padding and spacing
- Theme-aware border styling
- Optimized rendering with useMemo
- Responsive design
- Flexible content composition

### Usage Notes
- Typically contains Modal.Title
- Can include additional header elements (badges, icons, etc.)
- Automatically styled to match Modal theme
- Works with all Modal size variants
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Header content, typically Modal.Title',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Modal.Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header with title.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header>
        <Modal.Title>Default Header</Modal.Title>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic header with Modal.Title. The header provides visual separation from the content.',
      },
    },
  },
};

/**
 * Header with title and subtitle.
 */
export const WithSubtitle: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header>
        <Modal.Title>Account Settings</Modal.Title>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and security settings
        </p>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with both title and descriptive subtitle for additional context.',
      },
    },
  },
};

/**
 * Header with icon and title.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Modal.Title>Information</Modal.Title>
        </div>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with icon element alongside the title for enhanced visual communication.',
      },
    },
  },
};

/**
 * Header with badge.
 */
export const WithBadge: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header>
        <div className="flex items-center justify-between">
          <Modal.Title>New Feature</Modal.Title>
          <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900 rounded-full">
            Beta
          </span>
        </div>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with status badge to indicate feature state or importance.',
      },
    },
  },
};

/**
 * Header without close button.
 */
export const WithoutCloseButton: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header>
        <Modal.Title>No Close Button</Modal.Title>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header when close button is disabled. Users must use footer buttons to close.',
      },
    },
  },
};

/**
 * Custom styled header.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <Modal.Title className="text-white">Custom Header Style</Modal.Title>
        <p className="mt-1 text-sm text-white/90">
          Headers can be customized with gradient backgrounds
        </p>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with custom styling using className prop for unique visual designs.',
      },
    },
  },
};

/**
 * Minimal header with title only.
 */
export const Minimal: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Header>
        <Modal.Title>Quick Action</Modal.Title>
      </Modal.Header>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal header with just a title, perfect for simple confirmation dialogs.',
      },
    },
  },
};
