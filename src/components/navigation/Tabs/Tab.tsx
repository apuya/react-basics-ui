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

export interface TabProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const Tab = memo(
  forwardRef<HTMLButtonElement, TabProps>(
    ({ value, children, icon, className, disabled, ...props }, ref) => {
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
          TAB_SIZE_STYLES[size],
          TAB_STATE_STYLES[state],
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
          aria-controls={`tabpanel-${value}`}
          id={`tab-${value}`}
          tabIndex={isActive ? 0 : -1}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={tabClasses}
          style={paddingStyle}
          {...props}
        >
          {icon && <span className="inline-flex shrink-0">{icon}</span>}
          {children}
        </button>
      );
    }
  )
);

Tab.displayName = 'Tabs.Tab';
