import { cache } from 'react';
import { createMuseCMSClient } from '@/lib/muse-cms-client';

export interface ArticleCategory {
  name: string;
  slug: string;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: ArticleCategory;
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  image: string;
  tags: string[];
}

const FALLBACK_ARTICLES: ArticleRecord[] = [
  {
    id: 'fallback-1',
    slug: 'voorjaar-tuinklussen-maart',
    title: 'Voorjaar tuinklussen: 5 slimme stappen voor een sterke start',
    excerpt:
      'De eerste warme weken bepalen hoe makkelijk je tuin de rest van het seizoen doorkomt. Met deze vijf stappen voorkom je achterstallig onderhoud.',
    body: [
      'Maart en april zijn de maanden waarin de meeste Friese tuinen wakker worden. Het is ook het moment waarop kleine keuzes, zoals te laat snoeien of slecht bemesten, later extra werk veroorzaken.',
      'Begin met een rustige inspectieronde. Kijk naar verzakte borders, natte plekken in het gazon en vaste planten die de winter niet goed zijn doorgekomen. Door eerst te observeren voorkom je dat je op automatische piloot werk uitvoert dat weinig oplevert.',
      'Snoei vervolgens doelgericht. Heesters die op nieuw hout bloeien kunnen vaak vroeg in het seizoen teruggezet worden, terwijl voorjaarsbloeiers juist pas na de bloei gesnoeid moeten worden. Een verkeerd snoeimoment kost direct bloemen of groeikracht.',
      'Geef de bodem daarna aandacht. Een dunne laag compost verbetert het bodemleven, houdt vocht beter vast en geeft planten een stabielere start. Zeker op zandige grond in Friesland is dat een eenvoudige manier om later minder te hoeven sproeien.',
      'Controleer tot slot beregening, afwatering en paden. Verstoppingen, losse tegels en lekkende koppelingen vallen in het voorjaar sneller te herstellen dan midden in een droge of drukke zomerperiode.',
      'Wie deze basis in een paar gerichte sessies oppakt, houdt de tuin rustiger, gezonder en overzichtelijker. Dat is precies het type onderhoud waarmee je grotere kosten later in het jaar voorkomt.',
    ].join('\n\n'),
    category: { name: 'Seizoen', slug: 'seizoen' },
    readTime: 4,
    publishedAt: '2026-03-12T08:00:00.000Z',
    updatedAt: '2026-03-12T08:00:00.000Z',
    featured: true,
    image: '/images/garden-maintenance.png',
    tags: ['voorjaar', 'onderhoud', 'snoeien'],
  },
  {
    id: 'fallback-2',
    slug: 'groendak-kosten-subsidies',
    title: 'Groendak kosten en subsidies: waar je in Friesland op moet letten',
    excerpt:
      'Een groendak kan financieel interessant zijn, maar alleen als je opbouw, waterbuffering en subsidieregels goed meeneemt in je keuze.',
    body: [
      'Een groendak wordt vaak te simpel benaderd als alleen een laag sedum op een plat dak. In de praktijk bepalen dakbelasting, afwatering, opbouwhoogte en onderhoudsverwachting of een systeem echt rendabel is.',
      'De investering bestaat meestal uit voorbereiding van het dak, beschermlagen, drainage, substraat en beplanting. Daar komen bij oudere daken soms extra kosten bij voor herstel of versteviging. Die posten maken vaak het verschil tussen een mooi idee en een realistisch plan.',
      'Subsidies kunnen de businesscase verbeteren, maar ze verschillen per gemeente en veranderen geregeld. Controleer daarom altijd of er eisen gelden voor minimale oppervlakte, waterbergend vermogen of uitvoering door een erkende partij.',
      'Naast de aanschafprijs moet je ook kijken naar de gebruikswaarde. Een goed aangelegd groendak beschermt de dakbedekking, helpt piekbelasting van regenwater afvlakken en verbetert het aanzicht van een uitbouw of schuur.',
      'Vraag offertes daarom niet alleen op prijs uit. Laat ook vastleggen welke opbouw wordt toegepast, hoeveel onderhoud nodig blijft en hoe het systeem presteert bij langere droge periodes. Dat voorkomt teleurstelling na oplevering.',
    ].join('\n\n'),
    category: { name: 'Groendak', slug: 'groendak' },
    readTime: 6,
    publishedAt: '2026-03-10T08:00:00.000Z',
    updatedAt: '2026-03-10T08:00:00.000Z',
    featured: false,
    image: '/images/green-roof.png',
    tags: ['groendak', 'kosten', 'subsidie'],
  },
  {
    id: 'fallback-3',
    slug: 'onderhoudsarme-planten-friese-tuin',
    title: 'Onderhoudsarme planten voor de Friese tuin',
    excerpt:
      'Minder onderhoud begint niet bij minder aandacht, maar bij betere keuzes. Deze plantgroepen blijven sterk in wind, regen en wisselende bodemomstandigheden.',
    body: [
      'Onderhoudsarm betekent niet onderhoudsvrij. Het betekent dat je soorten kiest die passen bij de plaatselijke omstandigheden, zodat je minder hoeft te corrigeren met extra water, voeding of vervanging.',
      'In veel Friese tuinen werken sterke siergrassen, vaste planten met diepe worteling en compacte heesters beter dan kwetsbare seizoensbloeiers. Ze verdragen wind en wisselende neerslag beter en blijven langer representatief.',
      'Combineer planten op basis van standplaats in plaats van alleen op kleur. Een zonnige, droge strook vraagt om een ander pakket dan een beschutte border op vochtvasthoudende grond. Juist die combinatie bepaalt hoeveel werk je later hebt.',
      'Denk ook aan onderhoudsvorm. Grote vakken met dezelfde robuuste beplanting zijn efficiënter te beheren dan veel kleine groepen met uiteenlopende snoei- en bemestingsbehoeften.',
      'Wie slim ontwerpt, hoeft minder te herstellen. Dat is de kern van onderhoudsarm tuinieren en tegelijk de reden waarom een goed beplantingsplan vaak meer oplevert dan losse plantenkeuzes.',
    ].join('\n\n'),
    category: { name: 'Tips', slug: 'tips' },
    readTime: 5,
    publishedAt: '2026-03-08T08:00:00.000Z',
    updatedAt: '2026-03-08T08:00:00.000Z',
    featured: false,
    image: '/images/tuinontwerp-hero.jpg',
    tags: ['beplanting', 'onderhoud', 'tips'],
  },
];

