# Component Structure Index

This document maps components with **similar functionality** that could share code, utilities, or be consolidated to reduce boilerplate.

---

## Similarity Clusters

| Cluster | Components | Consolidation Priority |
|---------|-----------|----------------------|
| Menu/Selection | Dropdown, Select, Popover | 🔴 HIGH |
| Feedback/Status | Alert, Toast, Badge | 🔴 HIGH |
| Toggle Controls | Switch, Checkbox, Radio | 🟡 MEDIUM |
| Text Inputs | Input, Textarea, SearchBar | 🟢 LOW (already shared) |
| Disclosure/Expandable | Accordion, Dropdown, Tabs, Popover | 🟡 MEDIUM |
| Overlay/Floating | Modal, Drawer, Tooltip, Popover, Dropdown | 🟢 LOW (BaseOverlayDialog exists) |
| Navigation | Breadcrumb, Tabs, Pagination, Stepper | 🟡 MEDIUM |
| List/Collection | List, Table, Tabs, Dropdown items | 🟢 LOW |

---

## 1. Menu/Selection Components 🔴

**Components:** `Dropdown`, `Select`, `Popover`

### Shared Functionality

| Pattern | Dropdown | Select | Popover |
|---------|----------|--------|---------|
| Trigger + floating menu | ✅ | ✅ | ✅ |
| `useClickOutside` | ✅ | ✅ | ✅ |
| `useEscapeKey` | ✅ | ✅ | ✅ |
| `useMenuKeyboardNavigation` | ✅ | ✅ | ❌ |
| `useResponsivePosition` | ❌ | ❌ | ✅ |
| ARIA: `aria-expanded`, `aria-haspopup` | ✅ | ✅ | ✅ |
| Context for state sharing | ✅ | ✅ | ✅ |

### Duplicated Code

1. **Trigger Pattern** - Both duplicate:
   ```tsx
   <button
     ref={triggerRef}
     onClick={toggle}
     aria-expanded={isOpen}
     aria-haspopup="menu"
   >
   ```

2. **Menu Setup** - Repeated in each:
   ```tsx
   useClickOutside(menuRef, close);
   useEscapeKey(close, isOpen);
   useMenuKeyboardNavigation(menuRef, isOpen, '[role="menuitem"]');
   ```

### Recommended Abstractions

```tsx
// 1. useMenuBehavior - Consolidate menu close/keyboard logic
function useMenuBehavior(menuRef, isOpen, onClose, options?) {
  useClickOutside(menuRef, onClose);
  useEscapeKey(onClose, isOpen);
  useMenuKeyboardNavigation(menuRef, isOpen, selector);
}

// 2. <TriggerButton> - Shared trigger with ARIA
<TriggerButton 
  isOpen={isOpen} 
  onClick={toggle} 
  role="combobox" | "menu"
/>
```

---

## 2. Feedback/Status Components 🔴

**Components:** `Alert`, `Toast`, `Badge`

### Shared Functionality

| Pattern | Alert | Toast | Badge |
|---------|-------|-------|-------|
| Variant system (`success`, `error`, `warning`, `info`) | ✅ | ✅ | ✅ |
| Leading icon per variant | ✅ | ✅ | ❌ |
| Dismissible with close button | ✅ | ✅ | ✅ |
| Title + description layout | ✅ | ✅ | ❌ |
| `role="alert"` | ✅ | ✅ | ❌ |

### Duplicated Code

1. **Variant Icons** - Defined identically in Alert and Toast:
   ```tsx
   const VARIANT_ICONS = {
     success: BiCheckCircle,
     error: BiXCircle,
     warning: BiErrorCircle,
     info: BiInfoCircle,
   };
   ```

2. **Layout Structure** - Nearly identical:
   ```tsx
   <div role="alert">
     {icon && <span>{icon}</span>}
     <div className="flex-1">
       {title && <div>{title}</div>}
       {description && <div>{description}</div>}
     </div>
     {onClose && <CloseButton onClick={onClose} />}
   </div>
   ```

3. **Close Button** - Duplicated across Alert, Toast, Modal, Drawer

### Recommended Abstractions

