import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../../basic/forms/Button/Button';
import { Text } from '../../basic/typography/Text/Text';
import { Stack } from '../../basic/layout/Stack/Stack';

const meta: Meta<typeof Drawer> = {
  title: 'Experimental/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A drawer container that slides in from screen edges. Use Drawer.Header, Drawer.Body, Drawer.Footer, and Drawer.Title for proper layout with token-based spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    placement: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    preventBodyScroll: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Default
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Text>Drawer body content goes here.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// Placement variants
export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null);

    return (
      <Stack direction="horizontal" spacing="md">
        <Button onClick={() => setPlacement('left')}>Left</Button>
        <Button onClick={() => setPlacement('right')}>Right</Button>
        <Button onClick={() => setPlacement('top')}>Top</Button>
        <Button onClick={() => setPlacement('bottom')}>Bottom</Button>

        {placement && (
          <Drawer isOpen={true} onClose={() => setPlacement(null)} placement={placement}>
            <Drawer.Header>
              <Drawer.Title>{placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Text>This drawer slides in from the {placement}.</Text>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setPlacement(null)}>Close</Button>
            </Drawer.Footer>
          </Drawer>
        )}
      </Stack>
    );
  },
};

// Size variants
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'full' | null>(null);

    return (
      <Stack direction="horizontal" spacing="md">
        <Button onClick={() => setSize('sm')}>Small</Button>
        <Button onClick={() => setSize('md')}>Medium</Button>
        <Button onClick={() => setSize('lg')}>Large</Button>
        <Button onClick={() => setSize('full')}>Full</Button>

        {size && (
          <Drawer isOpen={true} onClose={() => setSize(null)} size={size}>
            <Drawer.Header>
              <Drawer.Title>{size.toUpperCase()} Size</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Text>This is the {size} size drawer.</Text>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setSize(null)}>Close</Button>
            </Drawer.Footer>
          </Drawer>
        )}
      </Stack>
    );
  },
};
