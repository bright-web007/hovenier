# Prometheus Forms Integration Investigation

## 🔧 Prerequisites Checklist

### Required Environment Variables
Add these to your `.env.local` file:

```env
# Existing (already set in .env)
PROMETHEUS_GRAPHQL_URL=https://prometheus.hivedeck.com/graphql
MERCURY_GRAPHQL_URL=https://mercury.hivedeck.com/graphql

# Missing - need values from Nexus platform
NEXUS_PROJECT_API_KEY=your_app_id_here
NEXUS_PROJECT_API_SECRET=your_app_secret_here

# Optional - Mercury token endpoint if different
MERCURY_TOKEN_URL=https://mercury.hivedeck.com/graphql
```

## 📋 Investigation Steps

### 1. **Set Up Credentials** 
- [ ] Get your Nexus project API key (app_id)
- [ ] Get your Nexus project API secret (app_secret)  
- [ ] Add them to `.env.local`

### 2. **Run Investigation Script**
```bash
node scripts/investigate-prometheus.js
```

This script will:
- ✅ Test Mercury authentication with your credentials
- 🔍 Introspect the Prometheus GraphQL schema
- 📋 Show available types, mutations, and fields
- 🧪 Attempt a test lead submission

### 3. **Expected Findings**

Based on your form data structure, we expect to find:

**Types:**
- `Lead` or `FormSubmission` type
- `LeadInput` input type for mutations
- Possible `ContactRequest` or similar

**Fields we need to map:**
- `naam` → `name`
- `gemeente` → `municipality` or `location` 
- `dienst` → `service_type` or `category`
- `telefoon` → `phone` or `contact_number`
- `locale` → `language`
- `timestamp` → `created_at` or `submitted_at`
- `source` → `source` or `referrer`

**Mutations:**
- `createLead()` or `submitForm()`
- `createContact()` or similar

### 4. **Current Form Integration Points**

Your forms are used in:
- ✅ `NewLeadForm` component (main lead form)
- ✅ Service pages (groendak, tuinonderhoud, etc.)
- ✅ Regional gemeente pages  
- ✅ Cost calculator pages
- ✅ Hero/homepage sections

All call `submitLeadToPrometheus()` in `app/services/prometheus.ts`

## 🎯 Next Actions

1. **Get credentials** from your Nexus platform dashboard
2. **Run investigation script** to understand the schema
3. **Update prometheus.ts** with proper GraphQL mutations
4. **Test integration** with real form submissions
5. **Add error handling** and validation
6. **Setup monitoring** for form submissions

## 🔍 Questions to Answer

During investigation, we need to determine:
- What's the exact mutation name for creating leads?
- What fields are required vs optional?
- How does Prometheus handle duplicate submissions?
- Are there any rate limiting considerations?
- How do we get submission confirmations/IDs back?
- Is there a webhook system for notifications?

## 🚀 Expected Outcome

After investigation, we should have:
- ✅ Working GraphQL authentication
- 📋 Complete schema documentation  
- 🔄 Proper mutation for lead submission
- 🧪 Test submission working
- 📝 Implementation plan for updating the service