```tsx
// 1. Shared variant icons (move to lib/)
export const FEEDBACK_VARIANT_ICONS = {
  success: BiCheckCircle,
  error: BiXCircle,
  warning: BiErrorCircle,
  info: BiInfoCircle,
};

// 2. <CloseButton> utility component
<CloseButton onClose={handleClose} size="sm" ariaLabel="Dismiss" />

// 3. <StatusMessage> base component
<StatusMessage variant="error" icon title description onClose />
```

---

## 3. Toggle Control Components 🟡

**Components:** `Switch`, `Checkbox`, `Radio`

### Shared Functionality

| Pattern | Switch | Checkbox | Radio |
|---------|--------|----------|-------|
| Hidden `<input>` pattern | ✅ | ✅ | ✅ |
| Visual indicator span | ✅ | ✅ | ✅ |
| `forwardRef` | ✅ | ✅ | ✅ |
| `FormFieldWrapper` | ✅ | ✅ | ✅ |
| `size` prop with style map | ✅ | ✅ | ✅ |
| `label` prop | ✅ | ✅ | ✅ |
| `disabled` handling | ✅ | ✅ | ✅ |
| `generateFormId` | ✅ | ✅ | ✅ |

### Duplicated Code

1. **Wrapper Structure** - All three have identical pattern:
   ```tsx
   <label className={wrapperClasses} data-disabled={disabled}>
     <input type="checkbox|radio" className="sr-only" />
     <span aria-hidden="true">{/* visual indicator */}</span>
     {label && <span className={labelClasses}>{label}</span>}
   </label>
   ```

2. **Size Style Maps** - Each defines `SIZE_STYLES`, `SIZE_LABEL_STYLES` separately

### Recommended Abstractions

```tsx
// 1. <ToggleBase> - Shared wrapper component
<ToggleBase
  type="checkbox" | "radio"
  label={label}
  size={size}
  disabled={disabled}
  indicator={<SwitchIndicator checked={checked} />}
/>

// 2. Shared toggle size tokens
export const TOGGLE_SIZE_STYLES = {
  small: { wrapper: '...', label: '...', indicator: '...' },
  default: { ... },
  large: { ... },
};
```

### Differences to Preserve
- `Switch` has `indeterminate` state
- `Radio` works within `RadioGroup` context
- Each has unique visual indicator designs

---

## 4. Text Input Components 🟢

**Components:** `Input`, `Textarea`, `SearchBar`

### Already Well Shared ✅
- All use `FormFieldWrapper`
- Shared `sharedFormStyles` utility
- Similar visual slot patterns

### Minor Duplication

1. **Icon Wrapper Pattern**:
   ```tsx
   <span className={iconWrapperClasses} aria-hidden="true">
     {leadingVisual}
   </span>
   ```

2. **Padding Calculation** based on icon presence

### Potential Abstraction

```tsx
// <InputSlot> - Shared icon/addon wrapper
<InputSlot position="leading" size={size}>
  {icon}
</InputSlot>
```

---

## 5. Disclosure/Expandable Components 🟡

**Components:** `Accordion`, `Dropdown`, `Tabs`, `Popover`

### Shared Functionality

| Pattern | Accordion | Dropdown | Tabs | Popover |
|---------|-----------|----------|------|---------|
| Open/close state | ✅ | ✅ | ✅ | ✅ |
| Compound pattern | ✅ | ✅ | ✅ | ✅ |
| `createComponentContext` | ✅ | ✅ | ✅ | ✅ |
| `useDisclosureState` | ✅ | ❌ | ❌ | ❌ |
| `useControlledState` | ✅ | ❌ | ❌ | ❌ |

### Current Issues

1. **Tabs** implements controlled/uncontrolled inline instead of using `useControlledState`:
   ```tsx
   // Current - duplicated logic
   const [internalValue, setInternalValue] = useState(defaultValue);
   const isControlled = value !== undefined;
   const activeTab = isControlled ? value : internalValue;
   
   // Should be:
   const [activeTab, setActiveTab] = useControlledState(value, defaultValue, onChange);
   ```

2. **Popover** uses plain `useState` instead of `useControlledState`

### Quick Fixes

| Component | Fix |
|-----------|-----|
| `Tabs` | Refactor to use `useControlledState` |
| `Pagination` | Refactor to use `useControlledState` |
| `Popover` | Refactor to use `useControlledState` for `isOpen` |

---

## 6. Overlay/Floating Components 🟢

