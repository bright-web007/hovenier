# feat: add interactive Before & After section to all service pages

---

## 📌 Summary

This PR introduces a reusable **"Before & After" (Voor & Na)** image comparison slider section across all 5 service pages. The section sits between the process/benefits cards and the FAQ section on each page, showcasing real project transformations to build trust with potential customers.

The implementation includes two new reusable components (`BeforeAfterSlider`, `BeforeAfterSection`), bilingual translation support (NL/EN), and Next.js Image optimization for high-quality visuals without hurting Core Web Vitals.

---

## 🛠️ Type of Change

- [x] ✨ New feature (adds functionality)
- [x] 🐛 Bug fix (fixes an issue)
- [ ] 💥 Breaking change (changes existing functionality)
- [ ] 📖 Documentation update
- [ ] 🔧 Refactoring (code improvement without changing functionality)
- [ ] 🚀 Performance improvement
- [ ] ✅ Test enhancement
- [ ] 🏗️ Build/configuration change

---

## 🔄 Changes Made

### New Components
- **`app/components/BeforeAfterSlider.tsx`** — Interactive drag-to-compare slider (client component). Supports mouse + touch, circular handle with sage-green stroke, clip-path reveal, and Next.js `<Image>` for optimized loading.
- **`app/components/BeforeAfterSection.tsx`** — Section wrapper with eyebrow, title, description, slider, and metadata row (location, surface, duration, completion).

### Service Pages Updated
Inserted `<BeforeAfterSection />` between `BenefitsSection` and `FaqSection` on:
- `app/[locale]/diensten/tuinontwerp/page.tsx`
- `app/[locale]/diensten/tuinonderhoud/page.tsx`
- `app/[locale]/diensten/groendak/page.tsx`
- `app/[locale]/diensten/stratenmaker/page.tsx`
- `app/[locale]/diensten/tuin-aanleggen/page.tsx`

### Translations
- Added `before_after` translation keys to:
  - `locales/nl/common.json`
  - `locales/en/common.json`

### Assets
- Added placeholder before/after images for all 5 services under `public/images/before-after/`

### Bug Fixes
- Fixed missing closing brace `}` in `groendak/page.tsx` that caused a JSX parse error.

---

## 🧪 Testing

- [x] Manual testing completed
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] End-to-end (E2E) tests added/updated
- [ ] Regression testing performed
- [ ] Verified with real-world data

### Test Environment
- [x] Local development
- [ ] Staging
- [ ] Production
- [ ] Other (specify):

---

## 📸 Screenshots / Demos

| Page | Before (placeholder) | After (placeholder) |
|------|----------------------|---------------------|
| Tuinontwerp | `/images/before-after/tuinontwerp-before.png` | `/images/before-after/tuinontwerp-after.png` |
| Tuinonderhoud | `/images/before-after/tuinonderhoud-before.png` | `/images/before-after/tuinonderhoud-after.png` |
| Groendak | `/images/before-after/groendak-before.png` | `/images/before-after/groendak-after.png` |
| Stratenmaker | `/images/before-after/stratenmaker-before.png` | `/images/before-after/stratenmaker-after.png` |
| Tuin-aanleggen | `/images/before-after/tuin-aanleggen-before.png` | `/images/before-after/tuin-aanleggen-after.png` |

**Note:** Placeholder images should be replaced with real project photos before production deployment. Filenames must remain the same.

---

## 🔗 Related Issues

- Related to ZIN-4361 (service page schema updates — already merged)
- Branch: `feat/service-page-ui-redesign`

---

## ✅ Checklist

- [x] Code follows project style guidelines
- [x] Code reviewed for TypeScript/ESLint compliance
- [ ] Documentation updated (if applicable)
- [x] Tested in multiple browsers/devices
- [x] Performance impact considered and documented
- [ ] Relevant tests added/updated
- [x] All dependencies are up to date

---

## 📝 Additional Notes for Reviewers

1. **Image Quality vs Web Vitals:** `BeforeAfterSlider` uses Next.js `<Image fill sizes="(max-width: 1280px) 100vw, 1280px" />` so the browser receives the exact right image size. No `priority` prop is used since the section is below the fold.

2. **Responsive:** The slider uses `padding-bottom: 56.25%` for a reliable 16:9 aspect ratio across all browsers and devices.

3. **Reusability:** Both components are fully prop-driven. To add the section to a new page, just import and pass the translated strings + image paths.

4. **No Breaking Changes:** Existing page structure, schemas, FAQ sections, lead forms, and related articles are untouched.