function hasMuseConfig() {
  return Boolean(
    process.env.MUSE_GRAPHQL_URL &&
      process.env.MERCURY_TOKEN_URL &&
      process.env.NEXUS_PROJECT_API_KEY &&
      process.env.NEXUS_PROJECT_API_SECRET &&
      process.env.MUSE_BLOG_UUID
  );
}

function estimateReadTime(rawReadTime: unknown, body: string) {
  if (typeof rawReadTime === 'number' && Number.isFinite(rawReadTime) && rawReadTime > 0) {
    return Math.round(rawReadTime);
  }

  if (typeof rawReadTime === 'string') {
    const parsed = Number.parseInt(rawReadTime, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 180));
}

function mapMuseArticle(article: Record<string, unknown>, index: number): ArticleRecord {
  const body = typeof article.bodyText === 'string' ? article.bodyText : '';
    const category = (article.category as Record<string, unknown> | undefined) ?? {};
    const tags = Array.isArray(article.tags)
      ? article.tags
          .map((tag) => {
            const tagRecord = tag as Record<string, unknown>;
            return typeof tagRecord.name === 'string' ? tagRecord.name : tagRecord.slug;
          })
          .filter((tag): tag is string => typeof tag === 'string' && tag.length > 0)
      : [];
  const excerpt =
    typeof article.dek === 'string' && article.dek.trim().length > 0
      ? article.dek.trim()
      : body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180);

  return {
      id: String(article.articleId ?? article.externalRef ?? article.urlSlug ?? `article-${index}`),
      slug: typeof article.urlSlug === 'string' ? article.urlSlug : `article-${index}`,
      title: typeof article.headline === 'string' ? article.headline : 'Artikel',
    excerpt,
    body,
    category: {
        name: typeof category.name === 'string' ? category.name : 'Tips',
        slug: typeof category.slug === 'string' ? category.slug : 'tips',
    },
    readTime: estimateReadTime(article.readTime, body),
      publishedAt: typeof article.publishedAt === 'string' ? article.publishedAt : new Date().toISOString(),
      updatedAt:
        typeof article.updatedAt === 'string'
          ? article.updatedAt
          : typeof article.publishedAt === 'string'
            ? article.publishedAt
            : new Date().toISOString(),
    featured: index === 0,
    image: '/images/tuinontwerp-hero.jpg',
      tags,
  };
}

export function getArticlePath(slug: string) {
  return `/nieuws/${slug}`;
}

export function formatArticleDate(date: string, locale: string) {
  const language = locale === 'en' ? 'en-GB' : 'nl-NL';
  return new Intl.DateTimeFormat(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function getArticleParagraphs(body: string, excerpt: string) {
  const normalized = (body || '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return [excerpt];
}

export const getArticles = cache(async (): Promise<ArticleRecord[]> => {
  if (!hasMuseConfig()) {
    return FALLBACK_ARTICLES;
  }

  try {
    const articles = await createMuseCMSClient().fetchAllPosts(24);
    const normalized = articles
      .filter((article: unknown) => {
        const a = article as Record<string, unknown>;
        return a.urlSlug && a.headline;
      })
      .map(mapMuseArticle);

    return normalized.length > 0 ? normalized : FALLBACK_ARTICLES;
  } catch (error) {
    console.error('Failed to fetch Muse CMS articles:', error);
    return FALLBACK_ARTICLES;
  }
});

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getRelatedArticles(currentSlug: string, categorySlug: string, limit = 3) {
  const articles = await getArticles();
  const sameCategory = articles.filter(
    (article) => article.slug !== currentSlug && article.category.slug === categorySlug
  );
  const fallback = articles.filter((article) => article.slug !== currentSlug);

  return [...sameCategory, ...fallback].slice(0, limit);
}

export async function getArticleCategories() {
  const articles = await getArticles();
  const counts = new Map<string, { name: string; slug: string; count: number }>();

  for (const article of articles) {
    const current = counts.get(article.category.slug);
    if (current) {
      current.count += 1;
    } else {
      counts.set(article.category.slug, {
        name: article.category.name,
        slug: article.category.slug,
        count: 1,
      });
    }
  }

  return Array.from(counts.values()).sort((a, b) => a.name.localeCompare(b.name));
}
