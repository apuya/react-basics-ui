import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { Button } from '../../../basic/forms/Button';

const meta: Meta<typeof Autocomplete.Empty> = {
  title: 'Advanced/Forms/Autocomplete/Empty',
  component: Autocomplete.Empty,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Empty state message displayed when no options match the search query or when the options list is empty. Supports custom content via children prop or message prop. Must be used within Autocomplete context.',
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
// EMPTY STATE ISOLATION - Demonstrating Empty with minimal Input
// ============================================================================

export const DefaultMessage: Story = {
  name: 'Default Message (Isolation)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Empty component with Input hidden to focus on the default "No results found" message
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        {/* Input required for context but visually hidden */}
        <Autocomplete.Input className="sr-only" defaultValue="xyz" />
        <Autocomplete.List className="!static !opacity-100">
          {sampleOptions.map((option) => (
            <Autocomplete.Option key={option.value} value={option.value} />
          ))}
          <Autocomplete.Empty />
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Default message: "No results found"
      </div>
    </div>
  ),
};

export const CustomMessage: Story = {
  name: 'Custom Message Prop',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Use the message prop to customize the empty state text
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" defaultValue="xyz" />
        <Autocomplete.List className="!static !opacity-100">
          {sampleOptions.map((option) => (
            <Autocomplete.Option key={option.value} value={option.value} />
          ))}
          <Autocomplete.Empty message="No matching items" />
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Pass custom message via message prop
      </div>
    </div>
  ),
};

// ============================================================================
// CUSTOM CONTENT WITH CHILDREN
// ============================================================================

export const WithIcon: Story = {
  name: 'With Icon (Children)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Use children prop for custom content like icons
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" defaultValue="xyz" />
        <Autocomplete.List className="!static !opacity-100">
          {sampleOptions.map((option) => (
            <Autocomplete.Option key={option.value} value={option.value} />
          ))}
          <Autocomplete.Empty>
            <span className="flex flex-col items-center gap-2 py-2">
              <BiSearch className="w-6 h-6 text-gray-400" />
              <span>No matches found</span>
            </span>
          </Autocomplete.Empty>
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Children override the message prop
      </div>
    </div>
  ),
};

export const WithSuggestion: Story = {
  name: 'With Search Suggestions',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Provide helpful suggestions when no results are found
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" defaultValue="mango" />
        <Autocomplete.List className="!static !opacity-100">
          {sampleOptions.map((option) => (
            <Autocomplete.Option key={option.value} value={option.value} />
          ))}
          <Autocomplete.Empty>
            <span className="flex flex-col items-center gap-1 py-2 text-sm">
              <span className="font-medium">No results for "mango"</span>
              <span className="text-gray-500 text-xs">Try: apple, banana, or cherry</span>
            </span>
          </Autocomplete.Empty>
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Guide users to valid search terms
      </div>
    </div>
  ),
};

export const WithAction: Story = {
  name: 'With Action Button',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Allow users to add new items when search returns no results
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" defaultValue="kiwi" />
        <Autocomplete.List className="!static !opacity-100">
          {sampleOptions.map((option) => (
            <Autocomplete.Option key={option.value} value={option.value} />
          ))}
          <Autocomplete.Empty>
            <span className="flex flex-col items-center gap-2 py-2">
              <span className="text-sm">No results found</span>
              <Button size="small" variant="tertiary" onClick={() => alert('Add "kiwi"')}>
                <BiPlus className="w-4 h-4 mr-1" />
                Add "kiwi"
              </Button>
            </span>
          </Autocomplete.Empty>
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Common pattern for creatable autocomplete
      </div>
    </div>
  ),
};

// ============================================================================
// LOADING & ASYNC STATES
// ============================================================================

export const LoadingState: Story = {
  name: 'Loading State (Async Search)',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Show loading spinner while fetching search results
      </p>
      <Autocomplete options={sampleOptions} defaultOpen>
        <Autocomplete.Input className="sr-only" defaultValue="search" />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Empty>
            <span className="flex items-center justify-center gap-2 py-3">
              <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              <span className="text-sm">Searching...</span>
            </span>
          </Autocomplete.Empty>
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Use Empty component for loading states
      </div>
    </div>
  ),
};

// ============================================================================
// CUSTOM STYLING
// ============================================================================

export const CustomStyling: Story = {
  name: 'Custom Styling',
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Purple theme</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" defaultValue="xyz" />
          <Autocomplete.List className="!static !opacity-100">
            {sampleOptions.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty className="text-purple-600 bg-purple-50 rounded-md py-3">
              No matching fruits
            </Autocomplete.Empty>
          </Autocomplete.List>
        </Autocomplete>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Bordered with icon</label>
        <Autocomplete options={sampleOptions} defaultOpen>
          <Autocomplete.Input className="sr-only" defaultValue="xyz" />
          <Autocomplete.List className="!static !opacity-100">
            {sampleOptions.map((option) => (
              <Autocomplete.Option key={option.value} value={option.value} />
            ))}
            <Autocomplete.Empty className="border-2 border-dashed border-gray-300 rounded-lg py-4 mx-2">
              <span className="flex flex-col items-center gap-1 text-gray-500">
                <BiSearch className="w-5 h-5" />
                <span className="text-sm">Nothing here</span>
              </span>
            </Autocomplete.Empty>
          </Autocomplete.List>
        </Autocomplete>
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const EmptyOptionsList: Story = {
  name: 'Empty Options List',
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm text-gray-600">
        Empty state when the options array is empty (not filtered)
      </p>
      <Autocomplete options={[]} defaultOpen>
        <Autocomplete.Input className="sr-only" placeholder="No options available..." />
        <Autocomplete.List className="!static !opacity-100">
          <Autocomplete.Empty message="No items available" />
        </Autocomplete.List>
      </Autocomplete>
      <div className="text-xs text-gray-500">
        Useful for async data that hasn't loaded yet
      </div>
    </div>
  ),
};
