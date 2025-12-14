# Compound Component Pattern Refactor Instructions

## Purpose

Refactor components to use the **compound component pattern** for flexible composition while maintaining shared state between parent and child components.

---

## Pragmatic Primer Rules

Quick decision guide for when to use each pattern:

### 1. Base Components for Component Families Only

Create a base component only when you have **multiple variants** sharing logic.

| ✅ Do | ❌ Don't |
|-------|---------|
| `ButtonBase` → `Button`, `IconButton`, `LinkButton` | `InputBase` if you only have `Input` |
| `CardBase` → `Card`, `MediaCard`, `InteractiveCard` | `BadgeBase` for a single `Badge` |

### 2. Compound Components for Complex Nesting Only

Use compound components when children need **shared state** or **complex composition**.

| ✅ Compound | ❌ Keep Simple |
|-------------|----------------|
| `Dropdown`, `Menu`, `Dialog`, `Tabs`, `Accordion` | `Button`, `Card`, `Badge`, `Alert` |
| Children need parent context | Static/slot-based composition works |

### 3. Separate types.ts When Types Are Shared

Create a `.types.ts` file only when **multiple components** share the same types.

| ✅ Separate | ❌ Keep Inline |
|-------------|----------------|
| Button family shares `ButtonSize`, `ButtonVariant` | Standalone component with unique types |
| Form components share `FormFieldState` | Single-use interface |

### 4. Always Add Accessibility Basics

Every interactive component needs these:

```tsx
// Loading states
aria-disabled={loading || undefined}  // Keeps focus, unlike disabled

// Screen reader announcements
{loading && (
  <VisuallyHidden>
    <span role="status" aria-live="polite">{loadingAnnouncement}</span>
  </VisuallyHidden>
)}

// Icon buttons
'aria-label': string  // Required via TypeScript
```

### 5. Keep Memoization

Performance patterns to maintain:

```tsx
// Components
export const Button = memo(forwardRef(...));

// Derived values
const classes = useMemo(() => cn(...), [deps]);
const style = useMemo(() => ({ ... }), [deps]);

// Callbacks passed to children
const handleClick = useCallback(() => { ... }, [deps]);
```

### 6. Keep Tiered Exports

Maintain the three-tier export structure:

```tsx
// react-basics-ui (basic tier)
export { Button, Input, Card } from './components/basic';

// react-basics-ui/advanced
export { Table, Tabs, Accordion } from './components/advanced';

// react-basics-ui/experimental
export { Drawer, CommandPalette } from './components/experimental';
```

---

## Pattern Overview

### Before (Props-based)
```tsx
<Card
  header="Title"
  content="Body text"
  footer={<Button>Action</Button>}
/>
```

### After (Compound Component)
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Body text</Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## Implementation Checklist

### 1. Create Context for Shared State

Use `createComponentContext()` from `@/lib/createComponentContext`:

```tsx
import { createComponentContext } from '@/lib/createComponentContext';

interface ComponentContextValue {
  size: ComponentSize;
  variant: ComponentVariant;
  // ... other shared state
}

const { Context: ComponentContext, useContext: useComponentContext } =
  createComponentContext<ComponentContextValue>('ComponentName');

export { useComponentContext };
```

### 2. Create Root Component

The root component provides context to all children:

```tsx
const ComponentRoot = memo(
  forwardRef<HTMLDivElement, ComponentProps>(
    ({ size = 'default', variant = 'default', children, className, ...props }, ref) => {
      const contextValue = useMemo(
        () => ({ size, variant }),
        [size, variant]
      );

      const rootClasses = useMemo(
        () => cn(BASE_CLASSES, VARIANT_STYLES[variant], className),
        [variant, className]
      );

      return (
        <ComponentContext.Provider value={contextValue}>
          <div ref={ref} className={rootClasses} data-variant={variant} {...props}>
            {children}
          </div>
        </ComponentContext.Provider>
      );
    }
  )
);

ComponentRoot.displayName = 'ComponentName';
```

### 3. Create Sub-components

Each sub-component consumes context and renders its portion:

