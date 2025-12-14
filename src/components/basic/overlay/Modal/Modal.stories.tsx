import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import type { ModalSize } from './Modal.types';
import { Button } from '../../forms/Button';
import { Input } from '../../forms/Input';
import { Label } from '../../forms/Label';
import { Checkbox } from '../../forms/Checkbox';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { List } from '../../data-display/List';

// =============================================================================
// Storybook Meta Configuration
// =============================================================================

const MODAL_SIZES: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal dialog component for focused content in an overlay. Features focus trap, body scroll lock, and keyboard support. Uses compound component pattern with `Modal.Header`, `Modal.Title`, `Modal.Content`, and `Modal.Footer`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: MODAL_SIZES,
      description: 'Modal size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close when clicking overlay',
      table: { defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
      table: { defaultValue: { summary: 'true' } },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// =============================================================================
// Helper Component
// =============================================================================

// Helper component to reduce story boilerplate
const ModalDemo = ({
  buttonLabel = 'Open Modal',
  buttonVariant = 'primary' as const,
  children,
  ...modalProps
}: {
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'secondary' | 'destructive';
  children: (onClose: () => void) => React.ReactNode;
} & Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose' | 'children'>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant={buttonVariant} onClick={() => setIsOpen(true)}>
        {buttonLabel}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...modalProps}>
        {children(() => setIsOpen(false))}
      </Modal>
    </>
  );
};

// =============================================================================
// Default Story
// =============================================================================

// Default Example
export const Default: Story = {
  render: () => (
    <ModalDemo buttonLabel="Open Modal">
      {(onClose) => (
        <>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Text>This is the modal content. Add any content here.</Text>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Confirm</Button>
          </Modal.Footer>
        </>
      )}
    </ModalDemo>
  ),
};

// =============================================================================
// Size Variants
// =============================================================================

// All Sizes
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal supports sm, md, lg, xl, and full sizes.',
      },
    },
  },
  render: () => {
    const [openSize, setOpenSize] = useState<ModalSize | null>(null);

    return (
      <Flex gap="sm" wrap="wrap">
        {MODAL_SIZES.map((size) => (
          <Button key={size} size="small" onClick={() => setOpenSize(size)}>
            {size.toUpperCase()}
          </Button>
        ))}
        {MODAL_SIZES.map((size) => (
          <Modal
            key={size}
            isOpen={openSize === size}
            onClose={() => setOpenSize(null)}
            size={size}
          >
            <Modal.Header>
              <Modal.Title>{size.toUpperCase()} Modal</Modal.Title>
            </Modal.Header>
            <Modal.Content>
              <Text>
                {size === 'full'
                  ? 'This modal covers the entire viewport.'
                  : `This is a ${size} size modal.`}
              </Text>
            </Modal.Content>
            <Modal.Footer>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </Modal.Footer>
          </Modal>
        ))}
      </Flex>
    );
  },
};

// =============================================================================
// Common Use Cases
// =============================================================================

// Common Use Cases
export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal with form inputs.',
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="Create Account">
      {(onClose) => (
        <>
          <Modal.Header>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Stack spacing="md">
              <Stack spacing="xs">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </Stack>
              <Stack spacing="xs">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </Stack>
            </Stack>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Create</Button>
          </Modal.Footer>
        </>
      )}
    </ModalDemo>
  ),
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for destructive actions.',
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="Delete Item" buttonVariant="destructive" size="sm">
      {(onClose) => (
        <>
          <Modal.Header>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onClose}>
              Delete
            </Button>
          </Modal.Footer>
        </>
      )}
    </ModalDemo>
  ),
};

export const ScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal with scrollable content. Header and footer remain fixed.',
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="View Terms">
      {(onClose) => (
        <>
          <Modal.Header>
            <Modal.Title>Terms and Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Stack spacing="md">
              {['Introduction', 'User Agreement', 'Privacy Policy', 'Data Collection', 'Cookie Policy'].map(
                (section, i) => (
                  <Stack key={section} spacing="xs">
                    <Heading level="h6">
                      {i + 1}. {section}
                    </Heading>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                  </Stack>
                )
              )}
            </Stack>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Decline
            </Button>
            <Button onClick={onClose}>Accept</Button>
          </Modal.Footer>
        </>
      )}
    </ModalDemo>
  ),
};

export const MultiStepWizard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multi-step wizard with navigation.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const handleClose = () => {
      setIsOpen(false);
      setStep(1);
    };

    const steps = [
      {
        title: 'Basic Information',
        content: <Text color="secondary">Configure your username and display name.</Text>,
      },
      {
        title: 'Preferences',
        content: (
          <Stack spacing="xs">
            <Checkbox id="notifications" defaultChecked label="Enable notifications" />
            <Checkbox id="newsletter" label="Subscribe to newsletter" />
          </Stack>
        ),
      },
      {
        title: 'Review',
        content: (
          <List>
            <List.Item>Username configured</List.Item>
            <List.Item>Preferences set</List.Item>
            <List.Item>Ready to get started</List.Item>
          </List>
        ),
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Start Wizard</Button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>
              Step {step} of {totalSteps}: {steps[step - 1].title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Content>{steps[step - 1].content}</Modal.Content>
          <Modal.Footer>
            <Flex justify="between" className="w-full">
              <Button variant="secondary" onClick={() => setStep(step - 1)} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={() => (step === totalSteps ? handleClose() : setStep(step + 1))}>
                {step === totalSteps ? 'Finish' : 'Next'}
              </Button>
            </Flex>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

// =============================================================================
// Behavior Options
// =============================================================================

// Behavior Options
export const BehaviorOptions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Modal with different behavior configurations: disable overlay click, disable escape key, or hide close button.',
      },
    },
  },
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const options = [
      {
        id: 'overlay',
        label: 'No Overlay Close',
        props: { closeOnOverlayClick: false },
        description: "Clicking the overlay won't close this modal.",
      },
      {
        id: 'escape',
        label: 'No Escape Close',
        props: { closeOnEscape: false },
        description: "Pressing Escape won't close this modal.",
      },
      {
        id: 'button',
        label: 'No Close Button',
        props: { showCloseButton: false },
        description: 'This modal has no X button.',
      },
    ];

    return (
      <Flex gap="sm" wrap="wrap">
        {options.map((opt) => (
          <Button key={opt.id} size="small" variant="secondary" onClick={() => setOpenModal(opt.id)}>
            {opt.label}
          </Button>
        ))}
        {options.map((opt) => (
          <Modal
            key={opt.id}
            isOpen={openModal === opt.id}
            onClose={() => setOpenModal(null)}
            size="sm"
            {...opt.props}
          >
            <Modal.Header>
              <Modal.Title>{opt.label}</Modal.Title>
            </Modal.Header>
            <Modal.Content>
              <Text>{opt.description}</Text>
            </Modal.Content>
            <Modal.Footer>
              <Button onClick={() => setOpenModal(null)}>Close</Button>
            </Modal.Footer>
          </Modal>
        ))}
      </Flex>
    );
  },
};

export const WithoutFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal without a footer section. Close via X button or Escape.',
      },
    },
  },
  render: () => (
    <ModalDemo buttonLabel="Open Notice" size="sm">
      {() => (
        <>
          <Modal.Header>
            <Modal.Title>Important Notice</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Text>Close via the X button or press Escape.</Text>
          </Modal.Content>
        </>
      )}
    </ModalDemo>
  ),
};
