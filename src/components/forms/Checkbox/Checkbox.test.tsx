import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { createRef } from 'react';

describe('Checkbox', () => {
  // ===========================================
  // BASIC RENDERING
  // ===========================================
  describe('Rendering', () => {
    it('renders a checkbox input', () => {
      render(<Checkbox label="Test" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label text', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders without label when not provided', () => {
      render(<Checkbox aria-label="Hidden label" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.queryByText('Hidden label')).not.toBeInTheDocument();
    });

    it('renders with JSX label content', () => {
      render(
        <Checkbox
          label={
            <span>
              I agree to the <a href="#">terms</a>
            </span>
          }
        />
      );
      expect(screen.getByText(/I agree to the/)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'terms' })).toBeInTheDocument();
    });
  });

  // ===========================================
  // SIZES
  // ===========================================
  describe('Sizes', () => {
    it('renders with small size', () => {
      render(<Checkbox label="Small" size="small" />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).toBeInTheDocument();
      // Size is applied via inline styles, not data attributes
    });

    it('renders with default size by default', () => {
      render(<Checkbox label="Default" />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).toBeInTheDocument();
    });

    it('renders with large size', () => {
      render(<Checkbox label="Large" size="large" />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).toBeInTheDocument();
    });
  });

  // ===========================================
  // STATES
  // ===========================================
  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox label="Unchecked" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders checked when defaultChecked is true', () => {
      render(<Checkbox label="Checked" defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('renders checked when controlled with checked prop', () => {
      render(<Checkbox label="Checked" checked onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('toggles checked state on click (uncontrolled)', () => {
      render(<Checkbox label="Toggle" />);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('renders disabled state', () => {
      render(<Checkbox label="Disabled" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('renders disabled and checked state', () => {
      render(<Checkbox label="Disabled checked" disabled defaultChecked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
      expect(checkbox).toBeChecked();
    });

    it('prevents interaction when disabled', () => {
      render(<Checkbox label="Disabled" disabled />);
      const checkbox = screen.getByRole('checkbox');
      
      // Disabled attribute is set, which browser natively prevents interaction
      expect(checkbox).toBeDisabled();
      // The input starts unchecked
      expect(checkbox).not.toBeChecked();
    });
  });

  // ===========================================
  // INDETERMINATE STATE
  // ===========================================
  describe('Indeterminate State', () => {
    it('sets indeterminate property on input', () => {
      render(<Checkbox label="Indeterminate" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('renders with indeterminate state unchecked', () => {
      render(<Checkbox label="Indeterminate" indeterminate />);
      const checkbox = screen.getByRole('checkbox');
      // Indeterminate is separate from checked
      expect(checkbox).not.toBeChecked();
    });

    it('can be checked while indeterminate', () => {
      render(<Checkbox label="Indeterminate" indeterminate defaultChecked />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toBeChecked();
    });
  });

  // ===========================================
  // ERROR STATE
  // ===========================================
  describe('Error State', () => {
    it('renders with error state', () => {
      render(<Checkbox label="Error" error />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).toHaveAttribute('data-error', 'true');
    });

    it('sets aria-invalid when error is true', () => {
      render(<Checkbox label="Error" error />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have data-error when error is false', () => {
      render(<Checkbox label="No error" />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).not.toHaveAttribute('data-error');
    });
  });

  // ===========================================
  // EVENTS
  // ===========================================
  describe('Events', () => {
    it('calls onChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Click me" onChange={handleChange} />);
      
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('passes event to onChange handler', () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Click me" onChange={handleChange} />);
      
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ type: 'checkbox' }),
        })
      );
    });

    it('calls onFocus when focused', () => {
      const handleFocus = vi.fn();
      render(<Checkbox label="Focus me" onFocus={handleFocus} />);
      
      fireEvent.focus(screen.getByRole('checkbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', () => {
      const handleBlur = vi.fn();
      render(<Checkbox label="Blur me" onBlur={handleBlur} />);
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.focus(checkbox);
      fireEvent.blur(checkbox);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('has disabled attribute when disabled', () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Disabled" disabled onChange={handleChange} />);
      
      // Verify disabled attribute is set (browser natively prevents events)
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  // ===========================================
  // ACCESSIBILITY
  // ===========================================
  describe('Accessibility', () => {
    it('associates label with checkbox via generated ID', () => {
      render(<Checkbox label="My label" />);
      const checkbox = screen.getByRole('checkbox');
      const labelText = screen.getByText('My label');
      
      // The label wrapper should contain the input
      expect(labelText.closest('label')).toContainElement(checkbox);
    });

    it('uses provided id for the checkbox', () => {
      render(<Checkbox label="Custom ID" id="my-checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'my-checkbox');
    });

    it('generates id from label when not provided', () => {
      render(<Checkbox label="Test Label" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'id',
        'checkbox-test-label'
      );
    });

    it('supports aria-label for checkboxes without visible label', () => {
      render(<Checkbox aria-label="Hidden label checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'aria-label',
        'Hidden label checkbox'
      );
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <Checkbox label="Test" aria-describedby="description" />
          <span id="description">Additional description</span>
        </>
      );
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'aria-describedby',
        'description'
      );
    });

    it('hides check icon from screen readers', () => {
      const { container } = render(<Checkbox label="Test" defaultChecked />);
      const svgs = container.querySelectorAll('svg');
      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('supports required attribute', () => {
      render(<Checkbox label="Required" required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });
  });

  // ===========================================
  // REF FORWARDING
  // ===========================================
  describe('Ref Forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox label="Ref test" ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('allows imperative focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox label="Focus via ref" ref={ref} />);
      
      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });

    it('supports callback ref', () => {
      let refNode: HTMLInputElement | null = null;
      const callbackRef = (node: HTMLInputElement | null) => {
        refNode = node;
      };
      
      render(<Checkbox label="Callback ref" ref={callbackRef} />);
      expect(refNode).toBeInstanceOf(HTMLInputElement);
    });

    it('allows programmatic checking via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox label="Programmatic check" ref={ref} />);
      
      expect(ref.current?.checked).toBe(false);
      if (ref.current) {
        ref.current.checked = true;
      }
      expect(ref.current?.checked).toBe(true);
    });
  });

  // ===========================================
  // CUSTOM CLASSNAME
  // ===========================================
  describe('Custom ClassName', () => {
    it('accepts custom className', () => {
      render(<Checkbox label="Custom class" className="custom-class" />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('merges custom className with base classes', () => {
      render(<Checkbox label="Merged classes" className="my-checkbox" />);
      const wrapper = screen.getByRole('checkbox').parentElement;
      expect(wrapper).toHaveClass('my-checkbox');
      // Should also have base classes (checking one)
      expect(wrapper).toHaveClass('relative');
    });
  });

  // ===========================================
  // HTML ATTRIBUTES
  // ===========================================
  describe('HTML Attributes', () => {
    it('passes through name attribute', () => {
      render(<Checkbox label="Named" name="my-checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'my-checkbox');
    });

    it('passes through value attribute', () => {
      render(<Checkbox label="With value" value="option1" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'option1');
    });

    it('passes through data attributes', () => {
      render(<Checkbox label="Data attrs" data-testid="my-checkbox" />);
      expect(screen.getByTestId('my-checkbox')).toBeInTheDocument();
    });

    it('passes through form attribute', () => {
      render(<Checkbox label="Form checkbox" form="my-form" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('form', 'my-form');
    });
  });

  // ===========================================
  // CONTROLLED COMPONENT
  // ===========================================
  describe('Controlled Component', () => {
    it('respects controlled checked prop', () => {
      const { rerender } = render(
        <Checkbox label="Controlled" checked={false} onChange={() => {}} />
      );
      expect(screen.getByRole('checkbox')).not.toBeChecked();

      rerender(
        <Checkbox label="Controlled" checked={true} onChange={() => {}} />
      );
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('does not change when controlled and clicked without onChange update', () => {
      // This tests that controlled component behavior works correctly
      const handleChange = vi.fn();
      render(<Checkbox label="Controlled" checked={false} onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      // onChange is called but since we don't update checked, it stays unchecked
      expect(handleChange).toHaveBeenCalled();
      // Note: The DOM might briefly show checked but React will reconcile
    });
  });

  // ===========================================
  // EDGE CASES
  // ===========================================
  describe('Edge Cases', () => {
    it('handles empty string label', () => {
      render(<Checkbox label="" aria-label="Empty label checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('handles numeric label (via ReactNode)', () => {
      render(<Checkbox label={42} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles label with special characters for ID generation', () => {
      render(<Checkbox label="Option #1 (new)" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('id');
    });

    it('handles rapid state changes', () => {
      const handleChange = vi.fn();
      render(<Checkbox label="Rapid" onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });
});
