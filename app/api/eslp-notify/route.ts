import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATA_FILE = path.resolve(process.cwd(), 'data', 'eslp-notifications.json')

interface NotifyEntry {
  name: string
  email: string
  phone: string
  createdAt: string
}

async function readEntries(): Promise<NotifyEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeEntries(entries: NotifyEntry[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8')
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name.' },
        { status: 400 }
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const entries = await readEntries()

    // Check for duplicate email
    if (entries.some((e) => e.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { success: true, message: 'You are already on the notification list!' },
        { status: 200 }
      )
    }

    const newEntry: NotifyEntry = {
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    }

    entries.push(newEntry)
    await writeEntries(entries)

    return NextResponse.json({
      success: true,
      message: 'You have been added to the ESLP 2026 notification list!',
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('ESLP notify error:', msg)
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
