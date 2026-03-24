# Next.js App Router Testing Strategy

## Current Test Coverage Gap

Our Jest-based unit tests (142/150 passing) **cannot detect Next.js App Router runtime violations** such as:
- Server Component onClick handlers
- Client/Server boundary violations  
- SSR hydration mismatches
- App Router-specific runtime errors

## Recommended Testing Approach

### 1. **Integration Tests** (NEW - catches runtime issues)
```bash
# Add to package.json
"test:integration": "jest --config jest.integration.config.js",
"test:e2e": "playwright test"
```

### 2. **Static Analysis** (Prevent issues at build time)
```bash
# ESLint rules for App Router
npm install @next/eslint-plugin-next
```

Add to `.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@next/next/no-server-import-in-page": "error",
    "react-hooks/rules-of-hooks": "error"
  }
}
```

### 3. **Build-Time Validation**
```bash
# Add to CI/CD pipeline
npm run build && npm run start &
sleep 10
curl -f http://localhost:3000/nl/kosten || exit 1
```

### 4. **Testing Pyramid**
- **Unit Tests (Jest)**: Component logic, utilities, pure functions
- **Integration Tests**: API routes, Server Component rendering
- **E2E Tests (Playwright)**: Full user flows, runtime behavior
- **Static Analysis**: ESLint, TypeScript, custom rules

## Why This Matters

Server Component violations cause:
- 🛑 **500 errors in production**  
- 💔 **Poor user experience**
- 🐛 **Hard-to-debug runtime failures**
- 📉 **SEO and performance impact**

## Next Steps

1. **Immediate**: Run integration tests before deployments
2. **Short-term**: Add ESLint rules for App Router compliance  
3. **Long-term**: Implement E2E testing pipeline

The kosten page issue was a perfect example of why comprehensive testing requires **multiple layers** beyond just unit tests.