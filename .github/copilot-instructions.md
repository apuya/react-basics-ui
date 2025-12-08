# Copilot Instructions for react-basics-ui

## Project Overview

React component library with TypeScript and Tailwind CSS v4. Three export tiers:
- **Basic** (`react-basics-ui`) - Production-ready primitives (35 components)
- **Advanced** (`react-basics-ui/advanced`) - Complex composable components
- **Experimental** (`react-basics-ui/experimental`) - Unstable, API may change

## Architecture

### Component Hierarchy

```
src/
├── components/
│   ├── basic/           # Tier 1: Production-ready primitives
│   │   ├── layout/      # Box, Container, Stack, Grid, Flex, Divider, AspectRatio
│   │   ├── typography/  # Text, Heading
│   │   ├── forms/       # Button, Input, Select, Checkbox, etc.
│   │   ├── feedback/    # Alert, Badge, Spinner, Toast, Progress, etc.
│   │   ├── overlay/     # Modal, Tooltip
│   │   ├── navigation/  # Breadcrumb
│   │   ├── data-display/# Avatar, Card, List
│   │   └── utility/     # Icon, VisuallyHidden
│   ├── advanced/        # Tier 2: Complex composables (Table, Tabs, Accordion, etc.)
│   └── experimental/    # Tier 3: Unstable APIs (Drawer, Menu, Navbar, etc.)
├── hooks/               # Reusable React hooks
├── lib/                 # Utilities and factories
├── tokens/              # JS access to design tokens
└── types/               # Shared TypeScript types
```

### Naming Conventions

**Files:**
- Component: `ComponentName.tsx` (PascalCase)
- Styles: `ComponentName.styles.ts`
- Tests: `ComponentName.test.tsx`
- Stories: `ComponentName.stories.tsx`
- Sub-components: `ComponentNamePart.tsx` (e.g., `ModalHeader.tsx`)

**Style Constants** (SCREAMING_SNAKE_CASE):
```typescript
// Single class string
export const BASE_CLASSES = 'inline-flex items-center...';

// Variant mappings
export const SIZE_STYLES = { small: '...', default: '...', large: '...' } as const;
export const VARIANT_STYLES = { primary: '...', secondary: '...' } as const;
```

**Component displayName:**
- Root components: `'ComponentName'` (e.g., `'Table'`)
- Sub-components: `'Parent.Child'` (e.g., `'Table.Row'`, `'Modal.Header'`)

**Props & Types:**
- Props interface: `ComponentNameProps`
- Variant types: `ComponentNameVariant`, `ComponentNameSize`
- Context value: `ComponentNameContextValue`

### Component Structure
Each component follows this folder pattern:
```
ComponentName/
  ComponentName.tsx       # Main component with types
  ComponentName.styles.ts # Extracted style constants
  ComponentName.test.tsx  # Vitest tests
  ComponentName.stories.tsx # Storybook stories
  index.ts               # Public exports (component + types)
```

### Key Patterns

**Compound Components** - Complex components use `Object.assign` pattern:
```tsx
// See: src/components/basic/overlay/Modal/Modal.tsx
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});
```

**Polymorphic Components** - Use `as` prop for element flexibility:
```tsx
// See: src/components/basic/forms/Button/Button.tsx
<Button as="a" href="/page">Link styled as button</Button>
```

**Performance** - Components wrap with `memo(forwardRef(...))` and use `useMemo` for computed values.

**Context Factory** - Use `createComponentContext()` from `src/lib/createComponentContext.tsx` for compound component context.

**Sub-component Factory** - Use `createSubComponent()` from `src/lib/createSubComponent.tsx` for Header/Content/Footer patterns.

### Styling Architecture

**Hybrid Approach**: Use Tailwind's built-in scales for layout properties, CSS tokens only for colors.

- **Tailwind Scales** - Use Tailwind's default scale for heights, gaps, radii, durations, font sizes
- **CSS Tokens** - Use `--component-*` tokens only for **colors** that need theming
- **@theme Block** - Minimal: only focus ring and disabled opacity (accessibility, themeable)
- **Style Files** - Export `const` objects mapping variants to Tailwind classes
- **Class Merging** - Always use `cn()` from `@/lib/cn` (clsx + tailwind-merge)