**Components:** `Modal`, `Drawer`, `Tooltip`, `Popover`, `Dropdown`

### Already Well Shared ✅

| Component | Uses `BaseOverlayDialog` |
|-----------|------------------------|
| `Modal` | ✅ |
| `Drawer` | ✅ |
| `Tooltip` | ❌ (lightweight, appropriate) |
| `Popover` | ❌ (could benefit) |
| `Dropdown` | ❌ (could benefit) |

### What BaseOverlayDialog Provides
- Portal rendering
- Focus trap
- Body scroll lock
- Escape key handling
- Backdrop click handling

### Potential Improvements

1. **Positioning** - Tooltip has its own calculation while Popover uses `useResponsivePosition`. Should standardize.

2. **Animation State** - Each implements visibility transitions differently

---

## 7. Navigation Components 🟡

**Components:** `Breadcrumb`, `Tabs`, `Pagination`, `Stepper`

### Shared Functionality

| Pattern | Breadcrumb | Tabs | Pagination | Stepper |
|---------|------------|------|------------|---------|
| Compound pattern | ✅ | ✅ | ✅ | ✅ |
| Active state tracking | ❌ | ✅ | ✅ | ✅ |
| Keyboard navigation | ❌ | ✅ | ✅ | ❌ |
| Size prop | ❌ | ✅ | ✅ | ✅ |

### Duplicated Code

1. **Keyboard Navigation** - Tabs and Pagination both implement:
   - Arrow keys for prev/next
   - Home/End keys
   - Focus management

2. **Controlled/Uncontrolled** - Pagination reimplements the pattern

### Quick Fixes

| Component | Fix |
|-----------|-----|
| `Pagination` | Use `useControlledState` hook |
| `Tabs` | Could use `useDisclosureKeyboardNav` |

---

## Quick Wins Summary

### Immediate (Low Effort, High Value)

| Task | Components Affected | Lines Saved |
|------|--------------------|-|
| Extract `FEEDBACK_VARIANT_ICONS` to shared location | Alert, Toast | ~20 |
| Create `<CloseButton>` utility | Alert, Toast, Modal, Drawer | ~40 |
| Refactor `Pagination` to use `useControlledState` | Pagination | ~15 |
| Refactor `Tabs` to use `useControlledState` | Tabs | ~15 |
| Refactor `Popover` to use `useControlledState` | Popover | ~10 |

### Medium Term

| Task | Components Affected | Lines Saved |
|------|--------------------|-|
| Create `useMenuBehavior` hook | Dropdown, Select, Popover | ~60 |
| Create `<ToggleBase>` component | Switch, Checkbox, Radio | ~80 |
| Create `<StatusMessage>` base | Alert, Toast | ~50 |

### Long Term

| Task | Components Affected |
|------|--------------------| 
| Create `<TriggerButton>` component | Dropdown, Select, Popover |
| Unify positioning approach | Tooltip, Popover, Dropdown |
| Standardize keyboard navigation | Tabs, Pagination, Dropdown, Select |

---

## Existing Shared Infrastructure

### Hooks (`src/hooks/`)

| Hook | Current Users | Should Also Use |
|------|--------------|-----------------|
| `useControlledState` | Accordion, Input, Textarea, SearchBar, Switch | Tabs, Pagination, Popover |
| `useDisclosureState` | Accordion | - |
| `useClickOutside` | Dropdown, Popover | - |
| `useEscapeKey` | Dropdown, Popover, Modal, Drawer | - |
| `useFocusTrap` | Modal, Drawer | - |
| `useMenuKeyboardNavigation` | Dropdown, Select | Popover (optionally) |
| `useResponsivePosition` | Popover, Tooltip | Dropdown |

### Utilities (`src/lib/`)

| Utility | Purpose |
|---------|---------|
| `createComponentContext` | Factory for compound component contexts |
| `BaseOverlayDialog` | Shared overlay logic for Modal, Drawer |
| `generateFormId` | Auto-generate form element IDs |
| `sharedFormStyles` | Common form element styles |
| `cn` | Tailwind class merging |

---

## Proposed New Utilities

### Priority 1: Create These First

```
src/lib/
├── feedbackIcons.ts       # FEEDBACK_VARIANT_ICONS
├── CloseButton.tsx        # Reusable close button
└── useMenuBehavior.ts     # Combined menu hook (or in hooks/)

src/hooks/
└── useMenuBehavior.ts     # clickOutside + escapeKey + keyboardNav
```

