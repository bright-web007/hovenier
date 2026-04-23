import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react/no-unknown-property": ["error", { 
        "ignore": ["suppressHydrationWarning"] 
      }]
    }
  },
  {
    files: ["app/**/page.tsx", "app/**/layout.tsx", "app/**/template.tsx"],
    ignores: ["app/offline/page.tsx", "app/test-ga4/page.tsx"],
    rules: {
      // Warn about event handlers in App Router entry files, which default to server components.
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
    // Node.js CJS scripts and test infrastructure (not part of the app bundle):
    "scripts/**",
    "jest.config.js",
    "jest.setup.js",
    "debug_archive/**",
    "public/sw.js",
  ]),
]);

export default eslintConfig;
