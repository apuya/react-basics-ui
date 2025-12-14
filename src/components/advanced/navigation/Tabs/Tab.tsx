import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { useTabsContext } from './Tabs';
import { TAB_BASE_CLASSES, TAB_SIZE_STYLES, TAB_STATE_STYLES } from './Tabs.styles';

/**
 * Props for the Tab component.
 */
export interface TabProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  /**
   * Unique identifier for the tab. Must match the corresponding TabPanel value.
   */
  value: string;
  /**
   * Content to display in the tab button.
   */
  children: ReactNode;
  /**
   * Optional icon to display before the tab label.
   */
  leadingIcon?: ReactNode;
  /**
   * Optional icon to display after the tab label.
   */
  trailingIcon?: ReactNode;
}

/**
 * Individual tab button component.
 *
 * Manages its own active state, keyboard interactions, and ARIA attributes.
 * Automatically registers with the parent Tabs context for keyboard navigation.
 *
 * @example
 * ```tsx
 * <Tabs.Tab value="account" leadingIcon={<UserIcon />}>
 *   Account
 * </Tabs.Tab>
 * ```
 */
export const Tab = memo(
  forwardRef<HTMLButtonElement, TabProps>(
    ({ value, children, leadingIcon, trailingIcon, className, disabled, ...props }, ref) => {
      const { activeTab, setActiveTab, size, registerTab } = useTabsContext();
      const isActive = activeTab === value;

      useEffect(() => {
        registerTab(value);
      }, [value, registerTab]);

      const handleClick = useCallback(() => {
        if (!disabled) {
          setActiveTab(value);
        }
      }, [value, setActiveTab, disabled]);

      const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              setActiveTab(value);
            }
          }
        },
        [value, setActiveTab, disabled]
      );

      const tabClasses = useMemo(() => {
        const state = disabled ? 'disabled' : isActive ? 'active' : 'default';
        return cn(
          TAB_BASE_CLASSES,
          TAB_SIZE_STYLES[size as keyof typeof TAB_SIZE_STYLES],
          TAB_STATE_STYLES[state as keyof typeof TAB_STATE_STYLES],
          className
        );
      }, [size, isActive, disabled, className]);

      const paddingStyle = useMemo(
        () => ({
          paddingInline: `var(--component-tabs-padding-inline-${size})`,
          paddingBlock: `var(--component-tabs-padding-block-${size})`,
        }),
        [size]
      );

      return (
        <button
          ref={ref}
          role="tab"
          type="button"
          aria-selected={isActive}
          aria-disabled={disabled}
          aria-controls={`tabpanel-${value}`}
          id={`tab-${value}`}
          data-tab-value={value}
          tabIndex={isActive ? 0 : -1}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={tabClasses}
          style={paddingStyle}
          {...props}
        >
          {leadingIcon && <span className="inline-flex shrink-0">{leadingIcon}</span>}
          {children}
          {trailingIcon && <span className="inline-flex shrink-0">{trailingIcon}</span>}
        </button>
      );
    }
  )
);

Tab.displayName = 'Tabs.Tab';
