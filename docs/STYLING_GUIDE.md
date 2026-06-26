# CarHub Styling Guide

Complete guide to styling conventions, Tailwind CSS usage, and theming in CarHub.

## 🎨 Design System Overview

CarHub uses a modern, utility-first styling approach combining:

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **CSS Variables** - Dynamic theming
- **Next-themes** - Built-in dark mode support

---

## 📐 Tailwind CSS Fundamentals

### Utility Classes

All styling is done using Tailwind utility classes. No custom CSS files needed in most cases.

**Example Component**:

```tsx
export function Card({ children }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      {children}
    </div>
  )
}
```

### Class Organization

Follow this order for consistency:

1. **Layout**: `flex`, `grid`, `block`, `hidden`
2. **Spacing**: `m`, `p`, `gap`
3. **Sizing**: `w`, `h`, `min-w`, `max-w`
4. **Typography**: `text-*`, `font-*`, `leading-*`
5. **Colors**: `bg-*`, `text-*`, `border-*`
6. **Effects**: `shadow-*`, `opacity-*`
7. **Interactive**: `hover:*`, `focus:*`, `active:*`

**Example**:

```tsx
<button className="
  flex items-center justify-center
  gap-2
  px-4 py-2
  text-white font-semibold
  bg-blue-600
  rounded-lg
  hover:bg-blue-700
  focus:outline-none focus:ring-2 focus:ring-blue-500
  transition-colors
">
  Click Me
</button>
```

---

## 🌈 Color Palette

### Semantic Colors

| Purpose | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Background** | white | slate-950 |
| **Text Primary** | slate-900 | slate-50 |
| **Text Secondary** | slate-600 | slate-400 |
| **Border** | slate-200 | slate-800 |
| **Accent** | blue-600 | blue-500 |
| **Success** | green-600 | green-500 |
| **Warning** | amber-600 | amber-500 |
| **Error** | red-600 | red-500 |
| **Info** | blue-600 | blue-500 |

### Using Colors

```tsx
// Text colors
<p className="text-slate-900 dark:text-slate-50">Primary text</p>
<p className="text-slate-600 dark:text-slate-400">Secondary text</p>

// Background colors
<div className="bg-blue-50 dark:bg-slate-900">Content area</div>

// Border colors
<div className="border border-slate-200 dark:border-slate-800">Card</div>

// Hover states
<button className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-600">
  Button
</button>
```

---

## 📏 Spacing System

Tailwind uses a consistent spacing scale:

| Scale | Value | Usage |
|-------|-------|-------|
| `0` | 0px | No space |
| `1` | 0.25rem (4px) | Tight spacing |
| `2` | 0.5rem (8px) | Small spacing |
| `3` | 0.75rem (12px) | Comfortable spacing |
| `4` | 1rem (16px) | Standard spacing |
| `6` | 1.5rem (24px) | Generous spacing |
| `8` | 2rem (32px) | Large spacing |
| `12` | 3rem (48px) | Extra large |

### Spacing Examples

```tsx
// Padding
<div className="p-4">Padding all sides</div>
<div className="px-4 py-2">Horizontal/vertical</div>
<div className="pt-4">Padding top</div>

// Margin
<div className="m-4">Margin all sides</div>
<div className="mb-6">Margin bottom</div>

// Gap (flexbox/grid)
<div className="flex gap-4">
  <div>Item</div>
  <div>Item</div>
</div>
```

---

## 🔤 Typography

### Font Sizes

```tsx
// Use semantic sizing
<h1 className="text-4xl font-bold">Main heading</h1>
<h2 className="text-2xl font-semibold">Section heading</h2>
<h3 className="text-xl font-semibold">Subsection</h3>
<p className="text-base">Body text</p>
<span className="text-sm">Small text</span>
<span className="text-xs">Tiny text</span>
```

### Font Weights

```tsx
<p className="font-light">Light - 300</p>
<p className="font-normal">Normal - 400</p>
<p className="font-semibold">Semibold - 600</p>
<p className="font-bold">Bold - 700</p>
```

### Line Height

```tsx
<p className="leading-tight">Compact line height</p>
<p className="leading-normal">Default line height</p>
<p className="leading-relaxed">Relaxed line height</p>
```

---

## 📱 Responsive Design

### Mobile-First Approach

Always design for mobile first, then scale up.

```tsx
// Mobile by default, tablet and up
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Breakpoints

| Prefix | Min-width | Device |
|--------|-----------|--------|
| - | 0px | Mobile (default) |
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large screens |
| `2xl` | 1536px | Extra large |

### Examples

```tsx
// Show different content at different sizes
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Responsive padding
<div className="p-2 sm:p-4 md:p-6 lg:p-8">Content</div>

// Responsive grid
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2
  lg:grid-cols-3 lg:gap-6
">
  {/* items */}
