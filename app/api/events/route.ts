import { NextRequest, NextResponse } from 'next/server'
import { getEvents, createEvent } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    const events = await getEvents(limit, skip)
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const event = await createEvent({
      id: `event-${Date.now()}`,
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      location: body.location,
      image: body.image,
      attendees: [],
      organizer: body.organizer,
      category: body.category,
      maxAttendees: body.maxAttendees,
      registeredCount: 0,
      createdAt: new Date(),
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
