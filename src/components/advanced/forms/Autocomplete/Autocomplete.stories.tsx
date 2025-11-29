import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';

const meta = {
  title: 'Advanced/Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
// BASIC USAGE - Complete Component Compositions
// ============================================================================

export const CompleteComponent: Story = {
  name: 'Complete Component (Input + List)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={fruits} placeholder="Search fruits...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

export const WithFormField: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
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
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

export const CustomRendering: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const users: AutocompleteOptionData[] = [
      { value: 'john', label: 'John Doe' },
      { value: 'jane', label: 'Jane Smith' },
      { value: 'bob', label: 'Bob Johnson' },
      { value: 'alice', label: 'Alice Williams' },
    ];

    return (
      <div className="w-80">
        <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={users} placeholder="Search users...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {users.map((user) => (
              <Autocomplete.Option key={user.value} value={user.value}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                    {user.label.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{user.label}</div>
                    <div className="text-xs text-gray-500">@{user.value}</div>
                  </div>
                </div>
              </Autocomplete.Option>
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

export const CustomFilter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const customFilter = (option: AutocompleteOptionData, query: string) => {
      return option.label.toLowerCase().startsWith(query.toLowerCase());
    };
    return (
      <div className="w-80 space-y-2">
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
        <p className="text-xs text-gray-500">Custom filter: only matches from start of label</p>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete 
          value={value} 
          onChange={(val) => setValue(val as string)} 
          options={[]} 
          emptyMessage="🔍 No items available"
          placeholder="Search..." 
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const longList: AutocompleteOptionData[] = Array.from({ length: 50 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i + 1}`,
    }));
    return (
      <div className="w-80">
        <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={longList} placeholder="Search in long list...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {longList.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

// ============================================================================
// VARIANTS - Size, States, Multiple Selection
// ============================================================================

export const SizeVariants: Story = {
  render: () => {
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');
    const [large, setLarge] = useState('');
    return (
      <div className="space-y-6">
        <div className="w-80">
          <Autocomplete 
            value={small} 
            onChange={(val) => setSmall(val as string)} 
            options={fruits} 
            size="small" 
            label="Small Size" 
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
        </div>
        <div className="w-80">
          <Autocomplete 
            value={medium} 
            onChange={(val) => setMedium(val as string)} 
            options={fruits} 
            size="default" 
            label="Default Size" 
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
        </div>
        <div className="w-80">
          <Autocomplete 
            value={large} 
            onChange={(val) => setLarge(val as string)} 
            options={fruits} 
            size="large" 
            label="Large Size" 
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
        </div>
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-80">
        <Autocomplete 
          value={value} 
          onChange={(val) => setValue(val as string[])} 
          options={fruits} 
          multiple 
          label="Select Multiple Fruits"
          placeholder="Select multiple fruits..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">
          Selected: {value.length > 0 ? value.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Autocomplete 
          value={value} 
          onChange={(val) => setValue(val as string)} 
          options={fruits} 
          label="Required Field" 
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
      </div>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="w-80">
      <Autocomplete 
        value="apple" 
        onChange={() => {}}
        options={fruits} 
        disabled 
        label="Disabled Field" 
        helperText="This field cannot be edited" 
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
    </div>
  ),
};

export const WithDisabledOptions: Story = {
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
      <div className="w-80">
        <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={options} placeholder="Select an option...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {options.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty />
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

// ============================================================================
// SUBCOMPONENT ISOLATION - Testing Individual Parts
// ============================================================================

export const InputSubcomponent: Story = {
  name: 'Subcomponent: Input',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Input Component (Isolated)</p>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={fruits}>
            <Autocomplete.Input placeholder="Type to search..." />
            {/* No List - demonstrates Input in complete isolation */}
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Demonstrates:</strong> Input component renders independently. Typing updates query state but no dropdown appears because List is not rendered.
        </div>
      </div>
    );
  },
};

export const ListSubcomponent: Story = {
  name: 'Subcomponent: List (Static)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">List Component (Isolated - Always Visible)</p>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={fruits} defaultOpen>
            {/* Input hidden for true List isolation - demonstrates padding/spacing only */}
            <Autocomplete.List className="!static !shadow-md !rounded-md !border !border-gray-200">
              {fruits.map((fruit) => (
                <Autocomplete.Option key={fruit.value} value={fruit.value} />
              ))}
              <Autocomplete.Empty />
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Demonstrates:</strong> List component with static positioning. Shows padding, spacing, scrolling, and option layout without Input visible.
        </div>
      </div>
    );
  },
};

export const OptionSubcomponent: Story = {
  name: 'Subcomponent: Option States',
  render: () => {
    const [value, setValue] = useState('apple');
    const testOptions: AutocompleteOptionData[] = [
      { value: 'apple', label: 'Apple (Selected)' },
      { value: 'banana', label: 'Banana (Normal)' },
      { value: 'cherry', label: 'Cherry (Disabled)', disabled: true },
      { value: 'date', label: 'Date (Normal)' },
    ];
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Option States (Isolated)</p>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={testOptions} defaultOpen>
            {/* Input hidden for true Option isolation - demonstrates padding/gap/states only */}
            <Autocomplete.List className="!static !shadow-md !rounded-md !border !border-gray-200">
              {testOptions.map((option) => (
                <Autocomplete.Option key={option.value} value={option.value} />
              ))}
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Demonstrates:</strong> Selected (blue), normal (white), disabled (gray, no hover) option states with proper padding and gap, without Input visible.
        </div>
      </div>
    );
  },
};

export const EmptySubcomponent: Story = {
  name: 'Subcomponent: Empty Message',
  render: () => {
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Empty Message Component (Isolated)</p>
          <Autocomplete value="" onChange={() => {}} options={[]} defaultOpen>
            {/* Input hidden for true Empty isolation - demonstrates empty state only */}
            <Autocomplete.List className="!static !shadow-md !rounded-md !border !border-gray-200">
              <Autocomplete.Empty />
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Demonstrates:</strong> Empty message renders when no options available. Default message: "No results found", without Input visible.
        </div>
      </div>
    );
  },
};

// ============================================================================
// RENDERING PATTERNS - Different Ways to Use List & Option
// ============================================================================

export const AutomaticOptionRendering: Story = {
  name: 'Pattern: Automatic Option Mapping',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Automatic: Map over options array</p>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={fruits} placeholder="Search fruits...">
            <Autocomplete.Input />
            <Autocomplete.List>
              {fruits.map((option) => (
                <Autocomplete.Option key={option.value} value={option.value} />
              ))}
              <Autocomplete.Empty />
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600 font-mono">
          {`{fruits.map((option) => (\n  <Autocomplete.Option\n    key={option.value}\n    value={option.value}\n  />\n))}`}
        </div>
      </div>
    );
  },
};

export const ManualOptionRendering: Story = {
  name: 'Pattern: Manual Static Options',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Manual: Hardcoded options</p>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={fruits} placeholder="Search fruits...">
            <Autocomplete.Input />
            <Autocomplete.List>
              <Autocomplete.Option value="apple" />
              <Autocomplete.Option value="banana" />
              <Autocomplete.Option value="cherry" />
              <Autocomplete.Empty />
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Note:</strong> Manual approach limits filtering. Only hardcoded values render. Use for fixed, non-dynamic lists.
        </div>
      </div>
    );
  },
};

export const ConditionalOptionRendering: Story = {
  name: 'Pattern: Conditional Option Display',
  render: () => {
    const [value, setValue] = useState('');
    const [showAll, setShowAll] = useState(false);
    const displayOptions = showAll ? fruits : fruits.slice(0, 3);
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Conditional: Show/Hide Options</p>
          <label className="flex items-center gap-2 mb-2">
            <input 
              type="checkbox" 
              checked={showAll} 
              onChange={(e) => setShowAll(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-600">Show all options</span>
          </label>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={fruits} placeholder="Search fruits...">
            <Autocomplete.Input />
            <Autocomplete.List>
              {displayOptions.map((option) => (
                <Autocomplete.Option key={option.value} value={option.value} />
              ))}
              <Autocomplete.Empty />
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Use case:</strong> Lazy loading, progressive disclosure, or permission-based option visibility.
        </div>
      </div>
    );
  },
};

export const CustomOptionContent: Story = {
  name: 'Pattern: Custom Option Children',
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
      <div className="w-80 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Custom: Option with Icons</p>
          <Autocomplete value={value} onChange={(val) => setValue(val as string)} options={countries} placeholder="Select country...">
            <Autocomplete.Input />
            <Autocomplete.List>
              {countries.map((country) => (
                <Autocomplete.Option key={country.value} value={country.value}>
                  <span className="text-lg mr-2">{flagEmojis[country.value]}</span>
                  {country.label}
                </Autocomplete.Option>
              ))}
              <Autocomplete.Empty />
            </Autocomplete.List>
          </Autocomplete>
        </div>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Pattern:</strong> Pass children to Option component to override default label rendering.
        </div>
      </div>
    );
  },
};
