import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';
import { Button } from '@/components/forms/Button';
import { Avatar } from '@/components/data-display/Avatar';
import { Icon } from '@/components/utility/Icon';

const meta: Meta<typeof Autocomplete> = {
  title: 'Advanced/Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compound autocomplete component with filtering, keyboard navigation, single/multiple selection, and FormField integration.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', paddingBottom: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const fruits: AutocompleteOptionData[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

// ============================================================================
// DEFAULT
// ============================================================================

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          placeholder="Search fruits..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Text size="sm" color="tertiary">
          Selected: {value || 'None'}
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// WITH FORM FIELD
// ============================================================================

export const WithFormField: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          label="Favorite Fruit"
          helperText="Start typing to search"
          placeholder="Select a fruit..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
      </Stack>
    );
  },
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const SizeVariants: Story = {
  render: () => {
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');
    const [large, setLarge] = useState('');
    return (
      <Stack gap="lg" className="w-80">
        <Autocomplete
          value={small}
          onChange={(val) => setSmall(val as string)}
          options={fruits}
          size="small"
          label="Small"
          placeholder="Small..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>

        <Autocomplete
          value={medium}
          onChange={(val) => setMedium(val as string)}
          options={fruits}
          size="default"
          label="Default"
          placeholder="Default..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>

        <Autocomplete
          value={large}
          onChange={(val) => setLarge(val as string)}
          options={fruits}
          size="large"
          label="Large"
          placeholder="Large..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
      </Stack>
    );
  },
};

// ============================================================================
// MULTIPLE SELECTION
// ============================================================================

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string[])}
          options={fruits}
          multiple
          label="Select Multiple Fruits"
          placeholder="Select multiple..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Text size="sm" color="tertiary">
          Selected: {value.length > 0 ? value.join(', ') : 'None'}
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

export const States: Story = {
  name: 'Error & Disabled States',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Stack gap="lg" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          label="Error State"
          helperText={value ? 'Valid selection' : 'Please select a fruit'}
          error={!value}
          placeholder="Select a fruit..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>

        <Autocomplete
          value="apple"
          onChange={() => {}}
          options={fruits}
          disabled
          label="Disabled State"
          helperText="This field cannot be edited"
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </Stack>
    );
  },
};

// ============================================================================
// DISABLED OPTIONS
// ============================================================================

export const DisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const options: AutocompleteOptionData[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ];
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={options}
          placeholder="Select an option..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {options.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Text size="sm" color="tertiary">
          Selected: {value || 'None'}
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// CUSTOM FILTER
// ============================================================================

export const CustomFilter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const customFilter = (option: AutocompleteOptionData, query: string) => {
      return option.label.toLowerCase().startsWith(query.toLowerCase());
    };
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          filter={customFilter}
          placeholder="Type to filter (starts with)..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Text size="xs" color="tertiary">
          Custom filter: only matches from start of label
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// LONG LIST (SCROLLABLE)
// ============================================================================

export const LongList: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const longList: AutocompleteOptionData[] = Array.from({ length: 50 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i + 1}`,
    }));
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={longList}
          placeholder="Search in long list..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {longList.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Text size="sm" color="tertiary">
          Selected: {value || 'None'}
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// CUSTOM OPTION RENDERING
// ============================================================================

export const CustomOptionContent: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const users: AutocompleteOptionData[] = [
      { value: 'john', label: 'John Doe' },
      { value: 'jane', label: 'Jane Smith' },
      { value: 'bob', label: 'Bob Johnson' },
      { value: 'alice', label: 'Alice Williams' },
    ];

    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={users}
          placeholder="Search users..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {users.map((user) => (
              <Autocomplete.Option key={user.value} value={user.value}>
                <Stack direction="horizontal" gap="sm" align="center">
                  <Avatar size="sm" name={user.label} />
                  <Stack gap="none">
                    <Text size="sm" weight="medium">
                      {user.label}
                    </Text>
                    <Text size="xs" color="tertiary">
                      @{user.value}
                    </Text>
                  </Stack>
                </Stack>
              </Autocomplete.Option>
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Text size="sm" color="tertiary">
          Selected: {value || 'None'}
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// WITH ICONS
// ============================================================================

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const countries: AutocompleteOptionData[] = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
      { value: 'uk', label: 'United Kingdom' },
    ];

    const flagEmojis: Record<string, string> = {
      us: '🇺🇸',
      ca: '🇨🇦',
      mx: '🇲🇽',
      uk: '🇬🇧',
    };

    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={countries}
          placeholder="Select country..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {countries.map((country) => (
              <Autocomplete.Option key={country.value} value={country.value}>
                <Stack direction="horizontal" gap="sm" align="center">
                  <Text size="lg">{flagEmojis[country.value]}</Text>
                  <Text size="sm">{country.label}</Text>
                </Stack>
              </Autocomplete.Option>
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
      </Stack>
    );
  },
};

// ============================================================================
// EMPTY STATE CUSTOMIZATION
// ============================================================================

export const CustomEmptyState: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          placeholder="Type 'xyz' to see empty state..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty>
              <Stack gap="sm" align="center" className="py-2">
                <Icon icon={BiSearch} size="lg" color="muted" />
                <Text size="sm" color="tertiary">
                  No matches found
                </Text>
                <Button size="small" variant="tertiary">
                  <Icon icon={BiPlus} size="sm" />
                  Add new item
                </Button>
              </Stack>
            </Autocomplete.Empty>
          </Autocomplete.List>
        </Autocomplete>
      </Stack>
    );
  },
};

// ============================================================================
// KEYBOARD NAVIGATION DEMO
// ============================================================================

export const KeyboardNavigation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Stack gap="md" className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          defaultOpen
          placeholder="Use arrow keys..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <Stack gap="xs">
          <Text size="xs" weight="medium">
            Keyboard shortcuts:
          </Text>
          <Text size="xs" color="tertiary">
            ↓ Arrow Down: Next option
          </Text>
          <Text size="xs" color="tertiary">
            ↑ Arrow Up: Previous option
          </Text>
          <Text size="xs" color="tertiary">
            Enter: Select highlighted option
          </Text>
          <Text size="xs" color="tertiary">
            Escape: Close list
          </Text>
        </Stack>
      </Stack>
    );
  },
};
