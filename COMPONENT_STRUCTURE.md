# Component Structure

## Overview
All components are now organized into feature-based and shared folders for better maintainability and reusability.

## Directory Structure

```
components/
├── ui/                                    # Base UI components (from shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   └── tabs.tsx
│
├── layout/                                # Layout components
│   ├── navigation.tsx                    # Main navigation with auth modal & theme toggle
│   └── index.ts
│
├── shared/                                # Shared/reusable components
│   ├── page-header.tsx                   # Page title with gradient background
│   ├── empty-state.tsx                   # Empty state display
│   ├── user-avatar.tsx                   # User avatar with size variants
│   ├── search-input.tsx                  # Search bar with results dropdown
│   ├── error-boundary.tsx                # Error boundary wrapper
│   ├── error-display.tsx                 # Error, NotFound, LoadingError displays
│   ├── skeletons.tsx                     # Loading skeletons for all content types
│   └── index.ts
│
├── forum/                                 # Forum feature components
│   ├── thread-card.tsx                   # Card for forum thread in lists
│   ├── thread-stats.tsx                  # Stats display for single thread
│   ├── comment-list.tsx                  # Reusable comment list
│   └── index.ts
│
├── events/                                # Events feature components
│   ├── event-card.tsx                    # Card for event in lists
│   ├── event-details.tsx                 # Event info cards for detail page
│   ├── organizer-card.tsx                # Organizer info display
│   └── index.ts
│
├── guides/                                # Guides feature components
│   ├── guide-card.tsx                    # Card for guide in lists
│   ├── guide-header.tsx                  # Header for guide detail page
│   ├── author-card.tsx                   # Author info display
│   └── index.ts
│
└── (legacy components)
    ├── chat-button.tsx
    ├── notification-center.tsx
    ├── scroll-to-top.tsx
    ├── theme-provider.tsx
    ├── toast-notification.tsx
    ├── trending-section.tsx
    └── user-badges.tsx
```

## Import Examples

### From Layout
```tsx
import { Navigation } from "@/components/layout"
```

### From Shared (Multi-export)
```tsx
import { 
  PageHeader, 
  EmptyState, 
  UserAvatar,
  SearchInput,
  ErrorBoundary,
  ErrorDisplay,
  NotFoundDisplay,
  ListSkeleton,
  DetailPageSkeleton
} from "@/components/shared"
```

### From Feature Folders
```tsx
import { ThreadCard } from "@/components/forum"
import { EventCard, EventDetails, OrganizerCard } from "@/components/events"
import { GuideCard, GuideHeader, AuthorCard } from "@/components/guides"
```

## Benefits

✅ **Organized by Feature** - Forum, events, and guides components grouped together
✅ **Centralized Shared** - All reusable components in one place
✅ **No Duplicates** - Single source of truth for each component
✅ **Easy Import** - Barrel exports (index.ts) for clean imports
✅ **Icon Wrapper Fix** - All icon components properly wrapped in divs with className
✅ **Search Input Fixed** - Icon is now inside the input, not overlapping
✅ **Clean Layout** - Navigation moved to dedicated layout folder

## Recent Changes

- Moved Navigation → `/layout/navigation.tsx`
- Moved Error components → `/shared/error-boundary.tsx`, `/shared/error-display.tsx`
- Moved Skeletons → `/shared/skeletons.tsx`
- Moved SearchBar → `/shared/search-input.tsx` (improved icon handling)
- Updated all imports across the codebase
- Removed duplicate component files
- Fixed icon className issues by wrapping in divs
