import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete, type AutocompleteOptionData } from './Autocomplete';

const mockOptions: AutocompleteOptionData[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const mockOptionsWithDisabled: AutocompleteOptionData[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
];

describe('Autocomplete', () => {
  describe('Rendering', () => {
    it('renders input and list components', () => {
      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input placeholder="Search..." />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
    });

    it('renders with label when provided', () => {
      render(
        <Autocomplete options={mockOptions} label="Fruit Selection">
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      expect(screen.getByText('Fruit Selection')).toBeInTheDocument();
    });

    it('renders with helper text when provided', () => {
      render(
        <Autocomplete options={mockOptions} helperText="Select your favorite fruit">
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      expect(screen.getByText('Select your favorite fruit')).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('accepts controlled value prop', () => {
      render(
        <Autocomplete options={mockOptions} value="apple">
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveValue('Apple');
    });

    it('calls onChange when selection changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete options={mockOptions} value="" onChange={handleChange}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);
      
      const appleOption = screen.getByText('Apple');
      await user.click(appleOption);

      expect(handleChange).toHaveBeenCalledWith('apple');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('works with defaultValue', () => {
      render(
        <Autocomplete options={mockOptions} defaultValue="banana">
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveValue('Banana');
    });

    it('updates internally when user selects option', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);
      
      const cherryOption = screen.getByText('Cherry');
      await user.click(cherryOption);

      expect(input).toHaveValue('Cherry');
    });
  });

  describe('Open State', () => {
    it('opens list when input is focused', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      const list = screen.getByRole('listbox');
      expect(list).toHaveClass('opacity-100');
    });

    it('supports defaultOpen prop', () => {
      render(
        <Autocomplete options={mockOptions} defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const list = screen.getByRole('listbox');
      expect(list).toHaveClass('opacity-100');
    });

    it('supports controlled open state', () => {
      const { rerender } = render(
        <Autocomplete options={mockOptions} open={false}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      let list = screen.getByRole('listbox');
      expect(list).toHaveClass('opacity-0');

      rerender(
        <Autocomplete options={mockOptions} open={true}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      list = screen.getByRole('listbox');
      expect(list).toHaveClass('opacity-100');
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates options with Arrow keys', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions} defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      input.focus();

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Second option should be highlighted
      const bananaOption = screen.getByText('Banana');
      expect(bananaOption.parentElement).toHaveClass('bg-[var(--component-autocomplete-option-bg-hover)]');
    });

    it('selects option with Enter key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete options={mockOptions} defaultOpen onChange={handleChange}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      input.focus();

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('banana');
    });

    it('closes list with Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions} defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      input.focus();

      await user.keyboard('{Escape}');

      const list = screen.getByRole('listbox');
      expect(list).toHaveClass('opacity-0');
    });

    it('skips disabled options in navigation', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptionsWithDisabled} defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptionsWithDisabled.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      input.focus();

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      // Should select option1, not disabled option2
      expect(input).toHaveValue('Option 1');
    });
  });

  describe('Filtering', () => {
    it('filters options based on query', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.type(input, 'ber');

      expect(screen.getByText('Elderberry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('shows empty state when no options match', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
            <Autocomplete.Empty>No results found</Autocomplete.Empty>
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.type(input, 'xyz');

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('supports custom filter function', async () => {
      const user = userEvent.setup();
      const customFilter = (option: AutocompleteOptionData, query: string) => {
        return option.label.toLowerCase().startsWith(query.toLowerCase());
      };

      render(
        <Autocomplete options={mockOptions} filter={customFilter}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.type(input, 'el');

      // Should only show Elderberry (starts with 'el'), not Apple (contains 'el')
      expect(screen.getByText('Elderberry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  describe('Multiple Selection', () => {
    it('supports multiple selection', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete options={mockOptions} multiple onChange={handleChange}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      const appleOption = screen.getByText('Apple');
      await user.click(appleOption);

      expect(handleChange).toHaveBeenCalledWith(['apple']);

      const bananaOption = screen.getByText('Banana');
      await user.click(bananaOption);

      expect(handleChange).toHaveBeenCalledWith(['apple', 'banana']);
    });

    it('toggles selection in multiple mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Autocomplete options={mockOptions} multiple value={['apple', 'banana']} onChange={handleChange}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      const appleOption = screen.getByText('Apple');
      await user.click(appleOption);

      // Should remove apple from selection
      expect(handleChange).toHaveBeenCalledWith(['banana']);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('aria-controls');
    });

    it('updates aria-expanded when list opens', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions}>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');

      await user.click(input);

      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-activedescendant for highlighted option', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions} defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      input.focus();

      await user.keyboard('{ArrowDown}');

      const activedescendant = input.getAttribute('aria-activedescendant');
      expect(activedescendant).toBeTruthy();
      expect(activedescendant).toContain('option-');
    });

    it('marks options with aria-selected', () => {
      render(
        <Autocomplete options={mockOptions} value="apple" defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const appleOption = screen.getByText('Apple').parentElement;
      expect(appleOption).toHaveAttribute('aria-selected', 'true');
    });

    it('marks disabled options with aria-disabled', () => {
      render(
        <Autocomplete options={mockOptionsWithDisabled} defaultOpen>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptionsWithDisabled.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const disabledOption = screen.getByText('Option 2').parentElement;
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      render(
        <Autocomplete options={mockOptions} disabled>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toBeDisabled();
    });

    it('does not open list when disabled', async () => {
      const user = userEvent.setup();

      render(
        <Autocomplete options={mockOptions} disabled>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      const list = screen.getByRole('listbox');
      expect(list).toHaveClass('opacity-0');
    });
  });

  describe('Error State', () => {
    it('applies error styling when error prop is true', () => {
      render(
        <Autocomplete options={mockOptions} error>
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveClass('border-destructive');
    });
  });

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(
        <Autocomplete options={mockOptions} size="small">
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveClass('h-8');
    });

    it('applies large size classes', () => {
      render(
        <Autocomplete options={mockOptions} size="large">
          <Autocomplete.Input />
          <Autocomplete.List>
            {mockOptions.map((option, index) => (
              <Autocomplete.Option key={option.value} option={option} index={index} />
            ))}
          </Autocomplete.List>
        </Autocomplete>
      );

      const input = screen.getByRole('combobox');
      expect(input).toHaveClass('h-12');
    });
  });
});
