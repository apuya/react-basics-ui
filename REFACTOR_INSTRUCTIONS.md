# Token Alignment Refactor Instructions

## Purpose
Align **Tailwind utility class values** in the current project (`src/`) to match the old project's (`react-basics-ui old/`) pixel values for layout properties.

---

## ⚠️ Important Rules

1. **`react-basics-ui old/` is READ-ONLY** - reference only, never modify
2. **Only modify files in `src/`** - components and global.css
3. **Work one component at a time** - complete before moving to next

---

## Tailwind JIT Compiler Rules

Understanding these rules is critical for the refactor approach.

### 1. Classes Must Be Statically Analyzable
The JIT compiler scans source files for complete, unbroken class strings. It **cannot detect**:

```typescript
// ❌ Won't work - dynamic class construction
const size = 'lg';
`p-${size}`

// ❌ Won't work - string concatenation
'py-' + '4'

// ✅ Works - complete static string
'py-4'
```

### 2. Arbitrary Values Require Type Hints (Tailwind v4)
For CSS custom properties, you must specify the type:

```typescript
// ❌ Won't work in Tailwind v4
'bg-[var(--my-color)]'

// ✅ Works - with type hint
'bg-[color:var(--my-color)]'
'h-[length:var(--my-height)]'
'text-[length:var(--my-size)]'
```

### 3. Spacing Must Use Inline Styles

Tailwind's JIT compiler **does not reliably generate** utility classes from `.styles.ts` files. Even with safelist, classes may not render due to CSS reset specificity.

**Use inline style objects for all spacing values** (padding, margin, gap):

```typescript
// .styles.ts - define style objects with raw pixel values
export const COMPONENT_TRIGGER_STYLE = {
  padding: '16px',  // 16px = --semantic-space-default
} as const;

export const COMPONENT_CONTENT_STYLE = {
  paddingBottom: '16px',
  paddingLeft: '16px',
  paddingRight: '16px',
} as const;

export const COMPONENT_ITEM_GAP = '8px';  // 8px = --semantic-space-compact
```

```tsx
// Component.tsx - apply via style prop
<button className={classes} style={COMPONENT_TRIGGER_STYLE}>

// For conditional spacing (e.g., variant-based gap)
const itemStyle = useMemo(
  () => ({
    ...style,
    ...(variant === 'separated' && { marginBottom: COMPONENT_ITEM_GAP }),
  }),
  [style, variant]
);
<div style={itemStyle}>
```

**Why inline styles?**
- 100% reliable - no JIT compilation needed
- Higher specificity than CSS reset (`padding: 0`)
- Matches old project's approach

---

## What to Check

### ✅ Check These (Layout → Tailwind Scales)
| Property | Classes |
|----------|---------|
| Padding | `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*` |
| Gap | `gap-*`, `gap-x-*`, `gap-y-*` |
| Margin | `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*` |
| Size | `size-*`, `w-*`, `h-*`, `min-w-*`, `min-h-*`, `max-w-*`, `max-h-*` |
| Border Radius | `rounded-*`, `rounded-t-*`, `rounded-b-*`, etc. |
| Duration | `duration-*` |
| Font Size | `text-xs`, `text-sm`, `text-base`, `text-lg`, etc. |
| Font Weight | `font-normal`, `font-medium`, `font-semibold`, `font-bold` |
| Focus Ring | Must use `ring-ring-focus` (not hardcoded colors) |

### ❌ Do NOT Check (Already Tokenized)
- Background colors: `bg-[color:var(--component-*)]`
- Text colors: `text-[color:var(--component-*)]`
- Border colors: `border-[color:var(--component-*)]`

---

## Tailwind Scale Reference

### Spacing (Padding, Gap, Margin)
| Tailwind | Pixels | Old Token |
|----------|--------|-----------|
| `p-1`, `gap-1` | 4px | `--primitive-space-50` |
| `p-1.5`, `gap-1.5` | 6px | `--primitive-space-75` |
| `p-2`, `gap-2` | 8px | `--primitive-space-100` / `--semantic-space-compact` |
| `p-3`, `gap-3` | 12px | `--primitive-space-150` |
| `p-4`, `gap-4` | 16px | `--primitive-space-200` / `--semantic-space-default` |
| `p-5`, `gap-5` | 20px | `--primitive-space-250` |
| `p-6`, `gap-6` | 24px | `--primitive-space-300` |
| `p-8`, `gap-8` | 32px | `--primitive-space-400` |

### Border Radius
| Tailwind | Pixels | Old Token |
|----------|--------|-----------|
| `rounded-sm` | 2px | `--primitive-radius-sm` |
| `rounded` | 4px | `--primitive-radius-md` |
| `rounded-md` | 6px | - |
| `rounded-lg` | 8px | `--primitive-radius-lg` |
| `rounded-xl` | 12px | `--primitive-radius-xl` |
| `rounded-full` | 9999px | `--primitive-radius-full` |

