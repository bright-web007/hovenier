import { NextRequest, NextResponse } from 'next/server';

const KEY = process.env.INDEXNOW_KEY!;
const HOST = 'hovenier.frl';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl';

// POST /api/indexnow  { urls: string[] }
// GET  /api/indexnow?url=https://hovenier.frl/diensten
export async function POST(request: NextRequest) {
  if (!KEY) {
    return NextResponse.json({ error: 'INDEXNOW_KEY not configured' }, { status: 500 });
  }

  // Simple shared-secret auth — pass the same key in the Authorization header
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let urls: string[];
  try {
    const body = await request.json();
    urls = Array.isArray(body.urls) ? body.urls : [];
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (urls.length === 0) {
    return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
  }

  const result = await submitToIndexNow(urls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export async function GET(request: NextRequest) {
  if (!KEY) {
    return NextResponse.json({ error: 'INDEXNOW_KEY not configured' }, { status: 500 });
  }

  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'url param required' }, { status: 400 });
  }

  const result = await submitToIndexNow([url]);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

async function submitToIndexNow(urls: string[]) {
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `${BASE_URL}/${KEY}.txt`,
        urlList: urls,
      }),
    });

    return {
      ok: res.status === 200 || res.status === 202,
      status: res.status,
      urlCount: urls.length,
    };
  } catch (err) {
    return { ok: false, status: 0, error: String(err), urlCount: urls.length };
  }
}