**Core Principle**: Tailwind for layout, tokens for colors.

**Style File Structure** (`Component.styles.ts`):
```typescript
// Base classes - Tailwind scales for layout, tokens for colors
export const BASE_CLASSES = 
  'inline-flex items-center gap-2 rounded-md duration-200 ' +
  'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring-focus ' +
  'disabled:opacity-disabled ' +
  'bg-[color:var(--component-button-bg-primary)] text-[color:var(--component-button-text-primary)]';

// Size variants - use Tailwind scales
export const SIZE_STYLES = {
  small: 'h-8 px-3 text-sm gap-1.5',     // 32px height
  default: 'h-10 px-4 text-base gap-2',  // 40px height
  large: 'h-12 px-6 text-lg gap-2.5',    // 48px height
} as const;

// Color variants - use CSS tokens for theming
export const VARIANT_STYLES = {
  primary: 'bg-[color:var(--component-button-bg-primary)] text-[color:var(--component-button-text-primary)]',
  secondary: 'bg-[color:var(--component-button-bg-secondary)] text-[color:var(--component-button-text-secondary)]',
} as const;
```

**Tailwind Scale Reference** (commonly used):
| Property | Values | Pixels |
|----------|--------|--------|
| Height | `h-8`, `h-10`, `h-12` | 32px, 40px, 48px |
| Size | `size-4`, `size-5`, `size-6` | 16px, 20px, 24px |
| Gap | `gap-1`, `gap-2`, `gap-3`, `gap-4` | 4px, 8px, 12px, 16px |
| Padding | `p-2`, `p-3`, `p-4`, `px-4`, `py-2` | 8px, 12px, 16px |
| Radius | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full` | 2px, 6px, 8px, 9999px |
| Duration | `duration-150`, `duration-200`, `duration-300` | 150ms, 200ms, 300ms |
| Font Size | `text-xs`, `text-sm`, `text-base`, `text-lg` | 12px, 14px, 16px, 18px |
| Font Weight | `font-normal`, `font-medium`, `font-semibold`, `font-bold` | 400, 500, 600, 700 |
| Shadow | `shadow-sm`, `shadow-md`, `shadow-lg` | standard Tailwind shadows |
| Z-Index | `z-10`, `z-20`, `z-50` | 10, 20, 50 |

**Available @theme Utilities** (defined in `src/global.css`):
| Category | Utilities |
|----------|-----------|
| Focus Ring | `ring-focus`, `ring-offset-focus`, `ring-ring-focus` |
| Disabled | `opacity-disabled` |

**Component Style Pattern**:
```tsx
// Build classes with useMemo
const buttonClasses = useMemo(
  () => cn(BASE_CLASSES, SIZE_STYLES[size], VARIANT_STYLES[variant], className),
  [size, variant, className]
);

// Add data attributes for testing/debugging
<button className={buttonClasses} data-variant={variant} data-size={size}>
```

**When to Use Tailwind Scale vs CSS Token:**
| Property | Approach | Example |
|----------|----------|---------|
| Height, width, padding, gap, margin | Tailwind scale | `h-10`, `gap-2`, `px-4` |
| Border radius | Tailwind scale | `rounded-md`, `rounded-lg` |
| Duration/transition | Tailwind scale | `duration-200`, `duration-300` |
| Font size, weight | Tailwind scale | `text-sm`, `font-medium` |
| Shadow | Tailwind scale | `shadow-md`, `shadow-lg` |
| Z-index | Tailwind scale | `z-50` |
| Background color | CSS token | `bg-[color:var(--component-*-bg)]` |
| Text color | CSS token | `text-[color:var(--component-*-text)]` |
| Border color | CSS token | `border-[color:var(--component-*-border)]` |

**Tailwind v4 Arbitrary Value Syntax** - Use type hints for color tokens:
```typescript
// ✅ Correct - with color type hint
'bg-[color:var(--component-button-bg-primary)]'
'text-[color:var(--component-button-text-primary)]'
'border-[color:var(--component-card-border)]'