```tsx
const ComponentHeader = memo(
  forwardRef<HTMLDivElement, ComponentHeaderProps>(
    ({ children, className, ...props }, ref) => {
      const { size } = useComponentContext();

      const headerClasses = useMemo(
        () => cn(HEADER_CLASSES, SIZE_STYLES[size], className),
        [size, className]
      );

      return (
        <div ref={ref} className={headerClasses} {...props}>
          {children}
        </div>
      );
    }
  )
);

ComponentHeader.displayName = 'ComponentName.Header';
```

### 4. Export with Object.assign

Attach sub-components to the root for `Parent.Child` API:

```tsx
export const ComponentName = Object.assign(ComponentRoot, {
  Header: ComponentHeader,
  Content: ComponentContent,
  Footer: ComponentFooter,
});
```

---

## File Structure

```
ComponentName/
├── ComponentName.tsx        # Root component + context
├── ComponentNameHeader.tsx  # Sub-component
├── ComponentNameContent.tsx # Sub-component
├── ComponentNameFooter.tsx  # Sub-component (optional)
├── ComponentName.styles.ts  # All style constants
├── ComponentName.test.tsx   # Tests
├── ComponentName.stories.tsx # Storybook
└── index.ts                 # Exports
```

---

## Naming Conventions

| Item | Pattern | Example |
|------|---------|---------|
| Root component | `ComponentRoot` | `CardRoot`, `ModalRoot` |
| Sub-component | `ComponentPart` | `CardHeader`, `ModalContent` |
| Context | `ComponentContext` | `CardContext`, `ModalContext` |
| Context hook | `useComponentContext` | `useCardContext`, `useModalContext` |
| Context value type | `ComponentContextValue` | `CardContextValue` |
| displayName (root) | `'ComponentName'` | `'Card'` |
| displayName (sub) | `'ComponentName.Part'` | `'Card.Header'` |

---

## Context Value Guidelines

### What to Include in Context

✅ **Include:**
- Size variants (`size: 'small' | 'default' | 'large'`)
- Visual variants (`variant: 'default' | 'bordered'`)
- State that affects children (`isOpen`, `isDisabled`)
- Callbacks children need (`onClose`, `toggleItem`)
- IDs for accessibility (`id` for aria-labelledby)

❌ **Don't Include:**
- Props that only affect one child
- Transient UI state (hover, focus)
- Refs
- Large objects or arrays

### Example Context Values

```tsx
// Accordion
interface AccordionContextValue {
  activeItems: string[];
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  type: 'single' | 'multiple';
}

// Modal
interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: ModalSize;
}

// Table
interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
}
```

---

## Sub-component Patterns

### Standard Sub-component

```tsx
export interface ComponentHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

const ComponentHeader = memo(
  forwardRef<HTMLDivElement, ComponentHeaderProps>(
    ({ children, className, ...props }, ref) => {
      const { size } = useComponentContext();

      return (
        <div ref={ref} className={cn(HEADER_CLASSES, className)} {...props}>
          {children}
        </div>
      );
    }
  )
);

ComponentHeader.displayName = 'Component.Header';
```

### Using createSubComponent Factory

For simple Header/Content/Footer patterns, use the factory:

```tsx
import { createSubComponent } from '@/lib/createSubComponent';

const ComponentHeader = createSubComponent({
  displayName: 'Component.Header',
  element: 'header',
  baseClasses: HEADER_CLASSES,
});
```

---

## Testing Compound Components

### Test Context Integration

```tsx
describe('Component', () => {
  it('provides context to children', () => {
    render(
      <Component size="small">
        <Component.Header>Title</Component.Header>
      </Component>
    );
    
    expect(screen.getByText('Title').parentElement).toHaveAttribute('data-size', 'small');
  });
});
```

### Test Sub-components in Isolation

```tsx
// Use context provider directly for unit tests
const renderWithContext = (ui: ReactElement, contextValue?: Partial<ComponentContextValue>) => {
  return render(
    <ComponentContext.Provider value={{ size: 'default', ...contextValue }}>
      {ui}
    </ComponentContext.Provider>
  );
};

describe('Component.Header', () => {
  it('renders children', () => {
    renderWithContext(<ComponentHeader>Title</ComponentHeader>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
```

---

## Migration Steps

### Step 1: Identify Shared State
- What props does parent pass to children?
- What state do multiple children need?

