import { NextResponse } from 'next/server';
import { MuseCMSClient } from '../../../lib/muse-cms-client';

export async function GET() {
  const config = {
    museGraphqlUrl: process.env.MUSE_GRAPHQL_URL!,
    mercuryTokenUrl: process.env.MERCURY_TOKEN_URL!,
    museAppId: process.env.MUSE_APP_ID!,
    museAppSecret: process.env.MUSE_APP_SECRET!,
    museBlogUuid: process.env.MUSE_BLOG_UUID!,
  };
  const client = new MuseCMSClient(config);
  try {
    const articles = await client.fetchAllPosts(100);
    return NextResponse.json(articles);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
