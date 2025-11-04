import { NextResponse } from 'next/server'

export async function GET() {
  const res = NextResponse.json({ ok: true, uid: 'demo' }, { status: 200 })
  res.cookies.set('uid', 'demo', { httpOnly: false, path: '/', sameSite: 'lax' })
  return res
}