### Step 2: Create Context
- Define `ComponentContextValue` interface
- Use `createComponentContext()`

### Step 3: Refactor Root Component
- Wrap with context provider
- Move shared logic to context value

### Step 4: Extract Sub-components
- Create separate files for each sub-component
- Consume context instead of props

### Step 5: Update Exports
- Use `Object.assign()` pattern
- Update `index.ts` barrel exports

### Step 6: Update Tests
- Add context integration tests
- Update test helpers to provide context

### Step 7: Update Stories
- Show compound composition
- Document available sub-components

---

## Components to Refactor

| Component | Status | Sub-components |
|-----------|--------|----------------|
| Button | ✅ Done | ButtonBase, Button, IconButton, ButtonGroup |
| Card | ⬜ TODO | Header, Content, Footer |
| List | ⬜ TODO | Item, ItemIcon, ItemText |
| Alert | ⬜ TODO | Icon, Title, Description, Actions |
| Dropdown | ⬜ TODO | Trigger, Menu, Item, Separator |
| Tabs | ⬜ TODO | List, Tab, Panel |

---

## Completed Refactors

### Button (✅ Completed)

**Files:**
- `Button.types.ts` - Shared types with discriminated union for IconButton a11y
- `ButtonBase.tsx` - All logic: variants, sizes, loading, visuals, polymorphic
- `Button.tsx` - Thin wrapper (~10 lines)
- `IconButton.tsx` - Thin wrapper (~15 lines)
- `ButtonGroup.tsx` - Container with context

**API Changes:**
| Old | New |
|-----|-----|
| `isLoading` | `loading` |
| `leadingIcon` | `leadingVisual` |
| `trailingIcon` | `trailingVisual` |
| - | `loadingAnnouncement` (new) |
| - | `block` (new) |

**Key Features:**
- `aria-disabled` instead of `disabled` for loading (keeps focus)
- Screen reader announcement via `VisuallyHidden`
- IconButton enforces `aria-label` OR `aria-labelledby`
- Polymorphic `as` prop support

---

## Anti-patterns to Avoid

### ❌ Prop Drilling Through Children
```tsx
// Bad - passing props through each level
<Card size="small">
  <CardHeader size="small"> {/* Redundant */}
```

### ✅ Use Context
```tsx
// Good - children read from context
<Card size="small">
  <Card.Header> {/* Inherits size from context */}
```

### ❌ Tightly Coupled Sub-components
```tsx
// Bad - Header only works inside Card
const CardHeader = ({ cardId }) => { ... }
```

### ✅ Flexible Sub-components
```tsx
// Good - works with context, graceful without
const CardHeader = () => {
  const context = useCardContext(); // Throws helpful error if missing
  ...
}
```

---

## Reference Examples

Existing compound components in this codebase:
- `src/components/data-display/Accordion/` - Full implementation
- `src/components/data-display/Table/` - Complex with many sub-components
- `src/components/overlay/Modal/` - With portal and focus trap
- `src/components/navigation/Dropdown/` - With keyboard navigation

---

## Separate Base Components from Variants

### Principle

Create a **base component** with ALL shared logic, then create **thin wrapper** components that simply configure the base. The base handles variants, sizes, loading, visuals, and accessibility. Wrappers are ~10 lines each.

### File Structure

```
Button/
├── Button.types.ts      # Shared, reusable types
├── ButtonBase.tsx       # ALL shared logic (variants, sizes, loading, visuals, a11y)
├── Button.tsx           # Thin wrapper (~10 lines)
├── IconButton.tsx       # Thin wrapper (~15 lines)
├── ButtonGroup.tsx      # Container with context
├── Button.styles.ts     # All style constants
└── index.ts
```

### Types File Pattern

```tsx
// Button.types.ts - Shared, reusable types
import type { ReactNode } from 'react';

/** Size options for button components */
export type ButtonSize = 'small' | 'default' | 'large';

/** Style variant options for button components */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';

/** Base props shared by all button components */
export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingAnnouncement?: string;  // 🆕 Accessibility
  block?: boolean;
  className?: string;
}

/** Props for standard Button */
export interface ButtonProps extends ButtonBaseProps {
  leadingVisual?: ReactNode;
  trailingVisual?: ReactNode;
  children?: ReactNode;
}

/** Props for IconButton - enforces accessibility */
export type IconButtonProps = ButtonBaseProps & {
  icon: ReactNode;
  shape?: 'square' | 'circle';
} & (
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
);
```