// ❌ Wrong - missing type hints (won't compile)
'bg-[var(--component-button-bg-primary)]'

// ✅ Use Tailwind scales directly (no tokens needed)
'h-10 rounded-md duration-200 text-sm font-medium gap-2 px-4'
```

**Token Hierarchy** (in `src/global.css`):
```
--primitive-*   → Raw color values (--primitive-color-blue-500)
--semantic-*    → Contextual meaning (--semantic-text-primary, --semantic-status-error)
--component-*   → Component colors (--component-button-bg-primary)
@theme { }      → Focus ring + disabled opacity only
```

Reference `--component-*` color tokens in style files. Use Tailwind scales for everything else.

### Path Aliases
Use `@/*` for imports from `src/*`:
```typescript
import { cn } from '@/lib/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
```

## Commands

```bash
npm run build        # Build with tsup (outputs to dist/)
npm run dev          # Build in watch mode
npm run test         # Run vitest in watch mode
npm run test:run     # Run tests once
npm run storybook    # Start Storybook on port 6006
npm run lint         # ESLint
npm run format       # Prettier
```

## Testing Conventions

- Use `@testing-library/react` with `vitest`
- Test file pattern: `ComponentName.test.tsx`
- Use `data-*` attributes for test targeting (e.g., `data-variant`, `data-size`)
- Setup in `src/test/setup.ts`

## Export Requirements

When adding components:
1. Export from component's `index.ts` (component + types)
2. Add to category barrel file (e.g., `src/components/basic/forms/index.ts`)
3. Types should be exported separately: `export type { ComponentProps }`

## Shared Utilities

| Utility | Location | Purpose |
|---------|----------|---------|
| `cn()` | `src/lib/cn.ts` | Class name merging |
| `createComponentContext()` | `src/lib/createComponentContext.tsx` | Typed context factory |
| `createSubComponent()` | `src/lib/createSubComponent.tsx` | Header/Content/Footer factory |
| `BaseOverlayDialog` | `src/lib/BaseOverlayDialog.tsx` | Modal/Drawer base |

### Key Hooks (`src/hooks/`)

| Hook | Use Case |
|------|----------|
| `useDisclosureState` | Open/close state for modals, dropdowns, popovers |
| `useDisclosureKeyboardNav` | Arrow key navigation within disclosure items |
| `useFocusTrap` | Trap focus within modals/dialogs |
| `useClickOutside` | Close on outside click |
| `useEscapeKey` | Close on Escape press |
| `useControlledState` | Support both controlled and uncontrolled modes |
| `useMergedRefs` | Combine multiple refs into one |

## Design Principles

### DRY (Don't Repeat Yourself)
Every piece of logic should have a single, authoritative representation. Avoid duplicating code across components.

**Example - Form field label/helper text:**
```tsx
// ❌ WET - Repeating label/helper rendering in each component
// Input.tsx, Textarea.tsx, Select.tsx all have:
{label && <label className="...">{label}</label>}
{children}
{helperText && <p className="...">{helperText}</p>}

// ✅ DRY - Single FormField component handles it
<FormField label={label} helperText={helperText} error={error}>
  <input ... />
</FormField>
```

**When to extract shared logic:**
- Same pattern appears in 2+ components
- Logic involves accessibility, tokens, or styling that must stay consistent
- Shared utilities (`src/lib/`) and hooks (`src/hooks/`) exist for this purpose

## Component Decision Trees

### When to Create a New Component vs. Extend Existing
- **New component**: Different semantic purpose, unique accessibility requirements
- **Extend existing**: Same semantic purpose, just visual variants

### When to Use Shared Utilities
| Situation | Solution |
|-----------|----------|
| Same JSX pattern in 2+ components | Create shared component (e.g., `FormField`) |
| Same logic in 2+ components | Create hook (e.g., `useControlledState`) |
| Same ID generation pattern | Use `generateFormId()` utility |
| Same styling pattern | Create style utility or shared style constants |

### Form Components: Use FormField vs. Inline
| Use FormField | Use Inline |
|---------------|------------|
| Input, Textarea, Select | Checkbox, Radio, Switch (label is beside, not above) |
| Components with label above input | Components with integrated label |
| Need error + helper text pattern | Simple single-element controls |

### Component Independence Rules
Form components (`Label`, `Input`, `Select`, etc.) should remain independent from typography components (`Text`, `Heading`).

**Rationale:**
- Different token namespaces (`--component-label-*` vs `--component-text-*`)
- Form-specific behavior (required indicators, error states, disabled states)
- Simpler API for form consumers
- No circular dependencies

**When Components CAN Share:**
- Utility components (`Icon`, `Spinner`) can be used anywhere
- Hooks are always shareable
- Style utilities in `src/lib/` are shareable

## Memoization Guidelines

### When to Use `useMemo`
✅ **DO memoize:**
- Computed class strings with multiple dependencies: `cn(BASE, SIZE[size], VARIANT[variant], className)`
- Style objects with dynamic values: `{ height: \`var(--size-${size})\` }`
- Expensive computations or transformations

❌ **DON'T memoize:**
- Simple object lookups: `SIZE_STYLES[size]` → just use directly
- Static values that never change
- Values with no dependencies

### Pattern Recognition
```typescript
// ❌ Unnecessary - simple lookup
const classes = useMemo(() => SIZE_STYLES[size], [size]);

// ✅ Necessary - multiple operations
const classes = useMemo(() => cn(BASE, SIZE[size], VARIANT[variant], className), [size, variant, className]);

// ❌ Unnecessary - static object, move outside component
const style = useMemo(() => ({ color: 'var(--token)' }), []);

// ✅ Better - static objects outside component
const ICON_STYLE = { color: 'var(--token)' } as const;
```

## Token Creation Rules

### When Adding New Color Tokens to global.css

1. **Create component-level color tokens** that reference semantic tokens:
   ```css
   /* ✅ Correct - component color token references semantic */
   --component-label-required-color: var(--semantic-text-error);
   --component-button-bg-primary: var(--semantic-brand-secondary-default);
   
   /* ❌ Wrong - using semantic directly in style file */
   'text-[color:var(--semantic-text-error)]'
   ```

2. **Use Tailwind scales for layout properties** - no tokens needed:
   ```typescript
   // ✅ Correct - Tailwind scales for layout
   'h-10 px-4 gap-2 rounded-md duration-200 text-sm font-medium'
   
   // ❌ Wrong - tokens for layout properties
   'h-[length:var(--component-button-height-default)]'
   ```

3. **Token naming pattern** (for colors only):
   ```
   --component-{componentname}-{bg|text|border}-{variant}
   
   Examples:
   --component-button-bg-primary
   --component-button-text-primary
   --component-card-border
   ```

4. **Group tokens by component** in global.css with comment headers:
   ```css
   /* Label Component */
   --component-label-color: ...;
   --component-label-required-color: ...;
   ```

## Data Attributes Standard

Every component should expose relevant state via `data-*` attributes:

| Attribute | When to Use | Example |
|-----------|-------------|---------|
| `data-size` | Component has size variants | `data-size="small"` |
| `data-variant` | Component has style variants | `data-variant="primary"` |
| `data-error` | Component has error state | `data-error={error \|\| undefined}` |
| `data-disabled` | Component can be disabled | `data-disabled={disabled \|\| undefined}` |
| `data-loading` | Component has loading state | `data-loading={isLoading \|\| undefined}` |
| `data-open` | Component has open/closed state | `data-open={isOpen}` |

**Important:** Use `|| undefined` for boolean attributes to prevent `data-error="false"` in DOM.

## Test Coverage Requirements

### Minimum Test Categories for Each Component

1. **Rendering** - Basic render, with props, with children
2. **Variants** - All size/variant combinations via `data-*` attributes  
3. **States** - Disabled, error, loading, etc.
4. **User Interaction** - Click, focus, keyboard, hover (where applicable)
5. **Accessibility** - ARIA attributes, keyboard navigation, focus management
6. **Ref Forwarding** - Verify ref reaches correct DOM element
7. **Controlled/Uncontrolled** - Both modes work correctly (for form inputs)

### Test Naming Convention
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => { ... });
  describe('Size Variants', () => { ... });
  describe('Error State', () => { ... });
  describe('User Interaction', () => { ... });
  describe('Accessibility', () => { ... });
  describe('Ref Forwarding', () => { ... });
});
```

