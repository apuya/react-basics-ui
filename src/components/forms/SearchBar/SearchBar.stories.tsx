import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Forms/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'SearchBar component provides a dedicated search input with built-in features like clear button, search button, loading states, and keyboard shortcuts. Optimized for search-specific UX patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the search bar',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Shows clear button when input has value',
    },
    showSearchButton: {
      control: 'boolean',
      description: 'Shows search button',
    },
    showShortcut: {
      control: 'boolean',
      description: 'Shows keyboard shortcut badge when empty',
    },
    shortcutText: {
      control: 'text',
      description: 'Text to display in shortcut badge',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Default search bar with search icon and clear button on input.',
      },
    },
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('React components');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with initial value, showing the clear button.',
      },
    },
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
          showClearButton={true}
          placeholder="Type to see clear button..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Clear button appears when there is text in the input.',
      },
    },
  },
};

export const WithSearchButton: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [searchedValue, setSearchedValue] = useState('');

    return (
      <div className="w-96 space-y-4">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSearch={(val) => setSearchedValue(val)}
          showSearchButton={true}
          placeholder="Type and click search..."
        />
        {searchedValue && (
          <p className="text-sm text-gray-600">Searched for: "{searchedValue}"</p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with a search button. Click the button or press Enter to trigger search.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('loading...');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isLoading={true}
          placeholder="Search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner, typically shown during async search operations.',
      },
    },
  },
};

export const WithShortcut: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showShortcut={true}
          shortcutText="⌘K"
          placeholder="Search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows keyboard shortcut badge when input is empty. Badge disappears when typing.',
      },
    },
  },
};

export const WithSlashShortcut: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showShortcut={true}
          shortcutText="/"
          placeholder="Press / to search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alternative shortcut badge with "/" key, common in many applications.',
      },
    },
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Small search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant, useful for compact layouts or toolbars.',
      },
    },
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          size="large"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Large search..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant, great for prominent search features.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <SearchBar
        value="Disabled search"
        disabled={true}
        placeholder="Disabled..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents user interaction.',
      },
    },
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (searchValue: string) => {
      setIsLoading(true);
      setResults([]);
      
      // Simulate API call
      setTimeout(() => {
        setResults([
          `Result 1 for "${searchValue}"`,
          `Result 2 for "${searchValue}"`,
          `Result 3 for "${searchValue}"`,
        ]);
        setIsLoading(false);
      }, 1500);
    };

    return (
      <div className="w-96 space-y-4">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => {
            setValue('');
            setResults([]);
          }}
          onSearch={handleSearch}
          isLoading={isLoading}
          showClearButton={true}
          showSearchButton={true}
          showShortcut={true}
          shortcutText="⌘K"
          placeholder="Search with all features..."
        />
        {results.length > 0 && (
          <div className="bg-white border rounded-md p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-700">Results:</p>
            {results.map((result, idx) => (
              <div key={idx} className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-featured example with all capabilities: search button, clear button, loading state, and keyboard shortcut.',
      },
    },
  },
};

export const WithCustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-96">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search documentation, components, guides..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom placeholder text to provide context-specific search hints.',
      },
    },
  },
};

export const InstantSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [filteredItems] = useState([
      'React', 'Redux', 'React Router', 'React Query',
      'Vue', 'Vuex', 'Vue Router',
      'Angular', 'NgRx',
      'Svelte', 'SvelteKit'
    ]);

    const results = value
      ? filteredItems.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    return (
      <div className="w-96 space-y-4">
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search frameworks..."
        />
        {value && (
          <div className="bg-white border rounded-md max-h-64 overflow-y-auto">
            {results.length > 0 ? (
              results.map((result, idx) => (
                <div
                  key={idx}
                  className="text-sm text-gray-700 p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                >
                  {result}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 p-3 text-center">
                No results found for "{value}"
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Instant search that filters results as you type, without needing to click a search button.',
      },
    },
  },
};
