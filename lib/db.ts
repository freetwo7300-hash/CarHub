import { getDB } from './mongodb'
import type {
  User,
  ForumThread,
  ForumComment,
  Event,
  Guide,
  SavedItem,
  Notification,
} from '@/types'

// ============ USERS ============
export async function getUsers(): Promise<User[]> {
  const db = await getDB()
  return db.collection<User>('users').find({}).toArray()
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await getDB()
  return db.collection<User>('users').findOne({ id })
}

export async function createUser(user: User): Promise<User> {
  const db = await getDB()
  await db.collection<User>('users').insertOne(user)
  return user
}

// ============ FORUM THREADS ============
export async function getForumThreads(limit = 20, skip = 0): Promise<ForumThread[]> {
  const db = await getDB()
  return db
    .collection<ForumThread>('forum_threads')
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
}

export async function getThreadById(id: string): Promise<ForumThread | null> {
  const db = await getDB()
  return db.collection<ForumThread>('forum_threads').findOne({ id })
}

export async function getThreadsByCategory(
  category: string,
  limit = 10,
): Promise<ForumThread[]> {
  const db = await getDB()
  return db
    .collection<ForumThread>('forum_threads')
    .find({ category })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
}

export async function createThread(thread: ForumThread): Promise<ForumThread> {
  const db = await getDB()
  await db.collection<ForumThread>('forum_threads').insertOne(thread)
  return thread
}

// ============ FORUM COMMENTS ============
export async function getThreadComments(threadId: string): Promise<ForumComment[]> {
  const db = await getDB()
  return db
    .collection<ForumComment>('forum_comments')
    .find({ threadId })
    .sort({ createdAt: 1 })
    .toArray()
}

export async function createComment(comment: ForumComment): Promise<ForumComment> {
  const db = await getDB()
  await db.collection<ForumComment>('forum_comments').insertOne(comment)
  return comment
}

// ============ EVENTS ============
export async function getEvents(limit = 20, skip = 0): Promise<Event[]> {
  const db = await getDB()
  return db
    .collection<Event>('events')
    .find({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .limit(limit)
    .skip(skip)
    .toArray()
}

export async function getEventById(id: string): Promise<Event | null> {
  const db = await getDB()
  return db.collection<Event>('events').findOne({ id })
}

export async function getEventsByLocation(location: string): Promise<Event[]> {
  const db = await getDB()
  return db
    .collection<Event>('events')
    .find({ location, date: { $gte: new Date() } })
    .sort({ date: 1 })
    .toArray()
}

export async function createEvent(event: Event): Promise<Event> {
  const db = await getDB()
  await db.collection<Event>('events').insertOne(event)
  return event
}

export async function joinEvent(eventId: string, userId: string): Promise<void> {
  const db = await getDB()
  await db.collection<Event>('events').updateOne(
    { id: eventId },
    {
      $push: { attendees: userId },
      $inc: { registeredCount: 1 },
    },
  )
}

// ============ GUIDES ============
export async function getGuides(limit = 20, skip = 0): Promise<Guide[]> {
  const db = await getDB()
  return db
    .collection<Guide>('guides')
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
}

export async function getGuideById(id: string): Promise<Guide | null> {
  const db = await getDB()
  return db.collection<Guide>('guides').findOne({ id })
}

export async function getGuidesByCategory(category: string): Promise<Guide[]> {
  const db = await getDB()
  return db
    .collection<Guide>('guides')
    .find({ category })
    .sort({ views: -1 })
    .toArray()
}

export async function createGuide(guide: Guide): Promise<Guide> {
  const db = await getDB()
  await db.collection<Guide>('guides').insertOne(guide)
  return guide
}

// ============ SAVED ITEMS ============
export async function getSavedItems(userId: string): Promise<SavedItem[]> {
  const db = await getDB()
  return db
    .collection<SavedItem>('saved_items')
    .find({ userId })
    .sort({ savedAt: -1 })
    .toArray()
}

export async function saveItem(
  userId: string,
  resourceId: string,
  resourceType: 'forum' | 'event' | 'guide',
): Promise<void> {
  const db = await getDB()
  await db.collection<SavedItem>('saved_items').insertOne({
    id: `${userId}-${resourceId}`,
    userId,
    resourceId,
    resourceType,
    savedAt: new Date(),
  } as SavedItem)
}

export async function removeSavedItem(userId: string, resourceId: string): Promise<void> {
  const db = await getDB()
  await db
    .collection<SavedItem>('saved_items')
    .deleteOne({ userId, resourceId })
}

// ============ NOTIFICATIONS ============
export async function getUserNotifications(
  userId: string,
  unreadOnly = false,
): Promise<Notification[]> {
  const db = await getDB()
  const query = unreadOnly ? { userId, read: false } : { userId }
  return db
    .collection<Notification>('notifications')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray()
}

export async function createNotification(notification: Notification): Promise<void> {
  const db = await getDB()
  await db.collection<Notification>('notifications').insertOne(notification)
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const db = await getDB()
  await db
    .collection<Notification>('notifications')
    .updateOne({ id: notificationId }, { $set: { read: true } })
}

// ============ SYSTEM ============
export async function initializeDB(): Promise<void> {
  const db = await getDB()

  // Create collections if they don't exist
  const collections = [
    'users',
    'forum_threads',
    'forum_comments',
    'events',
    'guides',
    'saved_items',
    'notifications',
  ]

  for (const collection of collections) {
    try {
      await db.createCollection(collection)
      console.log(`Created collection: ${collection}`)
    } catch (error: any) {
      if (error.code !== 48) {
        // Collection already exists
        console.error(`Error creating collection ${collection}:`, error)
      }
    }
  }

  // Create indexes
  await db.collection('users').createIndex({ email: 1 })
  await db.collection('forum_threads').createIndex({ category: 1 })
  await db.collection('forum_comments').createIndex({ threadId: 1 })
  await db.collection('events').createIndex({ date: 1 })
  await db.collection('guides').createIndex({ category: 1 })
  await db.collection('saved_items').createIndex({ userId: 1 })
  await db.collection('notifications').createIndex({ userId: 1 })

  console.log('Database initialized successfully')
}
