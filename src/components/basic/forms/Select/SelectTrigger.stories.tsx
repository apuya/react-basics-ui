import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select.Trigger> = {
  title: 'Forms/Select/Trigger',
  component: Select.Trigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The trigger button that opens the select dropdown menu. Displays the selected value or placeholder.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select.Trigger>;

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default trigger with standard placeholder.',
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Choose your favorite fruit..." />
      <Select.Menu>
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with a custom placeholder text.',
      },
    },
  },
};

export const WithSelectedValue: Story = {
  render: () => (
    <Select defaultValue="banana">
      <Select.Trigger placeholder="Select a fruit..." />
      <Select.Menu>
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger displaying the selected value.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <Select.Trigger placeholder="Disabled select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled trigger state.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select size="small">
        <Select.Trigger placeholder="Small trigger..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="default">
        <Select.Trigger placeholder="Default trigger..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="large">
        <Select.Trigger placeholder="Large trigger..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger at different sizes inherited from parent Select.',
      },
    },
  },
};

export const ErrorState: Story = {
  render: () => (
    <Select error>
      <Select.Trigger placeholder="Select with error..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with error styling from parent Select.',
      },
    },
  },
};
