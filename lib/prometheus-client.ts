/**
 * Prometheus GraphQL Client
 * 
 * Handles authentication and GraphQL operations for the Prometheus forms service.
 * Based on the Muse CMS client patterns in this project.
 */

interface PrometheusConfig {
  prometheusGraphqlUrl: string;
  mercuryGraphqlUrl: string; 
  appId: string;
  appSecret: string;
}

interface AuthResponse {
  token: string;
  expires_at: string;
}

interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: Record<string, unknown>;
  }>;
}

interface SchemaTypeRef {
  name: string | null;
  kind: string;
  ofType?: SchemaTypeRef | null;
}

interface SchemaArgument {
  name: string;
  type: SchemaTypeRef;
}

interface SchemaField {
  name: string;
  description: string | null;
  args: SchemaArgument[];
  type: SchemaTypeRef;
}

interface SchemaType {
  name: string;
  kind: string;
  description: string | null;
  fields?: SchemaField[] | null;
}

interface IntrospectionResult {
  __schema: {
    mutationType?: { name: string } | null;
    queryType?: { name: string } | null;
    types: SchemaType[];
  };
}

export class PrometheusClient {
  private config: PrometheusConfig;
  private projectToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: PrometheusConfig) {
    this.config = config;
  }

  /**
   * Authenticate with Mercury to get a project token
   */
  async authenticate(): Promise<string> {
    // Return cached token if still valid
    if (this.projectToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.projectToken;
    }

    console.log('🔐 Authenticating with Mercury...');

    try {
      const response = await fetch(this.config.mercuryGraphqlUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          query: `
            mutation Authenticate($appId: String!, $appSecret: String!) {
              authenticate(app_id: $appId, app_secret: $appSecret) {
                token
                expires_at
              }
            }
          `,
          variables: {
            appId: this.config.appId,
            appSecret: this.config.appSecret
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Mercury authentication failed: ${response.status} - ${response.statusText}`);
      }

      const result: GraphQLResponse<{ authenticate: AuthResponse }> = await response.json();

      if (result.errors) {
        throw new Error(`Mercury GraphQL error: ${result.errors[0]?.message}`);
      }

      if (!result.data?.authenticate?.token) {
        throw new Error('No token received from Mercury authentication');
      }

      // Cache the token
      this.projectToken = result.data.authenticate.token;
      this.tokenExpiry = new Date(result.data.authenticate.expires_at);

      console.log('✅ Mercury authentication successful');
      return this.projectToken;

    } catch (error) {
      console.error('❌ Mercury authentication error:', error);
      throw error;
    }
  }

  /**
   * Execute a GraphQL query/mutation against Prometheus
   */
  async execute<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const token = await this.authenticate();

    try {
      const response = await fetch(this.config.prometheusGraphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-Version': '1.0',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`Prometheus API error: ${response.status} - ${response.statusText}`);
      }

      const result: GraphQLResponse<T> = await response.json();

      if (result.errors) {
        console.error('Prometheus GraphQL errors:', result.errors);
        throw new Error(`GraphQL error: ${result.errors[0]?.message}`);
      }

      if (!result.data) {
        throw new Error('No data received from Prometheus');
      }

      return result.data;

    } catch (error) {
      throw error;
    }
  }

  /**
   * Introspect the GraphQL schema (for development/investigation)
   */
  async introspectSchema(): Promise<IntrospectionResult> {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          mutationType { name }
          queryType { name }
          types {
            name
            kind
            description
            fields(includeDeprecated: false) {
              name
              description
              args {
                name
                type {
                  name
                  kind
                  ofType { name kind }
                }
              }
              type {
                name
                kind
                ofType { name kind }
              }
            }
          }
        }
      }
    `;

    return this.execute<IntrospectionResult>(introspectionQuery);
  }

  /**
   * Get available mutations (helpful for investigation)
   */
  async getAvailableMutations() {
    const schema = await this.introspectSchema();
    const mutationType = schema.__schema.types.find(
      (type: { name: string }) => type.name === schema.__schema.mutationType?.name
    );
    
    return mutationType?.fields || [];
  }

  /**
   * Find types related to leads/forms
   */
  async getLeadTypes() {
    const schema = await this.introspectSchema();
    return schema.__schema.types.filter((type: { name: string }) =>
      type.name.toLowerCase().includes('lead') ||
      type.name.toLowerCase().includes('form') ||
      type.name.toLowerCase().includes('submission') ||
      type.name.toLowerCase().includes('contact')
    );
  }
}

/**
 * Create a configured Prometheus client instance
 */
export function createPrometheusClient(): PrometheusClient {
  const config: PrometheusConfig = {
    prometheusGraphqlUrl: process.env.PROMETHEUS_GRAPHQL_URL!,
    mercuryGraphqlUrl: process.env.MERCURY_GRAPHQL_URL!,
    appId: process.env.NEXUS_PROJECT_API_KEY!,
    appSecret: process.env.NEXUS_PROJECT_API_SECRET!,
  };

  // Validate configuration
  const missing = [];
  if (!config.prometheusGraphqlUrl) missing.push('PROMETHEUS_GRAPHQL_URL');
  if (!config.mercuryGraphqlUrl) missing.push('MERCURY_GRAPHQL_URL');  
  if (!config.appId) missing.push('NEXUS_PROJECT_API_KEY');
  if (!config.appSecret) missing.push('NEXUS_PROJECT_API_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return new PrometheusClient(config);
}

export default PrometheusClient;