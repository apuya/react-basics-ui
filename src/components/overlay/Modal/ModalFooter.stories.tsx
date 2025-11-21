import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

/**
 * ModalFooter is a subcomponent designed for compound use within the Modal component.
 * It provides a styled container for action buttons and other footer content.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Modal>` component.
 * It should be used as `<Modal.Footer>` to maintain consistent styling and spacing.
 * 
 * @see Use the main Modal component stories for complete usage examples
 */
const meta = {
  title: 'Overlay/Modal/Subcomponents/ModalFooter',
  component: Modal.Footer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ModalFooter component is a compound subcomponent designed for use within Modal.
It provides a consistent footer area typically containing action buttons.

### Compound Usage Pattern

\`\`\`tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Header>
    <Modal.Title>Title</Modal.Title>
  </Modal.Header>
  <Modal.Content>
    Content here
  </Modal.Content>
  <Modal.Footer>
    <button onClick={onClose}>Cancel</button>
    <button onClick={handleSubmit}>Submit</button>
  </Modal.Footer>
</Modal>
\`\`\`

### Features
- Consistent padding and spacing
- Right-aligned button layout by default
- Theme-aware border styling
- Responsive design
- Flexible content composition

### Usage Notes
- Typically contains action buttons (Cancel, Submit, etc.)
- Buttons are usually right-aligned
- Can include additional footer content
- Automatically styled to match Modal theme
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Footer content, typically action buttons',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Modal.Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer with action buttons.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Confirm
        </button>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default footer with Cancel and Confirm buttons, right-aligned.',
      },
    },
  },
};

/**
 * Footer with single action button.
 */
export const SingleButton: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Got it
        </button>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with single acknowledgment button for simple informational modals.',
      },
    },
  },
};

/**
 * Footer with three buttons.
 */
export const ThreeButtons: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
          Cancel
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Don't Save
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save
        </button>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with three options for more complex decision flows.',
      },
    },
  },
};

/**
 * Footer with destructive action.
 */
export const DestructiveAction: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
          Cancel
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Delete
        </button>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with destructive action button (red) for dangerous operations.',
      },
    },
  },
};

/**
 * Footer with left and right aligned content.
 */
export const SplitAlignment: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer className="justify-between">
        <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg">
          Reset to Defaults
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Save
          </button>
        </div>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with split alignment: secondary action on left, primary actions on right.',
      },
    },
  },
};

/**
 * Footer with loading state.
 */
export const WithLoadingState: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer>
        <button 
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg opacity-50"
          disabled
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
          disabled
        >
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Submitting...
        </button>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer showing loading state during async operations.',
      },
    },
  },
};

/**
 * Footer with help text.
 */
export const WithHelpText: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Footer className="flex-col items-start gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          By clicking Accept, you agree to our Terms of Service and Privacy Policy.
        </p>
        <div className="flex gap-2 self-end">
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Decline
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Accept
          </button>
        </div>
      </Modal.Footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with additional help text or legal information above buttons.',
      },
    },
  },
};
