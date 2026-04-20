import { NextResponse } from 'next/server';
import { createMuseCMSClient } from '../../../lib/muse-cms-client';

export async function GET() {
  try {
    const client = createMuseCMSClient();
    const articles = await client.fetchAllPosts(100);
    return NextResponse.json(articles);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
