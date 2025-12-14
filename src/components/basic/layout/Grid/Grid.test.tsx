import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId('grid')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders as div element', () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId('grid').tagName).toBe('DIV');
    });

    it('applies grid base class', () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId('grid')).toHaveClass('grid');
    });
  });

  describe('Columns', () => {
    it('applies 1 column', () => {
      render(
        <Grid cols={1} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-1');
      expect(screen.getByTestId('grid')).toHaveAttribute('data-cols', '1');
    });

    it('applies 2 columns', () => {
      render(
        <Grid cols={2} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-2');
      expect(screen.getByTestId('grid')).toHaveAttribute('data-cols', '2');
    });

    it('applies 3 columns', () => {
      render(
        <Grid cols={3} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-3');
    });

    it('applies 4 columns', () => {
      render(
        <Grid cols={4} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-4');
    });

    it('applies 6 columns', () => {
      render(
        <Grid cols={6} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-6');
    });

    it('applies 12 columns', () => {
      render(
        <Grid cols={12} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-12');
      expect(screen.getByTestId('grid')).toHaveAttribute('data-cols', '12');
    });
  });

  describe('Rows', () => {
    it('applies 1 row', () => {
      render(
        <Grid rows={1} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-rows-1');
      expect(screen.getByTestId('grid')).toHaveAttribute('data-rows', '1');
    });

    it('applies 3 rows', () => {
      render(
        <Grid rows={3} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-rows-3');
    });

    it('applies 6 rows', () => {
      render(
        <Grid rows={6} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-rows-6');
      expect(screen.getByTestId('grid')).toHaveAttribute('data-rows', '6');
    });
  });

  describe('Gap', () => {
    it('applies preset gap none', () => {
      render(
        <Grid gap="none" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'none');
    });

    it('applies preset gap xs', () => {
      render(
        <Grid gap="xs" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'xs');
    });

    it('applies preset gap sm', () => {
      render(
        <Grid gap="sm" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'sm');
    });

    it('applies preset gap md', () => {
      render(
        <Grid gap="md" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'md');
    });

    it('applies preset gap lg', () => {
      render(
        <Grid gap="lg" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'lg');
    });

    it('applies preset gap xl', () => {
      render(
        <Grid gap="xl" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', 'xl');
    });

    it('applies preset gap 2xl', () => {
      render(
        <Grid gap="2xl" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveAttribute('data-gap', '2xl');
    });

    it('applies numeric gap as rem via style', () => {
      render(
        <Grid gap={2} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ gap: '2rem' });
    });

    it('applies custom string gap via style', () => {
      render(
        <Grid gap="20px" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ gap: '20px' });
    });

    it('does not set data-gap for custom gap values', () => {
      render(
        <Grid gap="20px" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).not.toHaveAttribute('data-gap');
    });
  });

  describe('GapX and GapY', () => {
    it('applies gapX preset', () => {
      render(
        <Grid gapX="md" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid.className).toContain('gap-x-');
    });

    it('applies gapY preset', () => {
      render(
        <Grid gapY="lg" data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid.className).toContain('gap-y-');
    });

    it('applies numeric gapX via style', () => {
      render(
        <Grid gapX={1.5} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ columnGap: '1.5rem' });
    });

    it('applies numeric gapY via style', () => {
      render(
        <Grid gapY={2} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ rowGap: '2rem' });
    });

    it('applies custom string gapX via style', () => {
      render(
        <Grid gapX="10px" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ columnGap: '10px' });
    });

    it('applies custom string gapY via style', () => {
      render(
        <Grid gapY="15px" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ rowGap: '15px' });
    });
  });

  describe('Alignment', () => {
    it('applies align start', () => {
      render(
        <Grid align="start" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('items-start');
    });

    it('applies align center', () => {
      render(
        <Grid align="center" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('items-center');
    });

    it('applies align end', () => {
      render(
        <Grid align="end" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('items-end');
    });

    it('applies align stretch', () => {
      render(
        <Grid align="stretch" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('items-stretch');
    });
  });

  describe('Justify', () => {
    it('applies justify start', () => {
      render(
        <Grid justify="start" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('justify-items-start');
    });

    it('applies justify center', () => {
      render(
        <Grid justify="center" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('justify-items-center');
    });

    it('applies justify end', () => {
      render(
        <Grid justify="end" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('justify-items-end');
    });

    it('applies justify stretch', () => {
      render(
        <Grid justify="stretch" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('justify-items-stretch');
    });
  });

  describe('Flow', () => {
    it('applies flow row', () => {
      render(
        <Grid flow="row" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-row');
    });

    it('applies flow col', () => {
      render(
        <Grid flow="col" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-col');
    });

    it('applies flow dense', () => {
      render(
        <Grid flow="dense" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-dense');
    });

    it('applies flow row-dense', () => {
      render(
        <Grid flow="row-dense" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-row-dense');
    });

    it('applies flow col-dense', () => {
      render(
        <Grid flow="col-dense" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-col-dense');
    });
  });

  describe('Inline', () => {
    it('defaults to grid display', () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId('grid')).toHaveClass('grid');
    });

    it('applies inline-grid when inline is true', () => {
      render(
        <Grid inline data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('inline-grid');
      expect(screen.getByTestId('grid')).not.toHaveClass('grid');
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(
        <Grid className="custom-class" data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(
        <Grid className="custom-class" cols={3} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('grid-cols-3');
      expect(grid).toHaveClass('custom-class');
    });
  });

  describe('Custom style', () => {
    it('applies custom style', () => {
      render(
        <Grid style={{ minHeight: '100px' }} data-testid="grid">
          Content
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({ minHeight: '100px' });
    });

    it('merges custom style with gap style', () => {
      render(
        <Grid gap={2} style={{ minHeight: '100px' }} data-testid="grid">
          Content
        </Grid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveStyle({ gap: '2rem' });
      expect(grid).toHaveStyle({ minHeight: '100px' });
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      let refValue: HTMLDivElement | null = null;
      render(
        <Grid
          ref={(el) => {
            refValue = el;
          }}
        >
          Content
        </Grid>
      );
      expect(refValue).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('HTML Attributes', () => {
    it('forwards additional HTML attributes', () => {
      render(
        <Grid data-custom="value" data-testid="grid" aria-label="Grid container">
          Content
        </Grid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveAttribute('data-custom', 'value');
      expect(grid).toHaveAttribute('aria-label', 'Grid container');
    });
  });

  describe('Combined Props', () => {
    it('combines multiple props correctly', () => {
      render(
        <Grid
          cols={4}
          rows={3}
          gap="md"
          align="center"
          justify="stretch"
          flow="dense"
          data-testid="grid"
        >
          Content
        </Grid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass('grid-cols-4');
      expect(grid).toHaveClass('grid-rows-3');
      expect(grid).toHaveClass('items-center');
      expect(grid).toHaveClass('justify-items-stretch');
      expect(grid).toHaveClass('grid-flow-dense');
      expect(grid).toHaveAttribute('data-cols', '4');
      expect(grid).toHaveAttribute('data-rows', '3');
      expect(grid).toHaveAttribute('data-gap', 'md');
    });
  });

  describe('DisplayName', () => {
    it('has correct displayName', () => {
      expect(Grid.displayName).toBe('Grid');
    });
  });
});
