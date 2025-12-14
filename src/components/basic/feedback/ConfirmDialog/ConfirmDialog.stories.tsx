import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../../forms/Button/Button';
import { Flex } from '../../layout/Flex';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Icon } from '../../utility/Icon';

const meta = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compound component for confirmation dialogs. Compose Header, Icon, Title, Content, Footer, CancelButton, and ConfirmButton for flexible layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'info'],
      description: 'Visual variant (affects icon and confirm button style)',
      table: { defaultValue: { summary: 'default' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state for buttons',
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
          onConfirm={() => {
            alert('Confirmed!');
            setIsOpen(false);
          }}
        >
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            Are you sure you want to proceed with this action?
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    const variants: Array<{
      key: 'default' | 'destructive' | 'warning' | 'info';
      label: string;
      buttonVariant: 'primary' | 'destructive';
      title: string;
      description: string;
      confirmText: string;
    }> = [
      {
        key: 'default',
        label: 'Default',
        buttonVariant: 'primary',
        title: 'Default Confirmation',
        description: 'This is a default confirmation dialog.',
        confirmText: 'Confirm',
      },
      {
        key: 'destructive',
        label: 'Destructive',
        buttonVariant: 'destructive',
        title: 'Delete Item',
        description: 'This action cannot be undone.',
        confirmText: 'Delete',
      },
      {
        key: 'warning',
        label: 'Warning',
        buttonVariant: 'primary',
        title: 'Warning',
        description: 'Please review before proceeding.',
        confirmText: 'Continue',
      },
      {
        key: 'info',
        label: 'Info',
        buttonVariant: 'primary',
        title: 'Information',
        description: 'This is an informational message.',
        confirmText: 'OK',
      },
    ];

    return (
      <Stack spacing="default">
        <Heading level="h6">Click to preview each variant</Heading>
        <Flex wrap="wrap" gap="sm">
          {variants.map(({ key, label, buttonVariant }) => (
            <Button key={key} variant={buttonVariant} onClick={() => setOpenDialog(key)}>
              {label}
            </Button>
          ))}
        </Flex>

        {variants.map(({ key, title, description, confirmText }) => (
          <ConfirmDialog
            key={key}
            isOpen={openDialog === key}
            onClose={() => setOpenDialog(null)}
            variant={key}
            onConfirm={() => setOpenDialog(null)}
          >
            <ConfirmDialog.Header>
              <ConfirmDialog.Icon />
              <ConfirmDialog.Title>{title}</ConfirmDialog.Title>
            </ConfirmDialog.Header>
            <ConfirmDialog.Content>{description}</ConfirmDialog.Content>
            <ConfirmDialog.Footer>
              <ConfirmDialog.CancelButton />
              <ConfirmDialog.ConfirmButton>{confirmText}</ConfirmDialog.ConfirmButton>
            </ConfirmDialog.Footer>
          </ConfirmDialog>
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
          isLoading={isLoading}
          onConfirm={handleConfirm}
        >
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Save Changes</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Do you want to save these changes?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton>Save</ConfirmDialog.ConfirmButton>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
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
          onConfirm={() => {
            alert('Confirmed!');
            setIsOpen(false);
          }}
        >
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Confirm Action</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            This is a simple confirmation without an icon.
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton />
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog without the variant icon for a cleaner look. Simply omit the Icon component.',
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
          variant="destructive"
          onConfirm={() => {
            alert('Deleted!');
            setIsOpen(false);
          }}
        >
          <ConfirmDialog.Header>
            <ConfirmDialog.Icon />
            <ConfirmDialog.Title>Delete Items</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            <Stack spacing="compact">
              <Text size="small" color="secondary">
                You are about to delete:
              </Text>
              <Stack as="ul" spacing="none" className="list-disc list-inside">
                <Text as="li" size="small" color="secondary">
                  Document.pdf
                </Text>
                <Text as="li" size="small" color="secondary">
                  Image.png
                </Text>
                <Text as="li" size="small" color="secondary">
                  Spreadsheet.xlsx
                </Text>
              </Stack>
              <Text size="small" weight="semibold" color="error">
                This action cannot be undone.
              </Text>
            </Stack>
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.CancelButton />
            <ConfirmDialog.ConfirmButton>Delete All</ConfirmDialog.ConfirmButton>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with custom content. Use any React nodes inside Content component.',
      },
    },
  },
};

export const CustomLayout: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Stack spacing="default">
        <Button onClick={() => setIsOpen(true)}>Custom Layout</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          variant="warning"
          onConfirm={() => {
            alert('Confirmed!');
            setIsOpen(false);
          }}
        >
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>Custom Header Layout</ConfirmDialog.Title>
            <Icon name="AlertTriangle" size="lg" />
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            Swap the icon position or use custom icons in the header.
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <ConfirmDialog.ConfirmButton>I Understand</ConfirmDialog.ConfirmButton>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compound pattern allows custom layouts. Rearrange sub-components or add custom elements.',
      },
    },
  },
};