## Quality Checklist

Before submitting component changes:

### Structure & Architecture
- [ ] Component wrapped with `memo(forwardRef(...))` for performance
- [ ] Props use `ComponentPropsWithoutRef<'element'>` for proper HTML attr inheritance
- [ ] Component follows folder structure: `ComponentName/` with `.tsx`, `.styles.ts`, `.test.tsx`, `.stories.tsx`, `index.ts`
- [ ] Sub-components use `createSubComponent()` or `createComponentContext()` factories
- [ ] Compound components use `Object.assign` pattern with proper `displayName` (`Parent.Child`)
- [ ] Component added to barrel exports (`index.ts` → category → tier)

### DRY Compliance & Redundancy
- [ ] No duplicate logic across components - extract to shared utilities (`src/lib/`) or hooks (`src/hooks/`)
- [ ] Form components use `FormField` wrapper instead of inline label/helper rendering
- [ ] ID generation uses `generateFormId()` utility instead of inline logic
- [ ] Shared patterns extracted: context factories, sub-component factories, style utilities
- [ ] No copy-pasted code blocks - if pattern exists in 2+ places, extract it

### Code Quality & Consistency
- [ ] Consistent naming: `ComponentNameProps`, `ComponentNameVariant`, `ComponentNameSize`
- [ ] Style constants use SCREAMING_SNAKE_CASE: `BASE_CLASSES`, `SIZE_STYLES`, `VARIANT_STYLES`
- [ ] Types exported separately: `export type { ComponentProps }`
- [ ] `displayName` set on all components and sub-components
- [ ] Imports use `@/*` path aliases for `src/*` files
- [ ] `cn()` used for all className merging (never manual string concatenation)