</div>
```

---

## 🌙 Dark Mode

### Using Dark Mode

The `dark` modifier applies styles only in dark mode:

```tsx
<div className="bg-white dark:bg-slate-950">
  <p className="text-slate-900 dark:text-slate-50">Text</p>
</div>
```

### Next-Themes Integration

Dark mode is handled by `next-themes` and configured in `theme-provider.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="system">
  <app />
</ThemeProvider>
```

### Theme Toggle

```tsx
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  )
}
```

---

## 🎯 Component Styling Patterns

### Button Variants

```tsx
// Primary button
<button className="
  px-4 py-2
  bg-blue-600 text-white
  rounded-lg
  hover:bg-blue-700
  active:bg-blue-800
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors
">
  Primary
</button>

// Secondary button
<button className="
  px-4 py-2
  bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-50
  rounded-lg
  hover:bg-slate-300 dark:hover:bg-slate-700
  transition-colors
">
  Secondary
</button>

// Ghost button
<button className="
  px-4 py-2
  text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-900
  rounded-lg
  transition-colors
">
  Ghost
</button>
```

### Card Patterns

```tsx
// Standard card
<div className="
  rounded-lg
  border border-slate-200 dark:border-slate-800
  bg-white dark:bg-slate-900
  p-6
  shadow-md hover:shadow-lg
  transition-shadow
">
  {/* card content */}
</div>

// Elevated card
<div className="
  rounded-lg
  bg-white dark:bg-slate-900
  p-6
  shadow-lg
  hover:shadow-xl
  transition-shadow
">
  {/* content */}
</div>
```

### Form Elements

```tsx
// Input field
<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full
    px-4 py-2
    border border-slate-300 dark:border-slate-600
    rounded-lg
    bg-white dark:bg-slate-800
    text-slate-900 dark:text-slate-50
    placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-colors
  "
/>

// Label
<label className="
  block
  text-sm font-medium
  text-slate-700 dark:text-slate-300
  mb-2
">
  Field Label
</label>
```

---

## ✨ Interactive States

### Hover Effects

```tsx
// Subtle hover
className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"

// Interactive hover with scale
className="
  hover:shadow-lg
  hover:scale-105
  transition-transform
  duration-200
"

// Color transition
className="
  text-slate-600 hover:text-blue-600
  transition-colors
"
```

### Focus States

```tsx
// Keyboard focus ring
className="
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
  dark:focus:ring-offset-slate-900
"
```

### Active/Pressed States

```tsx
// Button press effect
className="
  active:scale-95
  transition-transform
  duration-100
"
```

### Disabled States

```tsx
className="
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:bg-slate-100
"
```

---

## 🎬 Animations

### Tailwind Animations

```tsx
// Fade in
<div className="animate-fadeIn">Fades in</div>

// Spin
<div className="animate-spin">Spinning loader</div>

// Bounce
<div className="animate-bounce">Bouncing element</div>

// Custom animation via transition
<div className="
  transition-all
  duration-300
  ease-in-out
  hover:opacity-50
">
  Smooth transition
</div>
```

### Timing

```tsx
// Duration
duration-75    // 75ms
duration-100   // 100ms
duration-300   // 300ms (default)
duration-500   // 500ms
duration-1000  // 1000ms

// Easing
ease-linear
ease-in
ease-out
ease-in-out (default)
```

---

## 🔧 Tailwind Configuration

### Configuration File

`tailwind.config.js` contains customizations:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e293b',
      },
    },
  },
}
```

### Adding Custom Utilities

```javascript
// In tailwind.config.js
theme: {
  extend: {
    spacing: {
      '128': '32rem',
    },
  },
}

// Usage
<div className="h-128">Tall element</div>
```

---

## 🎨 Best Practices

### Do's ✅

- Use Tailwind utility classes
- Follow the spacing scale
- Use semantic color names
- Organize classes logically
- Test responsive breakpoints
- Use dark mode classes
- Leverage CSS variables

### Don'ts ❌

- Don't mix inline styles with Tailwind
- Don't create custom CSS classes for basic styling
- Don't use hardcoded colors without reason
- Don't ignore accessibility (contrast, focus states)
- Don't forget hover/active states
- Don't overuse `!important`

---

## 🚀 Performance Tips

1. **Purge Unused Styles**: Tailwind automatically removes unused classes
2. **Use PurgeCSS**: Configured in `tailwind.config.js`
3. **Minimize Custom CSS**: Stick to Tailwind utilities
4. **Group Similar Classes**: For readability and maintenance

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Color Naming](https://chir.mn/posts/color-naming)

---

## 🔗 Related Guides

- [Components Guide](./COMPONENTS.md) - UI component library
- [Architecture Guide](./ARCHITECTURE.md) - System design
- [Contributing Guide](./CONTRIBUTING.md) - Code standards

---

**Last Updated**: 2024
