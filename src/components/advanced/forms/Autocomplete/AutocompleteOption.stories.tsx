import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';
import { BiCheck, BiStar, BiUser, BiTrendingUp, BiLock } from 'react-icons/bi';

const meta: Meta<typeof Autocomplete.Option> = {
  title: 'Advanced/Forms/Autocomplete/Option',
  component: Autocomplete.Option,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual selectable option within the Autocomplete list. Supports custom content, icons, disabled states, and selection indicators. Must be used within Autocomplete context.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: AutocompleteOptionData[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

// ============================================================================
// OPTION ISOLATION - Demonstrating Option with minimal Input
// ============================================================================

export const OptionStatesIsolated: Story = {
  name: 'Option States (Isolation)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Options displayed with Input visually hidden to focus on Option states: normal, hover, and selected
      </p>
      <Autocomplete options={sampleOptions} defaultOpen defaultValue="banana">
        {/* Input required for context but visually hidden */}
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100 !pointer-events-auto">
          {sampleOptions.map((opt) => (
            <Autocomplete.Option key={opt.value} value={opt.value} />
          ))}
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Demonstrates: Default, hover (keyboard navigation), and selected states
      </div>
    </div>
  ),
};

// ============================================================================
// SELECTION STATES
// ============================================================================

export const SingleSelection: Story = {
  name: 'Single Selection Mode',
  render: () => {
    const [value, setValue] = useState('cherry');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          In single selection mode, only one option can be selected at a time (no checkmark)
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
          defaultOpen
        >
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">Selected: {value}</div>
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  name: 'Multiple Selection Mode (Checkmarks)',
  render: () => {
    const [value, setValue] = useState<string[]>(['apple', 'cherry']);
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          In multiple mode, selected options show checkmarks automatically
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string[])}
          options={sampleOptions}
          multiple
          defaultOpen
        >
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">
          Selected: {value.join(', ')}
        </div>
      </div>
    );
  },
};