### Base Component Pattern (ALL Logic Here)

```tsx
// ButtonBase.tsx - Contains ALL shared logic
import { VisuallyHidden } from '@/components/basic/utility/VisuallyHidden';

function ButtonBaseInner<E extends ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    size = 'default',
    loading = false,
    loadingAnnouncement = 'Loading',
    disabled,
    block,
    className,
    leadingVisual,
    trailingVisual,
    children,
    onClick,
    ...props
  }: PolymorphicProps<E>,
  ref: PolymorphicRef<E>
) {
  const Component = as || 'button';
  const isDisabled = disabled || loading;

  const classes = useMemo(
    () => cn(BASE_CLASSES, SIZE_STYLES[size], VARIANT_STYLES[variant], block && 'w-full', className),
    [size, variant, block, className]
  );

  return (
    <>
      <Component
        ref={ref}
        className={classes}
        // aria-disabled keeps focus (better UX than disabled for loading)
        aria-disabled={loading || undefined}
        disabled={isDisabled && !loading ? true : undefined}
        onClick={loading ? undefined : onClick}
        data-loading={loading || undefined}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {/* Leading visual or spinner */}
        {loading && !trailingVisual ? <Spinner size={size} /> : leadingVisual}

        {/* Content */}
        {children && <span className={loading ? 'opacity-0' : undefined}>{children}</span>}

        {/* Trailing visual or spinner */}
        {loading && !leadingVisual && trailingVisual ? <Spinner size={size} /> : trailingVisual}

        {/* Centered spinner overlay */}
        {loading && !leadingVisual && !trailingVisual && children && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size={size} />
          </span>
        )}
      </Component>

      {/* Screen reader loading announcement */}
      {loading && (
        <VisuallyHidden>
          <span role="status" aria-live="polite">{loadingAnnouncement}</span>
        </VisuallyHidden>
      )}
    </>
  );
}

export const ButtonBase = memo(forwardRef(ButtonBaseInner));
ButtonBase.displayName = 'ButtonBase';
```

### Thin Wrapper Pattern

```tsx
// Button.tsx - Thin wrapper, ~10 lines
import { forwardRef, memo } from 'react';
import { ButtonBase } from './ButtonBase';
import type { ButtonProps } from './Button.types';

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <ButtonBase ref={ref} as="button" {...props} />
  ))
);

Button.displayName = 'Button';
```

```tsx
// IconButton.tsx - Thin wrapper with shape support
import { forwardRef, memo } from 'react';
import { cn } from '@/lib/cn';
import { ButtonBase } from './ButtonBase';
import type { IconButtonProps } from './Button.types';

export const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, shape = 'square', size = 'default', className, ...props }, ref) => (
      <ButtonBase
        ref={ref}
        as="button"
        size={size}
        className={cn('!p-0', ICON_BUTTON_SIZE_STYLES[size], shape === 'circle' && 'rounded-full', className)}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
      </ButtonBase>
    )
  )
);

IconButton.displayName = 'IconButton';
```

### API Design Principles

| Principle | Implementation |
|-----------|----------------|
| `aria-disabled` over `disabled` for loading | Keeps focus, better UX |
| Screen reader announcements | `VisuallyHidden` + `aria-live` |
| Enforce accessibility | IconButton requires `aria-label` OR `aria-labelledby` |
| Polymorphic | `as` prop for rendering as different elements |
| Visual slots | `leadingVisual`, `trailingVisual` (not just icons) |

### When to Separate Base from Wrappers

| Separate | Keep Together |
|----------|---------------|
| Multiple variants share logic | Single-purpose component |
| Complex accessibility requirements | Simple styling-only component |
| Need polymorphic rendering | Fixed element type |
| `Button`, `Input`, `Card` | `Badge`, `Divider` |

---

## Shared Types File

### Principle

Each component family has its own `.types.ts` file with reusable types. Global types live in `src/types/`.

