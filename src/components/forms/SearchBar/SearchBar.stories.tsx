import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef, useEffect } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';
import { SearchBar } from './SearchBar';
import { Icon } from '@/components/utility/Icon';
import { Spinner } from '@/components/feedback/Spinner';
import { Text } from '@/components/typography/Text';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Badge } from '@/components/data-display/Badge';

const meta: Meta<typeof SearchBar> = {
  title: 'Forms/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SearchBar is a specialized input component optimized for search functionality.

## Key Features
- **Search-Optimized** — HTML type="search" with proper semantics
- **Flexible Icons** — Leading and trailing icon slots
- **Multiple Variants** — Outline, filled, ghost styles
- **Keyboard Handling** — Enter key triggers onSearch callback
- **Loading States** — Show spinners during async searches
- **Clear Button** — Easy to add clear functionality

## Built On
Uses **BaseInputField** for core input rendering with searchbar-specific styling.

## Common Use Cases
- Site-wide search bars
- Filter/query inputs
- Command palette interfaces
- Instant search with results dropdown

## vs Input Component
Use **SearchBar** for dedicated search functionality with Enter key handling.
Use **Input** for general form fields with labels and validation.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size variant of the search bar',
      table: { defaultValue: { summary: 'default' } },
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'ghost'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'outline' } },
    },
    error: {
      control: 'boolean',
      description: 'Shows error state styling',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the search bar',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { defaultValue: { summary: 'Search...' } },
    },
    leadingIcon: {
      description: 'Icon displayed at the start of the search bar',
      control: false,
    },
    trailingIcon: {
      description: 'Icon or element displayed at the end (e.g., clear button, spinner)',
      control: false,
    },
    onSearch: {
      description: 'Callback fired when Enter key is pressed',
      control: false,
    },
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

/**
 * Playground story provides interactive controls to test all SearchBar props.
 */
export const Playground: Story = {
  args: {
    leadingIcon: <Icon icon={BiSearch} />,
    placeholder: 'Search...',
    variant: 'outline',
    size: 'default',
  },
};

/**
 * Basic search bar with default settings.
 */
export const Default: Story = {
  args: {
    leadingIcon: <Icon icon={BiSearch} />,
    placeholder: 'Search...',
  },
};

/**
 * Three visual variants: outline (bordered), filled (background), and ghost (minimal).
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        variant="outline" 
        placeholder="Outline variant" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        variant="filled" 
        placeholder="Filled variant" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        variant="ghost" 
        placeholder="Ghost variant" 
      />
    </Stack>
  ),
};

/**
 * Three size options available.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        size="small" 
        placeholder="Small size" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        size="default" 
        placeholder="Default size" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        size="large" 
        placeholder="Large size" 
      />
    </Stack>
  ),
};

/**
 * Different states including loading, error, and disabled.
 */
export const States: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        trailingIcon={<Spinner size="sm" />}
        placeholder="Loading state..." 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        error 
        placeholder="Error state" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        disabled 
        placeholder="Disabled state" 
      />
    </Stack>
  ),
};

/**
 * Clear button that appears when input has value.
 * Common pattern for search bars.
 */
export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('test query');

    return (
      <SearchBar
        leadingIcon={<Icon icon={BiSearch} />}
        trailingIcon={
          value ? (
            <button
              type="button"
              onClick={() => setValue('')}
              className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <Icon icon={BiX} size="md" />
            </button>
          ) : null
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type to see clear button..."
      />
    );
  },
};

/**
 * Keyboard shortcut (⌘K) to focus search bar.
 * Common in modern web apps.
 */
export const WithKeyboardShortcut: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
      <Stack direction="vertical" spacing={2}>
        <SearchBar
          ref={inputRef}
          leadingIcon={<Icon icon={BiSearch} />}
          trailingIcon={
            !value && (
              <span className="inline-flex items-center justify-center px-2 h-5 rounded bg-gray-100 text-gray-600 text-xs font-medium border border-gray-300">
                ⌘K
              </span>
            )
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Press ⌘K to focus..."
        />
        <Text size="caption" color="tertiary">Try ⌘K (or Ctrl+K)</Text>
      </Stack>
    );
  },
};

