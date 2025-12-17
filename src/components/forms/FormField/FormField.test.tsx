import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField, FormFieldContext } from './FormField';

describe('FormField', () => {
  // =============================================================================
  // Rendering
  // =============================================================================

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<FormField>Child content</FormField>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(<FormField>Child content</FormField>);
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders as div element', () => {
      const { container } = render(<FormField>Content</FormField>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });
  });

  // =============================================================================
  // Compound Components
  // =============================================================================

  describe('Compound Components', () => {
    it('renders FormField.Label', () => {
      render(
        <FormField>
          <FormField.Label>Email</FormField.Label>
        </FormField>
      );
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders FormField.HelperText', () => {
      render(
        <FormField>
          <FormField.HelperText>Enter your email</FormField.HelperText>
        </FormField>
      );
      expect(screen.getByText('Enter your email')).toBeInTheDocument();
    });

    it('renders FormField.ErrorMessage when error is true', () => {
      render(
        <FormField error>
          <FormField.ErrorMessage>Email is required</FormField.ErrorMessage>
        </FormField>
      );
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('does not render FormField.ErrorMessage when error is false', () => {
      render(
        <FormField>
          <FormField.ErrorMessage>Email is required</FormField.ErrorMessage>
        </FormField>
      );
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });

    it('does not render FormField.HelperText when error is true', () => {
      render(
        <FormField error>
          <FormField.HelperText>Helper text</FormField.HelperText>
        </FormField>
      );
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  // =============================================================================
  // Context Sharing
  // =============================================================================

  describe('Context Sharing', () => {
    it('shares error state with sub-components', () => {
      render(
        <FormField error>
          <FormField.ErrorMessage>Error message</FormField.ErrorMessage>
        </FormField>
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('shares required state with Label', () => {
      render(
        <FormField required>
          <FormField.Label>Email</FormField.Label>
        </FormField>
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('shares helperId with helper text', () => {
      const { container } = render(
        <FormField helperId="custom-helper">
          <FormField.HelperText>Helper</FormField.HelperText>
        </FormField>
      );
      const helper = screen.getByText('Helper');
      expect(helper).toHaveAttribute('id', 'custom-helper');
    });

    it('auto-generates helperId when not provided', () => {
      const { container } = render(
        <FormField>
          <FormField.HelperText>Helper</FormField.HelperText>
        </FormField>
      );
      const helper = screen.getByText('Helper');
      expect(helper).toHaveAttribute('id');
      expect(helper.id).toContain('-helper');
    });
  });

  // =============================================================================
  // Required Indicator
  // =============================================================================

  describe('Required Indicator', () => {
    it('shows required indicator when required is true', () => {
      render(
        <FormField required>
          <FormField.Label>Email</FormField.Label>
        </FormField>
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('hides required indicator from screen readers', () => {
      render(
        <FormField required>
          <FormField.Label>Email</FormField.Label>
        </FormField>
      );
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not show required indicator when required is false', () => {
      render(
        <FormField>
          <FormField.Label>Email</FormField.Label>
        </FormField>
      );
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('sets data-required attribute when required', () => {
      const { container } = render(
        <FormField required>
          <FormField.Label>Email</FormField.Label>
        </FormField>
      );
      expect(container.firstChild).toHaveAttribute('data-required', 'true');
    });
  });

  // =============================================================================
  // Error State
  // =============================================================================

  describe('Error State', () => {
    it('renders error message when error is true', () => {
      render(
        <FormField error>
          <FormField.ErrorMessage>This field is required</FormField.ErrorMessage>
        </FormField>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('error message replaces helper text', () => {
      render(
        <FormField error>
          <FormField.HelperText>Helper</FormField.HelperText>
          <FormField.ErrorMessage>Error!</FormField.ErrorMessage>
        </FormField>
      );
      expect(screen.getByText('Error!')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('sets data-error attribute when error is true', () => {
      const { container } = render(
        <FormField error>
          <FormField.ErrorMessage>Error</FormField.ErrorMessage>
        </FormField>
      );
      expect(container.firstChild).toHaveAttribute('data-error', 'true');
    });

    it('does not set data-error when error is false', () => {
      const { container } = render(<FormField>Input</FormField>);
      expect(container.firstChild).not.toHaveAttribute('data-error');
    });

    it('adds role="alert" to error message', () => {
      render(
        <FormField error>
          <FormField.ErrorMessage>Error message</FormField.ErrorMessage>
        </FormField>
      );
      const errorParagraph = screen.getByText('Error message');
      expect(errorParagraph).toHaveAttribute('role', 'alert');
    });

    it('does not add role="alert" to helper text', () => {
      render(
        <FormField>
          <FormField.HelperText>Helper text</FormField.HelperText>
        </FormField>
      );
      const helperParagraph = screen.getByText('Helper text');
      expect(helperParagraph).not.toHaveAttribute('role');
    });
  });

  // =============================================================================
  // Disabled State
  // =============================================================================

  describe('Disabled State', () => {
    it('sets data-disabled attribute when disabled is true', () => {
      const { container } = render(<FormField disabled>Input</FormField>);
      expect(container.firstChild).toHaveAttribute('data-disabled', 'true');
    });

    it('does not set data-disabled when disabled is false', () => {
      const { container } = render(<FormField>Input</FormField>);
      expect(container.firstChild).not.toHaveAttribute('data-disabled');
    });
  });

  // =============================================================================
  // Context
  // =============================================================================

  describe('Context', () => {
    it('throws error when sub-component used outside FormField', () => {
      // Suppress console.error for this test
      const consoleError = console.error;
      console.error = () => {};

      expect(() => {
        render(<FormField.Label>Label</FormField.Label>);
      }).toThrow();

      console.error = consoleError;
    });

    it('has displayName set on context', () => {
      expect(FormFieldContext.displayName).toBe('FormFieldContext');
    });
  });

  // =============================================================================
  // Ref Forwarding
  // =============================================================================

  describe('Ref Forwarding', () => {
    it('forwards ref to root div element', () => {
      const ref = { current: null };
      render(<FormField ref={ref as any}>Content</FormField>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  // =============================================================================
  // Custom Props
  // =============================================================================

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<FormField className="custom-class">Content</FormField>);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards additional HTML attributes', () => {
      const { container } = render(
        <FormField data-testid="form-field">Content</FormField>
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'form-field');
    });
  });
});
