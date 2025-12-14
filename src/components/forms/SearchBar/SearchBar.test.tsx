import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { SearchBar } from './SearchBar';
import { Icon } from '@/components/utility/Icon';
import { BiSearch, BiX } from 'react-icons/bi';

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

    it('renders with leading icon', () => {
      render(<SearchBar leadingIcon={<Icon icon={BiSearch} data-testid="search-icon" />} />);
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders with trailing icon', () => {
      render(<SearchBar trailingIcon={<Icon icon={BiX} data-testid="clear-icon" />} />);
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
    });

    it('renders without leading icon when not provided', () => {
      const { container } = render(<SearchBar />);
      expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
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
      const { container } = render(<SearchBar size="small" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-size', 'small');
    });

    it('renders default size', () => {
      const { container } = render(<SearchBar size="default" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-size', 'default');
    });

    it('renders large size', () => {
      const { container } = render(<SearchBar size="large" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-size', 'large');
    });

    it('defaults to default size when not specified', () => {
      const { container } = render(<SearchBar />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-size', 'default');
    });
  });

  describe('Visual Variants', () => {
    it('renders outline variant by default', () => {
      const { container } = render(<SearchBar />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-variant', 'outline');
    });

    it('renders outline variant', () => {
      const { container } = render(<SearchBar variant="outline" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-variant', 'outline');
    });

    it('renders filled variant', () => {
      const { container } = render(<SearchBar variant="filled" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-variant', 'filled');
    });

    it('renders ghost variant', () => {
      const { container } = render(<SearchBar variant="ghost" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-variant', 'ghost');
    });
  });

  describe('Error State', () => {
    it('sets data-error attribute when error is true', () => {
      const { container } = render(<SearchBar error />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-error', 'true');
    });

    it('does not have data-error when error is false', () => {
      const { container } = render(<SearchBar error={false} />);
      const wrapper = container.firstChild;
      expect(wrapper).not.toHaveAttribute('data-error');
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

  describe('Disabled State', () => {
    it('disables input when disabled', () => {
      render(<SearchBar disabled />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('sets data-disabled attribute when disabled', () => {
      const { container } = render(<SearchBar disabled />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-disabled', 'true');
    });

    it('does not have data-disabled when not disabled', () => {
      const { container } = render(<SearchBar disabled={false} />);
      const wrapper = container.firstChild;
      expect(wrapper).not.toHaveAttribute('data-disabled');
    });
  });

  describe('Props Slots', () => {
    it('positions leading icon correctly', () => {
      render(
        <SearchBar leadingIcon={<span data-testid="leading">icon</span>} />
      );
      const icon = screen.getByTestId('leading').parentElement;
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('positions trailing icon correctly', () => {
      render(
        <SearchBar trailingIcon={<span data-testid="trailing">icon</span>} />
      );
      const icon = screen.getByTestId('trailing').parentElement;
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders both leading and trailing icons', () => {
      render(
        <SearchBar
          leadingIcon={<span data-testid="leading">search</span>}
          trailingIcon={<span data-testid="trailing">clear</span>}
        />
      );
      expect(screen.getByTestId('leading')).toBeInTheDocument();
      expect(screen.getByTestId('trailing')).toBeInTheDocument();
    });

    it('accepts any ReactNode as leading icon', () => {
      render(
        <SearchBar
          leadingIcon={
            <div data-testid="custom-element">
              <span>Custom</span>
            </div>
          }
        />
      );
      expect(screen.getByTestId('custom-element')).toBeInTheDocument();
    });

    it('accepts any ReactNode as trailing icon', () => {
      render(
        <SearchBar
          trailingIcon={
            <button data-testid="custom-button">Clear</button>
          }
        />
      );
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
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

    it('does not call onSearch when onSearch is not provided', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="test" onChange={() => {}} />);
      
      const input = screen.getByRole('searchbox');
      await user.click(input);
      // Should not throw
      await user.keyboard('{Enter}');
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

    it('icon containers have aria-hidden', () => {
      render(
        <SearchBar
          leadingIcon={<span>🔍</span>}
          trailingIcon={<span>✕</span>}
        />
      );
      const icons = document.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBe(2);
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

  describe('Layout & Styling', () => {
    it('adjusts padding when leadingIcon is provided', () => {
      const { rerender } = render(<SearchBar />);
      const inputWithout = screen.getByRole('searchbox');
      const styleWithout = window.getComputedStyle(inputWithout);
      
      rerender(<SearchBar leadingIcon={<span>icon</span>} />);
      const inputWith = screen.getByRole('searchbox');
      const styleWith = window.getComputedStyle(inputWith);
      
      // paddingLeft should be different
      expect(styleWith.paddingLeft).not.toBe(styleWithout.paddingLeft);
    });

    it('adjusts padding when trailingIcon is provided', () => {
      const { rerender } = render(<SearchBar />);
      const inputWithout = screen.getByRole('searchbox');
      const styleWithout = window.getComputedStyle(inputWithout);
      
      rerender(<SearchBar trailingIcon={<span>icon</span>} />);
      const inputWith = screen.getByRole('searchbox');
      const styleWith = window.getComputedStyle(inputWith);
      
      // paddingRight should be different
      expect(styleWith.paddingRight).not.toBe(styleWithout.paddingRight);
    });
  });
});
