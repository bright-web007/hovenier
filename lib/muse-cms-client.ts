/**
 * Muse CMS Client - Fetch Articles (Next.js compatible, ESM)
 */

interface MuseCMSConfig {
  museGraphqlUrl: string;
  mercuryTokenUrl: string;
  appId: string;
  appSecret: string;
  museBlogUuid: string;
}

export class MuseCMSClient {
  config: MuseCMSConfig;
  projectToken: string | null;

  constructor(config: MuseCMSConfig) {
    this.config = config;
    this.projectToken = null;
  }

  async getProjectToken() {
    if (this.projectToken) return this.projectToken;

    const response = await fetch(this.config.mercuryTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: this.config.appId,
        app_secret: this.config.appSecret,
      }),
    });

    if (!response.ok) throw new Error(`Mercury auth failed: ${response.status} - ${response.statusText}`);

    const tokenData = await response.json();
    this.projectToken = tokenData.token ?? null;

    if (!this.projectToken) throw new Error('Failed to get project token from Mercury');
    return this.projectToken;
  }

  async fetchAllPosts(limit = 1000) {
    const projectToken = await this.getProjectToken();
    const query = `
      query GqlPosts($first: Int!, $page: Int, $filter: PostFilterInput, $search: String, $sort: [PostSortInput!]) {
        posts(first: $first, page: $page, filter: $filter, search: $search, sort: $sort) {
          data {
            slug
            uuid
            title
            excerpt
            content
            language_attr
            updated_at
            published_at
            category {
              uuid
              name
              slug
              parent {
                uuid
                name
                slug
              }
            }
            tags {
              name
              slug
            }
            read_time
          }
          paginatorInfo {
            count
            total
            perPage
            currentPage
            lastPage
            hasMorePages
          }
        }
      }
    `;
    const articles = [];
    let page = 1;
    const perPage = Math.min(100, limit);
    while (articles.length < limit) {
      const variables = {
        page: page,
        first: perPage,
        search: '',
        filter: {
          blog_uuid: { eq: this.config.museBlogUuid },
          status: { eq: 1 },
        },
        sort: [{ field: 'PUBLISHED_AT', order: 'DESC' }],
      };
      const response = await fetch(this.config.museGraphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-project-token': projectToken,
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
          operationName: 'GqlPosts',
        }),
      });
      if (!response.ok) throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
      const data = await response.json();
      if (data.errors) throw new Error('GraphQL errors: ' + JSON.stringify(data.errors));
      const postsData = data.data?.posts || {};
      const posts = postsData.data || [];
      const paginator = postsData.paginatorInfo || {};
      if (!posts.length) break;
      for (const post of posts) {
        const content = post.content || '';
        const wordCount = content ? content.split(/\s+/).length : 0;
        articles.push({
          articleId: post.uuid,
          externalRef: post.uuid,
          headline: post.title,
          dek: post.excerpt || null,
          bodyText: content,
          articleType: this.determineArticleType(post),
          wordCount: wordCount,
          publishedAt: post.published_at,
          urlSlug: post.slug,
          category: post.category,
          tags: post.tags,
          readTime: post.read_time,
          updatedAt: post.updated_at,
        });
        if (articles.length >= limit) break;
      }
      if (!paginator.hasMorePages) break;
      page++;
    }
    return articles;
  }

  determineArticleType(post: any) {
    const category = post.category || {};
    const content = post.content || '';
    const wordCount = content ? content.split(/\s+/).length : 0;
    const categoryName = (category.name || '').toLowerCase();
    const categorySlug = (category.slug || '').toLowerCase();
    if ([
      'opinion', 'editorial', 'social'
    ].some(term => categoryName.includes(term) || categorySlug.includes(term))) {
      return 'social-editorial';
    } else if ([
      'explainer', 'analysis', 'guide'
    ].some(term => categoryName.includes(term) || categorySlug.includes(term))) {
      return 'explainer';
    } else if ([
      'breaking', 'wire', 'brief'
    ].some(term => categoryName.includes(term) || categorySlug.includes(term))) {
      return 'wire';
    } else if (wordCount > 1200) {
      return 'long-form';
    } else {
      return 'standard';
    }
  }
}

export function createMuseCMSClient() {
  const config: MuseCMSConfig = {
    museGraphqlUrl: process.env.MUSE_GRAPHQL_URL!,
    mercuryTokenUrl: process.env.MERCURY_TOKEN_URL!,
    appId: process.env.NEXUS_PROJECT_API_KEY!,
    appSecret: process.env.NEXUS_PROJECT_API_SECRET!,
    museBlogUuid: process.env.MUSE_BLOG_UUID!,
  };

  const missing = [];
  if (!config.museGraphqlUrl) missing.push('MUSE_GRAPHQL_URL');
  if (!config.mercuryTokenUrl) missing.push('MERCURY_TOKEN_URL');
  if (!config.appId) missing.push('NEXUS_PROJECT_API_KEY');
  if (!config.appSecret) missing.push('NEXUS_PROJECT_API_SECRET');
  if (!config.museBlogUuid) missing.push('MUSE_BLOG_UUID');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return new MuseCMSClient(config);
}
