import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<SearchBar />);
      const input = screen.getByRole('searchbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Search...');
    });

    it('renders with custom placeholder', () => {
      render(<SearchBar placeholder="Find something..." />);
      expect(screen.getByPlaceholderText('Find something...')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<SearchBar value="test query" onChange={() => {}} />);
      expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
    });

    it('renders with custom leading icon', () => {
      render(<SearchBar leadingIcon={<span data-testid="custom-icon">🔍</span>} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders wrapper with custom className', () => {
      const { container } = render(<SearchBar wrapperClassName="custom-wrapper" />);
      expect(container.querySelector('.custom-wrapper')).toBeInTheDocument();
    });

    it('applies custom className to input', () => {
      render(<SearchBar className="custom-input" />);
      expect(screen.getByRole('searchbox')).toHaveClass('custom-input');
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<SearchBar size="small" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-size', 'small');
    });

    it('renders default size', () => {
      render(<SearchBar size="default" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-size', 'default');
    });

    it('renders large size', () => {
      render(<SearchBar size="large" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-size', 'large');
    });

    it('defaults to default size when not specified', () => {
      render(<SearchBar />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-size', 'default');
    });
  });

  describe('Visual Variants', () => {
    it('renders outline variant by default', () => {
      render(<SearchBar />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-variant', 'outline');
    });

    it('renders outline variant', () => {
      render(<SearchBar variant="outline" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-variant', 'outline');
    });

    it('renders filled variant', () => {
      render(<SearchBar variant="filled" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-variant', 'filled');
    });

    it('renders ghost variant', () => {
      render(<SearchBar variant="ghost" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-variant', 'ghost');
    });
  });

  describe('Error State', () => {
    it('sets data-error attribute when error is true', () => {
      render(<SearchBar error />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-error', 'true');
    });

    it('does not have data-error when error is false', () => {
      render(<SearchBar error={false} />);
      expect(screen.getByRole('searchbox')).not.toHaveAttribute('data-error');
    });

    it('sets aria-invalid when error is true', () => {
      render(<SearchBar error />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when error is false', () => {
      render(<SearchBar error={false} />);
      expect(screen.getByRole('searchbox')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Loading State', () => {
    it('shows spinner when loading', () => {
      render(<SearchBar isLoading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('sets data-loading attribute when loading', () => {
      render(<SearchBar isLoading />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-loading', 'true');
    });

    it('does not have data-loading when not loading', () => {
      render(<SearchBar isLoading={false} />);
      expect(screen.getByRole('searchbox')).not.toHaveAttribute('data-loading');
    });

    it('hides clear button when loading', () => {
      render(<SearchBar isLoading value="test" onChange={() => {}} showClearButton />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('hides shortcut badge when loading', () => {
      render(<SearchBar isLoading showShortcut shortcutText="⌘K" />);
      expect(screen.queryByText('⌘K')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled', () => {
      render(<SearchBar disabled />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('disables search button when disabled', () => {
      render(<SearchBar disabled showSearchButton value="test" onChange={() => {}} />);
      expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    });
  });

  describe('Clear Button', () => {
    it('shows clear button when showClearButton is true and has value', () => {
      render(<SearchBar showClearButton value="test" onChange={() => {}} />);
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('hides clear button when value is empty', () => {
      render(<SearchBar showClearButton value="" onChange={() => {}} />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('hides clear button when showClearButton is false', () => {
      render(<SearchBar showClearButton={false} value="test" onChange={() => {}} />);
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('calls onClear when clear button is clicked', async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
      render(<SearchBar value="test" onChange={() => {}} onClear={onClear} showClearButton />);
      
      await user.click(screen.getByLabelText('Clear search'));
      expect(onClear).toHaveBeenCalledTimes(1);
    });

    it('calls onChange with empty value when clear button is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar value="test" onChange={onChange} showClearButton />);
      
      await user.click(screen.getByLabelText('Clear search'));
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: '' }),
      }));
    });

    it('has negative tabIndex for clear button', () => {
      render(<SearchBar showClearButton value="test" onChange={() => {}} />);
      expect(screen.getByLabelText('Clear search')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Search Button', () => {
    it('shows search button when showSearchButton is true', () => {
      render(<SearchBar showSearchButton value="test" onChange={() => {}} />);
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('hides search button when showSearchButton is false', () => {
      render(<SearchBar showSearchButton={false} />);
      expect(screen.queryByRole('button', { name: 'Search' })).not.toBeInTheDocument();
    });

    it('disables search button when value is empty', () => {
      render(<SearchBar showSearchButton value="" onChange={() => {}} />);
      expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
    });

    it('enables search button when value is present', () => {
      render(<SearchBar showSearchButton value="test" onChange={() => {}} />);
      expect(screen.getByRole('button', { name: 'Search' })).not.toBeDisabled();
    });

    it('calls onSearch when search button is clicked', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<SearchBar showSearchButton value="test query" onChange={() => {}} onSearch={onSearch} />);
      
      await user.click(screen.getByRole('button', { name: 'Search' }));
      expect(onSearch).toHaveBeenCalledWith('test query');
    });
  });

  describe('Shortcut Badge', () => {
    it('shows shortcut badge when showShortcut is true and no value', () => {
      render(<SearchBar showShortcut shortcutText="⌘K" />);
      expect(screen.getByText('⌘K')).toBeInTheDocument();
    });

    it('uses default shortcut text when not specified', () => {
      render(<SearchBar showShortcut />);
      expect(screen.getByText('⌘K')).toBeInTheDocument();
    });

    it('renders custom shortcut text', () => {
      render(<SearchBar showShortcut shortcutText="Ctrl+K" />);
      expect(screen.getByText('Ctrl+K')).toBeInTheDocument();
    });

    it('hides shortcut badge when has value', () => {
      render(<SearchBar showShortcut value="test" onChange={() => {}} />);
      expect(screen.queryByText('⌘K')).not.toBeInTheDocument();
    });

    it('has aria-hidden on shortcut badge', () => {
      render(<SearchBar showShortcut />);
      expect(screen.getByText('⌘K')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Keyboard Interaction', () => {
    it('calls onSearch when Enter is pressed with value', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<SearchBar value="test query" onChange={() => {}} onSearch={onSearch} />);
      
      const input = screen.getByRole('searchbox');
      await user.click(input);
      await user.keyboard('{Enter}');
      
      expect(onSearch).toHaveBeenCalledWith('test query');
    });

    it('does not call onSearch when Enter is pressed with empty value', async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
      render(<SearchBar value="" onChange={() => {}} onSearch={onSearch} />);
      
      const input = screen.getByRole('searchbox');
      await user.click(input);
      await user.keyboard('{Enter}');
      
      expect(onSearch).not.toHaveBeenCalled();
    });

    it('calls original onKeyDown handler', async () => {
      const user = userEvent.setup();
      const onKeyDown = vi.fn();
      render(<SearchBar onKeyDown={onKeyDown} />);
      
      const input = screen.getByRole('searchbox');
      await user.click(input);
      await user.keyboard('a');
      
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('prevents default on Enter when onSearch is provided', async () => {
      const onSearch = vi.fn();
      render(<SearchBar value="test" onChange={() => {}} onSearch={onSearch} />);
      
      const input = screen.getByRole('searchbox');
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      fireEvent(input, event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('User Input', () => {
    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<SearchBar value="" onChange={onChange} />);
      
      const input = screen.getByRole('searchbox');
      await user.type(input, 'test');
      
      expect(onChange).toHaveBeenCalled();
    });

    it('accepts value updates from parent', () => {
      const { rerender } = render(<SearchBar value="initial" onChange={() => {}} />);
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
      
      rerender(<SearchBar value="updated" onChange={() => {}} />);
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role searchbox', () => {
      render(<SearchBar />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('has aria-label for search input', () => {
      render(<SearchBar />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('aria-label', 'Search');
    });

    it('has aria-label for clear button', () => {
      render(<SearchBar showClearButton value="test" onChange={() => {}} />);
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('has aria-label for search button', () => {
      render(<SearchBar showSearchButton value="test" onChange={() => {}} />);
      // Both input and button have aria-label="Search", so we query by role
      expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('aria-label', 'Search');
    });

    it('is focusable', () => {
      render(<SearchBar />);
      const input = screen.getByRole('searchbox');
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('is not focusable when disabled', () => {
      render(<SearchBar disabled />);
      const input = screen.getByRole('searchbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<SearchBar ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('ref allows programmatic focus', () => {
      const ref = createRef<HTMLInputElement>();
      render(<SearchBar ref={ref} />);
      
      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });

    it('ref exposes input value', () => {
      const ref = createRef<HTMLInputElement>();
      render(<SearchBar ref={ref} value="test value" onChange={() => {}} />);
      
      expect(ref.current?.value).toBe('test value');
    });
  });

  describe('Input Type', () => {
    it('renders as search type input', () => {
      render(<SearchBar />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    });
  });

  describe('Spreading Props', () => {
    it('spreads additional props to input', () => {
      render(<SearchBar data-custom="value" autoComplete="off" />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('data-custom', 'value');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });

    it('supports name attribute', () => {
      render(<SearchBar name="search-field" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'search-field');
    });

    it('supports id attribute', () => {
      render(<SearchBar id="custom-search" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'custom-search');
    });
  });

  describe('Combined States', () => {
    it('shows spinner but not clear button when loading with value', () => {
      render(<SearchBar isLoading value="test" onChange={() => {}} showClearButton />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('shows search button and spinner simultaneously', () => {
      render(<SearchBar isLoading showSearchButton value="test" onChange={() => {}} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('shows clear button but not shortcut when has value', () => {
      render(<SearchBar showClearButton showShortcut value="test" onChange={() => {}} />);
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
      expect(screen.queryByText('⌘K')).not.toBeInTheDocument();
    });
  });
});