### File Structure

```
src/
├── types/
│   ├── index.ts           # Global types barrel export
│   ├── variants.ts        # Shared size, status types
│   └── polymorphic.ts     # Polymorphic component helpers
└── components/
    └── Button/
        └── Button.types.ts  # Component-specific types
```

### Component Types File Pattern

```tsx
// Button/Button.types.ts
import type { ReactNode } from 'react';

// ============================================================================
// Shared Types - Reusable across all button variants
// ============================================================================

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';

// ============================================================================
// Base Props - Shared across all button variants
// ============================================================================

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingAnnouncement?: string;
  block?: boolean;
  className?: string;
}

// ============================================================================
// Component-Specific Props
// ============================================================================

export interface ButtonProps extends ButtonBaseProps {
  leadingVisual?: ReactNode;
  trailingVisual?: ReactNode;
  children?: ReactNode;
}

// Enforce aria-label OR aria-labelledby (discriminated union)
export type IconButtonProps = ButtonBaseProps & {
  icon: ReactNode;
  shape?: 'square' | 'circle';
} & (
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }
);
```

### Global Shared Types

```tsx
// src/types/variants.ts
export type ComponentSize = 'small' | 'default' | 'large';
export type Status = 'info' | 'success' | 'warning' | 'error';

export interface InteractiveState {
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
}

export interface FormFieldState extends InteractiveState {
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
}
```

### Polymorphic Types

```tsx
// src/types/polymorphic.ts
import type { ElementType, ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

export type AsProp<C extends ElementType> = { as?: C };

export type PolymorphicProps<C extends ElementType, Props = {}> = 
  Props & AsProp<C> & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>;

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];
```

### Type File Guidelines

| ✅ Do | ❌ Don't |
|-------|---------|
| Group by section with comments | Dump everything ungrouped |
| Use discriminated unions for a11y | Allow invalid prop combinations |
| Export from component's index.ts | Force imports from .types.ts |
| Document complex types with JSDoc | Leave complex types unexplained |

---

## Context for Nested Components

### Multi-level Context Pattern

For deeply nested compound components, use multiple context layers to scope state appropriately.

### Example: Table with Nested Contexts

```tsx
// TableContext.tsx - Top-level context
interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
  stickyHeader: boolean;
}

const { Context: TableContext, useContext: useTableContext } =
  createComponentContext<TableContextValue>('Table');

// TableRowContext.tsx - Row-level context
interface TableRowContextValue {
  isSelected: boolean;
  isHovered: boolean;
  rowIndex: number;
}

const { Context: TableRowContext, useContext: useTableRowContext } =
  createComponentContext<TableRowContextValue>('Table.Row');
```

### Nested Context Usage

```tsx
// TableRow.tsx
const TableRow = memo(
  forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, isSelected = false, ...props }, ref) => {
      const { variant } = useTableContext(); // Access parent context
      const [isHovered, setIsHovered] = useState(false);

      const rowContextValue = useMemo(
        () => ({ isSelected, isHovered, rowIndex: props['data-index'] }),
        [isSelected, isHovered, props['data-index']]
      );

      return (
        <TableRowContext.Provider value={rowContextValue}>
          <tr
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-selected={isSelected || undefined}
            {...props}
          >
            {children}
          </tr>
        </TableRowContext.Provider>
      );
    }
  )
);

// TableCell.tsx
const TableCell = memo(
  forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, ...props }, ref) => {
      const { size } = useTableContext();       // Top-level context
      const { isSelected } = useTableRowContext(); // Row-level context

      return (
        <td
          ref={ref}
          className={cn(CELL_CLASSES, isSelected && SELECTED_CLASSES)}
          {...props}
        >
          {children}
        </td>
      );
    }
  )
);
```

### Context Hierarchy Example

```
<Table>                          ← TableContext.Provider
  <Table.Header>
    <Table.Row>                  ← TableRowContext.Provider
      <Table.HeaderCell />       ← Consumes both contexts
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row isSelected>       ← TableRowContext.Provider
      <Table.Cell />             ← Consumes both contexts
    </Table.Row>
  </Table.Body>
</Table>
```

### When to Use Nested Contexts

