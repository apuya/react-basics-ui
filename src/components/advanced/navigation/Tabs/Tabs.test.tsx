/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Tabs, useTabsContext } from './Tabs';

describe('Tabs', () => {
  // ============================================================================
  // RENDERING TESTS
  // ============================================================================
  describe('Rendering', () => {
    it('should render tabs structure with list and panels', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(2);
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should render all tab buttons', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">First</Tabs.Tab>
            <Tabs.Tab value="tab2">Second</Tabs.Tab>
            <Tabs.Tab value="tab3">Third</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('should render only the active panel content', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('should render tabs with leading icons', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1" leadingIcon={<span data-testid="icon-1">🏠</span>}>
              Home
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Home content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render tabs with trailing icons', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1" trailingIcon={<span data-testid="icon-trail">→</span>}>
              Next
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByTestId('icon-trail')).toBeInTheDocument();
    });

    it('should render tabs with both leading and trailing icons', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab
              value="tab1"
              leadingIcon={<span data-testid="icon-lead">←</span>}
              trailingIcon={<span data-testid="icon-trail">→</span>}
            >
              Tab
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByTestId('icon-lead')).toBeInTheDocument();
      expect(screen.getByTestId('icon-trail')).toBeInTheDocument();
    });

    it('should forward ref to Tab button', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab ref={ref} value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should forward ref to Tabs root div', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Tabs ref={ref} defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward ref to TabList div', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List ref={ref}>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'tablist');
    });

    it('should forward ref to TabPanel div', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel ref={ref} value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'tabpanel');
    });

    it('should forward ref to TabPanels div', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels ref={ref}>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should apply custom className to Tabs root', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs" data-testid="tabs-root">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByTestId('tabs-root')).toHaveClass('custom-tabs');
    });

    it('should apply custom className to TabList', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List className="custom-list">
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveClass('custom-list');
    });

    it('should apply custom className to Tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1" className="custom-tab">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tab')).toHaveClass('custom-tab');
    });

    it('should apply custom className to TabPanel', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1" className="custom-panel">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveClass('custom-panel');
    });

    it('should spread additional props to root', () => {
      render(
        <Tabs defaultValue="tab1" data-testid="tabs-test" aria-label="Navigation tabs">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabs = screen.getByTestId('tabs-test');
      expect(tabs).toHaveAttribute('aria-label', 'Navigation tabs');
    });
  });

  // ============================================================================
  // CONTROLLED MODE TESTS
  // ============================================================================
  describe('Controlled Mode', () => {
    it('should respect controlled value prop', () => {
      render(
        <Tabs value="tab2" onChange={() => {}}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('should call onChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));
      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('should not update internal state in controlled mode', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));

      // Content 1 should still be visible because parent controls the value
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('should update displayed content when controlled value changes', () => {
      const { rerender } = render(
        <Tabs value="tab1" onChange={() => {}}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();

      rerender(
        <Tabs value="tab2" onChange={() => {}}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  // ============================================================================
  // UNCONTROLLED MODE TESTS
  // ============================================================================
  describe('Uncontrolled Mode', () => {
    it('should use defaultValue as initial active tab', () => {
      render(
        <Tabs defaultValue="tab2">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should update internal state when tab is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('should call onChange in uncontrolled mode', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs defaultValue="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));
      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('should show no content when defaultValue is empty and no tabs selected', () => {
      render(
        <Tabs defaultValue="">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
    });
  });

  // ============================================================================
  // KEYBOARD NAVIGATION TESTS
  // ============================================================================
  describe('Keyboard Navigation', () => {
    it('should navigate to next tab with ArrowRight (horizontal)', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('should navigate to previous tab with ArrowLeft (horizontal)', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab2" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'ArrowLeft' });

      expect(onChange).toHaveBeenCalledWith('tab1');
    });

    it('should navigate to next tab with ArrowDown (vertical)', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange} orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'ArrowDown' });

      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('should navigate to previous tab with ArrowUp (vertical)', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab2" onChange={onChange} orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'ArrowUp' });

      expect(onChange).toHaveBeenCalledWith('tab1');
    });

    it('should navigate to first tab with Home key', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab3" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'Home' });

      expect(onChange).toHaveBeenCalledWith('tab1');
    });

    it('should navigate to last tab with End key', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'End' });

      expect(onChange).toHaveBeenCalledWith('tab3');
    });

    it('should wrap to first tab when pressing ArrowRight on last tab', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab3" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith('tab1');
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tabList = screen.getByRole('tablist');
      fireEvent.keyDown(tabList, { key: 'ArrowLeft' });

      expect(onChange).toHaveBeenCalledWith('tab3');
    });

    it('should activate tab with Enter key', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();
      await user.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('should activate tab with Space key', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs value="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();
      await user.keyboard(' ');

      expect(onChange).toHaveBeenCalledWith('tab2');
    });
  });

  // ============================================================================
  // DISABLED STATE TESTS
  // ============================================================================
  describe('Disabled States', () => {
    it('should render disabled tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Tab 2')).toBeDisabled();
    });

    it('should not call onChange when clicking disabled tab', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs defaultValue="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByText('Tab 2'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not activate disabled tab with Enter key', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs defaultValue="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();
      await user.keyboard('{Enter}');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should have aria-disabled attribute on disabled tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Tab 2')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // ============================================================================
  // SIZE VARIANTS TESTS
  // ============================================================================
  describe('Size Variants', () => {
    it('should render small size tabs', () => {
      render(
        <Tabs defaultValue="tab1" size="sm">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      // Small size uses CSS variable for height
      expect(tab.className).toContain('h-[length:var(--component-tabs-height-sm)]');
    });

    it('should render medium size tabs (default)', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      expect(tab.className).toContain('h-[length:var(--component-tabs-height-md)]');
    });

    it('should render large size tabs', () => {
      render(
        <Tabs defaultValue="tab1" size="lg">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      expect(tab.className).toContain('h-[length:var(--component-tabs-height-lg)]');
    });
  });

  // ============================================================================
  // ORIENTATION TESTS
  // ============================================================================
  describe('Orientation', () => {
    it('should render horizontal orientation by default', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should render vertical orientation', () => {
      render(
        <Tabs defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should apply horizontal styles to TabList', () => {
      render(
        <Tabs defaultValue="tab1" orientation="horizontal">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveClass('flex-row');
    });

    it('should apply vertical styles to TabList', () => {
      render(
        <Tabs defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveClass('flex-col');
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================
  describe('Accessibility', () => {
    it('should have correct ARIA roles', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should have aria-selected on active tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false');
    });

    it('should have correct aria-controls on tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tab')).toHaveAttribute('aria-controls', 'tabpanel-tab1');
    });

    it('should have correct id on tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tab')).toHaveAttribute('id', 'tab-tab1');
    });

    it('should have correct id on tabpanel', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'tabpanel-tab1');
    });

    it('should have aria-labelledby on tabpanel', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-tab1');
    });

    it('should have tabIndex 0 on active tab and -1 on inactive', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Tab 1')).toHaveAttribute('tabIndex', '0');
      expect(screen.getByText('Tab 2')).toHaveAttribute('tabIndex', '-1');
    });

    it('should have button type="button" on tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tab')).toHaveAttribute('type', 'button');
    });

    it('should have tabIndex 0 on tabpanel for keyboard focus', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveAttribute('tabIndex', '0');
    });
  });

  // ============================================================================
  // CONTEXT TESTS
  // ============================================================================
  describe('Context', () => {
    it('should throw error when Tab is used outside Tabs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>);
      }).toThrow('Tabs compound components must be used within a Tabs component');

      consoleSpy.mockRestore();
    });

    it('should throw error when TabList is used outside Tabs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Tabs.List><div>Tab</div></Tabs.List>);
      }).toThrow('Tabs compound components must be used within a Tabs component');

      consoleSpy.mockRestore();
    });

    it('should throw error when TabPanel is used outside Tabs', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Tabs.Panel value="tab1">Content</Tabs.Panel>);
      }).toThrow('Tabs compound components must be used within a Tabs component');

      consoleSpy.mockRestore();
    });

    it('should expose useTabsContext hook', () => {
      expect(useTabsContext).toBeDefined();
      expect(typeof useTabsContext).toBe('function');
    });
  });

  // ============================================================================
  // COMPONENT MEMOIZATION TESTS
  // ============================================================================
  describe('Memoization', () => {
    it('should have displayName on Tabs', () => {
      expect(Tabs.displayName).toBe('Tabs');
    });

    it('should have displayName on TabList', () => {
      expect(Tabs.List.displayName).toBe('Tabs.List');
    });

    it('should have displayName on Tab', () => {
      expect(Tabs.Tab.displayName).toBe('Tabs.Tab');
    });

    it('should have displayName on TabPanels', () => {
      expect(Tabs.Panels.displayName).toBe('Tabs.Panels');
    });

    it('should have displayName on TabPanel', () => {
      expect(Tabs.Panel.displayName).toBe('Tabs.Panel');
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================
  describe('Edge Cases', () => {
    it('should handle single tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Only Tab</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Only Content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Only Tab')).toBeInTheDocument();
      expect(screen.getByText('Only Content')).toBeInTheDocument();
    });

    it('should handle many tabs', () => {
      const tabs = Array.from({ length: 10 }, (_, i) => `tab${i + 1}`);

      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab} value={tab}>
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels>
            {tabs.map((tab) => (
              <Tabs.Panel key={tab} value={tab}>
                Content {tab}
              </Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getAllByRole('tab')).toHaveLength(10);
    });

    it('should handle tab with complex content', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">
              <span>Complex</span>
              <span>Content</span>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Panel content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should handle panel with complex content', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">
              <h2>Heading</h2>
              <p>Paragraph</p>
              <button>Button</button>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument();
    });

    it('should update when tabs are added dynamically', async () => {
      const user = userEvent.setup();

      const DynamicTabs = () => {
        const [tabs, setTabs] = useState(['tab1', 'tab2']);

        return (
          <div>
            <button onClick={() => setTabs([...tabs, `tab${tabs.length + 1}`])}>
              Add Tab
            </button>
            <Tabs defaultValue="tab1">
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Tab key={tab} value={tab}>
                    {tab}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              <Tabs.Panels>
                {tabs.map((tab) => (
                  <Tabs.Panel key={tab} value={tab}>
                    Content {tab}
                  </Tabs.Panel>
                ))}
              </Tabs.Panels>
            </Tabs>
          </div>
        );
      };

      render(<DynamicTabs />);

      expect(screen.getAllByRole('tab')).toHaveLength(2);

      await user.click(screen.getByText('Add Tab'));

      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });
  });

  // ============================================================================
  // INTEGRATION TESTS
  // ============================================================================
  describe('Integration', () => {
    it('should support full tab workflow', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs defaultValue="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Profile</Tabs.Tab>
            <Tabs.Tab value="tab2">Settings</Tabs.Tab>
            <Tabs.Tab value="tab3">Notifications</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Profile content</Tabs.Panel>
            <Tabs.Panel value="tab2">Settings content</Tabs.Panel>
            <Tabs.Panel value="tab3">Notifications content</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      // Initial state
      expect(screen.getByText('Profile content')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toHaveAttribute('aria-selected', 'true');

      // Click second tab
      await user.click(screen.getByText('Settings'));
      expect(onChange).toHaveBeenCalledWith('tab2');
      expect(screen.getByText('Settings content')).toBeInTheDocument();

      // Click third tab
      await user.click(screen.getByText('Notifications'));
      expect(onChange).toHaveBeenCalledWith('tab3');
      expect(screen.getByText('Notifications content')).toBeInTheDocument();

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should work with mixed disabled tabs', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Tabs defaultValue="tab1" onChange={onChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>Tab 2 (Disabled)</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
            <Tabs.Panel value="tab3">Content 3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      // Click disabled tab - should not trigger
      await user.click(screen.getByText('Tab 2 (Disabled)'));
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      // Click enabled tab - should work
      await user.click(screen.getByText('Tab 3'));
      expect(onChange).toHaveBeenCalledWith('tab3');
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });
});
