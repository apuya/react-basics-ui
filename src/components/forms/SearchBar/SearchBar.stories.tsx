import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef, useEffect, useCallback } from 'react';
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
        component:
          'Search input with flexible leading and trailing icon slots. Uses props slots pattern similar to Input component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    variant: { control: 'select', options: ['outline', 'filled', 'ghost'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ width: '400px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    leadingIcon: <Icon icon={BiSearch} />,
    placeholder: 'Search...',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing="md">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Outline</Text>
        <SearchBar 
          leadingIcon={<Icon icon={BiSearch} />}
          variant="outline" 
          placeholder="Bordered style..." 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Filled</Text>
        <SearchBar 
          leadingIcon={<Icon icon={BiSearch} />}
          variant="filled" 
          placeholder="Background style..." 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Ghost</Text>
        <SearchBar 
          leadingIcon={<Icon icon={BiSearch} />}
          variant="ghost" 
          placeholder="Minimal style..." 
        />
      </Stack>
    </Stack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing="md">
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        size="small" 
        placeholder="Small" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        size="default" 
        placeholder="Default" 
      />
      <SearchBar 
        leadingIcon={<Icon icon={BiSearch} />}
        size="large" 
        placeholder="Large" 
      />
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Stack spacing="md">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Loading</Text>
        <SearchBar 
          leadingIcon={<Icon icon={BiSearch} />}
          trailingIcon={<Spinner size="sm" />}
          placeholder="Searching..." 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Error</Text>
        <SearchBar 
          leadingIcon={<Icon icon={BiSearch} />}
          error 
          placeholder="Invalid query" 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Disabled</Text>
        <SearchBar 
          leadingIcon={<Icon icon={BiSearch} />}
          disabled 
          placeholder="Unavailable" 
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// FEATURES
// =============================================================================

export const WithClearButton: Story = {
  render: function Render() {
    const [value, setValue] = useState('test query');

    const handleClear = useCallback(() => {
      setValue('');
    }, []);

    return (
      <SearchBar
        leadingIcon={<Icon icon={BiSearch} />}
        trailingIcon={
          value ? (
            <button
              type="button"
              onClick={handleClear}
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
      <Stack spacing="xs">
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

// =============================================================================
// USE CASES
// =============================================================================

const SAMPLE_DATA = [
  { type: 'Component', name: 'Button' },
  { type: 'Component', name: 'SearchBar' },
  { type: 'Component', name: 'Modal' },
  { type: 'Hook', name: 'useDisclosure' },
  { type: 'Hook', name: 'useFocusTrap' },
];

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
      <Stack spacing="sm">
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
                  <Stack direction="horizontal" spacing="sm" align="center">
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

export const WithFilters: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [filters, setFilters] = useState(['Components', 'Hooks']);

    const removeFilter = useCallback((filter: string) => {
      setFilters((prev) => prev.filter((f) => f !== filter));
    }, []);

    return (
      <Stack spacing="sm">
        <SearchBar
          leadingIcon={<Icon icon={BiSearch} />}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search with filters..."
        />
        {filters.length > 0 && (
          <Stack direction="horizontal" spacing="xs" align="center">
            <Text size="caption" color="tertiary">Filters:</Text>
            {filters.map((filter) => (
              <Badge
                key={filter}
                color="info"
                size="small"
                dismissible
                onDismiss={() => removeFilter(filter)}
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

export const WithValidation: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);

      if (val.length > 0 && val.length < 3) {
        setError('Min 3 characters required');
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
        setError('Special characters not allowed');
      } else {
        setError(null);
      }
    }, []);

    return (
      <Stack spacing="xs">
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

export const FullFeatured: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = useCallback((searchValue: string) => {
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
    }, []);

    const handleClear = useCallback(() => {
      setValue('');
      setResults([]);
    }, []);

    return (
      <Stack spacing="md">
        <SearchBar
          leadingIcon={<Icon icon={BiSearch} />}
          trailingIcon={
            isLoading ? (
              <Spinner size="sm" />
            ) : value ? (
              <button
                type="button"
                onClick={handleClear}
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
          placeholder="All features: clear, loading, search..."
        />
        {results.length > 0 && (
          <Box className="border rounded-md p-4">
            <Stack spacing="sm">
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