| Use Nested Context | Use Single Context |
|-------------------|-------------------|
| Row/cell relationships in tables | Simple parent-child |
| Accordion items with trigger/content | Flat component structure |
| Menu with submenus | Single-level menus |
| Form with field groups | Simple forms |

---

## Slot-Based Composition

### Principle

Slots allow consumers to inject content into predefined areas of a component while the component controls layout and styling.

### Slot Pattern with Props

```tsx
// Card.tsx - Slot-based API
export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Slot: Renders in the header area */
  header?: ReactNode;
  /** Slot: Renders in the media/image area */
  media?: ReactNode;
  /** Slot: Renders in the footer area */
  footer?: ReactNode;
  /** Slot: Actions rendered in footer-right */
  actions?: ReactNode;
  children: ReactNode;
}

const Card = memo(
  forwardRef<HTMLDivElement, CardProps>(
    ({ header, media, footer, actions, children, className, ...props }, ref) => {
      return (
        <div ref={ref} className={cn(CARD_CLASSES, className)} {...props}>
          {media && <div className={MEDIA_SLOT_CLASSES}>{media}</div>}
          {header && <div className={HEADER_SLOT_CLASSES}>{header}</div>}
          <div className={CONTENT_SLOT_CLASSES}>{children}</div>
          {(footer || actions) && (
            <div className={FOOTER_SLOT_CLASSES}>
              {footer}
              {actions && <div className={ACTIONS_SLOT_CLASSES}>{actions}</div>}
            </div>
          )}
        </div>
      );
    }
  )
);
```

### Usage

```tsx
<Card
  media={<img src="hero.jpg" alt="Hero" />}
  header={<Heading size="h3">Card Title</Heading>}
  footer={<Text size="small">Last updated: Today</Text>}
  actions={
    <>
      <Button variant="tertiary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
>
  <Text>Card body content goes here.</Text>
</Card>
```

### Hybrid: Slots + Compound Components

Combine slots for simple cases with compound components for complex customization:

```tsx
// Simple usage with slots
<Card header="Title" footer={<Button>Action</Button>}>
  Content
</Card>

// Advanced usage with compound components
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Subtitle>Subtitle</Card.Subtitle>
  </Card.Header>
  <Card.Media aspectRatio="16/9">
    <img src="hero.jpg" alt="" />
  </Card.Media>
  <Card.Content>
    <Text>Complex content with custom layout</Text>
  </Card.Content>
  <Card.Footer justify="between">
    <Text size="small">Metadata</Text>
    <Card.Actions>
      <Button>Save</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

### Slot Implementation with Context

```tsx
// For slots that need to communicate with parent
interface CardContextValue {
  size: CardSize;
  hasMedia: boolean;
  registerSlot: (name: string) => void;
}

const CardRoot = ({ header, media, children, ...props }) => {
  const [slots, setSlots] = useState<Set<string>>(new Set());
  
  const registerSlot = useCallback((name: string) => {
    setSlots(prev => new Set(prev).add(name));
  }, []);

  const contextValue = useMemo(
    () => ({ size: props.size, hasMedia: !!media, registerSlot }),
    [props.size, media, registerSlot]
  );

  return (
    <CardContext.Provider value={contextValue}>
      {/* Render slots */}
    </CardContext.Provider>
  );
};
```

### Slot vs Compound Component

| Use Slots | Use Compound Components |
|-----------|------------------------|
| Fixed layout, variable content | Flexible layout |
| Simple content injection | Complex nested structures |
| `header`, `footer`, `actions` | `Header`, `Content`, `Footer` |
| Quick prototyping | Full customization |

### Best Practice: Support Both

```tsx
// Component supports both patterns
export interface CardProps {
  // Slot API
  header?: ReactNode;
  footer?: ReactNode;
  // Children can be compound components
  children: ReactNode;
}

// Detect if using compound pattern
const hasCompoundChildren = Children.toArray(children).some(
  child => isValidElement(child) && 
    [Card.Header, Card.Content, Card.Footer].includes(child.type as any)
);

return hasCompoundChildren 
  ? <div>{children}</div>  // Compound mode
  : <div>{header}{children}{footer}</div>;  // Slot mode
```