### Naming Standardization & Convention
- [ ] **Files**: PascalCase for components (`Button.tsx`), kebab-case for utilities (`generate-form-id.ts`)
- [ ] **Component**: PascalCase (`FormGroup`, `DatePicker`)
- [ ] **Props interface**: `{ComponentName}Props` (e.g., `FormGroupProps`, `ButtonProps`)
- [ ] **Variant types**: `{ComponentName}Variant`, `{ComponentName}Size` (e.g., `ButtonVariant`, `InputSize`)
- [ ] **Context types**: `{ComponentName}ContextValue` (e.g., `DatePickerContextValue`)
- [ ] **Style constants**: SCREAMING_SNAKE_CASE (`BASE_CLASSES`, `SIZE_STYLES`, `VARIANT_STYLES`)
- [ ] **Hooks**: camelCase with `use` prefix (`useDisclosureState`, `useFocusTrap`)
- [ ] **Utilities**: camelCase (`generateFormId`, `createComponentContext`)
- [ ] **Event handlers**: `on{Event}` for props, `handle{Event}` for internal (`onClick`, `handleClick`)
- [ ] **Boolean props**: Use positive names (`disabled`, `error`) not negatives (`notDisabled`)
- [ ] **Sub-component displayName**: `Parent.Child` format (`Modal.Header`, `Table.Row`)

### Tailwind JIT Compiler Compliance
- [ ] Arbitrary values include type hints for colors: `[color:var(--component-*)]`
- [ ] Use Tailwind scales for layout: `h-10`, `gap-2`, `rounded-md`, `duration-200`
- [ ] No dynamic class generation (e.g., `` `text-${color}` ``) - use style objects or complete class strings
- [ ] All classes are statically analyzable - no template literals for class names
- [ ] Use `style` prop for truly dynamic values that can't be predetermined

