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

- **CSS Variables** - All styling uses design tokens via CSS custom properties (`var(--component-*)`)
- **Style Files** - Export `const` objects mapping variants to Tailwind classes
- **Class Merging** - Always use `cn()` from `@/lib/cn` (clsx + tailwind-merge)
- **Design Tokens** - Defined in `src/global.css`, JS access via `src/tokens/index.ts`

**Style File Structure** (`Component.styles.ts`):
```typescript
// Base classes - always applied
export const BASE_CLASSES = 'inline-flex items-center justify-center...';

// Variant mappings - keyed by prop value
export const SIZE_STYLES = {
  small: 'h-[length:var(--component-button-height-small)]',
  default: 'h-[length:var(--component-button-height-default)]',
} as const;

export const VARIANT_STYLES = {
  primary: 'bg-[color:var(--component-button-bg-primary)]...',
  secondary: 'bg-[color:var(--component-button-bg-secondary)]...',
} as const;
```

**Component Style Pattern**:
```tsx
// Build classes with useMemo
const buttonClasses = useMemo(
  () => cn(BASE_CLASSES, SIZE_STYLES[size], VARIANT_STYLES[variant], className),
  [size, variant, className]
);

// Use inline styles for dynamic token values
const paddingStyle = useMemo(
  () => ({ paddingInline: `var(--component-button-padding-inline-${size})` }),
  [size]
);

// Add data attributes for testing/debugging
<button className={buttonClasses} style={paddingStyle} data-variant={variant} data-size={size}>
```

**Tailwind v4 Arbitrary Value Syntax** - Use typed hints for CSS variables:
```typescript
// ✅ Correct - with type hints
'h-[length:var(--component-button-height-small)]'
'bg-[color:var(--component-button-bg-primary)]'
'font-[number:var(--component-button-font-weight)]'
'shadow-[shadow:var(--component-card-shadow)]'
'duration-[var(--component-button-transition)]'  // time doesn't need hint

// ❌ Wrong - missing type hints (won't compile)
'h-[var(--component-button-height-small)]'
'bg-[var(--component-button-bg-primary)]'
```

**Token Hierarchy** (in `src/global.css`):
```
--primitive-*   → Raw values (colors, spacing numbers)
--semantic-*    → Contextual meaning (--semantic-text-primary, --semantic-space-default)
--component-*   → Component-specific (--component-button-height-small)
```
Always reference `--component-*` tokens in style files. Never use raw values.

Example style file pattern (`Component.styles.ts`):
```typescript
export const SIZE_STYLES = {
  small: 'h-[length:var(--component-button-height-small)]',
  default: 'h-[length:var(--component-button-height-default)]',
} as const;
```

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

### When Adding New Tokens to global.css

1. **Always create component-level tokens**, even if they just reference semantic tokens:
   ```css
   /* ✅ Correct - component token references semantic */
   --component-label-required-color: var(--semantic-text-error);
   
   /* ❌ Wrong - using semantic directly in style file */
   'text-[color:var(--semantic-text-error)]'
   ```

2. **Token naming pattern:**
   ```
   --component-{componentname}-{property}-{variant}
   
   Examples:
   --component-button-bg-primary
   --component-input-height-small
   --component-label-required-spacing
   ```

3. **Group tokens by component** in global.css with comment headers:
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
- [ ] Arbitrary values include type hints: `[length:...]`, `[color:...]`, `[number:...]`, `[shadow:...]`
- [ ] No dynamic class generation (e.g., `` `text-${color}` ``) - use style objects or complete class strings
- [ ] All classes are statically analyzable - no template literals for class names
- [ ] Use `style` prop for truly dynamic values that can't be predetermined

### Token & Styling
- [ ] All styles use `--component-*` tokens (no raw values)
- [ ] No `--primitive-*` or `--semantic-*` tokens in component style files
- [ ] No hardcoded colors (`bg-blue-500`) - use token-based classes
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
