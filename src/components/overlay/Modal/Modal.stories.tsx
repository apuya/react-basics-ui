import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../../forms/Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component that renders in a portal with focus trap, body scroll lock, and keyboard support. Built using the compound component pattern with `Modal.Header`, `Modal.Title`, `Modal.Content`, and `Modal.Footer` subcomponents. Supports multiple sizes (sm, md, lg, xl, full) and customizable overlay behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the modal',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing Escape closes the modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    preventBodyScroll: {
      control: 'boolean',
      description: 'Whether to prevent body scrolling when modal is open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Compound Component Overview
export const CompoundComponents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal is built using the compound component pattern. It consists of: `Modal` (root container with overlay), `Modal.Header` (header section), `Modal.Title` (heading element), `Modal.Content` (main content wrapper), and `Modal.Footer` (action buttons section). The close button is rendered automatically unless `showCloseButton={false}`.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <Modal.Title>Modal Components</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <p>This demonstrates all compound components:</p>
            <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
              <li>Modal.Header - Contains the title</li>
              <li>Modal.Title - Heading element</li>
              <li>Modal.Content - Main content area</li>
              <li>Modal.Footer - Action buttons</li>
            </ul>
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

// Basic Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic modal with header, content, and footer sections. Default size is medium.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Default Modal</Modal.Title>
            </Modal.Header>
            <p>This is the modal body content. You can add any content here.</p>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small modal size, ideal for simple confirmations, alerts, or compact forms.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Small Modal</Modal.Title>
            </Modal.Header>
            <p>Small modals work well for simple forms or notifications.</p>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>OK</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large modal provides more room for detailed content, complex forms, or data displays.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Large Modal</Modal.Title>
            </Modal.Header>
            <p>Large modals provide more room for detailed content, forms, or data displays.</p>
            <p style={{ marginTop: '1rem' }}>
              They're ideal when you need to present comprehensive information or collect extensive user input.
            </p>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const ExtraLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Extra large modal for comprehensive forms, rich editors, data tables, or detailed settings panels.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open XL Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Extra Large Modal</Modal.Title>
            </Modal.Header>
            <div>
              <p>Extra large modals are perfect for:</p>
              <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                <li>Complex multi-step forms</li>
                <li>Rich content editors</li>
                <li>Data tables</li>
                <li>Image galleries</li>
                <li>Detailed settings panels</li>
              </ul>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a modal containing a form with multiple input fields.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create Account</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Create New Account</Modal.Title>
            </Modal.Header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
                <input id="name" placeholder="John Doe" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--semantic-border-radius-md)', border: '1px solid var(--semantic-color-border-default)' }} />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
                <input id="email" type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--semantic-border-radius-md)', border: '1px solid var(--semantic-color-border-default)' }} />
              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Create Account</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for destructive actions. Uses small size and destructive button variant.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setIsOpen(false)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const WithoutFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal without a footer section. Users can close via the close button or Escape key.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Notice</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Important Notice</Modal.Title>
            </Modal.Header>
            <p>This modal doesn't have a footer. Users can close it by clicking the X button or pressing Escape.</p>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal with scrollable content area. The header and footer remain fixed while content scrolls.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Terms and Conditions</Modal.Title>
            </Modal.Header>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>1. Introduction</h3>
              <p style={{ marginBottom: '1rem' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>2. User Agreement</h3>
              <p style={{ marginBottom: '1rem' }}>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>3. Privacy Policy</h3>
              <p style={{ marginBottom: '1rem' }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>4. Data Collection</h3>
              <p style={{ marginBottom: '1rem' }}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>5. Cookie Policy</h3>
              <p style={{ marginBottom: '1rem' }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Decline
              </Button>
              <Button onClick={() => setIsOpen(false)}>Accept</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const MultiStepWizard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a multi-step wizard using modal state management. Shows how to handle navigation between steps.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const handleNext = () => {
      if (step < totalSteps) setStep(step + 1);
      else setIsOpen(false);
    };

    const handleBack = () => {
      if (step > 1) setStep(step - 1);
    };

    const handleClose = () => {
      setIsOpen(false);
      setStep(1);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Start Setup Wizard</Button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Setup Wizard - Step {step} of {totalSteps}</Modal.Title>
            </Modal.Header>
            {step === 1 && (
              <div>
                <p>Step 1: Basic Information</p>
                <p style={{ color: 'var(--semantic-color-text-secondary)', marginTop: '0.5rem' }}>
                  Configure your username and display name.
                </p>
              </div>
            )}
            {step === 2 && (
              <div>
                <p>Step 2: Preferences</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id="notifications" defaultChecked />
                    <label htmlFor="notifications">Enable notifications</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id="newsletter" />
                    <label htmlFor="newsletter">Subscribe to newsletter</label>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <p style={{ marginBottom: '1rem' }}>Step 3: Review your settings</p>
                <ul style={{ marginLeft: '1.5rem' }}>
                  <li>Username configured</li>
                  <li>Preferences set</li>
                  <li>Ready to get started</li>
                </ul>
              </div>
            )}
            <Modal.Footer>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button 
                  variant="secondary" 
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {step === totalSteps ? 'Finish' : 'Next'}
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

// Behavior Options
export const DisableOverlayClick: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal that cannot be closed by clicking the overlay. Users must use the close button or Escape key.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={false}
        >
          <Modal.Header>
            <Modal.Title>Overlay Click Disabled</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <p>Try clicking the dark overlay - it won't close the modal.</p>
            <p style={{ marginTop: '0.5rem' }}>You must click the X button or press Escape to close.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const DisableEscapeKey: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal that cannot be closed with the Escape key. Useful for critical confirmations.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          closeOnEscape={false}
        >
          <Modal.Header>
            <Modal.Title>Escape Key Disabled</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <p>Pressing Escape won't close this modal.</p>
            <p style={{ marginTop: '0.5rem' }}>You must explicitly click a button to proceed.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const HideCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal without the close button. Users must interact with footer buttons or click overlay.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          showCloseButton={false}
        >
          <Modal.Header>
            <Modal.Title>No Close Button</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <p>This modal doesn't have an X button in the corner.</p>
            <p style={{ marginTop: '0.5rem' }}>Click a footer button or the overlay to close.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>OK</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const FullSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full-screen modal that covers the entire viewport. Ideal for immersive experiences or complex workflows.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full-Screen Modal</Button>
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          size="full"
        >
          <Modal.Header>
            <Modal.Title>Full-Screen Modal</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <p>This modal takes up the entire viewport.</p>
            <p style={{ marginTop: '0.5rem' }}>
              Perfect for rich content editors, image galleries, or complex multi-step forms.
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
            <Button onClick={() => setIsOpen(false)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all modal sizes (sm, md, lg, xl). Click buttons to see each size.',
      },
    },
  },
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button size="small" onClick={() => setOpenSize('sm')}>SM</Button>
        <Button size="small" onClick={() => setOpenSize('md')}>MD</Button>
        <Button size="small" onClick={() => setOpenSize('lg')}>LG</Button>
        <Button size="small" onClick={() => setOpenSize('xl')}>XL</Button>

        <Modal isOpen={openSize === 'sm'} onClose={() => setOpenSize(null)} size="sm">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Small</Modal.Title>
            </Modal.Header>
            <p>This is a small modal.</p>
            <Modal.Footer>
              <Button size="small" onClick={() => setOpenSize(null)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={openSize === 'md'} onClose={() => setOpenSize(null)}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Medium</Modal.Title>
            </Modal.Header>
            <p>This is a medium modal (default size).</p>
            <Modal.Footer>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={openSize === 'lg'} onClose={() => setOpenSize(null)} size="lg">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Large</Modal.Title>
            </Modal.Header>
            <p>This is a large modal.</p>
            <Modal.Footer>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={openSize === 'xl'} onClose={() => setOpenSize(null)} size="xl">
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Extra Large</Modal.Title>
            </Modal.Header>
            <p>This is an XL modal.</p>
            <Modal.Footer>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    );
  },
};
