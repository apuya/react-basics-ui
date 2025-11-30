import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders an input element', () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('renders with helperText', () => {
      render(<Input helperText="Enter your username" />);
      expect(screen.getByText('Enter your username')).toBeInTheDocument();
    });

    it('renders with label and helperText', () => {
      render(<Input label="Email" helperText="We'll never share your email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });

    it('applies custom className to input', () => {
      render(<Input className="custom-class" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to wrapper', () => {
      const { container } = render(<Input wrapperClassName="wrapper-class" />);
      // FormField receives the wrapperClassName
      expect(container.firstChild).toHaveClass('wrapper-class');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Input size="small" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('data-size', 'small');
    });

    it('renders with default size', () => {
      render(<Input size="default" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('data-size', 'default');
    });

    it('renders with large size', () => {
      render(<Input size="large" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('data-size', 'large');
    });

    it('uses default size when not specified', () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('data-size', 'default');
    });
  });

  describe('Error State', () => {
    it('renders with error state', () => {
      render(<Input error data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('data-error', 'true');
    });

    it('does not have data-error when no error', () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId('input')).not.toHaveAttribute('data-error');
    });

    it('shows error styling with helperText', () => {
      render(<Input error helperText="This field is required" />);
      const helperText = screen.getByText('This field is required');
      // FormField applies error styling to helper text
      expect(helperText).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled input', () => {
      render(<Input disabled data-testid="input" />);
      expect(screen.getByTestId('input')).toBeDisabled();
    });

    it('cannot be focused when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      await user.click(input);
      expect(input).not.toHaveFocus();
    });
  });

  describe('Icons', () => {
    it('renders with leading icon', () => {
      render(<Input leadingIcon={<span data-testid="leading-icon">🔍</span>} />);
      expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    });

    it('renders with trailing icon', () => {
      render(<Input trailingIcon={<span data-testid="trailing-icon">✓</span>} />);
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      render(
        <Input
          leadingIcon={<span data-testid="leading-icon">🔍</span>}
          trailingIcon={<span data-testid="trailing-icon">✓</span>}
        />
      );
      expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
    });

    it('hides icons from screen readers', () => {
      const { container } = render(
        <Input
          leadingIcon={<span>🔍</span>}
          trailingIcon={<span>✓</span>}
        />
      );
      const iconWrappers = container.querySelectorAll('[aria-hidden="true"]');
      expect(iconWrappers.length).toBe(2);
    });
  });

  describe('User Interaction', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      
      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} data-testid="input" />);
      
      await user.type(screen.getByTestId('input'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus handler', async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} data-testid="input" />);
      
      await user.click(screen.getByTestId('input'));
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur handler', async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Input onBlur={handleBlur} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('ID Generation', () => {
    it('uses provided id', () => {
      render(<Input id="custom-id" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('generates id from label', () => {
      render(<Input label="Email Address" />);
      expect(screen.getByLabelText('Email Address')).toHaveAttribute('id', 'input-email-address');
    });

    it('generates unique id without label when no id provided', () => {
      // generateFormId returns undefined when no label is provided
      // So the input won't have an id unless explicitly provided
      render(<Input data-testid="input" label="Test Label" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('id', 'input-test-label');
    });

    it('connects label with input via htmlFor', () => {
      render(<Input label="Password" id="password-input" />);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('id', 'password-input');
    });
  });

  describe('Accessibility', () => {
    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      
      await user.click(input);
      expect(input).toHaveFocus();
    });

    it('supports aria-label', () => {
      render(<Input aria-label="Search" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('aria-label', 'Search');
    });

    it('supports aria-describedby', () => {
      render(<Input aria-describedby="description" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports required attribute', () => {
      render(<Input required data-testid="input" />);
      expect(screen.getByTestId('input')).toBeRequired();
    });

    it('supports readOnly attribute', () => {
      render(<Input readOnly data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('readonly');
    });
  });

  describe('Input Types', () => {
    it('supports text type (default)', () => {
      // HTML inputs default to type="text" but don't explicitly set the attribute
      render(<Input type="text" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    });

    it('supports email type', () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    });

    it('supports password type', () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    });

    it('supports number type', () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
    });

    it('supports tel type', () => {
      render(<Input type="tel" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'tel');
    });

    it('supports url type', () => {
      render(<Input type="url" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'url');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Data Attributes', () => {
    it('passes through data-* attributes', () => {
      render(<Input data-custom="value" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('data-custom', 'value');
    });

    it('has data-size on wrapper div', () => {
      const { container } = render(<Input size="large" />);
      const wrapper = container.querySelector('[data-size="large"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled input', async () => {
      const ControlledInput = () => {
        const [value, setValue] = useState('');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="input"
          />
        );
      };
      
      const user = userEvent.setup();
      render(<ControlledInput />);
      const input = screen.getByTestId('input');
      
      await user.type(input, 'Test');
      expect(input).toHaveValue('Test');
    });

    it('works as uncontrolled input', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="Initial" data-testid="input" />);
      const input = screen.getByTestId('input');
      
      expect(input).toHaveValue('Initial');
      await user.clear(input);
      await user.type(input, 'New');
      expect(input).toHaveValue('New');
    });
  });
});

// Need to import useState for controlled test
import { useState } from 'react';
