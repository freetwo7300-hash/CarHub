import { date, integer, text, timestamp, varchar } from 'drizzle-orm/mysql-core'

// User collection
export interface User {
  _id?: string
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  reputation: number
  joinDate: Date
  role: 'user' | 'moderator' | 'admin'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    newsletter: boolean
  }
}

// Forum Thread collection
export interface ForumThread {
  _id?: string
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  views: number
  replies: number
  isPinned: boolean
}

// Forum Comment collection
export interface ForumComment {
  _id?: string
  id: string
  threadId: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: Date
  updatedAt: Date
  likes: number
  isAccepted: boolean
}

// Event collection
export interface Event {
  _id?: string
  id: string
  title: string
  description: string
  date: Date
  endDate?: Date
  location: string
  image: string
  attendees: string[] // User IDs
  organizer: {
    id: string
    name: string
    avatar?: string
  }
  category: string
  maxAttendees?: number
  registeredCount: number
  createdAt: Date
}

// Guide collection
export interface Guide {
  _id?: string
  id: string
  title: string
  description: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number // in minutes
  views: number
  helpful: number
  image: string
  createdAt: Date
  updatedAt: Date
}

// Saved Item collection (Bookmarks)
export interface SavedItem {
  _id?: string
  id: string
  userId: string
  itemId: string
  itemType: 'thread' | 'event' | 'guide'
  savedAt: Date
}

// Notification collection
export interface Notification {
  _id?: string
  id: string
  userId: string
  type: 'reply' | 'event' | 'system'
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
}
