import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  describe('Rendering', () => {
    it('renders a label element', () => {
      render(<Label>Username</Label>);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Label>Email Address</Label>);
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Label className="custom-class">Label</Label>);
      expect(screen.getByText('Label')).toHaveClass('custom-class');
    });

    it('passes through htmlFor attribute', () => {
      render(<Label htmlFor="input-id">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Label size="small">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-size', 'small');
    });

    it('renders with default size', () => {
      render(<Label size="default">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-size', 'default');
    });

    it('renders with large size', () => {
      render(<Label size="large">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-size', 'large');
    });

    it('uses default size when not specified', () => {
      render(<Label>Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-size', 'default');
    });
  });

  describe('Weight Variants', () => {
    it('renders with normal weight', () => {
      render(<Label weight="normal">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with medium weight', () => {
      render(<Label weight="medium">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with semibold weight', () => {
      render(<Label weight="semibold">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('renders with default color', () => {
      render(<Label color="default">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'default');
    });

    it('renders with secondary color', () => {
      render(<Label color="secondary">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'secondary');
    });

    it('renders with error color', () => {
      render(<Label color="error">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'error');
    });

    it('renders with disabled color when disabled', () => {
      render(<Label disabled>Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'disabled');
    });
  });

  describe('Required State', () => {
    it('shows required indicator when required', () => {
      render(<Label required>Label</Label>);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('required indicator has aria-label', () => {
      render(<Label required>Label</Label>);
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });

    it('does not show required indicator when not required', () => {
      render(<Label>Label</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('does not show required indicator when disabled', () => {
      render(<Label required disabled>Label</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styling', () => {
      render(<Label disabled>Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'disabled');
    });

    it('overrides color with disabled when both are set', () => {
      render(<Label disabled color="error">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'disabled');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to label element', () => {
      const ref = createRef<HTMLLabelElement>();
      render(<Label ref={ref}>Label</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    });
  });

  describe('Data Attributes', () => {
    it('has data-size attribute', () => {
      render(<Label size="large">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-size', 'large');
    });

    it('has data-color attribute', () => {
      render(<Label color="error">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('data-color', 'error');
    });
  });
});
