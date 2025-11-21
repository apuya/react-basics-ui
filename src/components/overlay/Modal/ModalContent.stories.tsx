import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

/**
 * ModalContent is a subcomponent designed for compound use within the Modal component.
 * It provides a styled container for the modal's main content area with proper spacing and overflow handling.
 * 
 * **Important**: While this component can be used standalone, it is designed for use within a `<Modal>` component.
 * It should be used as `<Modal.Content>` to maintain consistent styling and spacing.
 * 
 * @see Use the main Modal component stories for complete usage examples
 */
const meta = {
  title: 'Overlay/Modal/Subcomponents/ModalContent',
  component: Modal.Content,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The ModalContent component is a compound subcomponent designed for use within Modal.
It provides the main content area with proper padding, overflow handling, and scrolling.

### Compound Usage Pattern

\`\`\`tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Header>
    <Modal.Title>Title</Modal.Title>
  </Modal.Header>
  <Modal.Content>
    <p>Your content here...</p>
  </Modal.Content>
</Modal>
\`\`\`

### Features
- Automatic overflow scrolling for long content
- Consistent padding and spacing
- Theme-aware text styling
- Flexible content composition
- Optimized rendering with useMemo

### Usage Notes
- Contains the main body of the modal
- Automatically scrolls when content exceeds modal height
- Works with all Modal size variants
- Supports any HTML content or React components
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Main modal content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
} satisfies Meta<typeof Modal.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default content area with text.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content>
        <p>This is the default modal content area. It provides proper spacing and can contain any content.</p>
        <p className="mt-4">Multiple paragraphs are automatically spaced correctly.</p>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic content area with text paragraphs. Spacing is automatically handled.',
      },
    },
  },
};

/**
 * Content with form elements.
 */
export const WithForm: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" 
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" 
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" 
              rows={3}
              placeholder="Enter your message"
            />
          </div>
        </form>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content area containing form inputs. Perfect for data entry modals.',
      },
    },
  },
};

/**
 * Long scrollable content.
 */
export const ScrollableContent: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content>
        <div className="space-y-4">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>
          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
        </div>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Long content that exceeds modal height automatically becomes scrollable.',
      },
    },
  },
};

/**
 * Content with list items.
 */
export const WithList: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content>
        <ul className="space-y-2">
          {['Apples', 'Bananas', 'Oranges', 'Grapes', 'Strawberries'].map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content area with list items and checkboxes for task management.',
      },
    },
  },
};

/**
 * Content with cards/sections.
 */
export const WithSections: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Statistics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total users: 1,234</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last update: 2 hours ago</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Performance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">System health: Good</p>
          </div>
        </div>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content organized into distinct sections with borders for visual grouping.',
      },
    },
  },
};

/**
 * Content with image.
 */
export const WithImage: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content>
        <div className="space-y-4">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Image Title</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Description of the image goes here.</p>
          </div>
        </div>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content area with image and description for media viewing modals.',
      },
    },
  },
};

/**
 * Custom styled content.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="w-96">
      <Modal.Content className="bg-blue-50 dark:bg-blue-950/30">
        <div className="p-4 border-l-4 border-blue-500">
          <p className="text-blue-900 dark:text-blue-100">
            This content area has custom background and styling using the className prop.
          </p>
        </div>
      </Modal.Content>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with custom styling for unique visual requirements.',
      },
    },
  },
};
