# react-basics-ui

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Components](https://img.shields.io/badge/components-35_basic_+_7_advanced-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A focused React component library with essential UI primitives built with TypeScript and Tailwind CSS.

## 📦 Installation

```bash
npm install react-basics-ui
# or
yarn add react-basics-ui
# or
pnpm add react-basics-ui
```

## 🚀 Quick Start

### Basic Components (Default)

```typescript
import { Button, Input, Card } from 'react-basics-ui';
import 'react-basics-ui/styles.css';

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Advanced Components (Opt-in)

```typescript
// Method 1: Direct import (recommended)
import { Dropdown, Tabs, Table } from 'react-basics-ui/advanced';

// Method 2: Namespaced import
import { Advanced } from 'react-basics-ui';
const { Dropdown, Tabs, Table } = Advanced;
```

### Experimental Components (Unstable)

```typescript
import { Drawer, Menu, Tree } from 'react-basics-ui/experimental';

// ⚠️ Warning: These components have incomplete implementations.
// APIs may change without notice. Not recommended for production.
```

## 📚 Component Library

### Basic Components (35) - Production Ready

#### Layout (7)
- `Box` - Flexible container component
- `Container` - Responsive container with max-width constraints
- `Stack` - Vertical/horizontal stacking layout
- `Grid` - CSS Grid layout component
- `Divider` - Visual separator
- `AspectRatio` - Maintain aspect ratio for media
- `Flex` - Flexbox layout component

#### Typography (2)
- `Text` - Text with consistent styling
- `Heading` - Heading with size variants

#### Forms (15)
- `Button` - Interactive button with variants
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Boolean checkbox input
- `Radio` - Radio button input
- `Switch` - Toggle switch
- `Label` - Form field label
- `FormField` - Form field wrapper
- `FormGroup` - Group multiple form fields
- `Slider` - Range slider input
- `FileInput` - File upload input
- `DatePicker` - Date selection (native)
- `TimePicker` - Time selection (native)
- `SearchBar` - Search input with clear button

#### Feedback (8)
- `Alert` - Alert messages
- `Badge` - Status badge
- `Spinner` - Loading spinner
- `Skeleton` - Loading placeholder
- `Toast` - Notification toast
- `Progress` - Progress bar
- `EmptyState` - Empty state placeholder
- `ConfirmDialog` - Confirmation dialog

#### Overlay (2)
- `Modal` - Modal dialog
- `Tooltip` - Hover tooltip

#### Navigation (1)
- `Breadcrumb` - Breadcrumb navigation

#### Data Display (4)
- `Avatar` - User avatar
- `Card` - Content card
- `List` - List container
- `Tag` - Label tag

#### Utility (3)
- `Icon` - Icon wrapper
- `VisuallyHidden` - Screen reader only content
- `Portal` - Render outside DOM hierarchy

### Advanced Components (7) - Complex Features

Import from `react-basics-ui/advanced`:

#### Forms
- `Autocomplete` - Searchable dropdown with filtering (250+ lines)

#### Overlay
- `Popover` - Positioned popover with complex positioning logic (280+ lines)

#### Navigation
- `Tabs` - Tab navigation with keyboard support (228+ lines)
- `Pagination` - Page navigation with keyboard controls (179+ lines)
- `Dropdown` - Dropdown menu with compound pattern (152+ lines)

#### Data Display
- `Table` - Data table with sorting and selection (7 sub-components)
- `Accordion` - Expandable accordion with state management (130+ lines)

### Experimental Components (7) - Work in Progress

Import from `react-basics-ui/experimental`:

- `Drawer` - Slide-out drawer (not implemented)
- `Menu` - Navigation menu (basic shell)
- `Stepper` - Step indicator (basic shell)
- `Navbar` - Navigation bar (basic shell)
- `Sidebar` - Side navigation (basic shell)
- `Tree` - Tree view (incomplete)
- `Timeline` - Timeline display (needs assessment)

## 🎨 Theming

All components support Tailwind CSS theming through CSS variables:

```typescript
import { ThemeProvider } from 'react-basics-ui';

function App() {
  return (
    <ThemeProvider theme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

## 📖 Documentation

### Component Structure

```
src/
├── components/
│   ├── basic/              # Core components (default export)
│   ├── advanced/           # Complex components (opt-in)
│   └── experimental/       # WIP components (unstable)
├── hooks/                  # Reusable React hooks
├── lib/                    # Utility functions
└── tokens/                 # Design tokens
```

### Import Strategies

1. **Tree-shakeable imports** - Only import what you need:
   ```typescript
   import { Button } from 'react-basics-ui';
   ```

2. **Opt-in to complexity** - Advanced features when needed:
   ```typescript
   import { Dropdown } from 'react-basics-ui/advanced';
   ```

3. **Namespaced access** - Group related imports:
   ```typescript
   import { Advanced } from 'react-basics-ui';
   ```

## 🔄 Migration from v0.x

See [CHANGELOG.md](./CHANGELOG.md) for detailed migration guide.

**Quick migration for advanced component users:**
```typescript
// Before (v0.x)
import { Dropdown, Tabs, Table } from 'react-basics-ui';

// After (v1.0.0)
import { Dropdown, Tabs, Table } from 'react-basics-ui/advanced';
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build

# Lint
npm run lint
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 🗺️ Roadmap

### Q1 2026
- Separate `@react-basics-ui/advanced` package
- Complete experimental components
- Enhanced theming system
- Accessibility improvements

### Future
- Component variants expansion
- Animation library integration
- Dark mode enhancements
- Storybook documentation improvements