const SAMPLE_DATA = [
  { type: 'Component', name: 'Button' },
  { type: 'Component', name: 'SearchBar' },
  { type: 'Component', name: 'Modal' },
  { type: 'Hook', name: 'useDisclosure' },
  { type: 'Hook', name: 'useFocusTrap' },
];

/**
 * Instant search with live filtering and loading states.
 * Shows results as user types.
 */
export const InstantSearch: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const results = value
      ? SAMPLE_DATA.filter(
          (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.type.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    useEffect(() => {
      if (!value) return;
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }, [value]);

    return (
      <Stack direction="vertical" spacing={3}>
        <SearchBar
          leadingIcon={<Icon icon={BiSearch} />}
          trailingIcon={isLoading && <Spinner size="sm" />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search components..."
        />
        {value && !isLoading && (
          <Box className="border rounded-md overflow-hidden">
            {results.length > 0 ? (
              results.map((item, idx) => (
                <Box
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <Stack direction="horizontal" spacing={3} align="center">
                    <Text size="small" weight="medium">{item.name}</Text>
                    <Badge color="neutral" size="small">{item.type}</Badge>
                  </Stack>
                </Box>
              ))
            ) : (
              <Box className="p-4 text-center">
                <Text size="small" color="tertiary">No results for "{value}"</Text>
              </Box>
            )}
          </Box>
        )}
      </Stack>
    );
  },
};

/**
 * Search with filter badges that can be removed.
 */
export const WithFilters: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [filters, setFilters] = useState(['Components', 'Hooks']);

    return (
      <Stack direction="vertical" spacing={3}>
        <SearchBar
          leadingIcon={<Icon icon={BiSearch} />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search with filters..."
        />
        {filters.length > 0 && (
          <Stack direction="horizontal" spacing={2} align="center">
            <Text size="caption" color="tertiary">Filters:</Text>
            {filters.map((filter) => (
              <Badge
                key={filter}
                color="info"
                size="small"
                dismissible
                onDismiss={() => setFilters((prev) => prev.filter((f) => f !== filter))}
              >
                {filter}
              </Badge>
            ))}
          </Stack>
        )}
      </Stack>
    );
  },
};

/**
 * Search bar with input validation and error messages.
 */
export const WithValidation: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);

      if (val.length > 0 && val.length < 3) {
        setError('Min 3 characters required');
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
        setError('Special characters not allowed');
      } else {
        setError(null);
      }
    };

    return (
      <Stack direction="vertical" spacing={2}>
        <SearchBar
          leadingIcon={<Icon icon={BiSearch} />}
          value={value}
          onChange={handleChange}
          error={!!error}
          placeholder="Min 3 chars, no special..."
        />
        {error && <Text size="small" color="error">{error}</Text>}
        {!error && value.length >= 3 && (
          <Text size="small" color="success">✓ Valid query</Text>
        )}
      </Stack>
    );
  },
};

/**
 * Full-featured search with onSearch callback, clear button, and loading state.
 * Demonstrates Enter key handling with results display.
 */
export const FullFeatured: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (searchValue: string) => {
      setIsLoading(true);
      setResults([]);

      setTimeout(() => {
        setResults([
          `Result 1 for "${searchValue}"`,
          `Result 2 for "${searchValue}"`,
          `Result 3 for "${searchValue}"`,
        ]);
        setIsLoading(false);
      }, 1000);
    };

    return (
      <Stack direction="vertical" spacing={4}>
        <SearchBar
          leadingIcon={<Icon icon={BiSearch} />}
          trailingIcon={
            isLoading ? (
              <Spinner size="sm" />
            ) : value ? (
              <button
                type="button"
                onClick={() => {
                  setValue('');
                  setResults([]);
                }}
                className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-200 transition-colors"
                aria-label="Clear search"
              >
                <Icon icon={BiX} size="md" />
              </button>
            ) : null
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSearch={handleSearch}
          placeholder="Press Enter to search..."
        />
        {results.length > 0 && (
          <Box className="border rounded-md p-4">
            <Stack direction="vertical" spacing={3}>
              <Text size="small" weight="semibold">Results:</Text>
              {results.map((result, idx) => (
                <Box
                  key={idx}
                  className="p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <Text size="small" color="secondary">{result}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    );
  },
};
