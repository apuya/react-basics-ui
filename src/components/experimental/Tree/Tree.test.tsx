import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tree } from './Tree';
import { TreeNode } from './TreeNode';
import { createRef } from 'react';

describe('Tree', () => {
  describe('Rendering', () => {
    it('renders tree container with role="tree"', () => {
      render(
        <Tree data-testid="tree">
          <Tree.Node nodeId="1" label="Item 1" />
        </Tree>
      );

      const tree = screen.getByTestId('tree');
      expect(tree).toHaveAttribute('role', 'tree');
    });

    it('renders children nodes', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Item 1" />
          <Tree.Node nodeId="2" label="Item 2" />
          <Tree.Node nodeId="3" label="Item 3" />
        </Tree>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders nested nodes', () => {
      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child 1" />
            <Tree.Node nodeId="1-2" label="Child 2" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.getByText('Parent')).toBeInTheDocument();
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tree className="custom-tree" data-testid="tree">
          <Tree.Node nodeId="1" label="Item 1" />
        </Tree>
      );

      expect(screen.getByTestId('tree')).toHaveClass('custom-tree');
    });
  });

  describe('TreeNode', () => {
    it('renders with role="treeitem"', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Item 1" data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toHaveAttribute('role', 'treeitem');
    });

    it('renders label text', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="My Label" />
        </Tree>
      );

      expect(screen.getByText('My Label')).toBeInTheDocument();
    });

    it('renders custom icon', () => {
      render(
        <Tree>
          <Tree.Node
            nodeId="1"
            label="Item"
            icon={<span data-testid="custom-icon">🎯</span>}
          />
        </Tree>
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders rightContent', () => {
      render(
        <Tree>
          <Tree.Node
            nodeId="1"
            label="Item"
            rightContent={<span data-testid="right-content">Extra</span>}
          />
        </Tree>
      );

      expect(screen.getByTestId('right-content')).toBeInTheDocument();
    });

    it('sets data-node-id attribute', () => {
      render(
        <Tree>
          <Tree.Node nodeId="test-id" label="Item" data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toHaveAttribute('data-node-id', 'test-id');
    });
  });

  describe('Expansion', () => {
    it('hides children when collapsed', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });

    it('shows children when expanded via defaultExpanded', () => {
      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('expands on toggle button click', async () => {
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.queryByText('Child')).not.toBeInTheDocument();

      const expandButton = screen.getByRole('button', { name: 'Expand' });
      await user.click(expandButton);

      expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('collapses on toggle button click when expanded', async () => {
      const user = userEvent.setup();

      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.getByText('Child')).toBeInTheDocument();

      const collapseButton = screen.getByRole('button', { name: 'Collapse' });
      await user.click(collapseButton);

      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });

    it('sets aria-expanded correctly', async () => {
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent" data-testid="node">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      const node = screen.getByTestId('node');
      expect(node).toHaveAttribute('aria-expanded', 'false');

      const expandButton = screen.getByRole('button', { name: 'Expand' });
      await user.click(expandButton);

      expect(node).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets data-expanded attribute', async () => {
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent" data-testid="node">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      const node = screen.getByTestId('node');
      expect(node).not.toHaveAttribute('data-expanded');

      const expandButton = screen.getByRole('button', { name: 'Expand' });
      await user.click(expandButton);

      expect(node).toHaveAttribute('data-expanded', 'true');
    });
  });

  describe('Selection', () => {
    it('calls onSelect when node is clicked', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Tree selectable onSelect={onSelect}>
          <Tree.Node nodeId="1" label="Item" />
        </Tree>
      );

      await user.click(screen.getByText('Item'));

      expect(onSelect).toHaveBeenCalledWith('1');
    });

    it('sets aria-selected when selected', () => {
      render(
        <Tree selectable selectedId="1">
          <Tree.Node nodeId="1" label="Item 1" data-testid="node-1" />
          <Tree.Node nodeId="2" label="Item 2" data-testid="node-2" />
        </Tree>
      );

      expect(screen.getByTestId('node-1')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('node-2')).toHaveAttribute('aria-selected', 'false');
    });

    it('sets data-selected attribute when selected', () => {
      render(
        <Tree selectable selectedId="1">
          <Tree.Node nodeId="1" label="Item 1" data-testid="node-1" />
          <Tree.Node nodeId="2" label="Item 2" data-testid="node-2" />
        </Tree>
      );

      expect(screen.getByTestId('node-1')).toHaveAttribute('data-selected', 'true');
      expect(screen.getByTestId('node-2')).not.toHaveAttribute('data-selected');
    });

    it('does not call onSelect for disabled nodes', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Tree selectable onSelect={onSelect}>
          <Tree.Node nodeId="1" label="Disabled Item" disabled />
        </Tree>
      );

      await user.click(screen.getByText('Disabled Item'));

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('sets aria-disabled when disabled', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Disabled" disabled data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets data-disabled attribute when disabled', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Disabled" disabled data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toHaveAttribute('data-disabled', 'true');
    });

    it('sets tabIndex=-1 when disabled', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Disabled" disabled data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Keyboard Navigation', () => {
    it('selects node on Enter key', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Tree selectable onSelect={onSelect}>
          <Tree.Node nodeId="1" label="Item" data-testid="node" />
        </Tree>
      );

      screen.getByTestId('node').focus();
      await user.keyboard('{Enter}');

      expect(onSelect).toHaveBeenCalledWith('1');
    });

    it('selects node on Space key', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Tree selectable onSelect={onSelect}>
          <Tree.Node nodeId="1" label="Item" data-testid="node" />
        </Tree>
      );

      screen.getByTestId('node').focus();
      await user.keyboard(' ');

      expect(onSelect).toHaveBeenCalledWith('1');
    });

    it('expands node on ArrowRight key', async () => {
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent" data-testid="node">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.queryByText('Child')).not.toBeInTheDocument();

      screen.getByTestId('node').focus();
      await user.keyboard('{ArrowRight}');

      expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('collapses node on ArrowLeft key', async () => {
      const user = userEvent.setup();

      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent" data-testid="node">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.getByText('Child')).toBeInTheDocument();

      screen.getByTestId('node').focus();
      await user.keyboard('{ArrowLeft}');

      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });

    it('does not expand with ArrowRight when already expanded', async () => {
      const user = userEvent.setup();

      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent" data-testid="node">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      screen.getByTestId('node').focus();
      await user.keyboard('{ArrowRight}');

      // Should still be expanded
      expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('does not collapse with ArrowLeft when already collapsed', async () => {
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent" data-testid="node">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      screen.getByTestId('node').focus();
      await user.keyboard('{ArrowLeft}');

      // Should still be collapsed
      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });
  });

  describe('showLines Prop', () => {
    it('sets data-show-lines on tree container', () => {
      render(
        <Tree showLines data-testid="tree">
          <Tree.Node nodeId="1" label="Item" />
        </Tree>
      );

      expect(screen.getByTestId('tree')).toHaveAttribute('data-show-lines', 'true');
    });

    it('does not set data-show-lines when false', () => {
      render(
        <Tree data-testid="tree">
          <Tree.Node nodeId="1" label="Item" />
        </Tree>
      );

      expect(screen.getByTestId('tree')).not.toHaveAttribute('data-show-lines');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to Tree container', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Tree ref={ref}>
          <Tree.Node nodeId="1" label="Item" />
        </Tree>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'tree');
    });

    it('forwards ref to TreeNode container', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Tree>
          <Tree.Node ref={ref} nodeId="1" label="Item" />
        </Tree>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'treeitem');
    });
  });

  describe('TreeNode Export', () => {
    it('exports TreeNode separately', () => {
      render(
        <Tree>
          <TreeNode nodeId="1" label="Using TreeNode" data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toBeInTheDocument();
      expect(screen.getByText('Using TreeNode')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA structure', () => {
      render(
        <Tree defaultExpanded={['1']} data-testid="tree">
          <Tree.Node nodeId="1" label="Parent" data-testid="parent">
            <Tree.Node nodeId="1-1" label="Child" data-testid="child" />
          </Tree.Node>
        </Tree>
      );

      const tree = screen.getByTestId('tree');
      const parent = screen.getByTestId('parent');
      const child = screen.getByTestId('child');

      expect(tree).toHaveAttribute('role', 'tree');
      expect(parent).toHaveAttribute('role', 'treeitem');
      expect(child).toHaveAttribute('role', 'treeitem');
    });

    it('toggle button has accessible label', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      const expandButton = screen.getByRole('button', { name: 'Expand' });
      expect(expandButton).toBeInTheDocument();
    });

    it('children container has role="group"', () => {
      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent">
            <Tree.Node nodeId="1-1" label="Child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('nodes are focusable', () => {
      render(
        <Tree>
          <Tree.Node nodeId="1" label="Item" data-testid="node" />
        </Tree>
      );

      expect(screen.getByTestId('node')).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('displayName', () => {
    it('has correct displayName for Tree', () => {
      expect(Tree.displayName).toBe('Tree');
    });

    it('has correct displayName for Tree.Node', () => {
      expect(Tree.Node.displayName).toBe('Tree.Node');
    });
  });

  describe('Click Event', () => {
    it('calls onClick handler when node content is clicked', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Clickable" onClick={onClick} />
        </Tree>
      );

      await user.click(screen.getByText('Clickable'));

      expect(onClick).toHaveBeenCalled();
    });

    it('calls onKeyDown handler on keydown', async () => {
      const onKeyDown = vi.fn();
      const user = userEvent.setup();

      render(
        <Tree>
          <Tree.Node nodeId="1" label="Item" onKeyDown={onKeyDown} data-testid="node" />
        </Tree>
      );

      screen.getByTestId('node').focus();
      await user.keyboard('a');

      expect(onKeyDown).toHaveBeenCalled();
    });
  });

  describe('data-has-children Attribute', () => {
    it('sets data-has-children when node has children', () => {
      render(
        <Tree defaultExpanded={['1']}>
          <Tree.Node nodeId="1" label="Parent" data-testid="parent">
            <Tree.Node nodeId="1-1" label="Child" data-testid="child" />
          </Tree.Node>
        </Tree>
      );

      expect(screen.getByTestId('parent')).toHaveAttribute('data-has-children', 'true');
      expect(screen.getByTestId('child')).not.toHaveAttribute('data-has-children');
    });
  });
});
