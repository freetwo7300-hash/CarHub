// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  reputation?: number
  joinDate?: Date
  bio?: string
}

// Forum types
export interface ForumThread {
  id: string
  title: string
  content: string
  author: User
  category: string
  tags: string[]
  replies: number
  views: number
  createdAt: Date
  updatedAt?: Date
  isPinned: boolean
  likes?: number
}

export interface ForumComment {
  id: string
  content: string
  author: User
  threadId: string
  createdAt: Date
  updatedAt?: Date
  likes: number
}

// Event types
export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  category: string
  registeredCount: number
  maxAttendees?: number
  image: string
  organizer: User
  createdAt: Date
  updatedAt?: Date
}

// Guide types
export interface Guide {
  id: string
  title: string
  description: string
  content: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: number
  views: number
  helpful: number
  author: User
  image: string
  tags: string[]
  createdAt: Date
  updatedAt?: Date
}

// Saved/Bookmark types
export interface SavedItem {
  id: string
  userId: string
  resourceId: string
  resourceType: "forum" | "guide" | "event"
  savedAt: Date
}

// Notification types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
  link?: string
}

// Dashboard types
export interface DashboardStats {
  forumPosts: number
  guidesCreated: number
  eventsAttended: number
  reputation: number
}

export interface DashboardActivity {
  id: string
  title: string
  type: "forum" | "guide" | "event"
  date: string
  status: "Active" | "Completed" | "Published"
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
