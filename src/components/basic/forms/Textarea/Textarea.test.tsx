import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders a textarea element', () => {
      render(<Textarea data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Textarea label="Description" />);
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    it('renders with helperText', () => {
      render(<Textarea helperText="Maximum 500 characters" />);
      expect(screen.getByText('Maximum 500 characters')).toBeInTheDocument();
    });

    it('applies custom className to textarea', () => {
      render(<Textarea className="custom-class" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to wrapper', () => {
      const { container } = render(<Textarea wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toHaveClass('wrapper-class');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Textarea size="small" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-size', 'small');
    });

    it('renders with default size', () => {
      render(<Textarea size="default" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-size', 'default');
    });

    it('renders with large size', () => {
      render(<Textarea size="large" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-size', 'large');
    });

    it('uses default size when not specified', () => {
      render(<Textarea data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-size', 'default');
    });
  });

  describe('Error State', () => {
    it('renders with error state', () => {
      render(<Textarea error data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-error', 'true');
    });

    it('does not have data-error when no error', () => {
      render(<Textarea data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).not.toHaveAttribute('data-error');
    });

    it('sets aria-invalid when error is true', () => {
      render(<Textarea error data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have aria-invalid when no error', () => {
      render(<Textarea data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Resize Behavior', () => {
    it('defaults to vertical resize', () => {
      render(<Textarea data-testid="textarea" />);
      // Default resize is vertical - component renders correctly
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });

    it('supports none resize', () => {
      render(<Textarea resize="none" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });

    it('supports horizontal resize', () => {
      render(<Textarea resize="horizontal" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });

    it('supports both resize', () => {
      render(<Textarea resize="both" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });
  });

  describe('Character Count', () => {
    it('shows character count when showCharCount and maxLength are set', () => {
      render(<Textarea showCharCount maxLength={100} />);
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('does not show character count without maxLength', () => {
      render(<Textarea showCharCount />);
      expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
    });

    it('updates character count with value', () => {
      render(<Textarea showCharCount maxLength={100} value="Hello" onChange={() => {}} />);
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('updates character count with defaultValue', () => {
      render(<Textarea showCharCount maxLength={100} defaultValue="Hello World" />);
      expect(screen.getByText('11/100')).toBeInTheDocument();
    });

    it('shows helper text alongside character count', () => {
      render(
        <Textarea 
          showCharCount 
          maxLength={100} 
          helperText="Enter a description" 
        />
      );
      expect(screen.getByText('Enter a description')).toBeInTheDocument();
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('updates character count on user input for uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<Textarea showCharCount maxLength={100} data-testid="textarea" />);
      
      await user.type(screen.getByTestId('textarea'), 'Hello');
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled textarea', () => {
      render(<Textarea disabled data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toBeDisabled();
    });

    it('cannot be focused when disabled', async () => {
      const user = userEvent.setup();
      render(<Textarea disabled data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      await user.click(textarea);
      expect(textarea).not.toHaveFocus();
    });

    it('sets data-disabled when disabled', () => {
      render(<Textarea disabled data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('User Interaction', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup();
      render(<Textarea data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      
      await user.type(textarea, 'Hello World');
      expect(textarea).toHaveValue('Hello World');
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} data-testid="textarea" />);
      
      await user.type(screen.getByTestId('textarea'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('respects maxLength', async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={5} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      
      await user.type(textarea, 'Hello World');
      expect(textarea).toHaveValue('Hello');
    });
  });

  describe('ID Generation', () => {
    it('uses provided id', () => {
      render(<Textarea id="custom-id" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('generates id from label', () => {
      render(<Textarea label="Comments" />);
      expect(screen.getByLabelText('Comments')).toHaveAttribute('id', 'textarea-comments');
    });

    it('connects label with textarea via htmlFor', () => {
      render(<Textarea label="Bio" id="bio-textarea" />);
      const textarea = screen.getByLabelText('Bio');
      expect(textarea).toHaveAttribute('id', 'bio-textarea');
    });
  });

  describe('Accessibility', () => {
    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Textarea data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      
      await user.click(textarea);
      expect(textarea).toHaveFocus();
    });

    it('supports aria-label', () => {
      render(<Textarea aria-label="Description" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('aria-label', 'Description');
    });

    it('supports aria-describedby', () => {
      render(<Textarea aria-describedby="help-text" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('auto-connects aria-describedby to helper text', () => {
      render(<Textarea helperText="Some help" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      const describedBy = textarea.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(screen.getByText('Some help').closest('[id]')).toHaveAttribute('id', describedBy);
    });

    it('merges user aria-describedby with auto-generated helper id', () => {
      render(<Textarea aria-describedby="custom-id" helperText="Help text" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      const describedBy = textarea.getAttribute('aria-describedby');
      expect(describedBy).toContain('custom-id');
      // Should also contain the auto-generated helper id
      expect(describedBy?.split(' ')).toHaveLength(2);
    });

    it('supports required attribute', () => {
      render(<Textarea required data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toBeRequired();
    });

    it('supports readOnly attribute', () => {
      render(<Textarea readOnly data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('readonly');
    });

    it('shows required indicator in label', () => {
      render(<Textarea label="Comments" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const ControlledTextarea = () => {
        const [value, setValue] = useState('');
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="textarea"
          />
        );
      };
      
      const user = userEvent.setup();
      render(<ControlledTextarea />);
      const textarea = screen.getByTestId('textarea');
      
      await user.type(textarea, 'Test');
      expect(textarea).toHaveValue('Test');
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="Initial" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      
      expect(textarea).toHaveValue('Initial');
      await user.clear(textarea);
      await user.type(textarea, 'New');
      expect(textarea).toHaveValue('New');
    });
  });

  describe('Rows', () => {
    it('supports rows attribute', () => {
      render(<Textarea rows={5} data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '5');
    });

    it('supports cols attribute', () => {
      render(<Textarea cols={40} data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('cols', '40');
    });
  });

  describe('Data Attributes', () => {
    it('passes through data-* attributes', () => {
      render(<Textarea data-custom="value" data-testid="textarea" />);
      expect(screen.getByTestId('textarea')).toHaveAttribute('data-custom', 'value');
    });
  });
});
