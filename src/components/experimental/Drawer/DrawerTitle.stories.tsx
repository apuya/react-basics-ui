import type { Meta, StoryObj } from '@storybook/react';
import { DrawerTitle } from './DrawerTitle';

const meta: Meta<typeof DrawerTitle> = {
  title: 'Experimental/Drawer/DrawerTitle',
  component: DrawerTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Title heading for the Drawer component. Should be used within Drawer.Header.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DrawerTitle>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
      <DrawerTitle>Drawer Title</DrawerTitle>
    </div>
  ),
};