### Duration
| Tailwind | Value | Old Token |
|----------|-------|-----------|
| `duration-150` | 150ms | `--primitive-duration-fast` |
| `duration-200` | 200ms | `--primitive-duration-normal` |
| `duration-300` | 300ms | `--primitive-duration-slow` |

### Size (Icons)
| Tailwind | Pixels | Old Token |
|----------|--------|-----------|
| `size-3` | 12px | `--primitive-size-150` |
| `size-4` | 16px | `--primitive-size-200` / `--semantic-icon-small` |
| `size-5` | 20px | `--primitive-size-250` |
| `size-6` | 24px | `--primitive-size-300` / `--semantic-icon-default` |

---

## Refactor Process

### Step 1: List All Files
```bash
ls src/components/{category}/{ComponentName}/
```
Check ALL files: `.styles.ts`, `.tsx` (main + sub-components)

### Step 2: Find Layout Tokens to Convert
Search current project for tokens that need conversion:
```bash
# Layout tokens in styles or inline
grep -rE "var\(--component-.*-(padding|gap|margin|radius|size|height|width|duration)" src/components/{category}/{ComponentName}/

# Inline styles with tokens
grep -rE "style=\{.*var\(--" src/components/{category}/{ComponentName}/

# Arbitrary value syntax [length:var(...)] or [number:var(...)]
grep -rE "\[(length|number):var\(--" src/components/{category}/{ComponentName}/

# Hardcoded focus ring colors
grep -rE "ring-(blue|red|green|gray)-[0-9]+" src/components/{category}/{ComponentName}/
```

### Step 3: Trace Old Token Values
1. Open `react-basics-ui old/src/components/{category}/{ComponentName}/`
2. Find token references in `.styles.ts` and `.tsx` files
3. Trace tokens in `react-basics-ui old/src/global.css`:
   - Component token → Semantic token → Primitive token → Raw value

### Step 4: Compare & Fix
| Property | Old Token | Old Pixels | Current | Fix Needed |
|----------|-----------|------------|---------|------------|
| Padding | `--semantic-space-default` | 16px | `p-4` ✅ | No |
| Radius | `--primitive-radius-md` | 4px | `rounded-lg` ❌ | → `rounded` |

### Step 5: Apply Fixes
1. Add inline style objects to `.styles.ts` for spacing (padding, margin, gap)
2. Apply style objects via `style={...}` prop in `.tsx` files
3. Convert radius/duration/size tokens to Tailwind classes
4. Ensure focus ring uses `ring-ring-focus`
5. Remove arbitrary value syntax for layout properties (`[length:var(...)]`)

### Step 6: Verify
```bash
npm run test:run -- ComponentName
```

---

## Common Fixes

### Border Radius
```typescript
// Old: --primitive-radius-md = 4px
'rounded-lg'  // ❌ 8px
'rounded'     // ✅ 4px
```

### Focus Ring
```typescript
'focus-visible:ring-blue-500'    // ❌ Hardcoded
'focus-visible:ring-ring-focus'  // ✅ Theme token
```

### Spacing (Padding, Gap, Margin)
Use **inline style objects** with raw pixel values:

```typescript
// ❌ Tailwind classes won't render reliably
'py-4 px-4'

// ❌ Inline style with CSS token
style={{ padding: 'var(--component-accordion-padding-block)' }}

// ✅ Inline style object with raw pixels (in .styles.ts)
export const TRIGGER_STYLE = {
  padding: '16px',  // 16px = --semantic-space-default
} as const;

// Apply in component
<button style={TRIGGER_STYLE}>
```

### Gap Between Items
Use inline styles with conditional logic:

```typescript
// .styles.ts
export const ITEM_GAP = '8px';  // 8px = --semantic-space-compact

// Component.tsx
const itemStyle = useMemo(
  () => ({
    ...style,
    ...(variant === 'separated' && { marginBottom: ITEM_GAP }),
  }),
  [style, variant]
);

<div style={itemStyle}>
```

### Arbitrary Value Syntax
```typescript
// ❌ Layout token in arbitrary value
'rounded-[length:var(--component-accordion-radius)]'

// ✅ Tailwind class (4px = rounded)
'rounded'
```

---

## Progress Tracking

### Data Display
- [x] Accordion ✅
- [ ] Avatar
- [ ] Card
- [ ] List

### Layout
- [ ] Box
- [ ] Container
- [ ] Stack
- [ ] Grid
- [ ] Flex
- [ ] Divider
- [ ] AspectRatio

### Typography
- [ ] Text
- [ ] Heading

### Forms
- [ ] Button
- [ ] Input
- [ ] Select
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Textarea
- [ ] Label
- [ ] FormField

### Feedback
- [ ] Alert
- [ ] Badge
- [ ] Spinner
- [ ] Toast
- [ ] Progress
- [ ] Skeleton

### Overlay
- [ ] Modal
- [ ] Tooltip
- [ ] Drawer

### Navigation
- [ ] Breadcrumb

### Utility
- [ ] Icon
- [ ] VisuallyHidden
