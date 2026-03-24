import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Enhanced rules to catch Server Component violations
    rules: {
      // Warn about potential hydration issues
      "react/no-unknown-property": ["error", { 
        "ignore": ["suppressHydrationWarning"] 
      }],
      
      // Custom rule to warn about onClick in page.tsx files (potential Server Components)
      "no-restricted-syntax": [
        "warn",
        {
          "selector": "JSXAttribute[name.name='onClick'][name.type='JSXIdentifier']",
          "message": "⚠️  onClick handlers in Server Components cause runtime errors. Add 'use client' directive if this component needs interactivity."
        },
        {
          "selector": "JSXAttribute[name.name='onSubmit'][name.type='JSXIdentifier']", 
          "message": "⚠️  onSubmit handlers in Server Components cause runtime errors. Add 'use client' directive if this component needs interactivity."
        }
      ]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
