import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <List>List component (not yet implemented)</List>,
};
