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

    it('forwards ref to fieldset element', () => {
      const ref = { current: null };
      render(<FormGroup ref={ref}>Content</FormGroup>);
      expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
    });
  });

  // Compound Components
  describe('Compound Components', () => {
    it('renders with FormGroup.Legend sub-component', () => {
      render(
        <FormGroup>
          <FormGroup.Legend>Group Legend</FormGroup.Legend>
          <div>Content</div>
        </FormGroup>
      );
      expect(screen.getByText('Group Legend')).toBeInTheDocument();
      expect(screen.getByText('Group Legend').tagName).toBe('LEGEND');
    });

    it('renders with FormGroup.Description sub-component', () => {
      render(
        <FormGroup>
          <FormGroup.Description>Group description</FormGroup.Description>
          <div>Content</div>
        </FormGroup>
      );
      expect(screen.getByText('Group description')).toBeInTheDocument();
    });

    it('renders with FormGroup.ErrorMessage sub-component when error is true', () => {
      render(
        <FormGroup error>
          <FormGroup.ErrorMessage>Error message</FormGroup.ErrorMessage>
          <div>Content</div>
        </FormGroup>
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('Error message');
    });

    it('does not render FormGroup.ErrorMessage when error is false', () => {
      render(
        <FormGroup>
          <FormGroup.ErrorMessage>Error message</FormGroup.ErrorMessage>
          <div>Content</div>
        </FormGroup>
      );
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });

    it('renders all sub-components together', () => {
      render(
        <FormGroup error>
          <FormGroup.Legend>Title</FormGroup.Legend>
          <FormGroup.Description>Description text</FormGroup.Description>
          <div>Content</div>
          <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
        </FormGroup>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
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

    it('sets data-disabled when disabled is true', () => {
      const { container } = render(<FormGroup disabled>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('data-disabled', 'true');
    });
  });

  // Context Sharing
  describe('Context Sharing', () => {
    it('shares error state with ErrorMessage sub-component', () => {
      render(
        <FormGroup error>
          <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
        </FormGroup>
      );
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('shares errorId with ErrorMessage sub-component', () => {
      render(
        <FormGroup error errorId="custom-id">
          <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
        </FormGroup>
      );
      expect(screen.getByText('Error text')).toHaveAttribute('id', 'custom-id');
    });

    it('auto-generates errorId when not provided', () => {
      const { container } = render(
        <FormGroup error>
          <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
        </FormGroup>
      );
      const fieldset = container.querySelector('fieldset');
      const errorElement = screen.getByRole('alert');
      
      expect(fieldset).toHaveAttribute('aria-describedby');
      expect(errorElement).toHaveAttribute('id');
      expect(fieldset?.getAttribute('aria-describedby')).toBe(errorElement.getAttribute('id'));
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

    it('sets aria-describedby pointing to error message when error is true', () => {
      const { container } = render(
        <FormGroup error errorId="custom-error-id">
          <FormGroup.ErrorMessage>Error text</FormGroup.ErrorMessage>
        </FormGroup>
      );
      const fieldset = container.querySelector('fieldset');
      expect(fieldset).toHaveAttribute('aria-describedby', 'custom-error-id');
      expect(screen.getByText('Error text')).toHaveAttribute('id', 'custom-error-id');
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
      render(
        <FormGroup>
          <FormGroup.Legend>Title</FormGroup.Legend>
        </FormGroup>
      );
      expect(screen.getByText('Title').tagName).toBe('LEGEND');
    });

    it('sets disabled attribute on fieldset', () => {
      const { container } = render(<FormGroup disabled>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toBeDisabled();
    });
  });

  // Orientation
  describe('Orientation', () => {
    it('sets data-orientation to vertical by default', () => {
      const { container } = render(<FormGroup>Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('data-orientation', 'vertical');
    });

    it('sets data-orientation to horizontal', () => {
      const { container } = render(<FormGroup orientation="horizontal">Content</FormGroup>);
      expect(container.querySelector('fieldset')).toHaveAttribute('data-orientation', 'horizontal');
    });
  });

  // Forwarded Props
  describe('Forwarded Props', () => {
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
      expect(container.querySelector('fieldset')).toBeDisabled();
      expect(container.querySelector('fieldset')).toHaveAttribute('data-testid', 'test-group');
    });
  });

  // Complex Content
  describe('Complex Content', () => {
    it('renders ReactNode in Legend sub-component', () => {
      render(
        <FormGroup>
          <FormGroup.Legend>
            <span data-testid="complex-legend">Complex Legend</span>
          </FormGroup.Legend>
        </FormGroup>
      );
      expect(screen.getByTestId('complex-legend')).toBeInTheDocument();
    });

    it('renders ReactNode in Description sub-component', () => {
      render(
        <FormGroup>
          <FormGroup.Description>
            <em data-testid="complex-desc">Italic description</em>
          </FormGroup.Description>
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
  it('has correct displayName for root component', () => {
    expect(FormGroup.displayName).toBe('FormGroup');
  });

  it('has correct displayName for Legend sub-component', () => {
    expect(FormGroup.Legend.displayName).toBe('FormGroup.Legend');
  });

  it('has correct displayName for Description sub-component', () => {
    expect(FormGroup.Description.displayName).toBe('FormGroup.Description');
  });

  it('has correct displayName for ErrorMessage sub-component', () => {
    expect(FormGroup.ErrorMessage.displayName).toBe('FormGroup.ErrorMessage');
  });
});
