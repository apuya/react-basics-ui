import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { Autocomplete } from './Autocomplete';
import { List } from '@/components/overlays/List';
import type { AutocompleteOptionData } from './Autocomplete.types';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';
import { Button } from '@/components/actions/Button';
import { Avatar } from '@/components/data-display/Avatar';
import { Icon } from '@/components/utility/Icon';

const meta = {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  subcomponents: {
    'Autocomplete.Input': Autocomplete.Input,
    'Autocomplete.Option': Autocomplete.Option,
    'Autocomplete.Empty': Autocomplete.Empty,
    'List.Container': List.Container,
    'List.Item': List.Item,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible compound autocomplete component with filtering, keyboard navigation, single/multiple selection, and FormField integration.\n\n' +
          '## Features\n' +
          '- **Filtering**: Real-time search with customizable filter function\n' +
          '- **Keyboard Navigation**: Arrow keys, Enter to select, Escape to close\n' +
          '- **Selection Modes**: Single or multiple selection\n' +
          '- **FormField Integration**: Labels, helper text, error states\n' +
          '- **Customization**: Custom option rendering, empty states, icons\n' +
          '- **Accessibility**: ARIA compliant with combobox pattern\n\n' +
          '## Compound Components\n' +
          '- `Autocomplete.Input`: Input field with clear/dropdown controls\n' +
          '- `List.Container`: Dropdown container for options (from List component)\n' +
          '- `List.Item`: Basic selectable option (from List component)\n' +
          '- `Autocomplete.Option`: Enhanced option with auto-lookup and text highlighting\n' +
          '- `Autocomplete.Empty`: No results state\n\n' +
          '## Use Cases\n' +
          '- **Search & Select**: User search, product search, command palette\n' +
          '- **Forms**: Country/state selection, category picker, tag input\n' +
          '- **Data Entry**: Contact picker, skill selection, multi-tag editor\n' +
          '- **Filtering**: Advanced filters, faceted search, smart suggestions',
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
  argTypes: {
    value: {
      control: false,
      description: 'Current selected value (string for single, string[] for multiple)',
      table: { category: 'State' },
    },
    onChange: {
      description: 'Callback when selection changes',
      table: { category: 'Events' },
    },
    options: {
      description: 'Array of selectable options with value/label/disabled',
      table: { category: 'Data' },
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection mode',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Input field size',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire component',
      table: { category: 'State' },
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
      table: { category: 'State' },
    },
    label: {
      control: 'text',
      description: 'FormField label',
      table: { category: 'FormField' },
    },
    helperText: {
      control: 'text',
      description: 'FormField helper text',
      table: { category: 'FormField' },
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
      table: { category: 'Content' },
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button to reset selection',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state indicator',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    filter: {
      control: false,
      description: 'Custom filter function (option, query) => boolean',
      table: { category: 'Behavior' },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Open dropdown by default',
      table: { category: 'Behavior' },
    },
    defaultValue: {
      control: false,
      description: 'Initial value (uncontrolled)',
      table: { category: 'State' },
    },
  },
} satisfies Meta<typeof Autocomplete>;

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
// PLAYGROUND
// ============================================================================

export const Playground: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
    ],
    placeholder: 'Search...',
    label: 'Choose an option',
    helperText: 'Start typing to filter',
    size: 'default',
    disabled: false,
    error: false,
    multiple: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '');
    return (
      <div className="w-80">
        <Autocomplete
          {...args}
          value={value}
          onChange={setValue}
        >
          <Autocomplete.Input />
          <List.Container>
            {args.options?.map((option) => (
              <List.Item key={option.value} value={option.value}>
                {option.label}
              </List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
        </Autocomplete>
      </div>
    );
  },
};

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
          <List.Container style={{ maxHeight: 300 }}>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>
                {option.label}
              </List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((opt) => (
              <List.Item key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((opt) => (
              <List.Item key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((opt) => (
              <List.Item key={opt.value} value={opt.value} />
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
          </List.Container>
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
          <List.Container>
            {options.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {longList.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {users.map((user) => (
              <List.Item key={user.value} value={user.value}>
                <Stack direction="horizontal" spacing="sm" align="center">
                  <Avatar size="sm">
                    <Avatar.Fallback>{user.label.split(' ').map((n: string) => n[0]).join('')}</Avatar.Fallback>
                  </Avatar>
                  <Stack spacing="none">
                    <Text size="small" weight="medium">
                      {user.label}
                    </Text>
                    <Text size="caption" color="tertiary">
                      @{user.value}
                    </Text>
                  </Stack>
                </Stack>
              </List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {countries.map((country) => (
              <List.Item key={country.value} value={country.value}>
                <Stack direction="horizontal" gap="sm" align="center">
                  <Text size="lg">{flagEmojis[country.value]}</Text>
                  <Text size="sm">{country.label}</Text>
                </Stack>
              </List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
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
          </List.Container>
        </Autocomplete>
      </Stack>
    );
  },
};

// ============================================================================
// CLEARABLE
// ============================================================================

export const Clearable: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState('banana');
    const [multiValue, setMultiValue] = useState<string[]>(['apple', 'cherry']);
    
    return (
      <Stack gap="lg" className="w-80">
        <Autocomplete
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          options={fruits}
          clearable
          label="Single Select with Clear"
          helperText="Click X to clear selection"
          placeholder="Search fruits..."
        >
          <Autocomplete.Input />
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
        </Autocomplete>

        <Autocomplete
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          options={fruits}
          multiple
          clearable
          label="Multiple Select with Clear"
          helperText="Clear all selections at once"
          placeholder="Select multiple..."
        >
          <Autocomplete.Input />
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
        </Autocomplete>

        <Text size="sm" color="tertiary">
          Single: {singleValue || 'None'} | Multiple: {multiValue.length > 0 ? multiValue.join(', ') : 'None'}
        </Text>
      </Stack>
    );
  },
};

// ============================================================================
// LOADING STATE
// ============================================================================

export const LoadingState: Story = {
  render: () => {
    return (
      <Stack gap="lg" className="w-80">
        <Autocomplete
          value=""
          onChange={() => {}}
          options={fruits}
          loading={true}
          label="Loading Options"
          helperText="Spinner shown in empty state and input"
          placeholder="Loading..."
        >
          <Autocomplete.Input />
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
        </Autocomplete>

        <Autocomplete
          value="apple"
          onChange={() => {}}
          options={fruits}
          loading={true}
          clearable
          label="Loading with Selection"
          helperText="Spinner replaces clear button when loading"
          placeholder="Loading..."
        >
          <Autocomplete.Input />
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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
          <List.Container>
            {fruits.map((option) => (
              <List.Item key={option.value} value={option.value}>{option.label}</List.Item>
            ))}
            <Autocomplete.Empty />
          </List.Container>
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

// ============================================================================
// WITH TEXT HIGHLIGHTING
// ============================================================================

export const WithTextHighlighting: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={fruits}
          highlightMatches={true}
          placeholder="Type to see highlighting..."
          label="Search Fruits"
          helperText="Matching text will be highlighted in yellow"
        >
          <Autocomplete.Input />
          <List.Container style={{ maxHeight: 300 }}>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </List.Container>
        </Autocomplete>
      </div>
    );
  },
};
