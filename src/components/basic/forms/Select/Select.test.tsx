/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  describe('Rendering', () => {
    it('should render trigger and basic structure', () => {
      render(
        <Select>
          <Select.Trigger placeholder="Select an option" />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(
        <Select label="Choose an option">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('should render with helper text', () => {
      render(
        <Select helperText="This is helper text">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should not render menu when closed', () => {
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should render menu when opened', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should render all options when open', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should render with small size', () => {
      render(
        <Select size="small">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveAttribute('data-size', 'small');
    });

    it('should render with default size', () => {
      render(
        <Select size="default">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveAttribute('data-size', 'default');
    });

    it('should render with large size', () => {
      render(
        <Select size="large">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveAttribute('data-size', 'large');
    });

    it('should apply size to trigger', () => {
      render(
        <Select size="large">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-size', 'large');
    });
  });

  describe('Error State', () => {
    it('should apply error styling to container', () => {
      render(
        <Select error>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveAttribute('data-error', 'true');
    });

    it('should apply error styling to trigger', () => {
      render(
        <Select error>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-error', 'true');
    });

    it('should not have data-error when not in error state', () => {
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).not.toHaveAttribute('data-error');
    });
  });

  describe('Disabled State', () => {
    it('should disable the trigger when disabled', () => {
      render(
        <Select disabled>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('should apply data-disabled attribute', () => {
      render(
        <Select disabled>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveAttribute('data-disabled', 'true');
    });

    it('should not open when disabled', async () => {
      const user = userEvent.setup();
      render(
        <Select disabled>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Open State', () => {
    it('should update data-open attribute when opened', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-open', 'false');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('data-open', 'true');
    });

    it('should update aria-expanded when opened', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Controlled Mode', () => {
    it('should display selected value in controlled mode', async () => {
      const user = userEvent.setup();
      render(
        <Select value="option2" onChange={() => {}}>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      // Options register their labels when menu opens
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{Escape}');

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should call onChange when option is selected', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Select value="option1" onChange={onChange}>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(onChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should update display value when option selected', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should respect defaultValue', async () => {
      const user = userEvent.setup();
      render(
        <Select defaultValue="option2">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      // Options register their labels when menu opens
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{Escape}');

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should close menu after selection', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should close menu on Escape key', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      
      // Open
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // Close with Escape
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close on Escape key', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should close on outside click', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Outside</button>
          <Select>
            <Select.Trigger />
            <Select.Menu>
              <Select.Option value="option1">Option 1</Select.Option>
            </Select.Menu>
          </Select>
        </div>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Outside' }));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate options with ArrowDown', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveFocus();
      
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveFocus();
    });

    it('should navigate options with ArrowUp', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveFocus();
    });

    it('should navigate to first option with Home key', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{ArrowDown}{ArrowDown}');
      await user.keyboard('{Home}');
      
      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveFocus();
    });

    it('should navigate to last option with End key', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{End}');
      
      expect(screen.getByRole('option', { name: 'Option 3' })).toHaveFocus();
    });

    it('should wrap around when navigating with ArrowDown', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      
      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveFocus();
    });
  });

  describe('Option States', () => {
    it('should show check mark on selected option', async () => {
      const user = userEvent.setup();
      render(
        <Select defaultValue="option1">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      const option1 = screen.getByRole('option', { name: 'Option 1' });
      expect(option1).toHaveAttribute('aria-selected', 'true');
      expect(option1).toHaveAttribute('data-selected', 'true');
    });

    it('should mark unselected options correctly', async () => {
      const user = userEvent.setup();
      render(
        <Select defaultValue="option1">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      const option2 = screen.getByRole('option', { name: 'Option 2' });
      expect(option2).toHaveAttribute('aria-selected', 'false');
      expect(option2).not.toHaveAttribute('data-selected');
    });

    it('should disable individual options', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2" disabled>Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      const disabledOption = screen.getByRole('option', { name: 'Option 2' });
      expect(disabledOption).toBeDisabled();
      expect(disabledOption).toHaveAttribute('data-disabled', 'true');
    });

    it('should not select disabled option', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Select onChange={onChange}>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2" disabled>Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on trigger', () => {
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when open', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have listbox role on menu', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should have option role on options', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    });

    it('should have aria-selected on options', async () => {
      const user = userEvent.setup();
      render(
        <Select defaultValue="option1">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));
      
      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-selected', 'false');
    });

    it('should associate label with trigger via htmlFor', () => {
      render(
        <Select label="Test Label" id="test-select">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const label = screen.getByText('Test Label');
      const trigger = screen.getByRole('combobox');
      expect(label).toHaveAttribute('for', trigger.id);
    });

    it('should set aria-controls on trigger when menu is open', async () => {
      const user = userEvent.setup();
      render(
        <Select label="Test Label">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).not.toHaveAttribute('aria-controls');

      await user.click(trigger);

      const menu = screen.getByRole('listbox');
      expect(trigger).toHaveAttribute('aria-controls', menu.id);
    });

    it('should set aria-labelledby on menu when label is provided', async () => {
      const user = userEvent.setup();
      render(
        <Select label="Test Label">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      const label = screen.getByText('Test Label');
      const menu = screen.getByRole('listbox');
      expect(menu).toHaveAttribute('aria-labelledby', label.id);
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to trigger', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Select>
          <Select.Trigger ref={ref} />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('combobox'));
    });

    it('should forward ref to menu', async () => {
      const user = userEvent.setup();
      const ref = createRef<HTMLDivElement>();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu ref={ref}>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByRole('listbox'));
    });

    it('should forward ref to option', async () => {
      const user = userEvent.setup();
      const ref = createRef<HTMLButtonElement>();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option ref={ref} value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('option', { name: 'Option 1' }));
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to root', () => {
      render(
        <Select className="custom-class">
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      const container = screen.getByRole('combobox').parentElement?.parentElement;
      expect(container).toHaveClass('custom-class');
    });

    it('should apply custom className to trigger', () => {
      render(
        <Select>
          <Select.Trigger className="trigger-class" />
          <Select.Menu>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      expect(screen.getByRole('combobox')).toHaveClass('trigger-class');
    });

    it('should apply custom className to option', async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value="option1" className="option-class">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('option', { name: 'Option 1' })).toHaveClass('option-class');
    });
  });

  describe('Display Names', () => {
    it('should have correct displayName on Select.Trigger', () => {
      expect(Select.Trigger.displayName).toBe('Select.Trigger');
    });

    it('should have correct displayName on Select.Menu', () => {
      expect(Select.Menu.displayName).toBe('Select.Menu');
    });

    it('should have correct displayName on Select.Option', () => {
      expect(Select.Option.displayName).toBe('Select.Option');
    });
  });
});
