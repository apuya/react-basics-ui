import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../../forms/Button/Button';

const meta = {
  title: 'Components/Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A specialized confirmation dialog built on top of Modal for user confirmations and critical actions.

## Features
- **Pre-configured Layout** - Ready-to-use confirmation dialog with title, description, and action buttons
- **Visual Variants** - Default, destructive, warning, and info variants with appropriate icons and button styles
- **Loading State** - Built-in support for async operations with loading indicator
- **Icon Support** - Optional contextual icons that match the variant
- **Accessible** - Built on Modal with full keyboard and screen reader support
- **Controlled** - Fully controlled component with isOpen/onClose pattern

## Usage
\`\`\`tsx
import { ConfirmDialog } from '@/components/basic/feedback/ConfirmDialog';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete Item</Button>
      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        variant="destructive"
        onConfirm={() => {
          // Handle deletion
          setIsOpen(false);
        }}
      />
    </>
  );
}
\`\`\`

## Variants
- \`default\` - Standard confirmation with blue checkmark icon
- \`destructive\` - Dangerous actions with red error icon and destructive button
- \`warning\` - Warning confirmations with yellow icon
- \`info\` - Informational confirmations with blue info icon

## When to Use
- Confirming destructive actions (delete, remove, clear)
- Getting user approval before critical operations
- Preventing accidental data loss
- Requiring explicit consent before proceeding
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description text',
    },
    confirmText: {
      control: 'text',
      description: 'Text for confirm button',
    },
    cancelText: {
      control: 'text',
      description: 'Text for cancel button',
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'info'],
      description: 'Visual variant affecting icon and button style',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state for confirm button',
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Callback when user confirms',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when dialog should close',
    },
  },
} as Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default confirmation dialog with blue checkmark icon.
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Confirm Dialog</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onConfirm={() => {
            alert('Action confirmed!');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Default confirmation dialog with standard styling and blue checkmark icon.',
      },
    },
  },
};

/**
 * Destructive action confirmation with red error icon.
 */
export const Destructive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          variant="destructive"
          confirmText="Delete"
          onConfirm={() => {
            alert('Item deleted!');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive variant with red icon and destructive button. Use for dangerous actions like deletions.',
      },
    },
  },
};

/**
 * Warning confirmation dialog.
 */
export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Proceed with Warning</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Warning"
          description="This action may have unintended consequences. Please review before proceeding."
          variant="warning"
          confirmText="Continue Anyway"
          onConfirm={() => {
            alert('Proceeding despite warning');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning variant with yellow icon. Use for actions that need user attention.',
      },
    },
  },
};

/**
 * Informational confirmation dialog.
 */
export const Info: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Info</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Information"
          description="This is an informational message that requires acknowledgment."
          variant="info"
          confirmText="Got it"
          cancelText="Dismiss"
          onConfirm={() => setIsOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Info variant with blue info icon. Use for informational confirmations.',
      },
    },
  },
};

/**
 * Dialog with loading state during async operation.
 */
export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsOpen(false);
      alert('Operation completed!');
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Save Changes</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Save Changes"
          description="Do you want to save these changes?"
          confirmText="Save"
          isLoading={isLoading}
          onConfirm={handleConfirm}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with loading state. Prevents closing and shows spinner during async operations.',
      },
    },
  },
};

/**
 * Dialog without icon.
 */
export const WithoutIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Simple Confirm</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          description="This is a simple confirmation without an icon."
          showIcon={false}
          onConfirm={() => {
            alert('Confirmed!');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog without icon for minimal presentation.',
      },
    },
  },
};

/**
 * Dialog with custom content instead of description.
 */
export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Multiple Items
        </Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Items"
          variant="destructive"
          confirmText="Delete All"
          onConfirm={() => {
            alert('All items deleted!');
            setIsOpen(false);
          }}
        >
          <div className="space-y-3">
            <p className="text-sm text-[var(--semantic-color-text-secondary)]">
              You are about to delete the following items:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[var(--semantic-color-text-secondary)]">
              <li>Document.pdf</li>
              <li>Image.png</li>
              <li>Spreadsheet.xlsx</li>
            </ul>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              This action cannot be undone.
            </p>
          </div>
        </ConfirmDialog>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with custom content instead of simple description text.',
      },
    },
  },
};

/**
 * Dialog with custom button text.
 */
export const CustomButtonText: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Leave Page</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Unsaved Changes"
          description="You have unsaved changes. Are you sure you want to leave this page?"
          variant="warning"
          confirmText="Leave Page"
          cancelText="Stay on Page"
          onConfirm={() => {
            alert('Leaving page...');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with custom button text to match specific use cases.',
      },
    },
  },
};

/**
 * Multiple confirmation dialogs showing different variants.
 */
export const AllVariants: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    return (
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setOpenDialog('default')}>Default</Button>
        <Button variant="destructive" onClick={() => setOpenDialog('destructive')}>
          Destructive
        </Button>
        <Button onClick={() => setOpenDialog('warning')}>Warning</Button>
        <Button onClick={() => setOpenDialog('info')}>Info</Button>

        <ConfirmDialog
          isOpen={openDialog === 'default'}
          onClose={() => setOpenDialog(null)}
          title="Default Confirmation"
          description="This is a default confirmation dialog."
          variant="default"
          onConfirm={() => setOpenDialog(null)}
        />

        <ConfirmDialog
          isOpen={openDialog === 'destructive'}
          onClose={() => setOpenDialog(null)}
          title="Delete Item"
          description="This action cannot be undone."
          variant="destructive"
          confirmText="Delete"
          onConfirm={() => setOpenDialog(null)}
        />

        <ConfirmDialog
          isOpen={openDialog === 'warning'}
          onClose={() => setOpenDialog(null)}
          title="Warning"
          description="Please review before proceeding."
          variant="warning"
          confirmText="Continue"
          onConfirm={() => setOpenDialog(null)}
        />

        <ConfirmDialog
          isOpen={openDialog === 'info'}
          onClose={() => setOpenDialog(null)}
          title="Information"
          description="This is an informational message."
          variant="info"
          confirmText="OK"
          onConfirm={() => setOpenDialog(null)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All variant styles side by side for comparison.',
      },
    },
  },
};

/**
 * Dialog that only closes on confirm.
 */
export const OnlyClosesOnConfirm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Accept Terms</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => {}} // Empty function prevents closing
          title="Accept Terms of Service"
          description="You must accept the terms of service to continue."
          variant="info"
          confirmText="I Accept"
          cancelText="Read Terms"
          onConfirm={() => {
            alert('Terms accepted!');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog that can only be closed by confirming, not by clicking outside or pressing Escape.',
      },
    },
  },
};
