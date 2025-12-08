import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './Tooltip';

// Mock Portal to render inline for testing
vi.mock('@/components/basic/utility/Portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Tooltip', () => {
  // ==========================================================================
  // RENDERING
  // ==========================================================================
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    });

    it('does not render tooltip initially', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders tooltip content when visible', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button', { name: 'Trigger' }).parentElement!);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');
      });
    });

    it('supports JSX content', async () => {
      render(
        <Tooltip content={<span data-testid="jsx-content">Complex content</span>}>
          <button>Trigger</button>
        </Tooltip>
      );

      fireEvent.mouseEnter(screen.getByRole('button', { name: 'Trigger' }).parentElement!);

      await waitFor(() => {
        expect(screen.getByTestId('jsx-content')).toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // MOUSE INTERACTIONS
  // ==========================================================================
  describe('Mouse Interactions', () => {
    it('shows tooltip on mouse enter', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('hides tooltip on mouse leave', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      fireEvent.mouseLeave(wrapper);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // FOCUS INTERACTIONS
  // ==========================================================================
  describe('Focus Interactions', () => {
    it('shows tooltip on focus', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.focus(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('hides tooltip on blur', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.focus(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      fireEvent.blur(wrapper);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // KEYBOARD INTERACTIONS
  // ==========================================================================
  describe('Keyboard Interactions', () => {
    it('closes tooltip on Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // POSITION VARIANTS
  // ==========================================================================
  describe('Position Variants', () => {
    it.each(['top', 'bottom', 'left', 'right'] as const)(
      'renders with position="%s"',
      async (position) => {
        render(
          <Tooltip content="Tooltip content" position={position}>
            <button>Trigger</button>
          </Tooltip>
        );

        const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
        fireEvent.mouseEnter(wrapper);

        await waitFor(() => {
          const tooltip = screen.getByRole('tooltip');
          expect(tooltip).toBeInTheDocument();
          expect(tooltip).toHaveAttribute('data-position', position);
        });
      }
    );
  });

  // ==========================================================================
  // ACCESSIBILITY
  // ==========================================================================
  describe('Accessibility', () => {
    it('has role="tooltip"', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('links trigger to tooltip via aria-describedby', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;

      // Initially no aria-describedby
      expect(wrapper).not.toHaveAttribute('aria-describedby');

      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const tooltipId = tooltip.getAttribute('id');
        expect(tooltipId).toBeTruthy();
        expect(wrapper).toHaveAttribute('aria-describedby', tooltipId);
      });
    });

    it('removes aria-describedby when hidden', async () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(wrapper).toHaveAttribute('aria-describedby');
      });

      fireEvent.mouseLeave(wrapper);

      await waitFor(() => {
        expect(wrapper).not.toHaveAttribute('aria-describedby');
      });
    });

    it('supports custom id', async () => {
      render(
        <Tooltip content="Tooltip content" id="custom-tooltip-id">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('id', 'custom-tooltip-id');
        expect(wrapper).toHaveAttribute('aria-describedby', 'custom-tooltip-id');
      });
    });
  });

  // ==========================================================================
  // CUSTOM OFFSET
  // ==========================================================================
  describe('Custom Offset', () => {
    it('accepts custom offset prop', async () => {
      render(
        <Tooltip content="Tooltip content" offset={16}>
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  // ==========================================================================
  // REF FORWARDING
  // ==========================================================================
  describe('Ref Forwarding', () => {
    it('forwards ref to wrapper element', () => {
      const ref = vi.fn();

      render(
        <Tooltip content="Tooltip content" ref={ref}>
          <button>Trigger</button>
        </Tooltip>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });
  });

  // ==========================================================================
  // CUSTOM CLASS NAME
  // ==========================================================================
  describe('Custom Class Name', () => {
    it('applies custom className to tooltip', async () => {
      render(
        <Tooltip content="Tooltip content" className="custom-class">
          <button>Trigger</button>
        </Tooltip>
      );

      const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement!;
      fireEvent.mouseEnter(wrapper);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toHaveClass('custom-class');
      });
    });
  });
});
