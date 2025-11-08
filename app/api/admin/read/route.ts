import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

import { ADMIN_FILE_ALLOW_LIST } from '@/lib/adminConfig'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const file = url.searchParams.get('file') || 'impact.json'
    // restrict to data folder files
    if (!ADMIN_FILE_ALLOW_LIST.includes(file)) {
      return NextResponse.json({ error: 'file not allowed' }, { status: 400 })
    }

    const dataPath = path.resolve(process.cwd(), 'data', file)
    const raw = await fs.readFile(dataPath, 'utf8')
    const json = JSON.parse(raw)
    return NextResponse.json({ data: json })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
