/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Popover, usePopoverContext } from './Popover';

describe('Popover', () => {
  // ============================================================================
  // RENDERING TESTS
  // ============================================================================
  describe('Rendering', () => {
    it('should render trigger button', () => {
      render(
        <Popover>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button', { name: 'Open Popover' })).toBeInTheDocument();
    });

    it('should not render content by default', () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Hidden content</Popover.Content>
        </Popover>
      );

      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('should render content when defaultOpen is true', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Visible content</Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Visible content')).toBeInTheDocument();
    });

    it('should render all subcomponents', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Title Text</Popover.Title>
            <Popover.Description>Description Text</Popover.Description>
            <Popover.Close />
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Title Text')).toBeInTheDocument();
      expect(screen.getByText('Description Text')).toBeInTheDocument();
      expect(screen.getByLabelText('Close popover')).toBeInTheDocument();
    });

    it('should forward ref to Trigger button', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Popover>
          <Popover.Trigger ref={ref}>Trigger</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should forward ref to Content div', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content ref={ref}>Content</Popover.Content>
        </Popover>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward ref to Title heading', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Title ref={ref}>Title</Popover.Title>
          </Popover.Content>
        </Popover>
      );

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it('should forward ref to Description paragraph', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Description ref={ref}>Description</Popover.Description>
          </Popover.Content>
        </Popover>
      );

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('should forward ref to Close button', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Close ref={ref} />
          </Popover.Content>
        </Popover>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should apply custom className to Trigger', () => {
      render(
        <Popover>
          <Popover.Trigger className="custom-trigger">Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button')).toHaveClass('custom-trigger');
    });

    it('should apply custom className to Content', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content className="custom-content">Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('custom-content');
    });

    it('should apply custom className to Title', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Title className="custom-title">Title</Popover.Title>
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Title')).toHaveClass('custom-title');
    });

    it('should apply custom className to Description', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Description className="custom-desc">Desc</Popover.Description>
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Desc')).toHaveClass('custom-desc');
    });

    it('should render custom close button content', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Close>Close Me</Popover.Close>
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Close Me')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // OPEN/CLOSE BEHAVIOR TESTS
  // ============================================================================
  describe('Open/Close Behavior', () => {
    it('should open on mouse enter trigger', async () => {
      const user = userEvent.setup();

      render(
        <Popover>
          <Popover.Trigger>Hover me</Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      );

      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();

      await user.hover(screen.getByRole('button'));

      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('should close on mouse leave trigger', async () => {
      const user = userEvent.setup();

      render(
        <Popover>
          <Popover.Trigger>Hover me</Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      );

      await user.hover(screen.getByRole('button'));
      expect(screen.getByText('Popover content')).toBeInTheDocument();

      await user.unhover(screen.getByRole('button'));
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    });

    it('should stay open when hovering content', async () => {
      const user = userEvent.setup();

      render(
        <Popover defaultOpen>
          <Popover.Trigger>Hover me</Popover.Trigger>
          <Popover.Content data-testid="content">Popover content</Popover.Content>
        </Popover>
      );

      const content = screen.getByTestId('content');
      
      // When hovering content, it should stay open
      fireEvent.mouseEnter(content);

      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('should close on Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('should close when clicking Close button', async () => {
      const user = userEvent.setup();

      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Close />
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByLabelText('Close popover'));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should close on click outside', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Popover defaultOpen>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Content>Content</Popover.Content>
          </Popover>
          <button>Outside button</button>
        </div>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByText('Outside button'));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should open on focus trigger', async () => {
      const user = userEvent.setup();

      render(
        <Popover>
          <Popover.Trigger>Focus me</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      await user.tab();

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should close on blur trigger', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Popover>
            <Popover.Trigger>Focus me</Popover.Trigger>
            <Popover.Content>Content</Popover.Content>
          </Popover>
          <button>Other button</button>
        </div>
      );

      await user.tab(); // Focus trigger
      expect(screen.getByText('Content')).toBeInTheDocument();

      await user.tab(); // Move focus away
      
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });

  // ============================================================================
  // CONTROLLED MODE TESTS
  // ============================================================================
  describe('Controlled Mode', () => {
    it('should respect controlled open prop', () => {
      render(
        <Popover open={true} onOpenChange={() => {}}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should call onOpenChange when opening', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Popover open={false} onOpenChange={onOpenChange}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      await user.hover(screen.getByRole('button'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('should call onOpenChange when closing', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Popover open={true} onOpenChange={onOpenChange}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      await user.keyboard('{Escape}');

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should not update internal state in controlled mode', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Popover open={false} onOpenChange={onOpenChange}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      await user.hover(screen.getByRole('button'));

      // Content should not appear because parent controls open state
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('should work with state management', async () => {
      const user = userEvent.setup();

      const ControlledPopover = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>Toggle</Popover.Trigger>
            <Popover.Content>
              <Popover.Close />
            </Popover.Content>
          </Popover>
        );
      };

      render(<ControlledPopover />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.hover(screen.getByRole('button', { name: 'Toggle' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByLabelText('Close popover'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // ============================================================================
  // POSITIONING TESTS
  // ============================================================================
  describe('Positioning', () => {
    it('should apply bottom side positioning by default', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('top-full', 'mt-[length:var(--component-popover-offset)]');
    });

    it('should apply top side positioning', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content side="top">Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('bottom-full', 'mb-[length:var(--component-popover-offset)]');
    });

    it('should apply left side positioning', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content side="left">Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('right-full', 'mr-[length:var(--component-popover-offset)]');
    });

    it('should apply right side positioning', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content side="right">Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('left-full', 'ml-[length:var(--component-popover-offset)]');
    });

    it('should apply center alignment by default', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('left-1/2', '-translate-x-1/2');
    });

    it('should apply start alignment', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content align="start">Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('left-0');
    });

    it('should apply end alignment', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content align="end">Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveClass('right-0');
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================
  describe('Accessibility', () => {
    it('should have role="dialog" on content', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-expanded on trigger', () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when open', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-haspopup on trigger', () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('should have aria-modal="false" on content', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'false');
    });

    it('should have aria-label on close button', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Close />
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button', { name: 'Close popover' })).toBeInTheDocument();
    });

    it('should have type="button" on trigger', () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('should have type="button" on close', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Close />
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByLabelText('Close popover')).toHaveAttribute('type', 'button');
    });

    it('should have aria-labelledby linking content to title', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Title>My Title</Popover.Title>
          </Popover.Content>
        </Popover>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('My Title');
      
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(title).toHaveAttribute('id');
      expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
    });

    it('should have aria-describedby linking content to description', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Description>My Description</Popover.Description>
          </Popover.Content>
        </Popover>
      );

      const dialog = screen.getByRole('dialog');
      const description = screen.getByText('My Description');
      
      expect(dialog).toHaveAttribute('aria-describedby');
      expect(description).toHaveAttribute('id');
      expect(dialog.getAttribute('aria-describedby')).toBe(description.getAttribute('id'));
    });

    it('should have aria-controls on trigger when open', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      const trigger = screen.getByRole('button', { name: 'Open' });
      const dialog = screen.getByRole('dialog');
      
      expect(trigger).toHaveAttribute('aria-controls');
      expect(dialog).toHaveAttribute('id');
      expect(trigger.getAttribute('aria-controls')).toBe(dialog.getAttribute('id'));
    });

    it('should not have aria-controls on trigger when closed', () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      const trigger = screen.getByRole('button', { name: 'Open' });
      expect(trigger).not.toHaveAttribute('aria-controls');
    });

    it('should have id on content for aria-controls linking', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id');
      expect(dialog.getAttribute('id')).toMatch(/^popover-content-/);
    });
  });

  // ============================================================================
  // CONTEXT TESTS
  // ============================================================================
  describe('Context', () => {
    it('should throw error when Trigger is used outside Popover', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Popover.Trigger>Trigger</Popover.Trigger>);
      }).toThrow('Popover compound components must be used within a Popover component');

      consoleSpy.mockRestore();
    });

    it('should throw error when Content is used outside Popover', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Popover.Content>Content</Popover.Content>);
      }).toThrow('Popover compound components must be used within a Popover component');

      consoleSpy.mockRestore();
    });

    it('should throw error when Close is used outside Popover', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Popover.Close />);
      }).toThrow('Popover compound components must be used within a Popover component');

      consoleSpy.mockRestore();
    });

    it('should expose usePopoverContext hook', () => {
      expect(usePopoverContext).toBeDefined();
      expect(typeof usePopoverContext).toBe('function');
    });
  });

  // ============================================================================
  // DISPLAY NAME TESTS
  // ============================================================================
  describe('Display Names', () => {
    it('should have displayName on Trigger', () => {
      expect(Popover.Trigger.displayName).toBe('Popover.Trigger');
    });

    it('should have displayName on Content', () => {
      expect(Popover.Content.displayName).toBe('Popover.Content');
    });

    it('should have displayName on Title', () => {
      expect(Popover.Title.displayName).toBe('Popover.Title');
    });

    it('should have displayName on Description', () => {
      expect(Popover.Description.displayName).toBe('Popover.Description');
    });

    it('should have displayName on Close', () => {
      expect(Popover.Close.displayName).toBe('Popover.Close');
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================
  describe('Edge Cases', () => {
    it('should handle rapid open/close', async () => {
      const user = userEvent.setup();

      render(
        <Popover>
          <Popover.Trigger>Toggle</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      const trigger = screen.getByRole('button');

      await user.hover(trigger);
      await user.unhover(trigger);
      await user.hover(trigger);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should handle multiple popovers on page', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Popover>
            <Popover.Trigger>First</Popover.Trigger>
            <Popover.Content>First Content</Popover.Content>
          </Popover>
          <Popover>
            <Popover.Trigger>Second</Popover.Trigger>
            <Popover.Content>Second Content</Popover.Content>
          </Popover>
        </div>
      );

      await user.hover(screen.getByText('First'));
      expect(screen.getByText('First Content')).toBeInTheDocument();
      expect(screen.queryByText('Second Content')).not.toBeInTheDocument();

      await user.unhover(screen.getByText('First'));
      await user.hover(screen.getByText('Second'));
      expect(screen.queryByText('First Content')).not.toBeInTheDocument();
      expect(screen.getByText('Second Content')).toBeInTheDocument();
    });

    it('should handle popover with complex content', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Complex Title</Popover.Title>
            <Popover.Description>Description text here</Popover.Description>
            <div>
              <button>Action 1</button>
              <button>Action 2</button>
            </div>
            <Popover.Close>Close</Popover.Close>
          </Popover.Content>
        </Popover>
      );

      expect(screen.getByText('Complex Title')).toBeInTheDocument();
      expect(screen.getByText('Description text here')).toBeInTheDocument();
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('should spread additional props to trigger', () => {
      render(
        <Popover>
          <Popover.Trigger data-testid="custom-trigger" id="my-trigger">
            Open
          </Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );

      const trigger = screen.getByTestId('custom-trigger');
      expect(trigger).toHaveAttribute('id', 'my-trigger');
    });

    it('should spread additional props to content', () => {
      render(
        <Popover defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content data-testid="custom-content" id="my-content">
            Content
          </Popover.Content>
        </Popover>
      );

      const content = screen.getByTestId('custom-content');
      expect(content).toHaveAttribute('id', 'my-content');
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================
  describe('Integration', () => {
    it('should support full popover workflow', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Popover onOpenChange={onOpenChange}>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Confirmation</Popover.Title>
            <Popover.Description>Are you sure?</Popover.Description>
            <Popover.Close>Yes, close</Popover.Close>
          </Popover.Content>
        </Popover>
      );

      // Initially closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Open on hover
      await user.hover(screen.getByText('Open Popover'));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Confirmation')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();

      // Close via close button
      await user.click(screen.getByText('Yes, close'));
      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
