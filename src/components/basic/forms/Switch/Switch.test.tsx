import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders a switch input', () => {
      render(<Switch data-testid="switch" />);
      expect(screen.getByTestId('switch')).toBeInTheDocument();
    });

    it('renders with checkbox type', () => {
      render(<Switch data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('type', 'checkbox');
    });

    it('has role="switch"', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('applies custom className to input', () => {
      render(<Switch className="custom-class" data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to wrapper label', () => {
      const { container } = render(<Switch wrapperClassName="wrapper-class" />);
      expect(container.firstChild).toHaveClass('wrapper-class');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Switch size="small" data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('data-size', 'small');
    });

    it('renders with default size', () => {
      render(<Switch size="default" data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('data-size', 'default');
    });

    it('renders with large size', () => {
      render(<Switch size="large" data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('data-size', 'large');
    });

    it('uses default size when not specified', () => {
      render(<Switch data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('data-size', 'default');
    });
  });

  describe('User Interaction', () => {
    it('can be toggled on', async () => {
      const user = userEvent.setup();
      render(<Switch data-testid="switch" />);
      
      const switchInput = screen.getByTestId('switch');
      expect(switchInput).not.toBeChecked();
      
      await user.click(switchInput);
      expect(switchInput).toBeChecked();
    });

    it('can be toggled off', async () => {
      const user = userEvent.setup();
      render(<Switch defaultChecked data-testid="switch" />);
      
      const switchInput = screen.getByTestId('switch');
      expect(switchInput).toBeChecked();
      
      await user.click(switchInput);
      expect(switchInput).not.toBeChecked();
    });

    it('calls onChange handler', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onChange={handleChange} data-testid="switch" />);
      
      await user.click(screen.getByTestId('switch'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onCheckedChange with boolean value', async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch onCheckedChange={handleCheckedChange} data-testid="switch" />);
      
      await user.click(screen.getByTestId('switch'));
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
      
      await user.click(screen.getByTestId('switch'));
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it('can toggle by clicking label', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle me" data-testid="switch" />);
      
      const label = screen.getByText('Toggle me');
      await user.click(label);
      expect(screen.getByTestId('switch')).toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled switch', () => {
      render(<Switch disabled data-testid="switch" />);
      expect(screen.getByTestId('switch')).toBeDisabled();
    });

    it('cannot be toggled when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Switch disabled onChange={handleChange} data-testid="switch" />);
      
      await user.click(screen.getByTestId('switch'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const ControlledSwitch = () => {
        const [checked, setChecked] = useState(false);
        return (
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            data-testid="switch"
          />
        );
      };
      
      const user = userEvent.setup();
      render(<ControlledSwitch />);
      
      const switchInput = screen.getByTestId('switch');
      expect(switchInput).not.toBeChecked();
      
      await user.click(switchInput);
      expect(switchInput).toBeChecked();
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Switch defaultChecked={false} data-testid="switch" />);
      
      const switchInput = screen.getByTestId('switch');
      expect(switchInput).not.toBeChecked();
      
      await user.click(switchInput);
      expect(switchInput).toBeChecked();
    });
  });

  describe('ID Generation', () => {
    it('uses provided id', () => {
      render(<Switch id="custom-id" data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('id', 'custom-id');
    });

    it('generates id from label', () => {
      render(<Switch label="Dark Mode" />);
      expect(screen.getByRole('switch')).toHaveAttribute('id', 'switch-dark-mode');
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('track is hidden from screen readers', () => {
      const { container } = render(<Switch />);
      const track = container.querySelector('[aria-hidden="true"]');
      expect(track).toBeInTheDocument();
    });

    it('can be focused', async () => {
      const user = userEvent.setup();
      render(<Switch data-testid="switch" />);
      
      await user.tab();
      expect(screen.getByTestId('switch')).toHaveFocus();
    });

    it('can be toggled with keyboard', async () => {
      const user = userEvent.setup();
      render(<Switch data-testid="switch" />);
      
      const switchInput = screen.getByTestId('switch');
      await user.tab();
      await user.keyboard(' ');
      expect(switchInput).toBeChecked();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Data Attributes', () => {
    it('passes through data-* attributes', () => {
      render(<Switch data-custom="value" data-testid="switch" />);
      expect(screen.getByTestId('switch')).toHaveAttribute('data-custom', 'value');
    });
  });
});

import { useState } from 'react';
