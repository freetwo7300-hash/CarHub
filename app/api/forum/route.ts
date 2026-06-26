import { NextRequest, NextResponse } from 'next/server'
import { getForumThreads, createThread } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    const threads = await getForumThreads(limit, skip)
    return NextResponse.json(threads)
  } catch (error) {
    console.error('Error fetching threads:', error)
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const thread = await createThread({
      id: `thread-${Date.now()}`,
      title: body.title,
      content: body.content,
      author: body.author,
      category: body.category,
      tags: body.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      replies: 0,
      isPinned: false,
    })
    return NextResponse.json(thread, { status: 201 })
  } catch (error) {
    console.error('Error creating thread:', error)
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 })
  }
}
