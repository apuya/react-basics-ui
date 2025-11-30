import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormGroup } from './FormGroup';

describe('FormGroup', () => {
  // Basic Rendering
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(<FormGroup>Child content</FormGroup>);
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders legend when provided', () => {
      render(<FormGroup legend="Group Legend">Content</FormGroup>);
      expect(screen.getByText('Group Legend')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<FormGroup description="Group description">Content</FormGroup>);
      expect(screen.getByText('Group description')).toBeInTheDocument();
    });

    it('renders both legend and description', () => {
      render(
        <FormGroup legend="Title" description="Description text">
          Content
        </FormGroup>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });

  // Data Attributes
  describe('Data Attributes', () => {
    it('sets data-orientation to vertical by default', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('data-orientation', 'vertical');
    });

    it('sets data-orientation to horizontal when specified', () => {
      const { container } = render(<FormGroup orientation="horizontal">Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('sets data-error when error is true', () => {
      const { container } = render(<FormGroup error>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('data-error', 'true');
    });

    it('does not set data-error when error is false', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).not.toHaveAttribute('data-error');
    });
  });

  // Error States
  describe('Error States', () => {
    it('renders error message when error and errorMessage are provided', () => {
      render(
        <FormGroup error errorMessage="This field is required">
          Content
        </FormGroup>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('does not render error message when error is false', () => {
      render(
        <FormGroup error={false} errorMessage="This field is required">
          Content
        </FormGroup>
      );
      expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    });

    it('does not render error message when errorMessage is not provided', () => {
      const { container } = render(<FormGroup error>Content</FormGroup>);
      expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });

    it('sets role="alert" on error message', () => {
      render(
        <FormGroup error errorMessage="Error text">
          Content
        </FormGroup>
      );
      expect(screen.getByRole('alert')).toHaveTextContent('Error text');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('sets aria-invalid when error is true', () => {
      const { container } = render(<FormGroup error>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when error is false', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).not.toHaveAttribute('aria-invalid');
    });

    it('sets aria-describedby pointing to error message', () => {
      const { container } = render(
        <FormGroup error errorMessage="Error text" errorId="custom-error-id">
          Content
        </FormGroup>
      );
      const fieldset = container.querySelector('fieldset');
      expect(fieldset).toHaveAttribute('aria-describedby', 'custom-error-id');
      expect(screen.getByText('Error text')).toHaveAttribute('id', 'custom-error-id');
    });

    it('auto-generates error id when not provided', () => {
      const { container } = render(
        <FormGroup error errorMessage="Error text">
          Content
        </FormGroup>
      );
      const fieldset = container.querySelector('fieldset');
      const errorElement = screen.getByRole('alert');
      
      expect(fieldset).toHaveAttribute('aria-describedby');
      expect(errorElement).toHaveAttribute('id');
      expect(fieldset?.getAttribute('aria-describedby')).toBe(errorElement.getAttribute('id'));
    });

    it('does not set aria-describedby when no error', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).not.toHaveAttribute('aria-describedby');
    });

    it('uses semantic fieldset element', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toBeInTheDocument();
    });

    it('uses semantic legend element', () => {
      const { container } = render(<FormGroup legend="Title">Content</FormGroup>);
      expect(container.querySelector('legend')).toBeInTheDocument();
    });
  });

  // Orientation
  describe('Orientation', () => {
    it('applies vertical classes by default', () => {
      const { container } = render(
        <FormGroup>
          <span>Item 1</span>
          <span>Item 2</span>
        </FormGroup>
      );
      const childrenWrapper = container.querySelector('fieldset > div');
      expect(childrenWrapper).toHaveClass('flex-col');
    });

    it('applies horizontal classes when orientation is horizontal', () => {
      const { container } = render(
        <FormGroup orientation="horizontal">
          <span>Item 1</span>
          <span>Item 2</span>
        </FormGroup>
      );
      const childrenWrapper = container.querySelector('fieldset > div');
      expect(childrenWrapper).toHaveClass('flex-row');
    });
  });

  // Forwarded Props
  describe('Forwarded Props', () => {
    it('forwards ref to fieldset element', () => {
      const ref = { current: null as HTMLFieldSetElement | null };
      render(<FormGroup ref={ref}>Content</FormGroup>);
      expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
    });

    it('applies custom className', () => {
      const { container } = render(<FormGroup className="custom-class">Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveClass('custom-class');
    });

    it('passes through native fieldset props', () => {
      const { container } = render(
        <FormGroup disabled data-testid="test-group">
          Content
        </FormGroup>
      );
      expect(container.querySelector('fieldset')).toHaveAttribute('disabled');
      expect(container.querySelector('fieldset')).toHaveAttribute('data-testid', 'test-group');
    });
  });

  // Complex Content
  describe('Complex Content', () => {
    it('renders ReactNode as legend', () => {
      render(
        <FormGroup legend={<span data-testid="complex-legend">Complex Legend</span>}>
          Content
        </FormGroup>
      );
      expect(screen.getByTestId('complex-legend')).toBeInTheDocument();
    });

    it('renders ReactNode as description', () => {
      render(
        <FormGroup description={<em data-testid="complex-desc">Italic description</em>}>
          Content
        </FormGroup>
      );
      expect(screen.getByTestId('complex-desc')).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
      render(
        <FormGroup>
          <input type="checkbox" aria-label="Option 1" />
          <input type="checkbox" aria-label="Option 2" />
          <input type="checkbox" aria-label="Option 3" />
        </FormGroup>
      );
      expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    });
  });
});

describe('FormGroup displayName', () => {
  it('has correct displayName', () => {
    expect(FormGroup.displayName).toBe('FormGroup');
  });
});
