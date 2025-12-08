import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  // Basic Rendering
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

  // Label Tests
  it('renders label when provided', () => {
    render(<FormField label="Email">Input</FormField>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = render(<FormField>Input</FormField>);
    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('associates label with htmlFor', () => {
    const { container } = render(
      <FormField label="Email" htmlFor="email-input">
        <input id="email-input" />
      </FormField>
    );
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  // Required Indicator Tests
  it('shows required indicator when required is true', () => {
    render(
      <FormField label="Email" required>
        Input
      </FormField>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('hides required indicator from screen readers', () => {
    render(
      <FormField label="Email" required>
        Input
      </FormField>
    );
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not show required indicator when required is false', () => {
    render(<FormField label="Email">Input</FormField>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('sets data-required attribute when required', () => {
    const { container } = render(
      <FormField label="Email" required>
        Input
      </FormField>
    );
    expect(container.firstChild).toHaveAttribute('data-required', 'true');
  });

  // Helper Text Tests
  it('renders helper text when provided', () => {
    render(<FormField helperText="Enter your email address">Input</FormField>);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('does not render helper text when not provided', () => {
    const { container } = render(<FormField>Input</FormField>);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('generates id for helper text element', () => {
    const { container } = render(
      <FormField helperText="Helper text">Input</FormField>
    );
    const helperParagraph = container.querySelector('p');
    expect(helperParagraph).toHaveAttribute('id');
    expect(helperParagraph?.id).toContain('-helper');
  });

  it('uses custom helperId when provided', () => {
    const { container } = render(
      <FormField helperText="Helper text" helperId="custom-helper-id">
        Input
      </FormField>
    );
    const helperParagraph = container.querySelector('p');
    expect(helperParagraph).toHaveAttribute('id', 'custom-helper-id');
  });

  // Error State Tests
  it('renders error message when error is true', () => {
    render(
      <FormField error errorMessage="This field is required">
        Input
      </FormField>
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('error message replaces helper text when both are provided', () => {
    render(
      <FormField error errorMessage="Error!" helperText="Helper">
        Input
      </FormField>
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('shows helper text when error is true but no errorMessage provided', () => {
    render(
      <FormField error helperText="Helper">
        Input
      </FormField>
    );
    expect(screen.getByText('Helper')).toBeInTheDocument();
  });

  it('sets data-error attribute when error is true', () => {
    const { container } = render(
      <FormField error errorMessage="Error">
        Input
      </FormField>
    );
    expect(container.firstChild).toHaveAttribute('data-error', 'true');
  });

  it('does not set data-error when error is false', () => {
    const { container } = render(<FormField>Input</FormField>);
    expect(container.firstChild).not.toHaveAttribute('data-error');
  });

  it('adds role="alert" to error message', () => {
    const { container } = render(
      <FormField error errorMessage="Error message">
        Input
      </FormField>
    );
    const errorParagraph = container.querySelector('p');
    expect(errorParagraph).toHaveAttribute('role', 'alert');
  });

  it('does not add role="alert" to helper text', () => {
    const { container } = render(
      <FormField helperText="Helper text">Input</FormField>
    );
    const helperParagraph = container.querySelector('p');
    expect(helperParagraph).not.toHaveAttribute('role');
  });

  // Disabled State Tests
  it('sets data-disabled attribute when disabled is true', () => {
    const { container } = render(<FormField disabled>Input</FormField>);
    expect(container.firstChild).toHaveAttribute('data-disabled', 'true');
  });

  it('does not set data-disabled when disabled is false', () => {
    const { container } = render(<FormField>Input</FormField>);
    expect(container.firstChild).not.toHaveAttribute('data-disabled');
  });

  // Styling & Props Tests
  it('applies custom className', () => {
    const { container } = render(
      <FormField className="custom-class">Input</FormField>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes additional props to wrapper div', () => {
    const { container } = render(
      <FormField data-testid="form-field">Input</FormField>
    );
    expect(container.querySelector('[data-testid="form-field"]')).toBeInTheDocument();
  });

  it('forwards ref to wrapper div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FormField ref={ref}>Input</FormField>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // Integration Tests
  it('renders complete form field with all features', () => {
    const { container } = render(
      <FormField
        label="Email"
        htmlFor="email"
        required
        error
        errorMessage="Invalid email"
        helperId="email-error"
      >
        <input id="email" aria-describedby="email-error" />
      </FormField>
    );

    // Label with required indicator
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();

    // Input
    expect(container.querySelector('input')).toBeInTheDocument();

    // Error message with correct id
    const errorElement = screen.getByText('Invalid email');
    expect(errorElement).toHaveAttribute('id', 'email-error');
    expect(errorElement).toHaveAttribute('role', 'alert');

    // Data attributes
    expect(container.firstChild).toHaveAttribute('data-error', 'true');
    expect(container.firstChild).toHaveAttribute('data-required', 'true');
  });
});
