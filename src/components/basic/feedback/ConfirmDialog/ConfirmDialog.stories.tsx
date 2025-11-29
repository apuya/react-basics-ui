import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../../forms/Button/Button';

const meta = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Confirmation dialog for user confirmations and critical actions. Supports multiple variants with appropriate icons and button styles.',
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
      description: 'Dialog description',
    },
    confirmText: {
      control: 'text',
      description: 'Confirm button text',
      table: { defaultValue: { summary: 'Confirm' } },
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button text',
      table: { defaultValue: { summary: 'Cancel' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'info'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'default' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show variant icon',
      table: { defaultValue: { summary: 'true' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state for confirm button',
    },
  },
} as Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

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
            alert('Confirmed!');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

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
            alert('Deleted!');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive variant for dangerous actions like deletions.',
      },
    },
  },
};

export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Leave Page</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Unsaved Changes"
          description="You have unsaved changes. Are you sure you want to leave?"
          variant="warning"
          confirmText="Leave Page"
          cancelText="Stay"
          onConfirm={() => {
            alert('Leaving...');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning variant for actions that need user attention.',
      },
    },
  },
};

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
          onConfirm={() => setIsOpen(false)}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Info variant for informational confirmations.',
      },
    },
  },
};

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
        story: 'All variants for comparison.',
      },
    },
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
        story: 'Loading state during async operations.',
      },
    },
  },
};

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
};

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
            alert('Deleted!');
            setIsOpen(false);
          }}
        >
          <div className="space-y-3">
            <p className="text-sm text-gray-600">You are about to delete:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Document.pdf</li>
              <li>Image.png</li>
              <li>Spreadsheet.xlsx</li>
            </ul>
            <p className="text-sm font-semibold text-red-600">This action cannot be undone.</p>
          </div>
        </ConfirmDialog>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with custom content instead of simple description.',
      },
    },
  },
};