export const HighlightedState: Story = {
  name: 'Highlighted State (Keyboard Nav)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          Use arrow keys to highlight options (different from selected state)
        </p>
        <Autocomplete
          value={value}
          onChange={(val) => setValue(val as string)}
          options={sampleOptions}
          defaultOpen
        >
          <Autocomplete.Input placeholder="Use arrow keys..." />
          <Autocomplete.List>
            {sampleOptions.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="p-3 bg-gray-50 rounded text-xs space-y-1">
          <div><strong>States:</strong></div>
          <div>• Normal: Default gray background</div>
          <div>• Highlighted: Light blue background (keyboard nav)</div>
          <div>• Selected: Blue background with white text</div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// DISABLED STATE
// ============================================================================

export const DisabledOptions: Story = {
  name: 'Disabled Options',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Options can be disabled via the disabled prop (not selectable, reduced opacity)
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Option value="apple">Apple</Autocomplete.Option>
          <Autocomplete.Option value="banana" disabled>
            Banana (Out of stock)
          </Autocomplete.Option>
          <Autocomplete.Option value="cherry">Cherry</Autocomplete.Option>
          <Autocomplete.Option value="date" disabled>
            Date (Out of stock)
          </Autocomplete.Option>
          <Autocomplete.Option value="elderberry">Elderberry</Autocomplete.Option>
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Disabled options have reduced opacity and are not clickable
      </div>
    </div>
  ),
};

export const DisabledInData: Story = {
  name: 'Disabled via Option Data',
  render: () => {
    const optionsWithDisabled: AutocompleteOptionData[] = [
      { value: 'free', label: 'Free Plan' },
      { value: 'basic', label: 'Basic Plan', disabled: true },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
    ];

    return (
      <div className="w-80 space-y-4">
        <p className="text-sm text-gray-600">
          Options can also be disabled via option.disabled in the data
        </p>
        <Autocomplete options={optionsWithDisabled} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            {optionsWithDisabled.map((opt) => (
              <Autocomplete.Option key={opt.value} value={opt.value} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
        <div className="text-xs text-gray-500">
          Set disabled: true in AutocompleteOptionData
        </div>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM CONTENT
// ============================================================================

export const WithIcons: Story = {
  name: 'Options with Icons',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Use children prop to render custom content like icons
      </p>
      <Autocomplete
        options={[
          { value: 'user1', label: 'John Doe' },
          { value: 'user2', label: 'Jane Smith' },
          { value: 'user3', label: 'Bob Johnson' },
        ]}
        defaultOpen
      >
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Option value="user1">
            <span className="flex items-center gap-2">
              <BiUser className="w-4 h-4 text-gray-500" />
              John Doe
            </span>
          </Autocomplete.Option>
          <Autocomplete.Option value="user2">
            <span className="flex items-center gap-2">
              <BiUser className="w-4 h-4 text-gray-500" />
              Jane Smith
            </span>
          </Autocomplete.Option>
          <Autocomplete.Option value="user3">
            <span className="flex items-center gap-2">
              <BiUser className="w-4 h-4 text-gray-500" />
              Bob Johnson
            </span>
          </Autocomplete.Option>
        </Autocomplete.List>
      </Autocomplete>
    </div>
  ),
};

export const WithDescriptions: Story = {
  name: 'Options with Descriptions',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Multi-line content with title and description
      </p>
      <Autocomplete
        options={[
          { value: 'basic', label: 'Basic' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
        defaultOpen
      >
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Option value="basic">
            <div className="flex flex-col">
              <span className="font-medium">Basic Plan</span>
              <span className="text-xs text-gray-500">Up to 5 users • $9/month</span>
            </div>
          </Autocomplete.Option>
          <Autocomplete.Option value="pro">
            <div className="flex flex-col">
              <span className="font-medium flex items-center gap-1">
                Pro Plan <BiStar className="w-3 h-3 text-yellow-500" />
              </span>
              <span className="text-xs text-gray-500">Up to 25 users • $29/month</span>
            </div>
          </Autocomplete.Option>
          <Autocomplete.Option value="enterprise">
            <div className="flex flex-col">
              <span className="font-medium">Enterprise Plan</span>
              <span className="text-xs text-gray-500">Unlimited users • Custom pricing</span>
            </div>
          </Autocomplete.Option>
        </Autocomplete.List>
      </Autocomplete>
    </div>
  ),
};

export const ComplexContent: Story = {
  name: 'Complex Option Content',
  render: () => (
    <div className="w-96 space-y-4">
      <p className="text-sm text-gray-600">
        Options can contain any custom JSX: badges, icons, stats, etc.
      </p>
      <Autocomplete
        options={[
          { value: 'stock1', label: 'AAPL' },
          { value: 'stock2', label: 'GOOGL' },
          { value: 'stock3', label: 'MSFT' },
        ]}
        defaultOpen
      >
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Option value="stock1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold">A</span>
                </div>
                <div>
                  <div className="font-medium">Apple Inc.</div>
                  <div className="text-xs text-gray-500">AAPL • NASDAQ</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$173.50</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <BiTrendingUp className="w-3 h-3" />
                  +2.3%
                </div>
              </div>
            </div>
          </Autocomplete.Option>
          <Autocomplete.Option value="stock2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold">G</span>
                </div>
                <div>
                  <div className="font-medium">Alphabet Inc.</div>
                  <div className="text-xs text-gray-500">GOOGL • NASDAQ</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$140.25</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <BiTrendingUp className="w-3 h-3" />
                  +1.8%
                </div>
              </div>
            </div>
          </Autocomplete.Option>
          <Autocomplete.Option value="stock3" disabled>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold">M</span>
                </div>
                <div>
                  <div className="font-medium flex items-center gap-1">
                    Microsoft Corp.
                    <BiLock className="w-3 h-3" />
                  </div>
                  <div className="text-xs text-gray-500">MSFT • Trading halted</div>
                </div>
              </div>
            </div>
          </Autocomplete.Option>
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Demonstrates: Avatars, badges, stats, and complex layouts
      </div>
    </div>
  ),
};

// ============================================================================
// CUSTOM STYLING
// ============================================================================

export const CustomStyling: Story = {
  name: 'Custom Option Styling',
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Purple hover/focus</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option
                key={opt.value}
                value={opt.value}
                className="hover:bg-purple-100 data-[selected]:bg-purple-600"
              />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Custom padding and borders</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option
                key={opt.value}
                value={opt.value}
                className="px-6 py-3 border-l-4 border-transparent hover:border-blue-500"
              />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Rounded options</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" />
          <Autocomplete.List className="!static !opacity-100 p-2">
            {sampleOptions.map((opt) => (
              <Autocomplete.Option
                key={opt.value}
                value={opt.value}
                className="rounded-lg mb-1 last:mb-0"
              />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      </div>
    </div>
  ),
};

// ============================================================================
// FALLBACK TO LABEL
// ============================================================================

export const LabelFallback: Story = {
  name: 'Label Fallback (No Children)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        When no children provided, Option displays option.label automatically
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" />
        <Autocomplete.List className="!static !opacity-100">
          {sampleOptions.map((opt) => (
            <Autocomplete.Option key={opt.value} value={opt.value} />
          ))}
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Simplest usage: just pass value prop, label renders automatically
      </div>
    </div>
  ),
};