### Priority 2: Create After Priority 1

```
src/components/utility/
├── ToggleBase/            # Shared toggle wrapper
└── StatusMessage/         # Shared alert/toast base

src/hooks/
└── useVisibilityTransition.ts  # Shared enter/exit animation
```

---

## Unused Code Index

This section identifies code that is exported but never imported elsewhere, or files that appear to be legacy/dead code.

### 🔴 Completely Unused

| Location | Type | Description |
|----------|------|-------------|
| `src/components/old.css` | File | 1092-line legacy CSS file with old design tokens. Not imported anywhere. |
| `src/lib/positionUtils.ts` → `getPositionClasses` | Export | Only used internally in same file, not used by any component |
| `src/lib/sharedFormStyles.ts` → `getLabelClasses` | Export | Exported but never imported |
| `src/lib/sharedFormStyles.ts` → `getHelperClasses` | Export | Exported but never imported |
| `src/lib/createSubComponent.tsx` → `createSubComponent` | Export | Only example in JSDoc, only `createTitleSubComponent` is actually used (by Modal) |

### 🟡 Unused Types (from `src/types/variants.ts`)

These types are defined but not imported by any component:

| Type | Status |
|------|--------|
| `ComponentSize` | ❌ Unused - components define their own size types |
| `ExtendedSize` | ❌ Unused |
| `ButtonVariant` | ❌ Unused - Button defines its own `ButtonVariant` type |
| `ColorVariant` | ❌ Unused |
| `StatusVariant` | ❌ Unused - components define own variants |
| `StyleVariant` | ❌ Unused - Badge defines `BadgeStyleVariant` locally |
| `FormControlSize` | ❌ Unused |
| `Orientation` | ❌ Unused - hooks define own Orientation type |
| `Alignment` | ❌ Unused |
| `JustifyContent` | ❌ Unused |
| `Position` | ❌ Unused |
| `Side` | ❌ Unused |

**Issue:** `src/types/variants.ts` exports 12 types, but **none are imported anywhere**. Components define their own types locally instead.

### 🟡 Broken Imports

| Location | Issue |
|----------|-------|
| `src/hooks/index.ts` line 14 | Imports from `@/components/basic/theme` but path should be `@/components/theme` (old structure) |
| `src/hooks/index.ts` line 18 | Same issue - references old `basic/theme` path |

### 🟢 Low Usage (Consider Removing)

| Location | Used By | Notes |
|----------|---------|-------|
| `createTitleSubComponent` | Only `ModalTitle` | Factory pattern but only 1 user |
| `POSITION_STYLES` (lib) | Not used | Popover defines its own `POSITION_STYLES` locally |

---

## Recommendations

### Immediate Actions

1. **Delete `src/components/old.css`** - 1092 lines of unused legacy CSS
2. **Fix broken import paths in `src/hooks/index.ts`** - Change `@/components/basic/theme` to `@/components/theme`
3. **Remove unused exports from `src/lib/sharedFormStyles.ts`**:
   - `getLabelClasses`
   - `getHelperClasses`
4. **Remove unused `getPositionClasses` from `src/lib/positionUtils.ts`**

### Consider Removing

5. **Delete or refactor `src/types/variants.ts`** - All 12 exported types are unused. Either:
   - Delete the file entirely
   - Actually use these centralized types in components
   
6. **Remove `createSubComponent`** from `src/lib/createSubComponent.tsx` - Only `createTitleSubComponent` is used

### Technical Debt

7. **Standardize type definitions** - Components define their own `Size`, `Variant` types locally instead of using centralized types from `src/types/variants.ts`. This leads to inconsistency:
   - Button: `'small' | 'default' | 'large'`
   - Badge: `'small' | 'medium' | 'large'`
   - Input: `'small' | 'default' | 'large'`
   
   Should standardize on one approach.

---

## Summary

| Category | Count | Impact |
|----------|-------|--------|
| Unused files | 1 | High (1092 lines) |
| Unused exports | 5 | Medium |
| Unused types | 12 | Low (but indicates design issue) |
| Broken imports | 2 | High (will cause errors) |
| Total removable lines | ~1200+ | - |
