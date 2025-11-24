import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanels } from './TabPanels';
import { TabPanel } from './TabPanel';

// Types
/**
 * Available sizes for tabs.
 */
export type TabsSize = 'sm' | 'md' | 'lg';

/**
 * Context value provided to all Tabs sub-components.
 * @internal
 */
export interface TabsContextValue {
  /** Currently active tab value */
  activeTab: string;
  /** Function to update the active tab */
  setActiveTab: (value: string) => void;
  /** Size variant for all tabs */
  size: TabsSize;
  /** Layout orientation */
  orientation: 'horizontal' | 'vertical';
  /** Register a tab for keyboard navigation */
  registerTab: (value: string) => void;
  /** Reference to maintain tab order for keyboard navigation */
  tabsOrderRef: React.MutableRefObject<string[]>;
}

/**
 * Context for sharing state between Tabs and its sub-components.
 * @internal
 */
export const TabsContext = createContext<TabsContextValue | undefined>(undefined);

/**
 * Hook to access the Tabs context.
 * Must be used within a Tabs component.
 *
 * @throws Error if used outside of Tabs component
 * @internal
 */
export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs sub-components must be used within a Tabs component');
  }
  return context;
};

/**
 * Tabs component for organizing content into multiple panels.
 *
 * A fully accessible tabs implementation following WAI-ARIA authoring practices.
 * Supports both controlled and uncontrolled modes, keyboard navigation,
 * multiple sizes, and horizontal/vertical orientations.
 *
 * ## Features
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Controlled and uncontrolled modes
 * - Three sizes: sm, md (default), lg
 * - Horizontal and vertical orientations
 * - Full ARIA support
 * - Optional leading/trailing icons
 *
 * ## Keyboard Navigation
 * - **Arrow Left/Up**: Previous tab
 * - **Arrow Right/Down**: Next tab
 * - **Home**: First tab
 * - **End**: Last tab
 * - **Enter/Space**: Activate focused tab
 *
 * @example
 * ```tsx
 * // Basic usage (uncontrolled)
 * <Tabs defaultValue="profile">
 *   <Tabs.List>
 *     <Tabs.Tab value="profile">Profile</Tabs.Tab>
 *     <Tabs.Tab value="settings">Settings</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel value="profile">Profile content</Tabs.Panel>
 *     <Tabs.Panel value="settings">Settings content</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled mode with icons
 * <Tabs value={activeTab} onChange={setActiveTab} size="lg">
 *   <Tabs.List>
 *     <Tabs.Tab value="home" leadingIcon={<HomeIcon />}>
 *       Home
 *     </Tabs.Tab>
 *     <Tabs.Tab value="profile" leadingIcon={<UserIcon />}>
 *       Profile
 *     </Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel value="home">Home content</Tabs.Panel>
 *     <Tabs.Panel value="profile">Profile content</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical orientation
 * <Tabs defaultValue="tab1" orientation="vertical">
 *   <Tabs.List>
 *     <Tabs.Tab value="tab1">First</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Second</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panels>
 *     <Tabs.Panel value="tab1">First panel</Tabs.Panel>
 *     <Tabs.Panel value="tab2">Second panel</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 * ```
 */
export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /**
   * The default active tab value (uncontrolled mode).
   */
  defaultValue?: string;
  /**
   * The active tab value (controlled mode).
   */
  value?: string;
  /**
   * Callback fired when the active tab changes.
   */
  onChange?: (value: string) => void;
  /**
   * The size of the tabs.
   * @default 'md'
   */
  size?: TabsSize;
  /**
   * The orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

const TabsRoot = ({
  defaultValue = '',
  value,
  onChange,
  size = 'md',
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const tabsOrderRef = useRef<string[]>([]);
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const registerTab = useCallback((tabValue: string) => {
    if (!tabsOrderRef.current.includes(tabValue)) {
      tabsOrderRef.current = [...tabsOrderRef.current, tabValue];
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      size,
      orientation,
      registerTab,
      tabsOrderRef,
    }),
    [activeTab, setActiveTab, size, orientation, registerTab]
  );

  const tabsClasses = useMemo(
    () =>
      cn(
        'flex',
        orientation === 'vertical' ? 'flex-row gap-[var(--component-tabs-gap)]' : 'flex-col',
        className
      ),
    [orientation, className]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={tabsClasses} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

TabsRoot.displayName = 'Tabs';

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
});