### Token & Styling (Hybrid Approach)
- [ ] Use Tailwind scales for layout properties: height, gap, padding, radius, duration, font-size, font-weight
- [ ] Use `--component-*` color tokens for bg, text, border colors only
- [ ] No `--primitive-*` or `--semantic-*` tokens directly in component style files
- [ ] No hardcoded colors (`bg-blue-500`) - use token-based classes for theming
- [ ] `data-*` attributes added for variant/size/state (enables testing & CSS targeting)

### Performance Optimization
- [ ] `useMemo` for computed class strings and style objects
- [ ] `useCallback` for event handlers passed to children
- [ ] Avoid unnecessary re-renders - check dependency arrays
- [ ] No premature optimization - profile before optimizing

### Unnecessary Optimization (Avoid)
- [ ] Don't memoize simple string literals or static objects
- [ ] Don't use `useCallback` for handlers not passed as props
- [ ] Don't split tiny components just for "optimization"
- [ ] Don't cache values that are cheap to compute

### Documentation
- [ ] JSDoc comments on exported interfaces and complex props
- [ ] Storybook story shows all variants and interactive states
- [ ] Story descriptions explain use cases and patterns
- [ ] Complex logic has inline comments explaining "why"

### Testing
- [ ] Tests cover: rendering, variants, user interactions, accessibility
- [ ] Use `data-*` attributes for test targeting
- [ ] Test error states and edge cases
- [ ] Accessibility tests: ARIA attributes, keyboard navigation, focus management


## Storybook Conventions

**Story File Structure:**
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',  // e.g., 'Forms/Button', 'Feedback/Alert'
  component: ComponentName,
  parameters: {
    layout: 'centered',  // or 'fullscreen', 'padded'
    docs: { description: { component: 'Brief description.' } },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
};
export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = { args: { children: 'Label' } };
export const AllVariants: Story = { /* render function showing all variants */ };
```

**Category paths:** `Layout/`, `Typography/`, `Forms/`, `Feedback/`, `Overlay/`, `Navigation/`, `Data Display/`, `Utility/`

## Accessibility Patterns

- **Icons**: Use `aria-hidden="true"` for decorative icons, `aria-label` for meaningful ones
- **Dialogs**: Use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Interactive elements**: Include `aria-label` for icon-only buttons
- **Loading states**: Use `aria-busy={isLoading}`
- **Form errors**: Use `aria-invalid={error}`, `aria-describedby` for helper text
- **Focus management**: Use `useFocusTrap` for modals, ensure visible focus rings

## Adding a New Component

1. **Create folder:** `src/components/{tier}/{category}/ComponentName/`
2. **Create files:**
   - `ComponentName.tsx` - Component with types, `memo(forwardRef(...))`, displayName
   - `ComponentName.styles.ts` - Style constants (BASE_CLASSES, SIZE_STYLES, etc.)
   - `ComponentName.test.tsx` - Vitest tests
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Public exports
3. **Add tokens** to `src/global.css` under `--component-componentname-*`
4. **Export from barrel:** Add to `src/components/{tier}/{category}/index.ts`
5. **Verify:** Run `npm run test:run` and `npm run storybook`

## Common Pitfalls

| ❌ Wrong | ✅ Correct | Why |
|----------|-----------|-----|
| `[var(--token)]` | `[length:var(--token)]` | Tailwind v4 requires type hints |
| `--primitive-*` in styles | `--component-*` tokens | Style files only use component-level tokens |
| `--semantic-*` in styles | `--component-*` tokens | Semantic tokens are for global.css definitions |
| Missing `memo(forwardRef())` | Wrap all components | Performance optimization |
| No `displayName` | Add after component | DevTools debugging |
| `export { Props }` | `export type { Props }` | Type-only exports for interfaces |
| Raw colors (`bg-blue-500`) | Token classes | Maintain design system consistency |
