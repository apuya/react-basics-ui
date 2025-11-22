import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, type AutocompleteOption } from './Autocomplete';

const meta = {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const countries: AutocompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Autocomplete value={value} onChange={setValue} options={fruits} placeholder="Search fruits...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.length > 0 ? (
              fruits.map((option, index) => (
                <Autocomplete.Option key={option.value} option={option} index={index} />
              ))
            ) : (
              <Autocomplete.Empty />
            )}
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};

export const WithFiltering: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Autocomplete value={value} onChange={setValue} options={countries} placeholder="Search countries...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {countries.length > 0 ? (
              countries.map((option, index) => (
                <Autocomplete.Option key={option.value} option={option} index={index} />
              ))
            ) : (
              <Autocomplete.Empty message="No countries found" />
            )}
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
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
          onChange={setValue}
          options={fruits}
          multiple
          placeholder="Select multiple fruits..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.length > 0 ? (
              fruits.map((option, index) => (
                <Autocomplete.Option key={option.value} option={option} index={index} />
              ))
            ) : (
              <Autocomplete.Empty />
            )}
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">
          Selected: {value.length > 0 ? value.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const optionsWithDisabled: AutocompleteOption[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ];

    return (
      <div className="w-80">
        <Autocomplete
          value={value}
          onChange={setValue}
          options={optionsWithDisabled}
          placeholder="Select an option..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {optionsWithDisabled.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
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
    const customFilter = (option: AutocompleteOption, query: string) => {
      // Only match from the start of the label
      return option.label.toLowerCase().startsWith(query.toLowerCase());
    };

    return (
      <div className="w-80">
        <Autocomplete
          value={value}
          onChange={setValue}
          options={fruits}
          filter={customFilter}
          placeholder="Type to filter (starts with)..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {fruits.length > 0 ? (
              fruits.map((option, index) => (
                <Autocomplete.Option key={option.value} option={option} index={index} />
              ))
            ) : (
              <Autocomplete.Empty message="No matches found" />
            )}
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> This uses a custom filter that only matches from the start of the label.
        </div>
      </div>
    );
  },
};

export const CustomEmptyMessage: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="w-80">
        <Autocomplete
          value={value}
          onChange={setValue}
          options={[]}
          emptyMessage="🔍 No items available at this time"
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
    const longList: AutocompleteOption[] = Array.from({ length: 50 }, (_, i) => ({
      value: `item-${i}`,
      label: `Item ${i + 1}`,
    }));

    return (
      <div className="w-80">
        <Autocomplete
          value={value}
          onChange={setValue}
          options={longList}
          placeholder="Search in long list..."
        >
          <Autocomplete.Input />
          <Autocomplete.List>
            {longList.length > 0 ? (
              longList.map((option, index) => (
                <Autocomplete.Option key={option.value} option={option} index={index} />
              ))
            ) : (
              <Autocomplete.Empty />
            )}
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">
          Selected: {value || 'None'}
          <br />
          <span className="text-xs">Scrollable list with 50 items</span>
        </div>
      </div>
    );
  },
};

export const CustomRendering: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const users: AutocompleteOption[] = [
      { value: 'john', label: 'John Doe' },
      { value: 'jane', label: 'Jane Smith' },
      { value: 'bob', label: 'Bob Johnson' },
      { value: 'alice', label: 'Alice Williams' },
    ];

    return (
      <div className="w-80">
        <Autocomplete value={value} onChange={setValue} options={users} placeholder="Search users...">
          <Autocomplete.Input />
          <Autocomplete.List>
            {users.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                    {option.label.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">@{option.value}</div>
                  </div>
                </div>
              </Autocomplete.Option>
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="mt-4 text-sm text-gray-600">Selected: {value || 'None'}</div>
      </div>
    );
  },
};
