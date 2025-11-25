import type { Meta, StoryObj } from '@storybook/react';
import { DrawerFooter } from './DrawerFooter';
import { Button } from '../../basic/forms/Button/Button';

const meta: Meta<typeof DrawerFooter> = {
  title: 'Experimental/Drawer/DrawerFooter',
  component: DrawerFooter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Footer section for the Drawer component. Should be used within a Drawer.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DrawerFooter>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <DrawerFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </DrawerFooter>
    </div>
  ),
};
