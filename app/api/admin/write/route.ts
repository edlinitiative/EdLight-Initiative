import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

import { ADMIN_FILE_ALLOW_LIST } from '@/lib/adminConfig'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { file, data } = body
    if (!ADMIN_FILE_ALLOW_LIST.includes(file)) {
      return NextResponse.json({ error: 'file not allowed' }, { status: 400 })
    }

    const dataPath = path.resolve(process.cwd(), 'data', file)
    const text = JSON.stringify(data, null, 2)
    await fs.writeFile(dataPath, text, 'utf8')
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
