import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanels } from './TabPanels';
import { TabPanel } from './TabPanel';

export type TabsSize = 'sm' | 'default' | 'lg';

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: TabsSize;
  orientation?: 'horizontal' | 'vertical';
}

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  size: TabsSize;
  orientation: 'horizontal' | 'vertical';
  registerTab: (value: string) => void;
  tabsOrder: string[];
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs sub-components must be used within a Tabs component');
  }
  return context;
};

const TabsRoot = ({
  defaultValue = '',
  value,
  onChange,
  size = 'default',
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [tabsOrder, setTabsOrder] = useState<string[]>([]);
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
    setTabsOrder((prev) => {
      if (!prev.includes(tabValue)) {
        return [...prev, tabValue];
      }
      return prev;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      size,
      orientation,
      registerTab,
      tabsOrder,
    }),
    [activeTab, setActiveTab, size, orientation, registerTab, tabsOrder]
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

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab: Tab,
  Panels: TabPanels,
  Panel: TabPanel,
});
