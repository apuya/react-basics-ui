import type { Meta, StoryObj } from '@storybook/react';
import { DrawerContent } from './DrawerContent';

const meta: Meta<typeof DrawerContent> = {
  title: 'Experimental/Drawer/DrawerContent',
  component: DrawerContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Content section for the Drawer component. Should be used within a Drawer.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DrawerContent>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <DrawerContent>
        <p>This is the drawer content area.</p>
      </DrawerContent>
    </div>
  ),
};
