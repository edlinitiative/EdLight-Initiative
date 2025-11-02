import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

type RequestPayload = {
  name: string
  email: string
  organization?: string
  currentWebsite?: string
  projectType: string
  budget: string
  timeline: string
  contentStatus: string
  keyFeatures: string
  additionalNotes?: string
  requestType?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = body as RequestPayload

    if (
      !payload?.name ||
      !payload?.email ||
      !payload?.projectType ||
      !payload?.budget ||
      !payload?.timeline ||
      !payload?.contentStatus ||
      !payload?.keyFeatures
    ) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    if (!emailRegex.test(payload.email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'data', 'requests.json')
    const existing = await fs.readFile(filePath, 'utf8').catch(() => '[]')
    const arr = JSON.parse(existing || '[]')

    const entry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...payload,
    }

    arr.push(entry)
    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), 'utf8')

    // Optionally: send email notification here if configured

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Request quote API error', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
