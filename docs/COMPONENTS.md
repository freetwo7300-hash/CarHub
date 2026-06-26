# Components Documentation

Comprehensive reference for all UI components used in CarHub.

## 📦 Component Library Overview

CarHub uses a combination of:

- **Radix UI**: Unstyled, accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Feature-specific components

---

## 🧩 Component Categories

### Core UI Components

Located in `components/ui/`, these are base components built on Radix UI primitives.

#### Button

```typescript
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  )
}
```

**Variants**: `default`, `secondary`, `destructive`, `ghost`, `outline`
**Sizes**: `sm`, `md`, `lg`, `icon`

#### Input

```typescript
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Input
      type="text"
      placeholder="Enter text..."
      disabled={false}
    />
  )
}
```

**Attributes**: `type`, `placeholder`, `disabled`, `required`

#### Card

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Content here</CardContent>
      <CardFooter>Footer content</CardFooter>
    </Card>
  )
}
```

#### Dialog (Modal)

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div>Content here</div>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

#### Tabs

```typescript
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

export function Example() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  )
}
```

#### Select

```typescript
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

#### Checkbox

```typescript
import { Checkbox } from '@/components/ui/checkbox'

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms</label>
    </div>
  )
}
```

#### Radio Group

```typescript
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function Example() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="opt1" />
        <label htmlFor="opt1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="opt2" />
        <label htmlFor="opt2">Option 2</label>
      </div>
    </RadioGroup>
  )
}
```

#### Accordion

```typescript
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

---

### Feature Components

Located in `components/`, these are specialized components for specific features.

#### Navigation

```typescript
import { Navigation } from '@/components/navigation'

// Renders main navigation menu with links to all modules
```

**Features**:
- Main menu with module links
- Responsive mobile menu
- Theme toggle
- User account menu

#### Search Bar

```typescript
import { SearchBar } from '@/components/search-bar'

export function Example() {
  return <SearchBar placeholder="Search..." />
}
```

**Features**:
- Full-width search input
- Search suggestions
- Keyboard shortcuts

#### Notification Center

```typescript
import { NotificationCenter } from '@/components/notification-center'

// Displays notifications and alerts
```

**Features**:
- Notification badge
- Notification list
- Mark as read
- Delete notifications

#### Chat Button

```typescript
import { ChatButton } from '@/components/chat-button'

// Floating chat button
```

**Features**:
- Floating chat widget
- Chat interface
- Message history

#### Trending Section

```typescript
import { TrendingSection } from '@/components/trending-section'

// Shows trending posts, events, threads
```

**Features**:
- Trending content list
- View counts
- Engagement metrics

#### User Badges

```typescript
import { UserBadges } from '@/components/user-badges'

export function Example() {
  return <UserBadges userId="123" />
}
```

**Features**:
- User reputation badges
- Contribution indicators
- Achievement badges

#### Theme Provider

```typescript
import { ThemeProvider } from '@/components/theme-provider'

export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* App content */}
    </ThemeProvider>
  )
}
```

**Features**:
- Dark/Light mode toggle
- System preference detection
- Persistent theme selection

---

## 📱 Page Components

### Dashboard Page

```typescript
// app/dashboard/page.tsx
export default function DashboardPage() {
  // Displays personal dashboard
}
```

**Sections**:
- Saved items
- Recent activity
- Quick widgets
- Recommendations

### Forum Page

```typescript
// app/forum/page.tsx
export default function ForumPage() {
  // Displays forum listing
}
```

**Features**:
- Thread list
- Search/filter
- Sort options
- Category navigation

### Forum Detail Page

```typescript
// app/forum/[id]/page.tsx
export default function ThreadDetailPage() {
  // Displays thread with comments
}
```

**Features**:
- Thread content
- Comment list
- Comment form
- Voting system

### Events Page

```typescript
// app/events/page.tsx
export default function EventsPage() {
  // Displays events listing
}
```

**Features**:
- Event cards
- Date/location filters
- Sort options
- RSVP buttons

### Event Detail Page

```typescript
// app/events/[id]/page.tsx
export default function EventDetailPage() {
  // Displays event details
}
```

**Features**:
- Event information
- Attendees list
- RSVP form
- Map/location

### Guides Page

```typescript
// app/guides/page.tsx
export default function GuidesPage() {
  // Displays guides listing
}
```

**Features**:
- Guide cards
- Category filters
- Search
- Featured section

### Admin Page

```typescript
// app/admin/page.tsx
export default function AdminPage() {
  // Admin dashboard
}
```

**Features**:
- Statistics
- User management
- Content moderation
- System logs

### Profile Page

```typescript
// app/profile/page.tsx
export default function ProfilePage() {
  // User profile
}
```

**Features**:
- User information
- Saved items
- Activity history
- Settings

---

## 🎨 Component Props Reference

### Common Patterns

#### Size Variants

```typescript
size: 'sm' | 'md' | 'lg' | 'xl'
```

#### Variant Options

```typescript
variant: 'default' | 'secondary' | 'ghost' | 'destructive' | 'outline'
```

#### State Properties

```typescript
disabled?: boolean
loading?: boolean
error?: string | null
success?: boolean
```

#### Callback Properties

```typescript
onClick?: (event: React.MouseEvent) => void
onChange?: (value: any) => void
onSubmit?: (data: any) => void
```

---

## 🔧 Creating Custom Components

### Component Template

```typescript
import React from 'react'

interface CustomComponentProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'compact'
  className?: string
}

/**
 * CustomComponent
 *
 * Description of what this component does.
 *
 * @example
 * ```tsx
 * <CustomComponent title="Title">
 *   Content here
 * </CustomComponent>
 * ```
 */
export function CustomComponent({
  title,
  children,
  variant = 'default',
  className = '',
}: CustomComponentProps) {
  const baseStyles = 'p-4 rounded-lg border'
  const variantStyles = {
    default: 'bg-white dark:bg-slate-900',
    compact: 'bg-slate-50 dark:bg-slate-800',
  }

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  )
}
```

### Export Pattern

```typescript
// components/index.ts
export { CustomComponent } from './custom-component'
export type { CustomComponentProps } from './custom-component'
```

---

## 🎯 Best Practices

### Do's ✅

- Keep components focused and single-responsibility
- Use TypeScript for type safety
- Add JSDoc comments
- Pass props as interface
- Use semantic HTML
- Support dark mode
- Make components accessible

### Don'ts ❌

- Don't create mega-components
- Don't hardcode colors (use Tailwind)
- Don't forget prop documentation
- Don't ignore accessibility
- Don't skip TypeScript types
- Don't create components in pages

---

## 🔗 Resources

- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## 📞 Component Questions?

- Check individual component files
- Review Radix UI docs
- Check Tailwind CSS docs
- Open an issue on GitHub

---

**Last Updated**: 2024
