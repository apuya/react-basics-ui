import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

/**
 * ModalTitle is a subcomponent designed for compound use within the Modal component.
 * It provides semantic heading element with proper styling for modal titles.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within `<Modal.Header>`.
 * It should be used as `<Modal.Title>` to maintain semantic HTML structure.
 * 
 * @see Use the main Modal component stories for complete usage examples
 */
const meta = {
  title: 'Overlay/Modal/Subcomponents/ModalTitle',
  component: Modal.Title,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ModalTitle component is a compound subcomponent that renders a semantic heading (h2) for modal titles.
It provides consistent typography and styling.

### Compound Usage Pattern

\`\`\`tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Header>
    <Modal.Title>My Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Content>
    Content here
  </Modal.Content>
</Modal>
\`\`\`

### Features
- Semantic HTML heading (h2)
- Consistent typography across themes
- Accessible ARIA labeling
- Theme-aware text styling
- Optimized rendering

### Usage Notes
- Typically used within Modal.Header
- Provides the accessible name for the modal
- Should clearly describe the modal's purpose
- Supports all standard heading attributes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The title text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Modal.Title>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default modal title.
 */
export const Default: Story = {
  args: {
    children: 'Modal Title',
  },
  render: (args) => (
    <div className="w-96">
      <Modal.Title {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default modal title with standard typography and spacing.',
      },
    },
  },
};

/**
 * Short, concise title.
 */
export const ShortTitle: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Title>Alert</Modal.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Short, concise title for simple dialogs and alerts.',
      },
    },
  },
};

/**
 * Descriptive title.
 */
export const DescriptiveTitle: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Title>Edit Profile Information</Modal.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Descriptive title that clearly explains the modal purpose.',
      },
    },
  },
};

/**
 * Title with custom styling.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Title className="text-blue-600 dark:text-blue-400">
        Custom Styled Title
      </Modal.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with custom color styling for brand consistency.',
      },
    },
  },
};

/**
 * Title with icon.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="w-96">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Modal.Title>Success!</Modal.Title>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with icon for visual status indication (success, warning, error).',
      },
    },
  },
};

/**
 * Title in confirmation dialog.
 */
export const ConfirmationDialog: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Title>Confirm Deletion</Modal.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title in a destructive confirmation dialog.',
      },
    },
  },
};

/**
 * Title in form modal.
 */
export const FormModal: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Title>Create New User</Modal.Title>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title in a form submission modal.',
      },
    },
  },
};

/**
 * Title with subtitle pattern.
 */
export const WithSubtitle: Story = {
  render: () => (
    <div className="w-96">
      <div>
        <Modal.Title>Advanced Settings</Modal.Title>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure advanced options and preferences
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with subtitle text for additional context.',
      },
    },
  },
};
