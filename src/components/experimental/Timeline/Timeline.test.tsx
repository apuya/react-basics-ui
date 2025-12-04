import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { Timeline, TimelineItem } from './Timeline';
import { BiCheck, BiStar, BiUser } from 'react-icons/bi';

describe('Timeline', () => {
  describe('Rendering', () => {
    it('renders timeline container with role="list"', () => {
      render(
        <Timeline data-testid="timeline">
          <Timeline.Item title="Item 1" />
        </Timeline>
      );

      const timeline = screen.getByTestId('timeline');
      expect(timeline).toHaveAttribute('role', 'list');
      expect(timeline).toHaveAttribute('aria-label', 'Timeline');
    });

    it('renders timeline items', () => {
      render(
        <Timeline>
          <Timeline.Item title="First Item" />
          <Timeline.Item title="Second Item" />
          <Timeline.Item title="Third Item" isLast />
        </Timeline>
      );

      expect(screen.getByText('First Item')).toBeInTheDocument();
      expect(screen.getByText('Second Item')).toBeInTheDocument();
      expect(screen.getByText('Third Item')).toBeInTheDocument();
    });

    it('renders with title, timestamp, and description', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Event Title"
            timestamp="2 hours ago"
            description="Event description text"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByText('Event Title')).toBeInTheDocument();
      expect(screen.getByText('2 hours ago')).toBeInTheDocument();
      expect(screen.getByText('Event description text')).toBeInTheDocument();
    });

    it('renders custom children', () => {
      render(
        <Timeline>
          <Timeline.Item title="Custom Content" isLast>
            <div data-testid="custom-content">Custom child content</div>
          </Timeline.Item>
        </Timeline>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom child content')).toBeInTheDocument();
    });

    it('applies custom className to timeline', () => {
      render(
        <Timeline className="custom-timeline" data-testid="timeline">
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveClass('custom-timeline');
    });

    it('applies custom className to timeline item', () => {
      render(
        <Timeline>
          <Timeline.Item title="Item" className="custom-item" data-testid="item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('item')).toHaveClass('custom-item');
    });
  });

  describe('Timeline.Item', () => {
    it('renders with role="listitem"', () => {
      render(
        <Timeline>
          <Timeline.Item title="Item" data-testid="item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('item')).toHaveAttribute('role', 'listitem');
    });

    it('renders custom icon in dot', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Icon"
            icon={<BiCheck data-testid="icon" />}
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders custom dot element', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Dot"
            dot={<span data-testid="custom-dot">●</span>}
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('custom-dot')).toBeInTheDocument();
    });

    it('renders without title', () => {
      render(
        <Timeline>
          <Timeline.Item
            timestamp="10:00 AM"
            description="Description only"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('Description only')).toBeInTheDocument();
    });
  });

  describe('Position Prop', () => {
    it('sets data-position="left" by default', () => {
      render(
        <Timeline data-testid="timeline">
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveAttribute('data-position', 'left');
    });

    it('sets data-position="right"', () => {
      render(
        <Timeline position="right" data-testid="timeline">
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveAttribute('data-position', 'right');
    });

    it('sets data-position="alternate"', () => {
      render(
        <Timeline position="alternate" data-testid="timeline">
          <Timeline.Item title="Item 1" />
          <Timeline.Item title="Item 2" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveAttribute('data-position', 'alternate');
    });
  });

  describe('Size Prop', () => {
    it('sets data-size="md" by default', () => {
      render(
        <Timeline data-testid="timeline">
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveAttribute('data-size', 'md');
    });

    it('sets data-size="sm"', () => {
      render(
        <Timeline size="sm" data-testid="timeline">
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveAttribute('data-size', 'sm');
    });

    it('sets data-size="lg"', () => {
      render(
        <Timeline size="lg" data-testid="timeline">
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('timeline')).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Variant Prop', () => {
    it('sets data-variant="default" by default', () => {
      render(
        <Timeline>
          <Timeline.Item title="Item" data-testid="item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('item')).toHaveAttribute('data-variant', 'default');
    });

    it.each(['primary', 'success', 'warning', 'error', 'info'] as const)(
      'sets data-variant="%s"',
      (variant) => {
        render(
          <Timeline>
            <Timeline.Item title="Item" variant={variant} data-testid="item" isLast />
          </Timeline>
        );

        expect(screen.getByTestId('item')).toHaveAttribute('data-variant', variant);
      }
    );
  });

  describe('isLast Prop', () => {
    it('sets data-last when isLast is true', () => {
      render(
        <Timeline>
          <Timeline.Item title="First" data-testid="first" />
          <Timeline.Item title="Last" data-testid="last" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('first')).not.toHaveAttribute('data-last');
      expect(screen.getByTestId('last')).toHaveAttribute('data-last', 'true');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Timeline container', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Timeline ref={ref}>
          <Timeline.Item title="Item" isLast />
        </Timeline>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'list');
    });

    it('forwards ref to Timeline.Item container', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Timeline>
          <Timeline.Item ref={ref} title="Item" isLast />
        </Timeline>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'listitem');
    });
  });

  describe('TimelineItem Export', () => {
    it('exports TimelineItem separately', () => {
      render(
        <Timeline>
          <TimelineItem title="Using TimelineItem" data-testid="item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('item')).toBeInTheDocument();
      expect(screen.getByText('Using TimelineItem')).toBeInTheDocument();
    });
  });

  describe('displayName', () => {
    it('has correct displayName for Timeline', () => {
      expect(Timeline.displayName).toBe('Timeline');
    });

    it('has correct displayName for Timeline.Item', () => {
      expect(Timeline.Item.displayName).toBe('Timeline.Item');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA structure', () => {
      render(
        <Timeline data-testid="timeline">
          <Timeline.Item title="First" data-testid="first" />
          <Timeline.Item title="Second" data-testid="second" isLast />
        </Timeline>
      );

      const timeline = screen.getByTestId('timeline');
      const first = screen.getByTestId('first');
      const second = screen.getByTestId('second');

      expect(timeline).toHaveAttribute('role', 'list');
      expect(timeline).toHaveAttribute('aria-label', 'Timeline');
      expect(first).toHaveAttribute('role', 'listitem');
      expect(second).toHaveAttribute('role', 'listitem');
    });

    it('marks dot container as aria-hidden', () => {
      render(
        <Timeline>
          <Timeline.Item title="Item" icon={<BiStar />} isLast />
        </Timeline>
      );

      // The dot container should be decorative
      const dotContainer = document.querySelector('[aria-hidden="true"]');
      expect(dotContainer).toBeInTheDocument();
    });
  });

  describe('Mixed Variants', () => {
    it('renders items with different variants', () => {
      render(
        <Timeline>
          <Timeline.Item title="Default" variant="default" data-testid="default" />
          <Timeline.Item title="Success" variant="success" data-testid="success" />
          <Timeline.Item title="Error" variant="error" data-testid="error" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('default')).toHaveAttribute('data-variant', 'default');
      expect(screen.getByTestId('success')).toHaveAttribute('data-variant', 'success');
      expect(screen.getByTestId('error')).toHaveAttribute('data-variant', 'error');
    });
  });

  describe('Context Behavior', () => {
    it('passes position context to items', () => {
      render(
        <Timeline position="right">
          <Timeline.Item title="Item" data-testid="item" isLast />
        </Timeline>
      );

      // Check that flex-row-reverse is applied for right position
      const item = screen.getByTestId('item');
      expect(item).toHaveClass('flex-row-reverse');
    });

    it('works without context (standalone TimelineItem)', () => {
      render(
        <TimelineItem title="Standalone" data-testid="standalone" isLast />
      );

      // Should use defaults
      expect(screen.getByTestId('standalone')).toBeInTheDocument();
      expect(screen.getByText('Standalone')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty timeline', () => {
      render(<Timeline data-testid="empty-timeline" />);

      expect(screen.getByTestId('empty-timeline')).toBeInTheDocument();
    });

    it('handles item with only children (no title/description)', () => {
      render(
        <Timeline>
          <Timeline.Item isLast>
            <div data-testid="only-children">Only children content</div>
          </Timeline.Item>
        </Timeline>
      );

      expect(screen.getByTestId('only-children')).toBeInTheDocument();
    });

    it('handles non-element children gracefully', () => {
      render(
        <Timeline data-testid="timeline">
          {null}
          <Timeline.Item title="Valid Item" isLast />
          {undefined}
        </Timeline>
      );

      expect(screen.getByText('Valid Item')).toBeInTheDocument();
    });
  });

  describe('Interactive Props (onClick/href)', () => {
    it('renders interactive status with click handler', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item
            title="With Action"
            statusTitle="Delete"
            onStatusClick={handleClick}
            isLast
          />
        </Timeline>
      );

      const button = screen.getByRole('button', { name: /delete/i });
      expect(button).toBeInTheDocument();
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders status with href for navigation', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Link"
            statusTitle="View details"
            statusHref="/details"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
    });
  });

  describe('Leading Prop', () => {
    it('renders leading element before title', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Leading"
            leading={<BiUser data-testid="leading-icon" />}
            data-testid="item"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    });

    it('renders leading component with content after', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Event Title"
            leading={<span data-testid="leading">Avatar</span>}
            description="Event description"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('leading')).toBeInTheDocument();
      expect(screen.getByText('Event Title')).toBeInTheDocument();
    });
  });

  describe('Status Area', () => {
    it('renders status as non-interactive element when no onClick or href', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Status"
            statusTitle="Status title"
            data-testid="item"
            isLast
          />
        </Timeline>
      );

      const statusElement = screen.getByText('Status title').closest('[data-variant]');
      expect(statusElement?.tagName).toBe('DIV');
      expect(statusElement).toHaveAttribute('data-variant', 'default');
    });

    it('renders status as button when onStatusClick is provided', () => {
      const handleClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item
            title="With Status"
            statusTitle="Click me"
            onStatusClick={handleClick}
            isLast
          />
        </Timeline>
      );

      const statusButton = screen.getByRole('button', { name: /click me/i });
      expect(statusButton).toBeInTheDocument();
    });

    it('calls onStatusClick when status is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item
            title="With Status"
            statusTitle="Click me"
            onStatusClick={handleClick}
            isLast
          />
        </Timeline>
      );

      await user.click(screen.getByRole('button', { name: /click me/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders status as interactive when statusHref is provided', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Status"
            statusTitle="Go to link"
            statusHref="/some-link"
            isLast
          />
        </Timeline>
      );

      const statusButton = screen.getByRole('button', { name: /go to link/i });
      expect(statusButton).toBeInTheDocument();
    });

    it.each(['default', 'info', 'success', 'warning', 'error'] as const)(
      'applies statusVariant="%s"',
      (statusVariant) => {
        render(
          <Timeline>
            <Timeline.Item
              title="With Status"
              statusTitle="Status title"
              statusVariant={statusVariant}
              isLast
            />
          </Timeline>
        );

        const statusElement = screen.getByText('Status title').closest('[data-variant]');
        expect(statusElement).toHaveAttribute('data-variant', statusVariant);
      }
    );

    it('renders status with icon and title/description', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="With Icon Status"
            statusIconElement={<BiCheck data-testid="status-icon" />}
            statusTitle="Completed"
            statusDescription="All tasks finished"
            statusVariant="success"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('status-icon')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('All tasks finished')).toBeInTheDocument();
    });

    it('does not call onStatusClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item
            title="Disabled Status"
            statusTitle="Cannot click"
            onStatusClick={handleClick}
            disabled
            isLast
          />
        </Timeline>
      );

      // Item is disabled, status button should not be interactive
      await user.click(screen.getByText('Cannot click'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Loading Prop', () => {
    it('renders skeleton when loading is true', () => {
      render(
        <Timeline>
          <Timeline.Item loading data-testid="item" isLast />
        </Timeline>
      );

      const item = screen.getByTestId('item');
      expect(item).toHaveAttribute('data-loading', 'true');
    });

    it('renders skeleton with appropriate background color', () => {
      render(
        <Timeline>
          <Timeline.Item loading data-testid="item" isLast />
        </Timeline>
      );

      // Should have skeleton elements with skeleton styling
      const item = screen.getByTestId('item');
      const skeletonElements = item.querySelectorAll('[class*="bg-"]');
      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('hides content when loading', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Should Not Show"
            description="Also Hidden"
            loading
            isLast
          />
        </Timeline>
      );

      expect(screen.queryByText('Should Not Show')).not.toBeInTheDocument();
      expect(screen.queryByText('Also Hidden')).not.toBeInTheDocument();
    });

    it('sets aria-busy when loading', () => {
      render(
        <Timeline>
          <Timeline.Item loading data-testid="item" isLast />
        </Timeline>
      );

      expect(screen.getByTestId('item')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Disabled Prop', () => {
    it('sets data-disabled when disabled', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Disabled Item"
            disabled
            data-testid="item"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('item')).toHaveAttribute('data-disabled', 'true');
    });

    it('applies disabled styling', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Disabled Item"
            disabled
            data-testid="item"
            isLast
          />
        </Timeline>
      );

      const item = screen.getByTestId('item');
      expect(item).toHaveClass('pointer-events-none');
    });

    it('renders status but disabled when item is disabled', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Disabled Item"
            statusTitle="Cannot interact"
            statusVariant="default"
            disabled
            data-testid="item"
            isLast
          />
        </Timeline>
      );

      // Status still renders but disabled
      const statusElement = screen.getByText('Cannot interact');
      expect(statusElement).toBeInTheDocument();
    });
  });

  describe('Combined Features', () => {
    it('renders with leading and status', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Full Featured"
            leading={<BiUser data-testid="leading" />}
            statusTitle="View details"
            statusVariant="info"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('leading')).toBeInTheDocument();
      expect(screen.getByText('View details')).toBeInTheDocument();
    });

    it('handles item with all features including interactive status', async () => {
      const user = userEvent.setup();
      const handleStatusClick = vi.fn();
      render(
        <Timeline>
          <Timeline.Item
            title="Interactive Full"
            leading={<BiStar data-testid="leading" />}
            statusTitle="Click for more"
            onStatusClick={handleStatusClick}
            statusVariant="success"
            data-testid="item"
            isLast
          />
        </Timeline>
      );

      expect(screen.getByTestId('leading')).toBeInTheDocument();
      
      await user.click(screen.getByRole('button', { name: /click for more/i }));
      expect(handleStatusClick).toHaveBeenCalledTimes(1);
    });

    it('loading takes precedence over content', () => {
      render(
        <Timeline>
          <Timeline.Item
            title="Ignored Title"
            leading={<BiUser data-testid="leading" />}
            statusTitle="Ignored status"
            loading
            isLast
          />
        </Timeline>
      );

      expect(screen.queryByText('Ignored Title')).not.toBeInTheDocument();
      expect(screen.queryByTestId('leading')).not.toBeInTheDocument();
      expect(screen.queryByText('Ignored status')).not.toBeInTheDocument();
    });
  });
});
