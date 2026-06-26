import { connectDB } from '@/lib/mongodb'
import type { User, ForumThread, Event, Guide } from '@/lib/schema'

const seedUsers = async (db: any) => {
  const users: User[] = [
    {
      id: 'user-1',
      name: 'John Mechanic',
      email: 'john@carhub.com',
      avatar: '/placeholder-user.jpg',
      bio: 'Professional mechanic with 10 years experience',
      reputation: 850,
      joinDate: new Date('2023-01-15'),
      role: 'moderator',
      preferences: {
        theme: 'dark',
        notifications: true,
        newsletter: true,
      },
    },
    {
      id: 'user-2',
      name: 'Sarah Tuning',
      email: 'sarah@carhub.com',
      avatar: '/placeholder-user.jpg',
      bio: 'Performance tuning enthusiast',
      reputation: 620,
      joinDate: new Date('2023-03-20'),
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: true,
        newsletter: false,
      },
    },
  ]

  await db.collection('users').insertMany(users)
  console.log('✓ Seeded users')
}

const seedForumThreads = async (db: any) => {
  const threads: ForumThread[] = [
    {
      id: 'thread-1',
      title: 'Best practices for oil changes',
      content: 'What are the best practices for regular oil changes?',
      author: {
        id: 'user-1',
        name: 'John Mechanic',
        avatar: '/placeholder-user.jpg',
      },
      category: 'maintenance',
      tags: ['oil', 'maintenance', 'diy'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      views: 234,
      replies: 12,
      isPinned: true,
    },
    {
      id: 'thread-2',
      title: 'Performance tuning tips for beginners',
      content: 'Looking for advice on basic performance upgrades',
      author: {
        id: 'user-2',
        name: 'Sarah Tuning',
        avatar: '/placeholder-user.jpg',
      },
      category: 'performance',
      tags: ['tuning', 'performance', 'beginner'],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
      views: 156,
      replies: 8,
      isPinned: false,
    },
  ]

  await db.collection('forum_threads').insertMany(threads)
  console.log('✓ Seeded forum threads')
}

const seedEvents = async (db: any) => {
  const events: Event[] = [
    {
      id: 'event-1',
      title: 'Monthly Car Meet - Downtown',
      description: 'Join us for our monthly car enthusiast meetup',
      date: new Date('2024-02-15'),
      location: 'Downtown Central Park',
      image: '/meetup-cars.jpg',
      attendees: ['user-1', 'user-2'],
      organizer: {
        id: 'user-1',
        name: 'John Mechanic',
        avatar: '/placeholder-user.jpg',
      },
      category: 'meetup',
      maxAttendees: 50,
      registeredCount: 2,
      createdAt: new Date('2024-01-05'),
    },
    {
      id: 'event-2',
      title: 'Car Show 2024',
      description: 'Annual car show with prizes and exhibitions',
      date: new Date('2024-03-20'),
      location: 'Convention Center',
      image: '/carshow.jpg',
      attendees: [],
      organizer: {
        id: 'user-1',
        name: 'John Mechanic',
        avatar: '/placeholder-user.jpg',
      },
      category: 'show',
      maxAttendees: 200,
      registeredCount: 0,
      createdAt: new Date('2024-01-01'),
    },
  ]

  await db.collection('events').insertMany(events)
  console.log('✓ Seeded events')
}

const seedGuides = async (db: any) => {
  const guides: Guide[] = [
    {
      id: 'guide-1',
      title: 'Complete Guide to Oil Changes',
      description: 'Learn how to change your car oil safely',
      content:
        'Step 1: Warm up your engine... Step 2: Lift your car... Step 3: Drain old oil...',
      author: {
        id: 'user-1',
        name: 'John Mechanic',
        avatar: '/placeholder-user.jpg',
      },
      category: 'maintenance',
      tags: ['oil', 'maintenance', 'diy'],
      difficulty: 'beginner',
      estimatedTime: 30,
      views: 1234,
      helpful: 89,
      image: '/workshop-oil-change.jpg',
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-01'),
    },
    {
      id: 'guide-2',
      title: 'Tire Rotation and Balance Guide',
      description: 'Everything you need to know about tire maintenance',
      content: 'Tire rotation improves longevity... Balance prevents vibration...',
      author: {
        id: 'user-1',
        name: 'John Mechanic',
        avatar: '/placeholder-user.jpg',
      },
      category: 'maintenance',
      tags: ['tires', 'maintenance'],
      difficulty: 'intermediate',
      estimatedTime: 45,
      views: 567,
      helpful: 42,
      image: '/tire-rotation.jpg',
      createdAt: new Date('2023-12-10'),
      updatedAt: new Date('2023-12-10'),
    },
  ]

  await db.collection('guides').insertMany(guides)
  console.log('✓ Seeded guides')
}

async function seed() {
  try {
    console.log('🌱 Starting database seed...')
    const db = await connectDB()

    // Clear existing data
    await db.collection('users').deleteMany({})
    await db.collection('forum_threads').deleteMany({})
    await db.collection('events').deleteMany({})
    await db.collection('guides').deleteMany({})
    console.log('✓ Cleared existing data')

    // Seed collections
    await seedUsers(db)
    await seedForumThreads(db)
    await seedEvents(db)
    await seedGuides(db)

    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()
