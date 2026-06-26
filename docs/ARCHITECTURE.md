# CarHub Architecture

Comprehensive guide to the CarHub system architecture, module structure, and data flow.

## 🏗️ System Architecture

CarHub follows a modern, modular architecture using Next.js App Router with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│              Client (Browser / Mobile)              │
├─────────────────────────────────────────────────────┤
│  UI Layer (React Components + TypeScript)           │
│  ├── Pages (app/[module]/page.tsx)                  │
│  ├── Components (components/)                       │
│  └── Layouts (app/layout.tsx)                       │
├─────────────────────────────────────────────────────┤
│  State Management & Utilities                       │
│  ├── React Context API                              │
│  ├── Theme Provider (next-themes)                   │
│  └── Utilities (lib/)                               │
├─────────────────────────────────────────────────────┤
│  Styling Layer                                      │
│  ├── Tailwind CSS 4                                 │
│  ├── Radix UI Components                            │
│  └── Theme System (Dark/Light)                      │
├─────────────────────────────────────────────────────┤
│  Infrastructure (Future)                            │
│  ├── API Layer (to be implemented)                  │
│  ├── Authentication (to be implemented)             │
│  └── Database (to be implemented)                   │
└─────────────────────────────────────────────────────┘
```

## 📦 Module Structure

CarHub is organized into feature modules, each with specific responsibilities:

### 1. **Dashboard Module** (`app/dashboard/`)

**Purpose**: Personalized user hub

**Components**:
- Saved items section
- Quick access widgets
- Recent activity
- Personalized recommendations

**Key Files**:
- `page.tsx` - Main dashboard page

---

### 2. **Forum Module** (`app/forum/`)

**Purpose**: Community discussions and Q&A

**Routes**:
- `/forum` - Forum listing page
- `/forum/new` - Create new thread
- `/forum/[id]` - Thread detail page with comments

**Components**:
- Thread list with search/filter
- Thread detail with comments
- Comment form
- User reputation display

**Key Files**:
- `page.tsx` - Forum listing
- `[id]/page.tsx` - Thread detail
- `new/page.tsx` - New thread creation

---

### 3. **Events Module** (`app/events/`)

**Purpose**: Meetups, car shows, and community events

**Routes**:
- `/events` - Events listing
- `/events/[id]` - Event details

**Components**:
- Event cards with details
- Event filters (location, date, category)
- RSVP functionality
- Event timeline

**Key Files**:
- `page.tsx` - Events listing
- `[id]/page.tsx` - Event detail page
- `loading.tsx` - Loading state

---

### 4. **Guides Module** (`app/guides/`)

**Purpose**: Car maintenance tutorials and resources

**Routes**:
- `/guides` - Guides listing

**Components**:
- Guide cards with categories
- Featured guides section
- Search and filtering
- Related guides

**Key Files**:
- `page.tsx` - Guides listing page

---

### 5. **Admin Module** (`app/admin/`)

**Purpose**: Content management and community moderation

**Routes**:
- `/admin` - Admin dashboard

**Features**:
- User management
- Content moderation
- System statistics
- Analytics dashboard

**Key Files**:
- `page.tsx` - Admin dashboard
- `loading.tsx` - Loading state

---

### 6. **Profile Module** (`app/profile/`)

**Purpose**: User account and profile management

**Routes**:
- `/profile` - User profile

**Components**:
- User information
- Saved items
- Activity history
- Settings

**Key Files**:
- `page.tsx` - Profile page

---

## 🧩 Component Architecture

### Component Hierarchy

```
App (app/layout.tsx)
├── Theme Provider (next-themes)
├── Navigation (global)
├── Main Content (per page)
│   ├── Page Component
│   ├── Feature Components
│   │   ├── Cards
│   │   ├── Forms
│   │   └── Lists
│   └── UI Components
│       ├── Buttons
│       ├── Modals
│       ├── Dropdowns
│       └── Radix UI primitives
├── Notification Center (global)
├── Chat Button (global)
└── Footer (global)
```

### Component Categories

#### 1. **Page Components** (`app/[module]/page.tsx`)

Server/Client components that render complete pages.

```typescript
// Example structure
export default function ModulePage() {
  return (
    <div>
      <Header />
      <ContentArea />
      <Sidebar />
    </div>
  )
}
```

#### 2. **Feature Components** (`components/`)

Reusable components specific to feature modules.

- `search-bar.tsx` - Search functionality
- `notification-center.tsx` - Notifications
- `chat-button.tsx` - Chat widget
- `trending-section.tsx` - Trending content
- `user-badges.tsx` - User reputation

#### 3. **UI Components** (`components/ui/`)

Primitives from Radix UI wrapped with Tailwind CSS styling.

Examples:
- Button, Input, Select
- Dialog, AlertDialog, Popover
- Accordion, Tabs, Slider
- ScrollArea, Separator

#### 4. **Layout Components** (`app/layout.tsx`)

Root layout providing:
- Global navigation
- Theme provider setup
- Global styles
- Metadata

---

## 🎨 Styling Architecture

### Design System

```
Styling Layers (Bottom to Top):
┌──────────────────────────────────────────┐
│  Global Styles (globals.css)             │ ← Reset, base styles
├──────────────────────────────────────────┤
│  Tailwind CSS Framework (tailwind.css)   │ ← Utility classes
├──────────────────────────────────────────┤
│  Component Styles (component classes)    │ ← Component-level
├──────────────────────────────────────────┤
│  Theme Variables (CSS custom props)      │ ← Dark/Light modes
├──────────────────────────────────────────┤
│  Page Specific Styles (inline/modules)   │ ← Page-level tweaks
└──────────────────────────────────────────┘
```

### Color Palette

**Light Mode**:
- Background: White/Off-white
- Text: Dark gray/Black
- Accents: Brand colors

**Dark Mode**:
- Background: Dark gray/Black
- Text: White/Off-white
- Accents: Adjusted colors

### Responsive Breakpoints

Tailwind CSS standard breakpoints:

| Prefix | Breakpoint | Usage |
|--------|-----------|-------|
| - | 0px | Mobile (default) |
| `sm` | 640px | Small devices |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large screens |
| `2xl` | 1536px | Extra large |

---

## 🔄 Data Flow

### Current State (Mock Data)

```
┌────────────────────┐
│  Mock Data Files   │ (in components/pages)
├────────────────────┤
│ generateMockData() │
│ getItems()         │
│ getThreads()       │
├────────────────────┤
│  React Components  │
│  (Display Layer)   │
├────────────────────┤
│  Browser Render    │
└────────────────────┘
```

### Future State (with Backend API)

```
┌─────────────────────┐
│  External Backend   │ (Node.js, Python, etc.)
│  - REST API         │
│  - GraphQL          │
│  - WebSockets       │
├─────────────────────┤
│  API Client Layer   │ (fetch, axios, etc.)
│  - Request handling │
│  - Error handling   │
│  - Response caching │
├─────────────────────┤
│  State Management   │ (React Context)
│  - Data storage     │
│  - Cache management │
├─────────────────────┤
│  React Components   │
│  (Display Layer)    │
├─────────────────────┤
│  Browser Render     │
└─────────────────────┘
```

---

## 📋 Data Models

### User

```typescript
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  reputation: number
  joinDate: Date
  preferences: UserPreferences
}
```

### Forum Thread

```typescript
interface ForumThread {
  id: string
  title: string
  content: string
  author: User
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  views: number
  replies: Comment[]
}
```

### Event

```typescript
interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  image: string
  attendees: User[]
  organizer: User
  category: string
  maxAttendees?: number
}
```

---

## 🔗 Integration Points

### API Integration (Future)

Current plan for backend integration:

1. **Environment Configuration**
   - API endpoint in `.env.local`
   - API key management

2. **Data Fetching**
   - Replace mock functions with API calls
   - Implement error handling
   - Add loading states

3. **State Management**
   - Use React Context for global state
   - Consider Redux for complex state

### Authentication (Future)

- Session management
- Role-based access control
- Protected routes

### Database (Future)

- User data persistence
- Forum posts and comments
- Event management
- Analytics data

---

## 🏃 Performance Optimization

### Current Optimizations

- **Next.js Turbopack**: Fast builds and hot reload
- **Code Splitting**: Page-based chunking
- **Image Optimization**: Automatic optimization
- **CSS Optimization**: Tailwind purging unused styles

### Recommended Enhancements

1. **Caching Strategy**
   - Implement SWR for data fetching
   - Cache API responses

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting

3. **Image Optimization**
   - Use Next.js Image component
   - Responsive images with srcset

4. **Monitoring**
   - Vercel Analytics (already integrated)
   - Error tracking (Sentry, LogRocket)

---

## 🔐 Security Considerations

### Current State

- No authentication required (public demo)
- No sensitive data handled

### Production Requirements

1. **Authentication**
   - Implement JWT or session-based auth
   - Secure password storage (bcrypt)

2. **Input Validation**
   - Server-side validation with Zod
   - CSRF protection

3. **Data Protection**
   - HTTPS only
   - Content Security Policy (CSP)
   - Rate limiting

4. **Database Security**
   - SQL injection prevention
   - Role-based access control (RBAC)

---

## 📚 Technology Stack Rationale

### Next.js 16 with Turbopack
- **Why**: Fast development experience, built-in optimizations, full-stack capability

### React 19
- **Why**: Latest features, improved performance, better developer experience

### TypeScript
- **Why**: Type safety, better IDE support, fewer runtime errors

### Tailwind CSS 4
- **Why**: Utility-first, highly customizable, great theming support

### Radix UI
- **Why**: Accessible primitives, no style opinions, full control

---

## 🔄 State Management

### Current Approach: React Context + Props

Simple, no external dependencies needed for current scope.

### File Structure

```
components/
├── theme-provider.tsx     # Theme context
├── notification-center.tsx # Notification state
└── [other components]
```

### Example Context Pattern

```typescript
// Theme Context
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

---

## 🚀 Deployment Architecture

### Development Environment
- Local development with `pnpm dev`
- Hot module reloading
- TypeScript checking

### Production Environment
- Built with `pnpm build`
- Optimized bundles
- Deployed to Vercel or Docker

### Environment-Specific Configuration

```
.env.local      → Development
.env.staging    → Staging (if needed)
.env.production → Production (on deployment service)
```

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Last Updated**: 2024
