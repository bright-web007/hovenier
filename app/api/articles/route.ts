import { NextResponse } from 'next/server';
import { createMuseCMSClient } from '../../../lib/muse-cms-client';

export async function GET() {
  try {
    const client = createMuseCMSClient();
    const articles = await client.fetchAllPosts(100);
    return NextResponse.json(articles);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
