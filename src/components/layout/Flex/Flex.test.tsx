import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Flex data-testid="flex">Content</Flex>);
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Flex>
          <span>Item 1</span>
          <span>Item 2</span>
        </Flex>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders as div element', () => {
      render(<Flex data-testid="flex">Content</Flex>);
      expect(screen.getByTestId('flex').tagName).toBe('DIV');
    });
  });

  describe('Direction', () => {
    it('defaults to row direction', () => {
      render(<Flex data-testid="flex">Content</Flex>);
      expect(screen.getByTestId('flex')).toHaveAttribute('data-direction', 'row');
      expect(screen.getByTestId('flex')).toHaveClass('flex-row');
    });

    it('applies row direction', () => {
      render(
        <Flex direction="row" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-row');
    });

    it('applies row-reverse direction', () => {
      render(
        <Flex direction="row-reverse" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-row-reverse');
      expect(screen.getByTestId('flex')).toHaveAttribute('data-direction', 'row-reverse');
    });

    it('applies column direction', () => {
      render(
        <Flex direction="column" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-col');
      expect(screen.getByTestId('flex')).toHaveAttribute('data-direction', 'column');
    });

    it('applies column-reverse direction', () => {
      render(
        <Flex direction="column-reverse" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-col-reverse');
      expect(screen.getByTestId('flex')).toHaveAttribute('data-direction', 'column-reverse');
    });
  });

  describe('Alignment', () => {
    it('applies align start', () => {
      render(
        <Flex align="start" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('items-start');
    });

    it('applies align center', () => {
      render(
        <Flex align="center" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('items-center');
    });

    it('applies align end', () => {
      render(
        <Flex align="end" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('items-end');
    });

    it('applies align stretch', () => {
      render(
        <Flex align="stretch" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('items-stretch');
    });

    it('applies align baseline', () => {
      render(
        <Flex align="baseline" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('items-baseline');
    });
  });

  describe('Justify', () => {
    it('applies justify start', () => {
      render(
        <Flex justify="start" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('justify-start');
    });

    it('applies justify center', () => {
      render(
        <Flex justify="center" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('justify-center');
    });

    it('applies justify end', () => {
      render(
        <Flex justify="end" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('justify-end');
    });

    it('applies justify between', () => {
      render(
        <Flex justify="between" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('justify-between');
    });

    it('applies justify around', () => {
      render(
        <Flex justify="around" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('justify-around');
    });

    it('applies justify evenly', () => {
      render(
        <Flex justify="evenly" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('justify-evenly');
    });
  });

  describe('Wrap', () => {
    it('applies nowrap', () => {
      render(
        <Flex wrap="nowrap" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-nowrap');
    });

    it('applies wrap', () => {
      render(
        <Flex wrap="wrap" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-wrap');
    });

    it('applies wrap-reverse', () => {
      render(
        <Flex wrap="wrap-reverse" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('flex-wrap-reverse');
    });
  });

  describe('Gap', () => {
    it('applies preset gap none', () => {
      render(
        <Flex gap="none" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', 'none');
    });

    it('applies preset gap xs', () => {
      render(
        <Flex gap="xs" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', 'xs');
    });

    it('applies preset gap sm', () => {
      render(
        <Flex gap="sm" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', 'sm');
    });

    it('applies preset gap md', () => {
      render(
        <Flex gap="md" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', 'md');
    });

    it('applies preset gap lg', () => {
      render(
        <Flex gap="lg" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', 'lg');
    });

    it('applies preset gap xl', () => {
      render(
        <Flex gap="xl" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', 'xl');
    });

    it('applies preset gap 2xl', () => {
      render(
        <Flex gap="2xl" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveAttribute('data-gap', '2xl');
    });

    it('applies numeric gap as rem via style', () => {
      render(
        <Flex gap={2} data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveStyle({ gap: '2rem' });
    });

    it('applies custom string gap via style', () => {
      render(
        <Flex gap="20px" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveStyle({ gap: '20px' });
    });

    it('does not set data-gap for custom gap values', () => {
      render(
        <Flex gap="20px" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).not.toHaveAttribute('data-gap');
    });
  });

  describe('Inline', () => {
    it('defaults to flex display', () => {
      render(<Flex data-testid="flex">Content</Flex>);
      expect(screen.getByTestId('flex')).toHaveClass('flex');
    });

    it('applies inline-flex when inline is true', () => {
      render(
        <Flex inline data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('inline-flex');
      expect(screen.getByTestId('flex')).not.toHaveClass('flex');
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(
        <Flex className="custom-class" data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(
        <Flex className="custom-class" data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId('flex');
      expect(flex).toHaveClass('flex');
      expect(flex).toHaveClass('flex-row');
      expect(flex).toHaveClass('custom-class');
    });
  });

  describe('Custom style', () => {
    it('applies custom style', () => {
      render(
        <Flex style={{ minHeight: '100px' }} data-testid="flex">
          Content
        </Flex>
      );
      expect(screen.getByTestId('flex')).toHaveStyle({ minHeight: '100px' });
    });

    it('merges custom style with gap style', () => {
      render(
        <Flex gap={2} style={{ minHeight: '100px' }} data-testid="flex">
          Content
        </Flex>
      );
      const flex = screen.getByTestId('flex');
      expect(flex).toHaveStyle({ gap: '2rem' });
      expect(flex).toHaveStyle({ minHeight: '100px' });
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      let refValue: HTMLDivElement | null = null;
      render(
        <Flex
          ref={(el) => {
            refValue = el;
          }}
        >
          Content
        </Flex>
      );
      expect(refValue).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional HTML attributes', () => {
      render(
        <Flex data-custom="value" data-testid="flex" aria-label="Flex container">
          Content
        </Flex>
      );
      const flex = screen.getByTestId('flex');
      expect(flex).toHaveAttribute('data-custom', 'value');
      expect(flex).toHaveAttribute('aria-label', 'Flex container');
    });
  });

  describe('Combined Props', () => {
    it('combines multiple props correctly', () => {
      render(
        <Flex
          direction="column"
          align="center"
          justify="between"
          wrap="wrap"
          gap="md"
          data-testid="flex"
        >
          Content
        </Flex>
      );
      const flex = screen.getByTestId('flex');
      expect(flex).toHaveClass('flex-col');
      expect(flex).toHaveClass('items-center');
      expect(flex).toHaveClass('justify-between');
      expect(flex).toHaveClass('flex-wrap');
      expect(flex).toHaveAttribute('data-gap', 'md');
      expect(flex).toHaveAttribute('data-direction', 'column');
    });
  });

  describe('DisplayName', () => {
    it('has correct displayName', () => {
      expect(Flex.displayName).toBe('Flex');
    });
  });
});
