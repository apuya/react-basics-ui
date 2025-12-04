import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../../forms/Button/Button';
import { Flex } from '../../layout/Flex';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';

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
      <Stack spacing="default">
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
      </Stack>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const variants = [
      { key: 'default', label: 'Default', buttonVariant: 'primary' as const },
      { key: 'destructive', label: 'Destructive', buttonVariant: 'destructive' as const },
      { key: 'warning', label: 'Warning', buttonVariant: 'primary' as const },
      { key: 'info', label: 'Info', buttonVariant: 'primary' as const },
    ];

    const dialogConfigs = {
      default: {
        title: 'Default Confirmation',
        description: 'This is a default confirmation dialog.',
      },
      destructive: {
        title: 'Delete Item',
        description: 'This action cannot be undone.',
        confirmText: 'Delete',
      },
      warning: {
        title: 'Warning',
        description: 'Please review before proceeding.',
        confirmText: 'Continue',
      },
      info: {
        title: 'Information',
        description: 'This is an informational message.',
        confirmText: 'OK',
      },
    };

    return (
      <Stack spacing="default">
        <Heading level="h6">Click to preview each variant</Heading>
        <Flex wrap="wrap" gap="sm">
          {variants.map(({ key, label, buttonVariant }) => (
            <Button
              key={key}
              variant={buttonVariant}
              onClick={() => setOpenDialog(key)}
            >
              {label}
            </Button>
          ))}
        </Flex>

        {variants.map(({ key }) => (
          <ConfirmDialog
            key={key}
            isOpen={openDialog === key}
            onClose={() => setOpenDialog(null)}
            variant={key as 'default' | 'destructive' | 'warning' | 'info'}
            onConfirm={() => setOpenDialog(null)}
            {...dialogConfigs[key as keyof typeof dialogConfigs]}
          />
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All variants for comparison: default, destructive, warning, and info.',
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
      <Stack spacing="default">
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
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state during async operations. Buttons are disabled while loading.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Stack spacing="default">
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
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog without the variant icon for a cleaner look.',
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Stack spacing="default">
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
          <Stack spacing="compact">
            <Text size="small" color="secondary">You are about to delete:</Text>
            <Stack as="ul" spacing="none" className="list-disc list-inside">
              <Text as="li" size="small" color="secondary">Document.pdf</Text>
              <Text as="li" size="small" color="secondary">Image.png</Text>
              <Text as="li" size="small" color="secondary">Spreadsheet.xlsx</Text>
            </Stack>
            <Text size="small" weight="semibold" color="error">This action cannot be undone.</Text>
          </Stack>
        </ConfirmDialog>
      </Stack>
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
