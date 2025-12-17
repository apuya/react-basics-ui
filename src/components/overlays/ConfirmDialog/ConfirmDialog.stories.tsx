import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { ConfirmDialog, useConfirmDialogContext, VARIANT_ICON_CLASSES } from './ConfirmDialog';
import { Modal } from '../Modal';
import { Button } from '../../actions/Button/Button';
import { Flex } from '../../layout/Flex';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Icon } from '../../utility/Icon';
import { cn } from '@/lib/cn';

/**
 * # ConfirmDialog
 *
 * A thin wrapper around Modal providing variant context for confirmation dialogs.
 *
 * ## Architecture
 * - Composes from Modal (which composes from BaseCardContainer)
 * - Provides variant context via `useConfirmDialogContext()`
 * - Users compose with Icon, Modal.Title, and Button directly
 *
 * ## Sub-components
 * - `ConfirmDialog.Header` - Row layout container
 * - `ConfirmDialog.Content` - Main content area
 * - `ConfirmDialog.Footer` - Action buttons container
 *
 * ## Context (`useConfirmDialogContext`)
 * - `variant` - Current variant ('default' | 'destructive' | 'warning' | 'info')
 * - `variantIcon` - Icon component for the variant
 * - `buttonVariant` - Suggested button variant ('primary' | 'destructive')
 * - `isLoading` - Loading state
 * - `onClose` - Close handler
 * - `onConfirm` - Confirm handler
 *
 * ## Styling
 * - `VARIANT_ICON_CLASSES` - Apply variant colors to icons
 */
const meta = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Thin wrapper around Modal with variant context. Use Icon and Modal.Title directly.',
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
      description: 'Visual variant (affects icon color via context)',
      table: { defaultValue: { summary: 'default' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state passed to context',
    },
  },
} as Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Helper: Variant Icon with context
// =============================================================================

/** Helper component that uses context to render variant-colored icon */
const VariantIcon = () => {
  const { variant, variantIcon } = useConfirmDialogContext();
  return (
    <Icon
      icon={variantIcon}
      size="lg"
      aria-hidden
      className={cn('shrink-0', VARIANT_ICON_CLASSES[variant])}
    />
  );
};

// =============================================================================
// Basic Usage
// =============================================================================

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
            <VariantIcon />
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            Are you sure you want to proceed with this action?
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Confirmed!');
                setIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic dialog using Icon and Modal.Title directly. VariantIcon helper uses context for icon/color.',
      },
    },
  },
};

// =============================================================================
// Variants
// =============================================================================

/** Helper to render variant dialog content */
const VariantDialogContent = ({
  title,
  description,
  confirmText,
  onClose,
}: {
  title: string;
  description: string;
  confirmText: string;
  onClose: () => void;
}) => {
  const { buttonVariant } = useConfirmDialogContext();

  return (
    <>
      <ConfirmDialog.Header>
        <VariantIcon />
        <Modal.Title as="h2" level="h4">
          {title}
        </Modal.Title>
      </ConfirmDialog.Header>
      <ConfirmDialog.Content>{description}</ConfirmDialog.Content>
      <ConfirmDialog.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={buttonVariant} onClick={onClose}>
          {confirmText}
        </Button>
      </ConfirmDialog.Footer>
    </>
  );
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
            <VariantDialogContent
              title={title}
              description={description}
              confirmText={confirmText}
              onClose={() => setOpenDialog(null)}
            />
          </ConfirmDialog>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'All variants using context for icon color and button variant. Helper components demonstrate context usage.',
      },
    },
  },
};

// =============================================================================
// Loading State
// =============================================================================

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
            <VariantIcon />
            <Modal.Title as="h2" level="h4">
              Save Changes
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>Do you want to save these changes?</ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm} loading={isLoading}>
              Save
            </Button>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state during async operations. Manage loading state manually.',
      },
    },
  },
};

// =============================================================================
// Without Icon
// =============================================================================

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
            <Modal.Title as="h2" level="h4">
              Confirm Action
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            This is a simple confirmation without an icon.
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Confirmed!');
                setIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog without icon. Simply omit the Icon from the header.',
      },
    },
  },
};

// =============================================================================
// Custom Content
// =============================================================================

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
            <VariantIcon />
            <Modal.Title as="h2" level="h4">
              Delete Items
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            <Stack spacing="compact">
              <Text size="small" color="secondary">
                You are about to delete:
              </Text>
              <ul className="list-disc list-inside">
                <li>
                  <Text as="span" size="small" color="secondary">
                    Document.pdf
                  </Text>
                </li>
                <li>
                  <Text as="span" size="small" color="secondary">
                    Image.png
                  </Text>
                </li>
                <li>
                  <Text as="span" size="small" color="secondary">
                    Spreadsheet.xlsx
                  </Text>
                </li>
              </ul>
              <Text size="small" weight="semibold" color="error">
                This action cannot be undone.
              </Text>
            </Stack>
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert('Deleted!');
                setIsOpen(false);
              }}
            >
              Delete All
            </Button>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with rich content. Use any React nodes inside Content.',
      },
    },
  },
};

// =============================================================================
// Custom Icon
// =============================================================================

export const CustomIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Stack spacing="default">
        <Button onClick={() => setIsOpen(true)}>Custom Icon</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          variant="info"
          onConfirm={() => {
            alert('Confirmed!');
            setIsOpen(false);
          }}
        >
          <ConfirmDialog.Header>
            <Icon icon={BiInfoCircle} size="lg" className="shrink-0 text-blue-500" />
            <Modal.Title as="h2" level="h4">
              Custom Styled Icon
            </Modal.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Content>
            Use any icon with custom colors instead of variant defaults.
          </ConfirmDialog.Content>
          <ConfirmDialog.Footer>
            <Button
              variant="primary"
              onClick={() => {
                alert('Confirmed!');
                setIsOpen(false);
              }}
            >
              Got it
            </Button>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use any Icon with custom styling. Full flexibility over icon choice and colors.',
      },
    },
  },
};
