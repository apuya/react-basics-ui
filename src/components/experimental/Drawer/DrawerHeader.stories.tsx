import type { Meta, StoryObj } from '@storybook/react';
import { DrawerHeader } from './DrawerHeader';

const meta: Meta<typeof DrawerHeader> = {
  title: 'Experimental/Drawer/DrawerHeader',
  component: DrawerHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Header section for the Drawer component. Should be used within a Drawer.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DrawerHeader>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <DrawerHeader>
        <h2>Drawer Header</h2>
      </DrawerHeader>
    </div>
  ),
};
