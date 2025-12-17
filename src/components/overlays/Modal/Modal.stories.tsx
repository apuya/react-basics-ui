import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import type { ModalSize } from './Modal.types';
import { Button } from '@/components/actions/Button';
import { Input } from '@/components/forms/Input';
import { Label } from '@/components/typography/Label';
import { Checkbox } from '@/components/forms/Checkbox';
import { Text } from '@/components/typography/Text';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { TextList } from '@/components/typography/TextList';

/**
 * `Modal` displays focused content in an overlay dialog above the main page content.
 * 
 * ## Architecture
 * Modal is a **thin wrapper** around `BaseCardContainer`. It inherits all structural
 * styling (padding, gap, border, border-radius) from the base component and only adds
 * Modal-specific visual styling (background, shadow, overlay, transitions).
 * 
 * Built on `BaseOverlayDialog` for consistent overlay behavior, focus management,
 * body scroll lock, and keyboard interactions.
 * 
 * ## Features
 * - **Compound pattern**: `Modal.Header`, `Modal.Content`, `Modal.Footer`, `Modal.Title`
 * - **Accessibility**: Focus trap, ARIA attributes, keyboard navigation
 * - **Behavior**: Overlay click, escape key, close button
 * - **Scrolling**: Sticky header/footer, scrollable content
 * - **Sizes**: sm (24rem), md (32rem), lg (48rem), xl (64rem), full (viewport)
 * 
 * ## Sub-components
 * | Component | Purpose |
 * |-----------|---------|
 * | `Modal.Header` | Top section with title |
 * | `Modal.Content` | Main content area (scrollable) |
 * | `Modal.Footer` | Bottom section with actions |
 * | `Modal.Title` | Semantic heading (uses Heading component) |
 * 
 * ## Usage
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} size="md">
 *   <Modal.Header>
 *     <Modal.Title>Confirm Action</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Content>
 *     <Text>Are you sure?</Text>
 *   </Modal.Content>
 *   <Modal.Footer>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// =============================================================================
// STORIES
// =============================================================================

/**
 * Basic modal with header, content, and footer. The standard structure for
 * most modal use cases.
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Text>This is the modal content. Add any content here.</Text>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * Available size presets from compact to full viewport coverage.
 */
export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<ModalSize | null>(null);
    const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

    return (
      <>
        <Flex gap="sm" wrap="wrap">
          {sizes.map((size) => (
            <Button key={size} size="small" onClick={() => setOpenSize(size)}>
              {size.toUpperCase()}
            </Button>
          ))}
        </Flex>
        {sizes.map((size) => (
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
                  ? 'Full size modal covers the entire viewport.'
                  : `This is a ${size} size modal (${size === 'sm' ? '24rem' : size === 'md' ? '32rem' : size === 'lg' ? '48rem' : '64rem'}).`}
              </Text>
            </Modal.Content>
            <Modal.Footer>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </Modal.Footer>
          </Modal>
        ))}
      </>
    );
  },
};

/**
 * Confirmation dialog for critical actions. Typically uses `size="sm"` and
 * destructive button variant.
 */
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Header>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with form inputs for data collection. Use `Stack` for proper spacing
 * between form fields.
 */
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create Account</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
              <Stack spacing="xs">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </Stack>
            </Stack>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Create Account</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * Modal with scrollable content. Header and footer remain fixed while content
 * scrolls independently.
 */
export const ScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Terms</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <Modal.Title>Terms and Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Stack spacing="lg">
              {Array.from({ length: 8 }, (_, i) => (
                <Stack key={i} spacing="xs">
                  <Text weight="semibold">{i + 1}. Section {i + 1}</Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * Multi-step wizard with dynamic content and navigation. Manage step state
 * in parent component.
 */
export const MultiStepWizard: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const handleClose = () => {
      setIsOpen(false);
      setTimeout(() => setStep(1), 200); // Reset after close animation
    };

    const steps = [
      {
        title: 'Account Setup',
        content: (
          <Stack spacing="md">
            <Stack spacing="xs">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="johndoe" />
            </Stack>
            <Stack spacing="xs">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" placeholder="John Doe" />
            </Stack>
          </Stack>
        ),
      },
      {
        title: 'Preferences',
        content: (
          <Stack spacing="sm">
            <Checkbox id="notifications" defaultChecked label="Enable email notifications" />
            <Checkbox id="newsletter" label="Subscribe to newsletter" />
            <Checkbox id="marketing" label="Receive product updates" />
          </Stack>
        ),
      },
      {
        title: 'Review',
        content: (
          <Stack spacing="sm">
            <Text weight="semibold">You're all set!</Text>
            <TextList>
              <TextList.Item>Account created successfully</TextList.Item>
              <TextList.Item>Preferences configured</TextList.Item>
              <TextList.Item>Ready to get started</TextList.Item>
            </TextList>
          </Stack>
        ),
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Start Setup</Button>
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

/**
 * Modal without footer section. Close via X button or Escape key only.
 */
export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Notice</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Header>
            <Modal.Title>System Notification</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Text>
              Your system has been successfully updated. No action required. Close this dialog
              using the X button or press Escape.
            </Text>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

/**
 * Configure modal behavior: prevent overlay/escape close, or hide close button.
 * Useful for required user actions.
 */
export const BehaviorOptions: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    const options = [
      {
        id: 'no-overlay',
        label: 'Prevent Overlay Close',
        props: { closeOnOverlayClick: false },
        description: "Clicking outside won't close this modal. Use the button or Escape key.",
      },
      {
        id: 'no-escape',
        label: 'Prevent Escape Close',
        props: { closeOnEscape: false },
        description: "Pressing Escape won't close this modal. Use the button or click outside.",
      },
      {
        id: 'no-button',
        label: 'Hide Close Button',
        props: { showCloseButton: false },
        description: 'No X button. Close via overlay click, Escape key, or action button.',
      },
      {
        id: 'forced',
        label: 'Forced Action',
        props: { closeOnOverlayClick: false, closeOnEscape: false },
        description: 'User must use the action button to close this modal.',
      },
    ];

    return (
      <>
        <Flex gap="sm" wrap="wrap">
          {options.map((opt) => (
            <Button key={opt.id} size="small" variant="secondary" onClick={() => setOpenModal(opt.id)}>
              {opt.label}
            </Button>
          ))}
        </Flex>
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
              <Button onClick={() => setOpenModal(null)}>I Understand</Button>
            </Modal.Footer>
          </Modal>
        ))}
      </>
    );
  },
};
