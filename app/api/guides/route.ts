import { NextRequest, NextResponse } from 'next/server'
import { getGuides, createGuide } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    const guides = await getGuides(limit, skip)
    return NextResponse.json(guides)
  } catch (error) {
    console.error('Error fetching guides:', error)
    return NextResponse.json({ error: 'Failed to fetch guides' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const guide = await createGuide({
      id: `guide-${Date.now()}`,
      title: body.title,
      description: body.description,
      content: body.content,
      author: body.author,
      category: body.category,
      tags: body.tags || [],
      difficulty: body.difficulty || 'beginner',
      estimatedTime: body.estimatedTime || 15,
      views: 0,
      helpful: 0,
      image: body.image,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return NextResponse.json(guide, { status: 201 })
  } catch (error) {
    console.error('Error creating guide:', error)
    return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 })
  }
}
