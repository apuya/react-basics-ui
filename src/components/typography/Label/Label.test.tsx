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
    it('renders with caption size', () => {
      render(<Label size="caption">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with small size', () => {
      render(<Label size="small">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with body size', () => {
      render(<Label size="body">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('uses small size when not specified', () => {
      render(<Label>Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
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
    it('renders with primary color', () => {
      render(<Label color="primary">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with secondary color', () => {
      render(<Label color="secondary">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with error color', () => {
      render(<Label color="error">Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders with disabled color when disabled', () => {
      render(<Label disabled>Label</Label>);
      expect(screen.getByText('Label')).toBeInTheDocument();
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
      expect(screen.getByText('Label')).toHaveClass('cursor-not-allowed');
    });

    it('overrides color with disabled when both are set', () => {
      render(<Label disabled color="error">Label</Label>);
      expect(screen.getByText('Label')).toHaveClass('cursor-not-allowed');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to label element', () => {
      const ref = createRef<HTMLLabelElement>();
      render(<Label ref={ref}>Label</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    });
  });
});
