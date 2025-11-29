import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  // ===========================================================================
  // RENDERING
  // ===========================================================================

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(
        <Avatar data-testid="avatar">
          <Avatar.Fallback />
        </Avatar>
      );
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-size', 'md');
      expect(avatar).toHaveAttribute('data-shape', 'circular');
    });

    it('should render with custom size', () => {
      render(
        <Avatar size="lg" data-testid="avatar">
          <Avatar.Fallback />
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'lg');
    });

    it('should render with custom shape', () => {
      render(
        <Avatar shape="square" data-testid="avatar">
          <Avatar.Fallback />
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-shape', 'square');
    });

    it('should render children', () => {
      render(
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <Avatar className="custom-class" data-testid="avatar">
          <Avatar.Fallback />
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(
        <Avatar ref={ref}>
          <Avatar.Fallback />
        </Avatar>
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // ACCESSIBILITY
  // ===========================================================================

  describe('Accessibility', () => {
    it('should have role="img"', () => {
      render(
        <Avatar data-testid="avatar">
          <Avatar.Fallback />
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveAttribute('role', 'img');
    });

    it('should support aria-label', () => {
      render(
        <Avatar aria-label="User avatar" data-testid="avatar">
          <Avatar.Fallback />
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveAttribute('aria-label', 'User avatar');
    });
  });

  // ===========================================================================
  // AVATAR.IMAGE
  // ===========================================================================

  describe('Avatar.Image', () => {
    it('should render image with src and alt', () => {
      render(
        <Avatar>
          <Avatar.Image src="test.jpg" alt="Test Image" data-testid="avatar-img" />
        </Avatar>
      );
      const img = screen.getByTestId('avatar-img');
      expect(img).toHaveAttribute('src', 'test.jpg');
      expect(img).toHaveAttribute('alt', 'Test Image');
    });

    it('should call onLoadError when image fails to load', () => {
      const onLoadError = vi.fn();
      render(
        <Avatar>
          <Avatar.Image src="invalid.jpg" alt="Broken" onLoadError={onLoadError} data-testid="avatar-img" />
        </Avatar>
      );
      const img = screen.getByTestId('avatar-img');
      fireEvent.error(img);
      expect(onLoadError).toHaveBeenCalled();
    });

    it('should hide image when load fails (allowing fallback to show)', () => {
      render(
        <Avatar>
          <Avatar.Image src="invalid.jpg" alt="Broken" data-testid="avatar-img" />
          <Avatar.Fallback>FB</Avatar.Fallback>
        </Avatar>
      );
      const img = screen.getByTestId('avatar-img');
      fireEvent.error(img);
      // After error, image should not be rendered
      expect(screen.queryByTestId('avatar-img')).not.toBeInTheDocument();
      // Fallback should be visible
      expect(screen.getByText('FB')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(
        <Avatar>
          <Avatar.Image ref={ref} src="test.jpg" alt="Test" />
        </Avatar>
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // AVATAR.FALLBACK
  // ===========================================================================

  describe('Avatar.Fallback', () => {
    it('should render with default icon when no children provided', () => {
      render(
        <Avatar>
          <Avatar.Fallback data-testid="fallback" />
        </Avatar>
      );
      const fallback = screen.getByTestId('fallback');
      expect(fallback).toBeInTheDocument();
      // Check for default BiUser icon (rendered as SVG)
      expect(fallback.querySelector('svg')).toBeInTheDocument();
    });

    it('should render children (initials) when provided', () => {
      render(
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render custom icon when provided', () => {
      const CustomIcon = () => <svg data-testid="custom-icon" />;
      render(
        <Avatar>
          <Avatar.Fallback icon={CustomIcon} />
        </Avatar>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should have aria-hidden="true"', () => {
      render(
        <Avatar>
          <Avatar.Fallback data-testid="fallback" />
        </Avatar>
      );
      expect(screen.getByTestId('fallback')).toHaveAttribute('aria-hidden', 'true');
    });

    it('should forward ref', () => {
      const ref = vi.fn();
      render(
        <Avatar>
          <Avatar.Fallback ref={ref} />
        </Avatar>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('should apply custom className', () => {
      render(
        <Avatar>
          <Avatar.Fallback className="custom-fallback" data-testid="fallback" />
        </Avatar>
      );
      expect(screen.getByTestId('fallback')).toHaveClass('custom-fallback');
    });
  });

  // ===========================================================================
  // CONTEXT (SIZE INHERITANCE)
  // ===========================================================================

  describe('Context (Size Inheritance)', () => {
    it('should inherit size from Avatar context', () => {
      const { container } = render(
        <Avatar size="xl">
          <Avatar.Fallback data-testid="fallback">XL</Avatar.Fallback>
        </Avatar>
      );
      // The fallback should use the xl size from context
      const fallback = screen.getByTestId('fallback');
      expect(fallback).toBeInTheDocument();
      // Check that the parent has the correct size
      expect(container.querySelector('[data-size="xl"]')).toBeInTheDocument();
    });
  });

  // ===========================================================================
  // ALL SIZES
  // ===========================================================================

  describe('All Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(
          <Avatar size={size} data-testid={`avatar-${size}`}>
            <Avatar.Fallback />
          </Avatar>
        );
        expect(screen.getByTestId(`avatar-${size}`)).toHaveAttribute('data-size', size);
      });
    });
  });

  // ===========================================================================
  // ALL SHAPES
  // ===========================================================================

  describe('All Shapes', () => {
    const shapes = ['circular', 'square'] as const;

    shapes.forEach((shape) => {
      it(`should render ${shape} shape correctly`, () => {
        render(
          <Avatar shape={shape} data-testid={`avatar-${shape}`}>
            <Avatar.Fallback />
          </Avatar>
        );
        expect(screen.getByTestId(`avatar-${shape}`)).toHaveAttribute('data-shape', shape);
      });
    });
  });
});
